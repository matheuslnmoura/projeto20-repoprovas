import { Router } from 'express';
import { getUsersController, signInController, signUpController } from '../controllers/userController.js';
import { validateSigninInfo, validateSignupInfo } from '../middlewares/userValidations.js';

const userRouter = Router();

userRouter.get('/users', getUsersController);
userRouter.post('/sign-up', validateSignupInfo, signUpController);
userRouter.post('/sign-in', validateSigninInfo, signInController);

export default userRouter;