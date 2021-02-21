import { Query, Resolver } from 'type-graphql';

@Resolver()
export class HelloResolver {
  @Query(() => String)
  async hello(): Promise<string> {
    return 'Hello world!';
  }
}
