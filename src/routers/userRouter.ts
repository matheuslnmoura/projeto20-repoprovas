import { Router } from 'express';
import { getUsersController } from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/users', getUsersController);

export default userRouter;