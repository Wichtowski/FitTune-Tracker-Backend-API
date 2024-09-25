import mongoose from 'mongoose';

export default interface BaseRepository<T> {
    create(data: T): Promise<T>;
    getAll(): Promise<T[]>;
    update(id: string, data: mongoose.UpdateQuery<T>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
    findById(id: string): Promise<T | null>;
}
