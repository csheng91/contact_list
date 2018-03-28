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
      authError: "",
      
    }
  }

  register = (username, password)=>{
    axios.post('/register', {username: username, password: password})
  }

  login = (username, password)=>{
    // axios.
  }

  render() {
    return (
      <div className="App">
        <div className="row container">
          <Switch>
            <Route exact path='/' render={(props)=>{return localStorage.getItem('jwt') ? <List />
                                                                                       : <Redirect to='/login' />}} />
            <Route path='/login' render={(props)=>{return !localStorage.getItem('jwt') ? <Login />
                                                                                       : <Redirect to='/' />}} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
