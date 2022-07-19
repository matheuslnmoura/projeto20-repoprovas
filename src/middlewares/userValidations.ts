import joi from 'joi';
import chalk from 'chalk';
import { Request, Response, NextFunction } from 'express';

export function validateSignupInfo(req: Request, res: Response, next: NextFunction) {
  const userInfo = req.body;
  const userInfoSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(10).required(),
    confirmPassword: joi.string().required().valid(joi.ref('password')),

  });

  const { error } = userInfoSchema.validate(userInfo, {abortEarly: false});

  if(error) {
    console.log(chalk.bold.red(error));
    if(error.message === '"confirmPassword" must be [ref:password]') {
      throw{code: 422, message: 'Passwords must match'};
    }
    throw{code: 422, message: error.message};
  }

  next();
}