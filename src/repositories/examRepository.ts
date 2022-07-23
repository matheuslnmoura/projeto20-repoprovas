import { Test } from '@prisma/client';
import db from '../config/database.js';

export type examData = Omit<Test, 'id'>

export async function findByTeacherAndDisciplinesId(teacherId: number, disciplineId: number) {
  return await db.teacherDiscipline.findFirst({
    where:{
      teacherId,
      disciplineId
    }
  });
}

export async function insertExam(examInfo:examData) {
  return await db.test.create({
    data: examInfo
  });
}