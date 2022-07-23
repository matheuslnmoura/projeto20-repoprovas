import { Request, Response } from 'express';
import { postExamService } from '../services/examsServices.js';

export async function postExamController(req: Request, res: Response) {
  const examInfo = req.body;
  const postedExam = await postExamService(examInfo);
  res.status(201).send(postedExam);
}