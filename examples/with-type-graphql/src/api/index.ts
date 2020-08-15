import { TypeGraphQLServer } from 'next-type-graphql';
import { HelloResolver } from './resolvers/HelloResolver';

export const apolloServer = new TypeGraphQLServer({
  path: '/api/graphql',
  schema: {
    resolvers: [HelloResolver],
  },
});
