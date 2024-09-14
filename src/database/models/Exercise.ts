import { Schema, model } from 'mongoose';
import { IExercise } from '../../interfaces/Exercise';

const exerciseSchema = new Schema<IExercise>({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: false,
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
        trim: true,
    },
    difficulty: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    equipment: {
        type: String,
        minlength: 1,
        trim: true,
        default: 'none',
    },
});

export default model<IExercise>('exercise', exerciseSchema);
