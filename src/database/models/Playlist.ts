import { Schema, model } from 'mongoose';
import { IPlaylist } from '../../interfaces/Playlist';
import Exercise from './Exercise';
import User from './User';

const playlistSchema: Schema<IPlaylist> = new Schema({
    playlistName: {
        type: String,
        required: false,
        minlength: 3,
        trim: true,
        default: 'New Playlist',
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true,
        minlength: 1,
        trim: true,
    },
    playlistDescription: {
        type: String,
        required: false,
        trim: true,
        default: 'No description',
    },
    exercises: [
        {
            exerciseID: {
                type: Schema.Types.ObjectId,
                ref: Exercise,
                required: false,
                minlength: 1,
            },
            details: {
                sets: {
                    type: Number,
                    required: false,
                },
                repetitions: {
                    type: Number,
                    required: false,
                },
                weight: [
                    {
                        type: Number,
                        required: false,
                    },
                ],
                required: false,
                type: Object,
                default: {},
            },
        },
    ],
    unit: {
        type: String,
        enum: ['lbs', 'kgs'],
        required: false,
        default: 'kgs',
    },
});

export default model<IPlaylist>('playlist', playlistSchema);
