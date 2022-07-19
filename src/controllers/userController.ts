import { Request, Response } from 'express';
import { getUsers } from '../repositories/userRepository.js';
import { signInService, signUpService } from '../services/userServices.js';

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

export async function signInController( req: Request, res: Response) {
  const userInfo = req.body;
  const token = await signInService(userInfo);
  if(!token) {
    throw { code: 500, message: 'Could not login. Please try again'};
  }
  res.status(200).send({token});
}