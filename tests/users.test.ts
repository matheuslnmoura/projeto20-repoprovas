import app from '../src/app.js';
import supertest from 'supertest';
import db from '../src/config/database.js';
import { signUp, unMatchedPasswordSignUp } from './factory/userFactory.js';

beforeEach(async()=>{
  await db.$executeRaw`DELETE FROM users`;
});

describe('POST /sign-up', ()=>{
  it('given an email, password and confirmPassword inputs, should return status 201 when sign-up is succesfull', async ()=>{
    const userInfo = signUp();
    const response = await supertest(app).post('/sign-up').send({
      ...userInfo
    });
    expect(response.status).toEqual(201);
  });

  it('given an email, password and confirmPassword inputs, should return status 401 when email is already registred', async ()=>{
    //////////////setup//////////////
    const userInfo = signUp();
    await supertest(app).post('/sign-up').send({
      ...userInfo
    });
    //////////////setup//////////////

    const response = await supertest(app).post('/sign-up').send({
      ...userInfo
    });
    expect(response.status).toEqual(401);
  });

  it('given an email, password and confirmPassword inputs, should return status 422 when passwords don\'t match', async ()=>{
    const userInfo = unMatchedPasswordSignUp();
    const response = await supertest(app).post('/sign-up').send({
      ...userInfo
    });
    expect(response.status).toEqual(422);
  });
});

describe('POST /sign-in', ()=>{
  it('given an resgistred email and password inputs, should return status 200 when user sign-in is succesfull', async ()=>{
    //////////////setup//////////////
    const userInfo = signUp();
    await supertest(app).post('/sign-up').send({
      ...userInfo
    });
    //////////////setup//////////////

    const response = await supertest(app).post('/sign-in').send({
      email: userInfo.email,
      password: userInfo.password
    });
    expect(response.status).toEqual(200);
  });

  it('given an unresgistred email and password inputs, should return status 404', async ()=>{
    //////////////setup//////////////
    const userInfo = signUp();
    await supertest(app).post('/sign-up').send({
      ...userInfo
    });
    //////////////setup//////////////
    
    const response = await supertest(app).post('/sign-in').send({
      email: 'some_email@email.com', 
      password: userInfo.password
    });
    expect(response.status).toEqual(404);
  });

  it('given an resgistred email and a wrong password inputs, should return status 401 ', async ()=>{
    //////////////setup//////////////
    const userInfo = signUp();
    await supertest(app).post('/sign-up').send({
      ...userInfo
    });
    //////////////setup//////////////

    const response = await supertest(app).post('/sign-in').send({
      email: userInfo.email, 
      password: 'not_the_right_password'
    });
    expect(response.status).toEqual(401);
  });  

  it('given an resgistred email and password inputs, should return an object with a property named \'token\' and this property shall not be null', async ()=>{
    //////////////setup//////////////
    const userInfo = signUp();
    await supertest(app).post('/sign-up').send({
      ...userInfo
    });
    //////////////setup//////////////

    const response = await supertest(app).post('/sign-in').send({
      email: userInfo.email, 
      password: userInfo.password
    });
    expect(response.body.token).toBeDefined();
  });


});


afterAll(async()=>{
  // await db.$executeRaw`TRUNCATE table users`;
  await db.$disconnect();
});