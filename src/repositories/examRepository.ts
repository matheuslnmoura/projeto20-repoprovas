import { Disciplines, Teacher, Tests } from '@prisma/client';
import db from '../config/database.js';

export type examData = Omit<Tests, 'id'>

export async function findByTeacherAndDisciplinesId(teacherId: number, disciplinesId: number) {
  return await db.teacherDisciplines.findFirst({
    where:{
      teacherId,
      disciplinesId
    }
  });
}

export async function insertExam(examInfo:examData) {
  return await db.tests.create({
    data: examInfo
  });
}

export async function getAllExamsGroupedByTerms() {
  return await db.term.findMany({
    include:{
      disciplines:{
        select:{
          id: true,
          name: true,
          term:{},
          teacherDisciplines:{
            select:{
              id: true,
              disciplines:{},
              teacher:{},
              tests:{
                select:{
                  id: true,
                  name: true, 
                  pdfUrl: true,
                  category:{}
                }
              }
            }
          }
        }
      }
    }
    
  });
}

export type testsByTeacher = [
  testByTeacher[]
]

export type testByTeacher ={
  id: number;
  teacher: Teacher;
  disciplines: Disciplines;
  tests: Tests[];
}

export async function getAllExamsGroupedByTeacher() {
  return await db.teacherDisciplines.findMany({
    select:{
      id: true,
      teacher:{},
      disciplines:{},
      tests:{
        select:{
          id: true,
          name: true, 
          pdfUrl: true,
          category:{}
        }
      }
    }
  });
}

export async function getAllCategories() {
  return await db.category.findMany({});
}