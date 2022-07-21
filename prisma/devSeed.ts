import db from '../src/config/database.js';


async function main() {
  await createTerms();
  await createCategories();
  await createTeachers();
  await createDisciplines();
  await createTeachersDisciplines();
}


main().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(async () => {
  await db.$disconnect();
});

async function createTerms() {
  console.log('enrou no createTerms');
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
  await db.discipline.createMany({
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
  await db.teacherDiscipline.createMany({
    data: [
      {teacherId: 1, disciplineId: 1},
      {teacherId: 1, disciplineId: 2},
      {teacherId: 1, disciplineId: 3},
      {teacherId: 2, disciplineId: 4},
      {teacherId: 2, disciplineId: 5},
      {teacherId: 2, disciplineId: 6},
    ]
  });
}

