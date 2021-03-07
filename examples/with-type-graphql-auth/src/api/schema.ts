import { buildSchemaSync } from 'type-graphql';
import { resolvers } from './resolvers';

export const schema = buildSchemaSync({ resolvers });
