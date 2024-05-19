const mongoose = require('mongoose');
const { Schema } = mongoose;

const exerciseSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: false
    },
    ytVideoID: {
        type: String,
        required: true,
        unique: true,
    },
    muscleGroup: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    equipment: {
        type: String,
        minlength: 1,
        trim: true,
        default: 'none',
    },
    difficulty: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
});

module.exports = mongoose.model('exercise', exerciseSchema);