const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    contacts: [
        {
            type: ObjectId,
            ref: 'Contact'
        }
    ]
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;