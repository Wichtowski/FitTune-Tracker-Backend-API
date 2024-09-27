import IUser, {
    IPasswordChange,
    IDeleteUser,
    Session,
    IUserToken,
    UserRole,
    ILogUser,
    IResponseMessage,
} from '../interfaces/User';
import UserModel from '../models/User';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import nodemailer from 'nodemailer';
import UserRepository from '../repository/User';
import JWTSigner from '../middleware/signJWT';

class UserService {
    private readonly userRepository: UserRepository;
    private JWTSigner;

    constructor() {
        this.userRepository = new UserRepository();
        this.JWTSigner = new JWTSigner();
    }

    async createUser(payload: Partial<IUser>): Promise<IResponseMessage> {
        const { username, email, password, birthday, name } = payload;

        if (!username || !email || !password || !birthday || !name) {
            throw new Error('Enter all required fields');
        }

        const emailDuplicate = await this.userRepository.findByEmail(email);
        if (emailDuplicate) {
            throw new Error('Email already in use');
        }

        const usernameDuplicate = await this.userRepository.findByUsername(username);
        if (usernameDuplicate) {
            throw new Error('Username already in use');
        }

        const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!usernameRegex.test(email)) {
            throw new Error('Invalid email address');
        }

        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        if (password.toLowerCase() === password) {
            throw new Error('Password must contain at least one uppercase letter');
        }

        if (password.toLowerCase().includes(username.toLowerCase())) {
            throw new Error('Password cannot contain the username');
        }

        const hasSpecialCharacter = /[!@#$%^&*()_+{}[\]:;<>,.?~]/.test(password);
        if (!hasSpecialCharacter) {
            throw new Error('Password must contain at least one special character');
        }

        if (birthday > new Date()) {
            throw new Error('Invalid birthday');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const tokenPayload: IUserToken = { email, username, userRole: 'user' };

        const token = this.JWTSigner.signJWT(tokenPayload);

        const result = await this.userRepository.createUser({
            email,
            password: hashedPassword,
            username,
            birthday,
            name,
            sessions: [{ token: token, loginDate: new Date() }],
            userRole: 'user',
        } as IUser);
        await result.save();

        return { message: 'User created successfully', token: token };
    }

    async renewToken(token: string): Promise<IResponseMessage> {
        const isTokenValid = await this.JWTSigner.isJWTValid(token);
        if (!isTokenValid) {
            throw new Error('Invalid token');
        }
        const tokenData = await this.JWTSigner.verifyJWT(token);
        const user = await this.userRepository.findByUsernameOrEmail(tokenData.username, tokenData.email);
        if (!user) {
            throw new Error('User not found');
        }
        if (user.sessions.slice(-1)[0].loggedOut) {
            throw new Error('User already logged out');
        }

        const newToken = this.JWTSigner.signJWT({
            email: user.email,
            username: user.username,
            userRole: user.userRole,
        });

        user.sessions.push({ token: newToken, loginDate: new Date() });
        await user.save();

        return { message: 'Token renewed', token: newToken };
    }

    public async loginUser(payload: ILogUser): Promise<IResponseMessage> {
        const { login, password } = payload;

        if (!login || !password) {
            throw new Error('Enter all required fields');
        }

        const user: IUser | null = await this.userRepository.findByUsernameOrEmail(login, login);
        if (!user) {
            throw new Error('Invalid login or email');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const lastSession = user.sessions.slice(-1)[0];
        const lastSessionToken = lastSession.token;
        const didUserLogout = lastSession?.loggedOut;
        console.log(lastSessionToken);
        const isTokenValid = await this.JWTSigner.isJWTValid(lastSessionToken);
        if (isTokenValid && !didUserLogout) {
            return { message: 'User already logged', token: lastSessionToken };
        }

        const tokenPayload = {
            email: user.email,
            username: user.username,
            userRole: user.userRole,
        };

        const token = this.JWTSigner.signJWT(tokenPayload);

        user.sessions.push({ token: token, loginDate: new Date() });
        await user.save();
        return { message: 'Logged in successfully', token: token };
    }

    public async getUsers() {
        const user = await this.userRepository.getAll();
        const sanitizedUsers = user.map((user) => {
            return {
                username: user.username,
                email: user.email,
                name: user.name,
            };
        });
        return sanitizedUsers;
    }

    public async changePassword(payload: IPasswordChange) {
        const { email, password, newPassword, confNewPasswd } = payload;

        if (!password || !newPassword || !confNewPasswd) {
            throw new Error('Enter all required fields');
        }
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            throw new Error('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Invalid password');
        }

        if (newPassword !== confNewPasswd) {
            throw new Error('Passwords do not match');
        }

        return 'Password changed successfully';
    }

    public async deleteUser(payload: IDeleteUser) {
        const { email, password, confirmation } = payload;

        if (!email || !password || !confirmation) {
            throw new Error('Enter all required fields');
        }

        const user = await UserModel.findOne({ email: email });
        if (!user) {
            throw new Error('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Invalid password');
        }

        if (!confirmation) {
            throw new Error('Confirm deletion');
        }

        await user.deleteOne();

        return 'User successfully deleted';
    }
}

export default UserService;
