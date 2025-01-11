import { faker } from "@faker-js/faker";

export const products = Array.from({ length: 100 }, (_, index) => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  description: faker.lorem.sentence(),
  price: faker.commerce.price(),
  image: faker.image.avatar(),
}));

export const Categories = Array.from({ length: 10 }, (_, index) => ({
  id: faker.string.uuid(),
  image: faker.image.avatar(),
  name: faker.commerce.department(),
}));

export const Employees = Array.from({ length: 30 }, (_, index) => ({
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  salary: faker.finance.amount().toString(),
  status: faker.helpers.arrayElement(["active", "inactive"]),
}));
