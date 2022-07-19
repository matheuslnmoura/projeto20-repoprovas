import db from '../config/database.js';

export async function getUsers() {
  return await db.user.findMany({});
}