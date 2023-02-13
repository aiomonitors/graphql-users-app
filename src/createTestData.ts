import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const main = async () => {
  const usersToCreate = [];

  for (let i = 0; i < 100; i += 1) {
    const data = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
    };

    const ProfileData = {
      bio: faker.lorem.paragraph(),
    };

    const posts = Array.from({ length: 10 }).map(() => ({
      updatedAt: new Date(),
      title: faker.lorem.words(2),
      content: faker.lorem.paragraph(),
      published: Math.random() < 0.5,
    }));

    usersToCreate.push(
      prisma.user.create({
        data: {
          ...data,
          profile: {
            create: ProfileData,
          },
          posts: {
            create: posts,
          },
        },
      })
    );
  }

  await Promise.all(usersToCreate);
};

main();
