import { User } from '@prisma/client';
import { prisma } from '@shared/db';

type IQueryResolver = {
  Query: {
    users: () => Promise<User[]>;
  };
};

export class QueryResolver {
  static async getUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  static resolver(): IQueryResolver {
    return {
      Query: {
        users: this.getUsers,
      },
    };
  }
}
