import { findByTeacherAndDisciplinesId, insertExam } from '../repositories/examRepository.js';

type examInfo = {
  name: string;
  pdfUrl: string;
  categoryId: number;
  disciplineId: number; 
  teacherId: number;
}

export async function postExamService(examInfo: examInfo) {
  const {name, pdfUrl, categoryId, teacherId, disciplineId} = examInfo;
  const teacherDisciplineId = await getTeacherDisciplineRelationId(teacherId, disciplineId);
  const postedExam = await insertExam({name, pdfUrl, categoryId, teacherDisciplineId});
  if(!postedExam) {
    throw {code: 500, message: 'Could not register your exam. Please try again'};
  }
  return postedExam;
}

async function getTeacherDisciplineRelationId(teacherId: number, disciplineId: number) {
  const relation = await findByTeacherAndDisciplinesId(teacherId, disciplineId);
  if(!relation) {
    throw { code: 404, message: 'Invalid Teacher or Discipline'};
  }
  return relation.id;
}