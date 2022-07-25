import app from '../src/app.js';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import db from '../src/config/database.js';

const email = faker.internet.email();
const password = faker.internet.password();
const confirmPassword = password;

beforeEach(async()=>{
  await db.$executeRaw`DELETE FROM users WHERE email = ${email}`;
});

describe('POST /sign-up', ()=>{
  it('given an email, password and confirmPassword inputs, should return status 201 when sign-up is succesfull', async ()=>{
    const response = await supertest(app).post('/sign-up').send({
      email,
      password,
      confirmPassword
    });
    expect(response.status).toEqual(201);
  });

  it('given an email, password and confirmPassword inputs, should return status 401 when email is already registred', async ()=>{
    //////////////setup//////////////
    await supertest(app).post('/sign-up').send({
      email,
      password,
      confirmPassword
    });
    //////////////setup//////////////

    const response = await supertest(app).post('/sign-up').send({
      email,
      password,
      confirmPassword
    });
    expect(response.status).toEqual(401);
  });

  it('given an email, password and confirmPassword inputs, should return status 422 when passwords don\'t match', async ()=>{
    const response = await supertest(app).post('/sign-up').send({
      email,
      password,
      confirmPassword: 'wrong_password'
    });
    expect(response.status).toEqual(422);
  });
});

describe('POST /sign-in', ()=>{
  it('given an resgistred email and password inputs, should return status 200 when user sign-in is succesfull', async ()=>{
    //////////////setup//////////////
    await supertest(app).post('/sign-up').send({
      email,
      password,
      confirmPassword
    });
    //////////////setup//////////////

    const response = await supertest(app).post('/sign-in').send({
      email, 
      password
    });
    expect(response.status).toEqual(200);
  });

  it('given an unresgistred email and password inputs, should return status 404', async ()=>{
    //////////////setup//////////////
    await supertest(app).post('/sign-up').send({
      email,
      password,
      confirmPassword
    });
    //////////////setup//////////////
    
    const response = await supertest(app).post('/sign-in').send({
      email: 'some_email@email.com', 
      password
    });
    expect(response.status).toEqual(404);
  });

  it('given an resgistred email and a wrong password inputs, should return status 401 ', async ()=>{
    //////////////setup//////////////
    await supertest(app).post('/sign-up').send({
      email,
      password,
      confirmPassword
    });
    //////////////setup//////////////

    const response = await supertest(app).post('/sign-in').send({
      email, 
      password: 'not_the_right_password'
    });
    expect(response.status).toEqual(401);
  });  

  it('given an resgistred email and password inputs, should return an object with a property named \'token\' and this property shall not be null', async ()=>{
    //////////////setup//////////////
    await supertest(app).post('/sign-up').send({
      email,
      password,
      confirmPassword
    });
    //////////////setup//////////////

    const response = await supertest(app).post('/sign-in').send({
      email, 
      password
    });
    expect(response.body.token).toBeDefined();
  });


});


afterAll(async()=>{
  await db.$executeRaw`TRUNCATE table users`;
  await db.$disconnect();
});