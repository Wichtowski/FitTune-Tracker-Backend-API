import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import EventLogger from './middleware/eventLogger';
import Database from './config';
import dotenv from 'dotenv';
import UserRoute from './routes/User';
import userRoutes from './routes/User';
import exerciseRoutes from './routes/Exercise';

class App {
    private readonly app: Application;
    private readonly port: number;
    private readonly logger: EventLogger;

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT || '3000');
        this.logger = new EventLogger();
        this.init();
    }

    private init() {
        this.initConfig();
        this.initMiddlewares();
        this.initRoutes();
        this.initLogger();
        this.initErrorHandling();
    }

    private initConfig() {
        dotenv.config();
        new Database();
    }

    private initMiddlewares() {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(cookieParser());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initRoutes() {
        this.app.use('/api/v1/users', userRoutes);
        this.app.use('/api/v1/exercises', exerciseRoutes);

        console.log(this.app._router.stack.filter((r: any) => r.route).map((r: any) => r.route.path));
    }

    private initLogger() {
        this.app.use(this.logger.logRequest.bind(this.logger));
    }

    private initErrorHandling() {
        this.app.use(this.logger.logBadRequest.bind(this.logger));
        this.app.use(this.logger.logUnauthorized.bind(this.logger));
        this.app.use(this.logger.logForbidden.bind(this.logger));
        this.app.use(this.logger.logNotFound.bind(this.logger));
        this.app.use(this.logger.logServerError.bind(this.logger));
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }
}

export default App;
