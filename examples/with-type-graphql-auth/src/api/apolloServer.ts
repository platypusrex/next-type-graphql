import { TypeGraphQLServer } from 'next-type-graphql';
import { resolvers } from './resolvers';
import { typeormOptions } from './utils/typeormOptions';
import { cors, session } from './middleware';

export const apolloServer = new TypeGraphQLServer({
  path: '/api/graphql',
  context: (ctx) => ctx,
  typeormOptions,
  schema: { resolvers },
  playground: true,
  introspection: true,
  middleware: [cors, session],
});
