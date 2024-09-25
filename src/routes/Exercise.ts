import { Router } from 'express';
import ExerciseController from '../controllers/Exercise';

class ExerciseRoute {
    private readonly exerciseController: ExerciseController;
    public readonly router: Router;

    constructor() {
        this.exerciseController = new ExerciseController();
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post('/create', this.exerciseController.createExercise.bind(this.exerciseController));
        this.router.get('/getAll', this.exerciseController.getAllExercises.bind(this.exerciseController));
    }
}

export default new ExerciseRoute().router;
