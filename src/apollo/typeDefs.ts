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

  type Query {
    users: [User]
    posts: [Post]
    publishedPosts: [Post]
  }
`;
