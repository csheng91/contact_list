const express = require('express'),
      app = express(),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      bcrypt = require('bcrypt'),
      jwt = require('jsonwebtoken'),
      config = require('./config.json'),
      mongoose = require('mongoose');


// parser for CRUD, cors for same IP issues
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// mongo setup items
const mongoUrl = 'mongodb://localhost:27017/ContactList',
      User = require('./models/User'),
      Contact = require('./models/Contact');

// mongo connection
mongoose.connect(mongoUrl);
const connection = mongoose.connection;
connection.on('open', ()=>{
    console.log('connected to mongo');
});

// middleware to authenticate jwt and provide authorization
// to access the db data on this user
authorize = (req, res, next)=>{
    let token = req.headers.jwt;
    jwt.verify(token, config.jwt, (error, payload)=>{
        if (error){
            // return to kick us out of the function in error case
            return res.status(401).send("bad token");
        }

        req.user = payload;
        next();
    })
}

// middleware to check if the new contact has the required fields
// this might be somewhat redundant because i intend to build this check into
// the frontend anyway, but it's somewhat of a low cost redundancy since it's so small
// and it also removes the possibility with a request coming from an unusal
// source like postman or something
// also another benefit is that i don't have to specify requirements
// in mongo for these fields
checkContact = (req, res, next)=>{
    // i just want to make sure that something at least shows up on frontend
    // want to avoid the situation where there is an email/number with no name
    // don't really care about the situation where a name has no contact
    // information attached to it
    if (req.body.firstName || req.body.lastName){
        next();
    }else{
        res.send('contact must have a first or last name');
    }
}

// method to create new user accounts
app.post('/register', (req, res)=>{
    // this check is somewhat arbitrary, currently only checking lengths
    // in theory could use regex to check for character types as well
    console.log(req.body);
    if (req.body.username.length < 4){
        res.send('username must be at least 4 characters long');
    }else if (req.body.password.length < 7){
        res.send('password must be at least 7 characters long');
    }else{
        let newUser = req.body.username;
        bcrypt.hash(req.body.password, 10)
            .then(hashPass=>{
                return User({
                    username: newUser,
                    hash: hashPass
                }).save();
            }).then(savedUser=>{
                console.log(savedUser);
                // this needs to send authorization key, probably a jwt
                res.send('new user');
            }).catch(error=>{
                console.log(error);
                res.send('something went wrong');
            });
    }
});

app.post('/login', (req, res)=>{
    User.findOne({username: req.body.username})
        .then(response=>{
            // not returning the promise for chaining because
            // the res needs access to the original find response
            bcrypt.compare(req.body.password, response.hash, (error, match)=>{
                if (error){
                    console.log(error);
                    // return to kick us out of the function in error case
                    return res.status(500).send('server error');
                }

                if(!match){
                    res.status(401).send("invalid credentials");
                }else{
                    const payload = {id: response.id},
                          token   = jwt.sign(payload, config.jwt, {expiresIn: '1d'});

                    res.json({jwt: token});
                }
            })
        })
        .catch(error=>{
            console.log(error);
        })
});

// getting all the contacts for this user
app.get('/contacts', authorize, (req, res)=>{
    User.findById(req.user.id)
        .populate('contacts')
        .then(userData=>{
            res.json(userData.contacts);
        })
        .catch(error=>{
            console.log(error);
            res.send('something went wrong');
        });
});

// adding new contacts
app.post('/contacts', authorize, checkContact, (req, res)=>{

    Contact({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email
        })
        .save()
        .then(savedContact=>{
            return User.findByIdAndUpdate(req.user.id, {$push: {contacts: savedContact}}, {new: true})
        })
        .then(updatedUser=>{
            res.json(updatedUser);
        })
        .catch(error=>{
            console.log(error);
            res.send('something went wrong');
        })
});

// change existing contacts
app.put('/contacts', authorize, checkContact, (req, res)=>{
    // there is a potential issue here that the user can update contacts
    // that they did not create themselves
        // but really to do that, they need access to the id of that specific entry
        // and the layout of the server as it currently stands will only
        // send out contacts that are populated through that user's document
        // which means that only you should have the ids of your contacts
    Contact.findByIdAndUpdate(req.body.id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email
        })
        .then(()=>{
            return User.findById(req.user.id).populate('contacts')
        })
        .then(userData=>{
            res.json(userData.contacts);
        })
        .catch(error=>{
            console.log(error);
            res.send('something went wrong');
        });
});

app.delete('/contacts', authorize, (req, res)=>{
    Contact.findByIdAndRemove(req.body.id)
        .then(()=>{
            return User.findByIdAndUpdate(req.user.id, {$pull: {contacts: req.body.id}})
        })
        .then(newContacts=>{
            res.json(newContacts.contacts);
        })
        .catch(error=>{
            console.log(error);
            res.send('something went wrong');
        });
})

app.listen(8080, ()=>{
    console.log('server on 8080');
});