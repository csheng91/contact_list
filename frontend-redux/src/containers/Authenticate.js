import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register, login } from '../actions';
import Login from '../components/Login';
import Register from '../components/Register';

class Authenticate extends Component {
    render() {
        return (
            <div>
                <Login error={this.props.loginError} login={this.props.loginSubmit} />
                <Register error={this.props.registerError} register={this.props.registerSubmit} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        registerError: state.registerError,
        loginError: state.loginError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerSubmit: (username, password, modal) => {
            dispatch(register(username, password, modal));
        },
        loginSubmit: (username, password) => {
            dispatch(login(username, password));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);