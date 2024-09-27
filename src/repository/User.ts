import IUser from '../interfaces/User';
import User from '../models/User';
import GenericRepository from './generic';
import bcrypt from 'bcrypt';

class UserRepository extends GenericRepository<IUser> {
    constructor() {
        super(User);
    }

    async createUser(data: IUser): Promise<IUser> {
        return User.create(data);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email });
    }

    async findByUsername(username: string): Promise<IUser | null> {
        return User.findOne({ username });
    }

    async findByUsernameOrEmail(username: string, email: string): Promise<IUser | null> {
        return User.findOne({ $or: [{ username }, { email }] });
    }

    async updatePassword(id: string, password: string): Promise<IUser | null> {
        return User.findByIdAndUpdate(id, { password }, { new: true }).exec();
    }
}

export default UserRepository;
