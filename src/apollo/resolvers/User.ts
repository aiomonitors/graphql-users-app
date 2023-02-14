import { Post, Profile, User } from '@prisma/client';
import { prisma } from '@shared/db';

type IUserResolver = {
  User: {
    profile: (parent: User) => Promise<Profile | null>;
    posts: (parent: User) => Promise<Post[]>;
  };
};

export class UserResolver {
  static async getUserProfile(parent: User): Promise<Profile | null> {
    return prisma.profile.findUnique({
      where: {
        userId: parent.id,
      },
    });
  }

  static async getUserPosts(parent: User): Promise<Post[]> {
    return prisma.post.findMany({
      where: {
        authorId: parent.id,
      },
    });
  }

  static resolver(): IUserResolver {
    return {
      User: {
        profile: UserResolver.getUserProfile,
        posts: UserResolver.getUserPosts,
      },
    };
  }
}
