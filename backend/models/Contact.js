const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

// using middleware on server side to specify requirements
const contactSchema = new Schema({
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
});

const ContactModel = mongoose.model('Contact', contactSchema);

module.exports = ContactModel;