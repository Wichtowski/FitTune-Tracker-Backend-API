const mongoose = require('mongoose');
const { Schema } = mongoose;

const exerciseSchema = new Schema({
    exerciseName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: false
    },
    exerciseYtVideoID: {
        type: String,
        required: true,
        unique: true,
    },
    exerciseMuscleGroup: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    exerciseEquipment: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    exerciseDifficulty: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
});

module.exports = mongoose.model('exercise', exerciseSchema);