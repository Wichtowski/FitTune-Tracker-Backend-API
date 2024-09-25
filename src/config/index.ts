import mongoose from 'mongoose';

class Database {
    private readonly URI: string;

    constructor() {
        this.URI = process.env.CONNECTION_URI || 'mongodb://localhost:27017/fitTune';
        if (!this.URI) {
            throw new Error('Database connection URI is missing in environment variables.');
        }
        this.connect();
    }

    public async connect(): Promise<void> {
        try {
            await mongoose.connect(this.URI);
            console.log('Database connection successful');
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

export default Database;
