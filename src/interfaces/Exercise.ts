import { Document } from 'mongoose';

interface IExercise extends Document {
    name: string;
    ytVideoID: string;
    muscleGroup: string[];
    difficulty: string;
    equipment?: string;
}

export default IExercise;
