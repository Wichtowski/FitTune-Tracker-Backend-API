import { IUser, IUserCreate } from '../../interfaces/User';
import UserModel from '../../database/models/User';
import signJWT from '../../middleware/signJWT';
import bcrypt from 'bcrypt';

export class UserService {
    // public async getAllUsers(): Promise<IUser[]> {
    //     return await UserModel.find().exec();
    // }

    public async createUser(payload: IUserCreate): Promise<IUser> {
        const { email, password, username, name, birthday } = payload;

        const emailDuplicate = await UserModel.findOne({ email });
        if (emailDuplicate) {
            throw new Error('Email already in use');
        }

        const usernameDuplicate = await UserModel.findOne({ username });
        if (usernameDuplicate) {
            throw new Error('Username already in use');
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error('Invalid email address');
        }

        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        if (password.toLowerCase() === password) {
            throw new Error('Password must containN at least one uppercase letter');
        }

        if (password.toLowerCase().includes(username.toLowerCase())) {
            throw new Error('Password cannot contain the username');
        }

        const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~]/.test(password);
        if (!hasSpecialCharacter) {
            throw new Error('Password must contain at least one special character');
        }

        if (birthday > new Date()) {
            throw new Error('Invalid birthday');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const token = await signJWT({ email, username, birthday });

        const result = await UserModel.create({
            email: email,
            password: hashedPassword,
            username: username,
            birthday: birthday,
            name: name,
            sessions: [
                {
                    token: token,
                    loginDate: new Date(),
                },
            ],
        });
        return await result.save();
    }

    // public async getUserById(id: ObjectId): Promise<IUser | null> {
    //     return await UserModel.findById(id).exec();
    // }

    // public async updateUser(id: string, updates: Partial<IUser>): Promise<IUser | null> {
    //     return await UserModel.findByIdAndUpdate(id, updates, { new: true }).exec();
    // }

    // public async deleteUser(id: ObjectId): Promise<IUser | null> {
    //     return await UserModel.findByIdAndDelete(id).exec();
    // }
}
