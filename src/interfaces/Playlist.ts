import mongoose, { Document } from 'mongoose';

export interface IPlaylist extends Document {
    playlistName?: string;
    userID?: mongoose.Types.ObjectId;
    playlistDescription?: string;
    exercises?: ExerciseItem[];
    unit?: 'lbs' | 'kgs';
}

export interface ExerciseItem {
    exerciseID?: mongoose.Types.ObjectId;
    details?: ExerciseDetails;
}

export interface ExerciseDetails {
    sets?: number;
    repetitions?: number;
    weight?: number[];
}
