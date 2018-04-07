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

// these 2 are for the auth stuff
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

// these 2 are for contacts
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