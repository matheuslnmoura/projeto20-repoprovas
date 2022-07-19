import { Router } from 'express';
import { getUsersController, signUpController } from '../controllers/userController.js';
import { validateSignupInfo } from '../middlewares/userValidations.js';

const userRouter = Router();

userRouter.get('/users', getUsersController);
userRouter.post('/signup', validateSignupInfo, signUpController);

export default userRouter;