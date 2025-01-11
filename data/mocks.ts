import { faker } from "@faker-js/faker";

export const products = Array.from({ length: 100 }, (_, index) => ({
  id: faker.string.uuid(),

  name: faker.commerce.productName(),
  quantity: faker.number.int({ min: 1, max: 100 }),
  status: faker.helpers.arrayElement([
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ]),
  date: faker.date.recent().toISOString(),
  description: faker.lorem.sentence(),
  price: faker.commerce.price(),
}));

export const Categories = Array.from({ length: 10 }, (_, index) => ({
  id: faker.string.uuid(),
  image: faker.image.avatar(),
  name: faker.commerce.department(),
}));

export const orders = Array.from({ length: 20 }, (_, index) => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  quantity: faker.number.int({ min: 1, max: 100 }),
  status: faker.helpers.arrayElement([
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ]),
  date: faker.date.recent().toISOString(),
  description: faker.lorem.sentence(),
  price: faker.commerce.price(),
}));
