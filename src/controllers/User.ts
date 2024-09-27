import { Request, Response } from 'express';
import UserService from '../services/User';
import IUser, { IPasswordChange, IDeleteUser, ILogUser } from '../interfaces/User';

class UserController {
    private userService: UserService;
    private cookieTokenOptions = {
        secure: process.env.NODE_ENV === 'prod',
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    constructor() {
        this.userService = new UserService();
    }

    public async createUser(req: Request, res: Response) {
        try {
            const { username, email, password, confPasswd, birthday, name } = req.body;

            if (password !== confPasswd) {
                throw new Error('Passwords do not match');
            }

            const payload: Partial<IUser> = { username, email, password, birthday, name };
            const result = await this.userService.createUser(payload);

            res.cookie('token', result['token'], { httpOnly: true, maxAge: 30 * 60 * 1000 });
            res.status(201).json(result);
        } catch (error) {
            res.status(404).json({ message: (error as Error).message });
        }
    }

    public async getAllUsers(req: Request, res: Response) {
        try {
            const allUsers = await this.userService.getUsers();
            const result = allUsers.map((user) => {
                return {
                    username: user.username,
                    email: user.email,
                    name: user.name,
                };
            });
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    public async logUser(req: Request, res: Response) {
        try {
            const { login, password } = req.body;
            const payload: ILogUser = { login, password };
            const { message, token } = await this.userService.loginUser(payload);

            res.cookie('token', token, this.cookieTokenOptions);
            res.status(200).json({ message: message, token: token });
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async renewToken(req: Request, res: Response): Promise<void> {
        try {
            const authToken = req.headers['authorization']?.split(' ')[1] || req.cookies?.token;
            if (!authToken) {
                res.status(401).json({ message: 'Unauthorized. No Token Provided.' });
            }
            const { message, token } = await this.userService.renewToken(authToken);

            res.cookie('token', token, this.cookieTokenOptions);
            res.status(200).json({ message: message, token: token });
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    // public async logOut(res: Response) {
    //     try {
    //         res.clearCookie('token');
    //         res.status(200).json({ message: 'Logged out' });
    //     } catch (error: unknown) {
    //         throw new Error(error as string);
    //     }
    // }

    // public async changePassword(req: Request, res: Response) {
    //     try {
    //         const { email, password, newPassword, confNewPasswd } = req.body;

    //         const payload: IPasswordChange = { email, password, newPassword, confNewPasswd };
    //         const result = await this.userService.changePassword(payload);

    //         res.status(200).json({ message: result[1] });
    //     } catch (error: unknown) {
    //         throw new Error(error as string);
    //     }
    // }

    // public async deleteUser(req: Request, res: Response) {
    //     try {
    //         const { email, password, confirmation } = req.body;

    //         const payload: IDeleteUser = { email, password, confirmation };
    //         const result = await this.userService.deleteUser(payload);

    //         res.status(200).json({ message: result });
    //     } catch (error: unknown) {
    //         throw new Error(error as string);
    //     }
    // }
}

export default UserController;
