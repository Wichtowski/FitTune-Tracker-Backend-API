import IExercise from '../interfaces/Exercise';
import ExerciseRepository from '../repository/Exercise';

class ExerciseService {
    private readonly exerciseRepository: ExerciseRepository;

    constructor() {
        this.exerciseRepository = new ExerciseRepository();
    }

    public async createExercise(payload: Partial<IExercise>) {
        const { name, ytVideoID, muscleGroup, equipment, difficulty } = payload;

        if (!name || !ytVideoID || !muscleGroup || !equipment || !difficulty) {
            throw new Error('Missing required fields');
        }

        if (!Array.isArray(muscleGroup) || muscleGroup.some((group) => !group)) {
            throw new Error('One or more muscle groups are invalid or empty');
        }

        const existingExercise = await Promise.all([
            this.exerciseRepository.findExercise(name),
            this.exerciseRepository.findExercise(ytVideoID),
        ]);

        if (existingExercise) {
            throw new Error('Exercise already exists');
        }

        const result = await this.exerciseRepository.createExercise({
            name,
            ytVideoID,
            muscleGroup,
            equipment,
            difficulty,
        } as IExercise);
        await result.save();

        return { message: 'Exercise created successfully', result: result };
    }

    public async getAllExercises() {
        const result = await this.exerciseRepository.getAll();
        return result;
    }
}

export default ExerciseService;
