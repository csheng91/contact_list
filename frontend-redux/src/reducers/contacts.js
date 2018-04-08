const contacts = (state = [], action) =>{
    switch (action.type) {
        case 'UPDATE_CONTACTS':
            return action.contacts;
        default:
            return state;
    }
}

export default contacts;