import { Request, Response } from 'express';
import { getAllExamsGroupedByTeacherService, getAllExamsGroupedByTermsService, getCategoriesService, postExamService } from '../services/examsServices.js';

export async function postExamController(req: Request, res: Response) {
  const examInfo = req.body;
  const postedExam = await postExamService(examInfo);
  res.status(201).send(postedExam);
}

export async function getAllExamsGroupedByTermsController(req: Request, res: Response) {
  const exams = await getAllExamsGroupedByTermsService();
  res.status(200).send({tests: exams});
}

export async function getAllExamsGroupedByTeacherController( req: Request, res: Response) {
  const exams = await getAllExamsGroupedByTeacherService();
  res.status(200).send({tests: exams});
}

export async function getCategoriesController( req: Request, res: Response) {
  const categories = await getCategoriesService();
  res.status(200).send({categories});
}