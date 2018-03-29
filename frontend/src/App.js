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
      logError: false
    }
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
      return axios.get('/contacts', {headers: {"jwt": localStorage.getItem("jwt")}})
    })
    .then(response=>{
      this.setState({contacts: response.data});
    })
    .catch(error=>{
      console.log(error);
      this.setState({logError: true});
    });
  }

  render() {
    return (
      <div className="App">
        <div className="row container center-align">
          <Switch>
            <Route exact path='/' render={(props)=>{return localStorage.getItem('jwt') ? <List contacts={this.state.contacts} />
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
