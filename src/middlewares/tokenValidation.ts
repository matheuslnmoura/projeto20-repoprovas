import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { findUserById } from '../repositories/userRepository.js';

dotenv.config();

export default async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  
  if(!authorization){
    throw{code: 400, message: 'Missing Token'};
  }
  
  if(authorization.slice(0, 7) !== 'Bearer ') {
    throw {code: 401, message: 'Invalid authorization header'};
  }
  
  const token = authorization.split(' ')[1];
  
  interface JwtPayload {
    id: number;
    }
    
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    const{ id } = decoded;
    
    const user = await findUserById(id);
    res.locals.user = user;
    next();
    
  } catch (error) {
    console.log(error.name);
    if(error.name === 'TokenExpiredError') {
      return res.status(401).send('Token Expired. Login again');
    }
    if(error.name === 'JsonWebTokenError') {
      return res.status(401).send('Invalid Token. Login again');
    }
    return res.sendStatus(500);
  }

}