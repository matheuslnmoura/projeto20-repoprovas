import bcrypt from 'bcrypt';

export function encryptPassword(password: string) {
  const salt = 10;
  const hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
}