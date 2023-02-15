export const typeDefs = `#graphql
  type Profile {
    id: Int!
    bio: String
    userId: Int!
  }

  type Post {
    id: Int!
    title: String!
    content: String
    authorId: Int!
    createdAt: String!
    updatedAt: String!
    published: Boolean!
    author: User
  }

  type User {
    id: Int!
    email: String!
    name: String
    profile: Profile
    posts: [Post]
  }

  type PaginatedPosts {
    nextOffset: String
    posts: [Post]
  }

  type Query {
    users: [User]
    posts: [Post]
    publishedPosts: [Post]
    latestPosts: [Post]
    getPostFeed(offset: String, limit: Int): PaginatedPosts
  }
`;
