import { Request, Response } from 'express';
import { getUsers } from '../repositories/userRepository.js';
import { signUpService } from '../services/userServices.js';

export async function getUsersController(req:Request, res: Response) {
  const userInfo = req.body;
  console.log(userInfo);
  const users = await getUsers();
  res.status(200).send(users);
}

export async function signUpController(req: Request, res: Response) {
  const userInfo = req.body;
  const insertedUser = await signUpService(userInfo);
  if(!insertedUser) {
    throw { code: 500, message: 'Could not register user. Please try again'};
  }
  res.status(201).send(insertedUser);
}