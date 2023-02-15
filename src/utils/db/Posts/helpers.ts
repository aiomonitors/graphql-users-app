import { Post } from '@prisma/client';
import { NormalizedPost } from 'types/Posts';

export const normalizePosts = (posts: Post[]): NormalizedPost[] =>
  posts.map((post) => ({
    ...post,
    createdAt: post.createdAt.toISOString() ?? '',
    updatedAt: post.updatedAt.toISOString() ?? '',
  }));
