import { PostsResolver } from '@apollo/resolvers/Posts';
import { QueryResolver } from '@apollo/resolvers/Query';
import { UserResolver } from '@apollo/resolvers/User';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from 'apollo/typeDefs';

const resolvers = {
  ...QueryResolver.resolver(),
  ...UserResolver.resolver(),
  ...PostsResolver.resolver(),
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at: ${url}`);
})();
