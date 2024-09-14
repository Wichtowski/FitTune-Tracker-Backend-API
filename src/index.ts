import express from 'express';
import Database from './database';
import userRoutes from './routes/User/Post';
import logger from './middleware/logEvents';

class App {
    private app: express.Express;
    private port: number = 3000;

    constructor() {
        this.app = express();
        this.initializeMiddleware();
        this.initializeRoutes();
        this.connDatabase();
    }

    private initializeMiddleware(): void {
        this.app.use(logger);
        this.app.use(express.json());
    }

    private initializeRoutes(): void {
        this.app.use('/user', userRoutes);
    }

    private async connDatabase(): Promise<void> {
        try {
            await Database._connect();
            console.log('Database connection successful');
        } catch (err) {
            console.error('Error while attempting to connect to MongoDB:', (err as Error).message);
            process.exit(1);
        }
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port}`);
        });
    }
}

const app = new App();
app.start();
