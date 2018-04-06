import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Switch, Route, Redirect} from 'react-router-dom';
import List from './components/List';
import Login from './components/Login';

class App extends Component {

  constructor(){
    super();
    this.state = {
      contacts: [],
      regError: false,
      logError: false,
      newConError: false,
      editError: false
    };
  }

  componentDidMount(){
    if (localStorage.getItem("jwt")){
      axios.get('/contacts', {headers: {"jwt": localStorage.getItem("jwt")}})
      .then(response=>{
        this.setState({contacts: response.data});
      })
      .catch(error=>{
        console.log(error);
      });
    }
  }

  register = (username, password, modal)=>{
    axios.post('/register', {username: username, password: password})
      .then(response=>{
        if (response.data === "success"){
          modal.M_Modal.close();
          this.setState({
            regError: false
          })
        }else if (response.data === "BulkWriteError"){
          this.setState({
            regError: true
          })
        }
      })
      .catch(error=>{
        console.log(error);
      })
  }

  login = (username, password)=>{
    axios.post('/login', {username: username, password: password})
    .then(response=>{
      this.setState({logError: false});
      localStorage.setItem("jwt", response.data.jwt);
      return axios.get('/contacts', {headers: {"jwt": localStorage.getItem("jwt")}});
    })
    .then(response=>{
      this.setState({contacts: response.data});
    })
    .catch(error=>{
      console.log(error);
      this.setState({logError: true});
    });
  }

  newContact = (firstName, lastName, phone, email, modal)=>{
    if (firstName !== "" || lastName !== ""){
      this.setState({newConError: false});
      axios.post('/contacts', {firstName: firstName, 
                               lastName: lastName, 
                               phone: phone, 
                               email: email}, 
                               {headers: {"jwt": localStorage.getItem("jwt")}})
        .then(response=>{
          this.setState({contacts: response.data});
          modal.M_Modal.close();
        })
        .catch(error=>{
          console.log(error);
        });
    }else{
      this.setState({newConError: true});
    }
  }

  editContact = (id, firstName, lastName, phone, email, modal, stateReset)=>{
    if (firstName !== "" || lastName !== ""){
      this.setState({editError: false});
      axios.put('/contacts', {id: id,
                              firstName: firstName, 
                              lastName: lastName, 
                              phone: phone, 
                              email: email}, 
                              {headers: {"jwt": localStorage.getItem("jwt")}})
        .then(response=>{
          this.setState({contacts: response.data});
          stateReset();
          modal.M_Modal.close();
          window.$('.collapsible').collapsible('close');
        })
        .catch(error=>{
          console.log(error);
        });
    }else{
      this.setState({editError: true});
    }
  }

  delContact = (id)=>{
    axios.delete('/contacts',{data: {id: id},
                              headers: {"jwt": localStorage.getItem("jwt")}})
      .then(response=>{
        this.setState({contacts: response.data});
        window.$('.collapsible').collapsible('close');
      })
      .catch(error=>{
        console.log(error);
      })
  }

  logout = ()=>{
    localStorage.removeItem('jwt');
    this.setState({
      contacts: [],
      regError: false,
      logError: false,
      newConError: false,
      editError: false
    })
  }
  
  render() {
    return (
      <div className="App">
        <div className="row container center-align">
          <Switch>
            <Route exact path='/' render={(props)=>{return localStorage.getItem('jwt') ? <List contacts={this.state.contacts} newContact={this.newContact} editContact={this.editContact} newConError={this.state.newConError} editError={this.state.editError} delContact={this.delContact} logout={this.logout} />
                                                                                       : <Redirect to='/login' />}} />
            <Route path='/login' render={(props)=>{return !localStorage.getItem('jwt') ? <Login register={this.register} login={this.login} logError={this.state.logError} regError={this.state.regError} />
                                                                                       : <Redirect to='/' />}} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
