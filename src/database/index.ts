import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import Playlist from './models/Playlist';
import Exercise from './models/Exercise';

dotenv.config();
export const models = {
    User: User,
    Playlist: Playlist,
    Exercise: Exercise,
};

class Database {
    private uri: string;

    constructor(uri?: string) {
        this.uri = uri || (process.env.CONNECTION_URI as string);
        if (!this.uri) {
            throw new Error('Database connection URI is missing in environment variables.');
        }
    }

    public async _connect(): Promise<void> {
        try {
            await mongoose.connect(this.uri);
        } catch (err) {
            console.error('Error while attempting to connect to MongoDB:', (err as Error).message);
            throw err;
        }
    }

    public async disconnect(): Promise<void> {
        try {
            await mongoose.disconnect();
            console.log('Database connection closed successfully');
        } catch (err) {
            console.error('Error while attempting to disconnect from MongoDB:', (err as Error).message);
        }
    }
}

export default new Database();
