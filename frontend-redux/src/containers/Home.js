import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getContacts, newContact, editContact, delContact, updtContacts, addError, editError, loginError, registerError } from '../actions';
import List from '../components/List';
import AddContact from '../components/AddContact';

class Home extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <List contacts={this.props.contacts} getContacts={this.props.getContacts} editError={this.props.editError} editContact={this.props.editContact} delContact={this.props.delContact} logout={this.props.logout} />
                <AddContact error={this.props.addError} newContact={this.props.newContact} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts,
        addError: state.addError,
        editError: state.editError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getContacts: () => {
            dispatch(getContacts());
        },
        newContact: (firstName, lastName, phone, email, modal) => {
            dispatch(newContact(firstName, lastName, phone, email, modal));
        },
        editContact: (id, firstName, lastName, phone, email, modal, formReset) => {
            dispatch(editContact(id, firstName, lastName, phone, email, modal, formReset));
        },
        delContact: (id) => {
            dispatch(delContact(id));
        },
        logout: () => {
            localStorage.removeItem('jwt');
            dispatch(updtContacts([]));
            dispatch(addError(false));
            dispatch(editError(false));
            dispatch(loginError(false));
            dispatch(registerError(false));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);