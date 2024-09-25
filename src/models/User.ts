import { Schema, model } from 'mongoose';
import IUser, { AccountType } from '../interfaces/User';

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    name: {
        type: String,
        required: false,
        minlength: 3,
        trim: true,
    },
    birthday: {
        type: Date,
        required: false,
    },
    sessions: [
        {
            token: {
                type: String,
                required: true,
            },
            loginDate: {
                type: Date,
                required: true,
            },
            loggedOut: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
    ],
    userRole: {
        type: String,
        required: true,
        enum: ['user', 'admin', 'superadmin'],
        default: 'user',
    },
    accountType: {
        type: String,
        required: false,
        enum: ['gym enthusiast', 'professional trainer', 'nutritionist', 'psychologist', 'physical therapist'],
    },
});

export default model<IUser>('User', userSchema);
