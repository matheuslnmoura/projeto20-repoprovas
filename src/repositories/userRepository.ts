import db from '../config/database.js';

export async function getUsers() {
  return await db.user.findMany({});
}

export async function findUserByEmail(email: string) {
  return await db.user.findUnique({
    where: {email}
  });
}

export async function findUserById(id: number) {
  return await db.user.findUnique({
    where: {id}
  });
}

export async function insertUser(email: string, hashPassword: string) {
  return await db.user.create({
    data: {
      email, 
      password: hashPassword
    }
  });
}