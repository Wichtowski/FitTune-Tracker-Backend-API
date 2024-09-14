import { IUser } from '../interfaces/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const access: jwt.Secret | undefined = process.env.ACCESS_TOKEN_SECRET;

export default async function signJWT(payload: Partial<IUser>): Promise<string> {
    if (!access) {
        throw new Error('Access token secret is missing');
    } else {
        return jwt.sign(payload, access, { expiresIn: '2h' });
    }
}
