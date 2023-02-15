import { Post } from '@prisma/client';

export type NormalizedPost = Omit<Post, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};
