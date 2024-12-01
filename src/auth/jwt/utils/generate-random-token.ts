import { faker } from '@faker-js/faker/.';

export default function generateRandomToken() {
  return faker.string.alphanumeric(50);
}
