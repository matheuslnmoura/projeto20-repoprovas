import joi from 'joi';
import chalk from 'chalk';
import { Request, Response, NextFunction } from 'express';

export function validateExamsInfo( req: Request, res: Response, next: NextFunction){ 
  const examInfo = req.body;
  const examInfoSchema = joi.object({
    name: joi.string().required(),
    pdfUrl: joi.string().uri().required(),
    categoryId: joi.number().integer().required(),
    disciplineId: joi.number().integer().required(),
    teacherId: joi.number().integer().required()

  });

  const { error } = examInfoSchema.validate(examInfo, {abortEarly: false});

  if(error) {
    console.log(chalk.bold.red(error));
    throw{code: 422, message: error.message};
  }

  next();
}