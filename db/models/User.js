const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add name']
    },
    email: {
        type: String,
        required: [true, 'Please add email']

    },
    password: {
        type: String,
        required: [true, 'Please add Password']

    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model('User', UserSchema, 'User');
module.exports = User;