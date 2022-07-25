import { Router } from 'express';
import {  getAllExamsGroupedByTeacherController, getAllExamsGroupedByTermsController, getCategoriesController, postExamController } from '../controllers/examController.js';
import { validateExamsInfo } from '../middlewares/examsValidations.js';
import verifyToken from '../middlewares/tokenValidation.js';

const examRouter = Router();

examRouter.post('/post-exam', verifyToken, validateExamsInfo, postExamController);
examRouter.get('/exams-disciplines', verifyToken, getAllExamsGroupedByTermsController);
examRouter.get('/exams-teachers', verifyToken, getAllExamsGroupedByTeacherController);
examRouter.get('/categories', verifyToken, getCategoriesController);

export default examRouter;