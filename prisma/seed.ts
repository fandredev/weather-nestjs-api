import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const firstUser = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      email: 'admin@admin.io',
      name: faker.person.firstName(),
      password: 'admin',
    },
  });

  console.log({ firstUser });
}
main()
  .catch(async (e) => {
    console.log(`Error generated: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
