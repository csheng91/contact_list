// My eventual state is probably going to look something like this:

{
    contacts: [/* this is where all the contacts from the server will go */]
    register: {
        // this is where the register modal temp data will go
        // having state in the same place means that I will now be grouping
        // the error with each individual input field for better clarity
        username: ""
        password: ""
        error: false
    }
    login: {
        // similar to above, this one for register
        username: ""
        password: ""
        error: false
    }
    addContact: {
        // for new contacts
        firstName: ""
        lastName: ""
        phone: ""
        email: ""
        error: false
    }
    editContact: {
        // will be fed state on edit click of some contact
        // this one has an ID so the DB knows what to edit
        id: ""
        firstName: ""
        lastName: ""
        phone: ""
        email: ""
        error: false
    }
}