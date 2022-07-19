import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function encryptPassword(password: string) {
  const salt = 10;
  const hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
}

export function validatePassword(password: string, hashPassword: string) {
  const isPasswordValid = bcrypt.compareSync(password, hashPassword);
  if(!isPasswordValid) {
    throw {code: 401, message: 'Invalid Password'};
  }
}

export async function createToken(id: number) {
  return jwt.sign({id}, process.env.JWT_SECRET);
}
