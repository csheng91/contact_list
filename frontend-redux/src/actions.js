import axios from 'axios';

export const updtContacts = (contacts) => {
    return {
        type: 'UPDATE_CONTACTS',
        contacts: contacts
    };
};

// really the error should tell the end user
// something about what actually happened
// for now the error is just a boolean and
// is assumed to be what should be the most
// common errors in these individual cases
export const registerError = (error) => {
    return {
        type: 'REGISTER_ERROR',
        error: error
    };
};

export const loginError = (error) => {
    return {
        type: 'LOGIN_ERROR',
        error: error
    };
};

export const addError = (error) => {
    return {
        type: 'ADD_CONTACT_ERROR',
        error: error
    };
};

export const editError = (error) => {
    return {
        type: 'EDIT_CONTACT_ERROR',
        error: error
    };
};

// async actions that make a server call and dispatch sync actions
export const register = (username, password, modal) => {
    return dispatch => {
        return axios.post('/register', {username: username, password: password})
            .then(response => {
                switch (response.data) {
                    case "success":
                        modal.M_Modal.close();
                        return dispatch(registerError(false));
                    case "BulkWriteError":
                        return dispatch(registerError(true));
                    default:
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const login = (username, password) => {
    return dispatch => {
        return axios.post('/login', {username: username, password: password})
            .then(
                response => {
                    dispatch(loginError(false));
                    localStorage.setItem("jwt", response.data.jwt);
                    return axios.get('/contacts', {headers: {"jwt": localStorage.getItem("jwt")}})
                        .then(
                            response => {
                                dispatch(updtContacts(response.data));
                            },
                            error => {
                                console.log(error);
                            }
                        )
                },
                error => {
                    console.log(error);
                    dispatch(loginError(true));
                }
            )
    }
}

export const newContact = (firstName, lastName, phone, email, modal) => {
    return dispatch => {
        if (firstName !== "" || lastName !== ""){
            dispatch(addError(false));
            return axios.post('/contacts', {firstName: firstName, 
                                     lastName: lastName, 
                                     phone: phone, 
                                     email: email}, 
                                     {headers: {"jwt": localStorage.getItem("jwt")}})
                .then(
                    response=>{
                        dispatch(updtContacts(response.data));
                        modal.M_Modal.close();
                    },
                    error => {
                        console.log(error);
                    }
                );
        }
        else{
            dispatch(addError(true));
        }
    }
}

// formReset here empties the react state for the controlled component
export const editContact = (id, firstName, lastName, phone, email, modal, formReset)=>{
    return dispatch => {
        if (firstName !== "" || lastName !== ""){
            dispatch(editError(false));
            axios.put('/contacts', {id: id,
                                    firstName: firstName, 
                                    lastName: lastName, 
                                    phone: phone, 
                                    email: email}, 
                                    {headers: {"jwt": localStorage.getItem("jwt")}})
                .then(
                    response=>{
                        dispatch(updtContacts(response.data));
                        formReset();
                        modal.M_Modal.close();
                        window.$('.collapsible').collapsible('close');
                    },
                    error => {
                        console.log(error);
                    }
                );
        }
        else{
            dispatch(editError(true));
        }
    }
}

export const delContact = (id) => {
    return dispatch => {
        return axios.delete('/contacts', {data: {id: id},
                                   headers: {"jwt": localStorage.getItem("jwt")}})
            .then(
                response => {
                    dispatch(updtContacts(response.data));
                    window.$('.collapsible').collapsible('close');
                },
                error => {
                    console.log(error)
                }
            );
    }
}

export const getContacts = () => {
    return dispatch => {
        return axios.get('/contacts', {headers: {"jwt": localStorage.getItem("jwt")}})
            .then(
                response => {
                    dispatch(updtContacts(response.data));
                },
                error => {
                    console.log(error);
                }
            )
    }
}