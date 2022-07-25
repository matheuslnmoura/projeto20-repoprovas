import db from '../src/config/database.js';
import bcrypt from 'bcrypt';


async function main() {
  await createUsers();
  await createTerms();
  await createCategories();
  await createTeachers();
  await createDisciplines();
  await createTeachersDisciplines();
  await createTests();
}


main().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(async () => {
  await db.$disconnect();
});

async function createUsers() {
  const password = 'admin';
  const hashPassword = bcrypt.hashSync(password, 10);
  await db.user.create({
    data: {
      email: 'adm@admin.com',
      password: hashPassword
    }
  });
}

async function createTerms() {
  const FIRST_TEM = 1;
  const LAST_TERM = 6;
  for(let i = FIRST_TEM; i <= LAST_TERM; i++) {
    await db.term.create({
      data: {
        number: i
      }
    });

  }
}

async function createCategories(){
  await db.category.createMany({
    data:[
      {name: 'Projeto'},
      {name: 'Prática'},
      {name: 'Recuperação'}
    ]
  });
}

async function createTeachers(){
  await db.teacher.createMany({
    data: [
      {name: 'Diego Pinho'},
      {name: 'Bruna Hamori'}
    ]
  });
}

async function createDisciplines(){
  await db.disciplines.createMany({
    data: [
      {name: 'HTML e CSS', termId: 1},
      {name: 'JavaScript', termId: 2},
      {name: 'React', termId: 3},
      {name: 'Humildade', termId: 1},
      {name: 'Planejamento', termId: 2},
      {name: 'Autoconfiança', termId: 3},
    ]
  });
}

async function createTeachersDisciplines(){
  await db.teacherDisciplines.createMany({
    data: [
      {teacherId: 1, disciplinesId: 1},
      {teacherId: 1, disciplinesId: 2},
      {teacherId: 1, disciplinesId: 3},
      {teacherId: 2, disciplinesId: 4},
      {teacherId: 2, disciplinesId: 5},
      {teacherId: 2, disciplinesId: 6},
    ]
  });
}


async function createTests() {
  await db.tests.createMany({
    data: [
      {name: 'globo.com', pdfUrl: 'http://globo.pdf', categoryId: 1, teacherDisciplinesId: 1, teacherId: 1, disciplinesId: 1},
      {name: 'instagram', pdfUrl: 'http://instagram.pdf', categoryId: 1, teacherDisciplinesId: 1, teacherId: 1, disciplinesId: 1},
      {name: 'drivenEats', pdfUrl: 'http://drivenEats.pdf', categoryId: 1, teacherDisciplinesId: 2, teacherId: 1, disciplinesId: 2},
      {name: 'papaio', pdfUrl: 'http://papaio.pdf', categoryId: 3, teacherDisciplinesId: 2, teacherId: 1, disciplinesId: 2},
      {name: 'batePapoUol', pdfUrl: 'http://batepapouol.pdf', categoryId: 2, teacherDisciplinesId: 2, teacherId: 1, disciplinesId: 2},
      {name: 'BuzzQuizz', pdfUrl: 'http://buzzquiss.pdf', categoryId: 1, teacherDisciplinesId: 2, teacherId: 1, disciplinesId: 2},
      {name: 'Instagram(React)', pdfUrl: 'http://InstagramReacht.pdf', categoryId: 1, teacherDisciplinesId: 3, teacherId: 1, disciplinesId: 3},
      {name: 'zapRecall', pdfUrl: 'http://zapRecall.pdf', categoryId: 2, teacherDisciplinesId: 3, teacherId: 1, disciplinesId: 3},
      {name: 'cineflex', pdfUrl: 'http://cineflex.pdf', categoryId: 3, teacherDisciplinesId: 3, teacherId: 1, disciplinesId: 3},
      {name: 'trackIt', pdfUrl: 'http://trackIt.pdf', categoryId: 1, teacherDisciplinesId: 3, teacherId: 1, disciplinesId: 3},
      {name: 'Projeto de humildade', pdfUrl: 'http://humildade.pdf', categoryId: 1, teacherDisciplinesId: 4, teacherId: 2, disciplinesId: 4},
      {name: 'Prova de humildade', pdfUrl: 'http://humildade.pdf', categoryId: 2, teacherDisciplinesId: 4, teacherId: 2, disciplinesId: 4},
      {name: 'Projeto de Planejamento', pdfUrl: 'http://planejamento.pdf', categoryId: 1, teacherDisciplinesId: 5, teacherId: 2, disciplinesId: 5},
      {name: 'Prova de Planejamento', pdfUrl: 'http://provaPlanejamento.pdf', categoryId: 2, teacherDisciplinesId: 5, teacherId: 2, disciplinesId: 5},
      {name: 'Projeto de autoconfiança', pdfUrl: 'http://autoconfiança.pdf', categoryId: 1, teacherDisciplinesId: 6, teacherId: 2, disciplinesId: 6},
      {name: 'prova de autoconfiança', pdfUrl: 'http://autoconfiança.pdf', categoryId: 3, teacherDisciplinesId: 6, teacherId: 2, disciplinesId: 6},
    ]
  });
}
