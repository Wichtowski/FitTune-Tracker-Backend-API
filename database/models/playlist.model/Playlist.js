const mongoose = require('mongoose');
const { Schema } = mongoose;
const Exercise = require('../exercise.model/Exercise');
const User = require('../user.model/User');

const playlistSchema = new Schema({
    playlistName: {
        type: String,
        required: false,
        minlength: 3,
        trim: true,
        default: 'New Playlist'
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: false,
        minlength: 1,
        trim: true,
    },
    playlistDescription: {
        type: String,
        required: false,
        trim: true,
        default: 'No description'
    },
    exercises: [{
        type: Object,
        required: false,
        default: {},
        exerciseID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Exercise,
            required: false,
            minlength: 1,
        },
        details: {
            sets: {
                type: Number,
                required: false
            },
            repetitions: {
                type: Number,
            required: false
            },
            weight: [{
                type: Number,
                required: false,
            }],
            required: false,
            type: Object,
            default: {}
        },
    }],
    unit: {
        type: String,
        enum: ['lbs', 'kgs'],
        required: false,
        default: 'kgs'
    },
    // change to be in cookies or local storage
});

module.exports = mongoose.model('playlist', playlistSchema);