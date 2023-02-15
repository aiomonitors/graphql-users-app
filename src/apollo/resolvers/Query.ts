import { Post, User } from '@prisma/client';
import { prisma } from '@shared/db';
import { IPaginatedQuery, IPaginatedQueryArguments } from 'types/Query';
import { NormalizedPost } from 'types/Posts';
import { normalizePosts } from '@utils/db/Posts/helpers';
import logger from '@utils/logger';

type IPaginatedPosts = {
  nextOffset: string;
  posts: NormalizedPost[];
};

type IUserPaginatedPosts = IPaginatedQueryArguments & {
  userId: number;
};

type IQueryResolver = {
  Query: {
    users: () => Promise<User[]>;
    posts: () => Promise<Post[]>;
    publishedPosts: () => Promise<Post[]>;
    latestPosts: () => Promise<Post[]>;
    getPostFeed: IPaginatedQuery<IPaginatedPosts>;
    getUserPostFeed: IPaginatedQuery<IPaginatedPosts, IUserPaginatedPosts>;
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

  static async getLatestPosts(): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return posts;
  }

  static getOffsetAndLimit<T extends IPaginatedQueryArguments>(
    args: T
  ): {
    offsetToSearch: Date;
    limitToSearch: number;
  } {
    const { offset, limit } = args;
    return {
      offsetToSearch: offset ? new Date(+offset) : new Date(),
      limitToSearch: limit ?? 10,
    };
  }

  static getPostFeed: IPaginatedQuery<IPaginatedPosts> = async (parent, { offset, limit }) => {
    const { offsetToSearch, limitToSearch } = QueryResolver.getOffsetAndLimit({ offset, limit });

    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        createdAt: {
          lte: offsetToSearch,
        },
        published: true,
      },
      take: limitToSearch + 1,
    });

    const hasNextPage = posts.length > limitToSearch;
    const nextOffset = hasNextPage ? posts[limitToSearch].createdAt : null;
    const postsResult = hasNextPage ? posts.slice(0, -1) : posts;

    const updatedPosts = normalizePosts(postsResult);

    return {
      nextOffset: nextOffset?.valueOf().toString() ?? '',
      posts: updatedPosts,
    };
  };

  static getUserPostFeed: IPaginatedQuery<IPaginatedPosts, IUserPaginatedPosts> = async (
    parent,
    { userId, ...rest }
  ) => {
    const { offsetToSearch, limitToSearch } = QueryResolver.getOffsetAndLimit(rest);

    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        createdAt: {
          lte: offsetToSearch,
        },
        published: true,
        authorId: userId,
      },
      take: limitToSearch + 1,
    });

    const hasNextPage = posts.length > limitToSearch;
    const nextOffset = hasNextPage ? posts[limitToSearch].createdAt : null;
    const postsResult = hasNextPage ? posts.slice(0, -1) : posts;

    const updatedPosts = normalizePosts(postsResult);

    return {
      nextOffset: nextOffset?.valueOf().toString() ?? '',
      posts: updatedPosts,
    };
  };

  static resolver(): IQueryResolver {
    return {
      Query: {
        users: this.getUsers,
        posts: this.getPosts,
        publishedPosts: this.getPublishedPosts,
        latestPosts: this.getLatestPosts,
        getPostFeed: this.getPostFeed,
        getUserPostFeed: this.getUserPostFeed,
      },
    };
  }
}
