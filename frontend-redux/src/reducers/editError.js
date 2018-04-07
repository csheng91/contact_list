const editError = (state = false, action) =>{
    switch (action.type) {
        case 'EDIT_CONTACT_ERROR':
            return action.error;
        default:
            return state;
    };
};

export default editError;