import { findByTeacherAndDisciplinesId, getAllCategories, getAllExamsGroupedByTeacher, getAllExamsGroupedByTerms, insertExam} from '../repositories/examRepository.js';

type examInfo = {
  name: string;
  pdfUrl: string;
  categoryId: number;
  disciplineId: number; 
  teacherId: number;
}

export async function postExamService(examInfo: examInfo) {
  const {name, pdfUrl, categoryId, teacherId, disciplineId: disciplinesId} = examInfo;
  const teacherDisciplinesId = await getTeacherDisciplineRelationId(teacherId, disciplinesId);
  const postedExam = await insertExam({name, pdfUrl, categoryId, teacherDisciplinesId, teacherId, disciplinesId});
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

export async function getAllExamsGroupedByTermsService() {
  const exams = await getAllExamsGroupedByTerms();
  if(!exams) {
    throw {code: 500, message: 'Could not retrieve exams. Please, try again later'};
  }
  return exams;
}

export async function getAllExamsGroupedByTeacherService(){
  const exams = await getAllExamsGroupedByTeacher();
  if(!exams) {
    throw {code: 500, message: 'Could not retrieve exams. Please, try again later'};
  }
  const formatedExams = formatExams(exams);
  return formatedExams;
}

function formatExams(exams) {
  const formatedExams = exams.map(exam => {
    return {
      id: exam.id,
      teacher: exam.teacher,
      discipline: exam.disciplines,
      tests: exam.tests
    };
  });
  return formatedExams;
}

export async function getCategoriesService() {
  const categories = await getAllCategories();
  if(!categories) {
    throw {code: 500, message: 'Could not retrieve categories. Please, try again later'};
  }
  return categories;
}