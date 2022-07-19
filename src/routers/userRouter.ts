import { Router } from 'express';
import { getUsersController, signInController, signUpController } from '../controllers/userController.js';
import { validateSigninInfo, validateSignupInfo } from '../middlewares/userValidations.js';

const userRouter = Router();

userRouter.get('/users', getUsersController);
userRouter.post('/signup', validateSignupInfo, signUpController);
userRouter.post('/signin', validateSigninInfo, signInController);

export default userRouter;