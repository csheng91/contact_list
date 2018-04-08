// in theory these 4 error reducers could be managed by one reducer
// with the state looking something like errors: {login:, register:, add:, edit:}
// but that would mean that each time i run the reducer, i would be creating a deep copy
// of the state object, modifying it, and then returning it to keep the function pure
// this way of doing it bypasses that process and saves the state directly
const registerError = (state = false, action) =>{
    switch (action.type) {
        case 'REGISTER_ERROR':
            return action.error;
        default:
            return state;
    }
};

export default registerError;