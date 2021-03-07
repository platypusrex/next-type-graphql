import { UserResolver } from './UserResolver';
import { NonEmptyArray } from 'type-graphql';

// eslint-disable-next-line @typescript-eslint/ban-types
export const resolvers: NonEmptyArray<Function> = [UserResolver];
