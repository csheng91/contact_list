import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Home from './containers/Home';
import Authenticate from './containers/Authenticate';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="row container center-align">
          <Switch>
            <Route exact path='/' render={()=>{return localStorage.getItem('jwt') ? <Home />
                                                                                  : <Redirect to='/login' push={true} />}} />
            <Route path='/login' render={() => {return !localStorage.getItem('jwt') ? <Authenticate />
                                                                                    : <Redirect to='/' push={true} />}} />
          </Switch>
        </div>
      </div>
    );
  }
}

// this is poor planning on my part
// in terms of how i laid out the container and components
// App really should have been a functional component
// but the placement of the redirects means that i need it
// to connect to redux to force the redirects
const mapStateToProps = (state) => {
  return {
      contacts: state.contacts
  }
}

export default withRouter(connect(mapStateToProps, null)(App));