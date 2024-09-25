import BaseRepository from '../interfaces/base.repository';
import mongoose from 'mongoose';

class GenericRepository<T extends mongoose.Document> implements BaseRepository<T> {
    private readonly model: mongoose.Model<T>;

    constructor(model: mongoose.Model<T>) {
        this.model = model;
    }

    async create(data: T): Promise<T> {
        return this.model.create(data);
    }

    async getAll(): Promise<T[]> {
        return this.model.find().exec();
    }

    async update(id: string, data: mongoose.UpdateQuery<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async delete(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

    async findById(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }
}

export default GenericRepository;
