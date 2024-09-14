import { Router } from 'express';
import { UserController } from '../../controllers/User';

const router = Router();
const userController = new UserController();

router.post('/create', (req, res) => userController.createUser(req, res));

export default router;
