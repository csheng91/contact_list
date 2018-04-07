import { combineReducers } from 'redux';
import contacts from './contacts';
import registerError from './registerError';
import loginError from './loginError';
import addError from './addError';
import editError from './editError';

export default combineReducers({
    contacts,
    registerError,
    loginError,
    addError,
    editError
});