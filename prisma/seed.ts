import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const firstUser = await prisma.user.upsert({
    where: { email: 'felipe@seed.io' },
    update: {},
    create: {
      email: 'felipe@seed.io',
      name: faker.person.firstName(),
      password: faker.internet.password(),
    },
  });

  const secondUser = await prisma.user.upsert({
    where: { email: 'julia@seed.io' },
    update: {},
    create: {
      email: 'julia@seed.io',
      name: faker.person.firstName(),
      password: faker.internet.password(),
    },
  });

  console.log({ firstUser, secondUser });
}
main()
  .catch(async (e) => {
    console.log(`Error generated: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
