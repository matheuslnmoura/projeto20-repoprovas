import { Router } from 'express';
import { postExamController } from '../controllers/examController.js';
import { validateExamsInfo } from '../middlewares/examsValidations.js';
import verifyToken from '../middlewares/tokenValidation.js';

const examRouter = Router();

examRouter.post('/post-exam', verifyToken, validateExamsInfo, postExamController);

export default examRouter;