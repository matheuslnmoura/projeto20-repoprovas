import { findUserByEmail, insertUser } from '../repositories/userRepository.js';
import { createToken, encryptPassword, validatePassword } from '../utils/userUtils.js';

export type userData ={
  email: string;
  password: string;
  confirmPassword: string
}

export type userDataSignin = Omit<userData, 'confirmPassword'>

export async function signUpService(userInfo: userData) {
  const { email, password } = userInfo;
  await checkIfEmailUnique(email);
  const hashPassword = encryptPassword(password);
  const insertedUser = await insertUser(email, hashPassword);
  delete insertedUser.password;
  return insertedUser;

}

async function checkIfEmailUnique(email: string) {
  const user = await findUserByEmail(email);
  if(user) {
    throw { code: 401, message: 'This email is already registred. Login instead'};
  }
  return;
}

export async function signInService(userInfo: userDataSignin) {
  const {email, password} = userInfo;
  const user = await checkIfUserExists(email);
  const {id, password: hashPassword} = user;
  validatePassword(password, hashPassword);
  const token = await createToken(id);
  return token;
}

async function checkIfUserExists(email: string) {
  const user = await findUserByEmail(email);
  if(!user) {
    throw {code: 404, message: 'User not found. Try to sign up instead'};
  }
  return user;
}


