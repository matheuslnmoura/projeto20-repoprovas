import app from '../src/app.js';
import supertest from 'supertest';
import db from '../src/config/database.js';
import { signUp } from './factory/userFactory.js';
import { createTestInfo } from './factory/testFactory.js';

const userInfo = signUp();
const testInfo = createTestInfo(false);
const randomTestInfo = createTestInfo(true);

beforeEach(async()=>{
  await db.$executeRaw`DELETE FROM users`;
  await db.$executeRaw`DELETE FROM tests WHERE name = ${testInfo.name} OR name = ${randomTestInfo.name}`;
});

describe('POST /post-exam', ()=>{
  it('A user with a valid Token sends valid inputs and the app returns a 201 status when test is created successfully ', async ()=>{
    //////////////setup//////////////
    await supertest(app).post('/sign-up').send({
      ...userInfo
    });
    const loginResponse = await supertest(app).post('/sign-in').send({
      email: userInfo.email,
      password: userInfo.password
    });
    const {token} = loginResponse.body;
    //////////////setup//////////////
    const response = await supertest(app).post('/post-exam').send({
      ...testInfo
    }).set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(201);
  });

  it('A user with a valid Token sends invalid inputs and the app returns a 404 status ', async ()=>{
    //////////////setup//////////////
    await supertest(app).post('/sign-up').send({
      ...userInfo
    });
    const loginResponse = await supertest(app).post('/sign-in').send({
      email: userInfo.email,
      password: userInfo.password
    });
    const {token} = loginResponse.body;
    console.log(token);
    //////////////setup//////////////
    const response = await supertest(app).post('/post-exam').send({
      ...randomTestInfo
    }).set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(404);
  });

  it('A user with a invalid Token sends valid inputs and the app returns a 401 status ', async ()=>{
    //////////////setup//////////////
    await supertest(app).post('/sign-up').send({
      ...userInfo
    });
    const loginResponse = await supertest(app).post('/sign-in').send({
      email: userInfo.email,
      password: userInfo.password
    });
    const {token} = loginResponse.body;
    //////////////setup//////////////
    const response = await supertest(app).post('/post-exam').send({
      ...randomTestInfo
    }).set('Authorization', `Bearer ${token}_random_text`);

    expect(response.status).toEqual(401);
  });

});

describe('GET /exams-disciplines', ()=>{
  it('A user with a valid Token sends a request to get all exams grouped by Terms and the App returns a 200 status ', async ()=>{
    //////////////setup//////////////
    await supertest(app).post('/sign-up').send({
      ...userInfo
    });
    const loginResponse = await supertest(app).post('/sign-in').send({
      email: userInfo.email,
      password: userInfo.password
    });
    const {token} = loginResponse.body;
    //////////////setup//////////////
    const response = await supertest(app).get('/exams-disciplines')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(200);
  });

  it('A user with a invalid Token sends a request to get all exams grouped by Terms and the App returns a 401 status ', async ()=>{
    //////////////setup//////////////
    await supertest(app).post('/sign-up').send({
      ...userInfo
    });
    const loginResponse = await supertest(app).post('/sign-in').send({
      email: userInfo.email,
      password: userInfo.password
    });
    const {token} = loginResponse.body;
    //////////////setup//////////////
    const response = await supertest(app).get('/exams-disciplines')
      .set('Authorization', `Bearer ${token}_random_text_so_the_token_is_invalid`);

    expect(response.status).toEqual(401);
  });




});

describe('GET /exams-teachers', ()=>{
  it('A user with a valid Token sends a request to get all exams grouped by Teachers and the App returns a 200 status ', async ()=>{
    //////////////setup//////////////
    await supertest(app).post('/sign-up').send({
      ...userInfo
    });
    const loginResponse = await supertest(app).post('/sign-in').send({
      email: userInfo.email,
      password: userInfo.password
    });
    const {token} = loginResponse.body;
    //////////////setup//////////////
    const response = await supertest(app).get('/exams-teachers')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(200);
  });

  it('A user with a invalid Token sends a request to get all exams grouped by Teachers and the App returns a 401 status ', async ()=>{
    //////////////setup//////////////
    await supertest(app).post('/sign-up').send({
      ...userInfo
    });
    const loginResponse = await supertest(app).post('/sign-in').send({
      email: userInfo.email,
      password: userInfo.password
    });
    const {token} = loginResponse.body;
    //////////////setup//////////////
    const response = await supertest(app).get('/exams-teachers')
      .set('Authorization', `Bearer ${token}_random_text_so_the_token_is_invalid`);

    expect(response.status).toEqual(401);
  });




});



afterAll(async()=>{
  await db.$executeRaw`DELETE FROM users`;
  await db.$executeRaw`DELETE FROM tests WHERE name = ${testInfo.name} OR name = ${randomTestInfo.name}`;
  // await db.$executeRaw`TRUNCATE table terms RESTART IDENTITY CASCADE`;
  // await db.$executeRaw`TRUNCATE table users RESTART IDENTITY CASCADE` ;
  // await db.$executeRaw`TRUNCATE table categories RESTART IDENTITY CASCADE`;
  // await db.$executeRaw`TRUNCATE table teachers RESTART IDENTITY CASCADE`;
  // await db.$executeRaw`TRUNCATE table disciplines RESTART IDENTITY CASCADE`;
  // await db.$executeRaw`TRUNCATE table tests RESTART IDENTITY CASCADE`;
  // await db.$executeRaw`TRUNCATE table teachersDisciplines RESTART IDENTITY`;
  await db.$disconnect();
});