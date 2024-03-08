const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
        unique:  true,
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    confPasswd: {
        type: String,
        required: false,
        minlength: 6
    },
    name: {
        type: String,
        required: false,
        minlength: 3,
        trim: true
    },
    surname: {
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    birthdate: {
        type: Date,
        required: false,
        minlength: 1,
        trim: true
    },
    sessions: [{
        token: {
            type: String,
            required: true
        },
        loginDate: {
            type: Date,
            required: true
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);