import { Request, Response } from 'express';
import ExerciseService from '../services/Exercise';
import IExercise from '../interfaces/Exercise';
import IUser, { IUserToken, UserRole } from '../interfaces/User';
import JWTSigner from '../middleware/signJWT';

class ExerciseController {
    private exerciseService: ExerciseService;
    private JWTSigner: JWTSigner;

    constructor() {
        this.exerciseService = new ExerciseService();
        this.JWTSigner = new JWTSigner();
    }

    async createExercise(req: Request, res: Response) {
        try {
            const { name, ytVideoID, muscleGroup, equipment, difficulty, token } = req.body;

            await this.JWTSigner.checkPermissionsFromToken(token, (permission) => permission.canCreateExercise());

            const payload: Partial<IExercise> = { name, ytVideoID, muscleGroup, equipment, difficulty };
            const result = await this.exerciseService.createExercise(payload);

            res.status(201).json(result);
        } catch (error) {
            res.status(404).json({ message: (error as Error).message });
        }
    }

    async getAllExercises(req: Request, res: Response) {
        try {
            const result = await this.exerciseService.getAllExercises();

            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ message: (error as Error).message });
        }
    }

    async updateExercise(req: Request, res: Response) {
        try {
            const { name, ytVideoID, muscleGroup, equipment, difficulty, token } = req.body;

            await this.JWTSigner.checkPermissionsFromToken(token, (permission) => permission.canUpdateExercise());

            const payload: Partial<IExercise> = { name, ytVideoID, muscleGroup, equipment, difficulty };
            // const result = this.exerciseService.updateExercise(payload);

            // res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ message: 'Error updating exercise', error: (err as Error).message });
        }
    }
}

export default ExerciseController;
