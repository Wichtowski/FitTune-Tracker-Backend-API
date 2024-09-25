import IExercise from '../interfaces/Exercise';
import Exercise from '../models/Exercise';
import GenericRepository from './generic';

class ExerciseRepository extends GenericRepository<IExercise> {
    constructor() {
        super(Exercise);
    }

    async createExercise(data: IExercise): Promise<IExercise> {
        return Exercise.create(data);
    }

    async updateExercise(id: string, data: IExercise): Promise<IExercise | null> {
        return Exercise.findOneAndUpdate(
            {
                $or: [{ _id: id }, { name: data.name }],
            },
            data,
            { new: true }
        ).exec();
    }

    async findExercise(name: string): Promise<IExercise | null> {
        return Exercise.findOne({ name });
    }
}

export default ExerciseRepository;
