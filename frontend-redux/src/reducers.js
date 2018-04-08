import { combineReducers } from 'redux';
import contacts from './reducers/contacts';
import registerError from './reducers/registerError';
import loginError from './reducers/loginError';
import addError from './reducers/addError';
import editError from './reducers/editError';

export default combineReducers({
    contacts,
    registerError,
    loginError,
    addError,
    editError
});