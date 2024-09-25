import mongoose, { Document } from 'mongoose';

interface IPlaylist extends Document {
    playlistName?: string;
    userID?: mongoose.Types.ObjectId;
    playlistDescription?: string;
    exercises?: ExerciseItem[];
    unit?: 'lbs' | 'kgs';
}

interface ExerciseItem {
    exerciseID?: mongoose.Types.ObjectId;
    details?: ExerciseDetails;
}

interface ExerciseDetails {
    sets?: number;
    repetitions?: number;
    weight?: number[];
}

export default IPlaylist;
export { ExerciseItem, ExerciseDetails };
