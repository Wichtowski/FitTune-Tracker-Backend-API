import { Document } from 'mongoose';

export interface IExercise extends Document {
    name: string;
    ytVideoID: string;
    muscleGroup: string;
    difficulty: string;
    equipment?: string;
}
