import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const main = async () => {
  const usersToCreate = [];

  for (let i = 0, delay = 0; i < 100; i += 1, delay += 500) {
    const data = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
    };

    const ProfileData = {
      bio: faker.lorem.paragraph(),
    };

    const posts = Array.from({ length: 10 }).map(() => ({
      updatedAt: faker.date.between('2020-01-01', '2022-12-31'),
      title: faker.lorem.words(2),
      content: faker.lorem.paragraph(),
      published: Math.random() < 0.5,
      createdAt: faker.date.between('2020-01-01', '2022-12-31'),
    }));

    usersToCreate.push(
      prisma.user
        .create({
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
        .then((user) => {
          // eslint-disable-next-line no-console
          console.log(`Created user ${user.id}`);
        })
    );
  }

  await Promise.all(usersToCreate);
};

main();
