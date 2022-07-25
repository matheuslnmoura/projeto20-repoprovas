import { faker } from '@faker-js/faker';

export function createTestInfo(random = false) {
  if(random) {
    console.log('chamou random');
    return {
      name: faker.random.words(2),
      categoryId: faker.helpers.arrayElement([1, 2, 3]),
      pdfUrl: faker.internet.url(),
      disciplineId: 888,
      teacherId: 888
    };
  } else {
    console.log('chamou certo');
    return {
      name: faker.random.words(2),
      pdfUrl: faker.internet.url(),
      categoryId: faker.helpers.arrayElement([1, 2, 3]),
      disciplineId: 1,
      teacherId: 1
    };
  }
}