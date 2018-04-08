// in theory these 4 error reducers could be managed by one reducer
// with the state looking something like errors: {login:, register:, add:, edit:}
// but that would mean that each time i run the reducer, i would be creating a deep copy
// of the state object, modifying it, and then returning it to keep the function pure
// this way of doing it bypasses that process and saves the state directly
const editError = (state = false, action) =>{
    switch (action.type) {
        case 'EDIT_CONTACT_ERROR':
            return action.error;
        default:
            return state;
    }
};

export default editError;