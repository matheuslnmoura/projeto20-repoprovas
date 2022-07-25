import { faker } from '@faker-js/faker';

const email = faker.internet.email();
const password = faker.internet.password();

export function signUp(){
  return {
    email,
    password, 
    confirmPassword: password
  };
}

export function unMatchedPasswordSignUp(){
  return {
    email,
    password, 
    confirmPassword: 'some_password'
  };
}