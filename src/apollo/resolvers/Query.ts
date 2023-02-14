import { Post, User } from '@prisma/client';
import { prisma } from '@shared/db';

type IQueryResolver = {
  Query: {
    users: () => Promise<User[]>;
    posts: () => Promise<Post[]>;
    publishedPosts: () => Promise<Post[]>;
  };
};

export class QueryResolver {
  static async getUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  static async getPosts(): Promise<Post[]> {
    const posts = await prisma.post.findMany();
    return posts;
  }

  static async getPublishedPosts(): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
    });
    return posts;
  }

  static resolver(): IQueryResolver {
    return {
      Query: {
        users: this.getUsers,
        posts: this.getPosts,
        publishedPosts: this.getPublishedPosts,
      },
    };
  }
}
