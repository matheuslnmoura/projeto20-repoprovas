import { findUserByEmail, insertUser } from '../repositories/userRepository.js';
import { encryptPassword } from '../utils/cryptUtils.js';

export type userData ={
  email: string;
  password: string;
  confirmPassword: string
}

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
}