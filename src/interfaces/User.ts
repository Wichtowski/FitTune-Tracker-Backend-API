import { JwtPayload } from 'jsonwebtoken';
import { Document } from 'mongoose';

type UserRole = undefined | 'user' | 'admin' | 'superadmin';
type AccountType = 'gym enthusiast' | 'professional trainer' | 'nutritionist' | 'psychologist' | 'physical therapist';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    birthday: Date;
    sessions: Session[];
    userRole: UserRole;
    accountType?: AccountType;
    name?: string;
}

interface Session {
    token: string;
    loginDate: Date;
    loggedOut?: boolean;
}

interface IUserToken extends JwtPayload {
    email: string;
    username: string;
    userRole: UserRole;
}

interface ILogUser {
    login: string;
    password: string;
    token?: string;
}

interface IPasswordChange {
    email: string;
    password: string;
    newPassword: string;
    confNewPasswd: string;
}

interface IDeleteUser {
    email: string;
    password: string;
    confirmation: boolean;
}

export default IUser;
export { Session, IPasswordChange, IDeleteUser, AccountType, UserRole, IUserToken, ILogUser };
