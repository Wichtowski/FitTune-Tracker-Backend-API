import { Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    sessions?: Session[];
    birthday: Date;
    name?: string;
}

export interface Session {
    token: string;
    loginDate: Date;
}

export interface IUserCreate {
    username: string;
    email: string;
    password: string;
    birthday: Date;
    name?: string;
}
