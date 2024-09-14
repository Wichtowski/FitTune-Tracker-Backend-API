import { Request, Response } from 'express';
import { UserService } from '../services/User';
import { IUserCreate } from '../interfaces/User';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, password, confPasswd, username, name, birthday } = req.body;
            if (!email || !password || !confPasswd || !username || !birthday || !name) {
                res.status(400).json({ message: 'Enter all required fields' });
            }
            if (password !== confPasswd) {
                res.status(400).json({ message: 'Passwords do not match' });
            }

            const payload: IUserCreate = { email, password, username, name, birthday };
            const user = await this.userService.createUser(payload);

            res.status(201).json(user);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message, cause: error });
            } else {
                res.status(500).json({ message: 'An unknown error has occurred', cause: error });
            }
        }
    }

    // async logUser(req: Request, res: Response): Promise<void> {
    //     try {
    //         const { login, password } = req.body;
    //         const user = await this.userService.loginUser(login, password);
    //         if (user) {
    //             res.status(200).json(user);
    //         } else {
    //             res.status(401).json({ message: 'Invalid login credentials' });
    //         }
    //     } catch (error) {
    //         res.status(500).json({ message: 'Error logging in user' });
    //     }
    // }

    // async getUser(req: Request, res: Response): Promise<void> {
    //     try {
    //         const user = await this.userService.getUserById(req.body.id);
    //         if (user) {
    //             res.status(200).json(user);
    //         } else {
    //             res.status(404).json({ message: 'User not found' });
    //         }
    //     } catch (error) {
    //         res.status(500).json({ message: 'Error retrieving user' });
    //     }
    // }

    // async getAllUsers(req: Request, res: Response): Promise<void> {
    //     try {
    //         const users = await this.userService.getAllUsers();
    //         res.status(200).json(users);
    //     } catch (error) {
    //         res.status(500).json({ message: 'Error retrieving all users' });
    //     }
    // }

    // async updateUser(req: Request, res: Response): Promise<void> {
    //     try {
    //         const updates = req.body;
    //         const userID = Types.ObjectId.createFromHexString(req.params.id).toString();
    //         const user = await this.userService.updateUser(userID, updates);
    //         if (user) {
    //             res.status(200).json(user);
    //         } else {
    //             res.status(404).json({ message: 'User not found' });
    //         }
    //     } catch (error) {
    //         res.status(500).json({ message: 'Error updating user' });
    //     }
    // }

    // async deleteUser(req: Request, res: Response): Promise<void> {
    //     try {
    //         const user = await this.userService.deleteUser(req.params.id);
    //         if (user) {
    //             res.status(200).json({ message: 'User deleted' });
    //         } else {
    //             res.status(404).json({ message: 'User not found' });
    //         }
    //     } catch (error) {
    //         res.status(500).json({ message: 'Error deleting user' });
    //     }
    // }
}
