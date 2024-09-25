import IUser, { IUserToken } from '../interfaces/User';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import PermissionService from './permissions';
dotenv.config();

class JWTSigner {
    private accessSecret: jwt.Secret;
    constructor() {
        dotenv.config();
        const access = process.env.ACCESS_TOKEN_SECRET!;
        if (!access) {
            throw new Error('Access token secret is missing');
        }
        this.accessSecret = access;
    }

    signJWT(payload: IUserToken): string {
        const { email, username, userRole } = payload;
        const tokenPayload = { email, username, userRole };

        return jwt.sign(tokenPayload, this.accessSecret, { expiresIn: '30m' });
    }

    async isJWTValid(token: string): Promise<boolean> {
        try {
            jwt.verify(token, this.accessSecret);
            return true;
        } catch (error) {
            return false;
        }
    }

    async verifyJWT(token: string): Promise<IUserToken> {
        const data = jwt.verify(token, this.accessSecret) as IUserToken;
        const { email, username, userRole } = data;

        if (!email || !username || !userRole) {
            throw new Error('Token does not contain required fields');
        }

        return data;
    }

    async checkPermissionsFromToken(
        token: string,
        permissionCheck: (permissions: PermissionService) => boolean
    ): Promise<boolean> {
        if (!token) {
            return false;
        }
        const userToken: IUserToken = await this.verifyJWT(token);
        const permissionService = new PermissionService(userToken.userRole);

        if (!permissionCheck(permissionService)) {
            throw new Error('You do not have permission to perform this action');
        } else {
            return true;
        }
    }
}

export default JWTSigner;
