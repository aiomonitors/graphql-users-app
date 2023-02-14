import { Profile, User } from '@prisma/client';
import { prisma } from '@shared/db';

type IUserResolver = {
  User: {
    profile: (parent: User) => Promise<Profile | null>;
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

  static resolver(): IUserResolver {
    return {
      User: {
        profile: UserResolver.getUserProfile,
      },
    };
  }
}
