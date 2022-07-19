import { Request, Response } from 'express';

export async function signupController(req:Request, res: Response) {
  const userInfo = req.body;
  console.log(userInfo);
}