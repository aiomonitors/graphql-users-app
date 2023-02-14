export const typeDefs = `#graphql
type Profile {
  id: Int
  bio: String
  user: User
  userId: Int
}

type User {
  id: Int
  email: String!
  name: String
  profile: Profile
}

type Query {
  users: [User]
}
`;
