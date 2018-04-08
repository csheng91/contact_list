import React from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
// import List from './components/List';
import Authenticate from './containers/Authenticate';

const App = () => {
  return (
    <div className="App">
      <div className="row container center-align">
        <Switch>
          {/* <Route exact path='/' render={(props)=>{return localStorage.getItem('jwt') ? <List contacts={this.state.contacts} newContact={this.newContact} editContact={this.editContact} newConError={this.state.newConError} editError={this.state.editError} delContact={this.delContact} logout={this.logout} />
                                                                                      : <Redirect to='/login' />}} /> */}
          <Route path='/login' render={() => {return !localStorage.getItem('jwt') ? <Authenticate />
                                                                                  : <Redirect to='/' />}} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
