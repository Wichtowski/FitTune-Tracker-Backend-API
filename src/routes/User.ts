import { Router } from 'express';
import UserController from '../controllers/User';
import PermissionService from '../middleware/permissions';

class UserRoute {
    private readonly userController: UserController;
    // private readonly permissionService: PermissionService;
    public readonly router: Router;

    constructor() {
        this.userController = new UserController();
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post('/create', this.userController.createUser.bind(this.userController));
        this.router.post('/login', this.userController.logUser.bind(this.userController));
        this.router.post('/getAllUsers', this.userController.getAllUsers.bind(this.userController));
        this.router.post('/renewToken', this.userController.renewToken.bind(this.userController));
    }
}

export default new UserRoute().router;
