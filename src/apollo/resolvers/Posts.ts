import { Post, User } from '@prisma/client';
import { prisma } from '@shared/db';

type IPostResolver = {
  Post: {
    author: (parent: Post) => Promise<User | null>;
  };
};

export class PostsResolver {
  static async getUser(parent: Post): Promise<User | null> {
    return prisma.post.findUnique({ where: { id: parent.id } }).author();
  }

  static resolver(): IPostResolver {
    return {
      Post: {
        author: this.getUser,
      },
    };
  }
}
