import { Request, Response } from 'express';
import { getUsers } from '../repositories/userRepository.js';

export async function getUsersController(req:Request, res: Response) {
  const userInfo = req.body;
  console.log(userInfo);
  const users = await getUsers();
  res.status(200).send(users);
}