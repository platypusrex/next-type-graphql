# next-type-graphql

### Installation

First, install the main package along with some required peer dependencies.
```shell
yarn add graphql type-graphql class-validator next-type-graphql
```

Then extend your project `tsconfig` with the following.
```json
{
  "extends": "next-type-graphql/tsconfig.typegraphql",
  "compilerOptions": {
    // project compiler options
  }
}
```

Next add a `.babelrc` file in the root of the project with the following.
```json
{
  "presets": ["next/babel", "next-type-graphql/babel"]
}
```

### Usage

The core of `TypeGraphQLServer` simply extends the implementation of `ApolloServer` exported from the `apollo-server-micro` package
and accepts the same config options with a few additions.</br>

#### Basic setup

Let's start by creating a simple resolver with `type-graphql`.
```ts
// api/resolvers/HelloResolver.ts
import { Query, Resolver } from 'type-graphql';

@Resolver()
export class HelloResolver {
  @Query(() => String)
  async hello (): Promise<string> {
    return 'Hello world!';
  }
}
```

Next create an instance of `TypeGraphQLServer`. Go ahead and set `path` with a value of `/api/graphql`
and provide a value for the `schema.resolvers` property as well. The `schema` property is required and accepts 
any of the options that the [buildSchemaSync](https://typegraphql.com/docs/getting-started.html#building-schema) function accepts.

```ts
// api/server.ts
import { TypeGraphQLServer } from 'next-type-graphql';
import { HelloResolver } from './resolvers/HelloResolver';

export const apolloServer = new TypeGraphQLServer({
  path: '/api/graphql',
  schema: {
    resolvers: [HelloResolver],
  },
});
```

Next create an API Route by adding a file under `pages/api` called `graphql.ts`. For our GraphQL-based API Route, 
export a handler function by calling the createHandler method on the instance of `TypeGraphQLServer`.
```ts
import { apolloServer } from '../../api/server.ts';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler();
```

Finally, run the app in development mode and navigate to `http://localhost:3000/api/graphql`.
```shell
yarn dev
```

You should see the GraphQL Playground, and you should be able to make a query for the 'hello world!' message.
```graphql
{
  hello
}
```

### Middleware
Next.js API Routes supports the use of [Connect](https://github.com/senchalabs/connect) compatible middleware.
The `TypeGraphQLServer` instance accepts a `middleware` option that abstracts some steps in integrating middleware
with your handler. Accepted value must be a list of `express.RequestHandler` functions. Order is relevant as they 
will wrap the handler in the order in which they are passed in.
```
middleware?: express.RequestHandler[];
```

#### Example
Example of this utilizing the [cors](https://www.npmjs.com/package/cors) package provided 
as an example below.
```shell
yarn add cors
```

```ts
// api/middleware/cors.ts
import Cors from 'cors';

export const cors = Cors({
  // any supported cors options here
  credentials: true,
  origin: [/localhost$/, /localhost:[0-9]+$/],
});
```

```ts
// api/server.ts
import { TypeGraphQLServer } from 'next-type-graphql';
import { HelloResolver } from './resolvers/HelloResolver';
import { cors } from './middleware/cors';

export const apolloServer = new TypeGraphQLServer({
  path: '/api/graphql',
  schema: {
    resolvers: [HelloResolver],
  },
  middleware: [cors]
});
```

### Typeorm integration
Since Next.js Hot-module-reloading (HMR) and TypeORM entity classes don't play nice together,
another abstraction has been added to `TypeGraphQLServer` to simplify the setup.</br>

When the server is running in dev (watch) mode, it recompiles every time source files change. The entity objects/classes
are changed too, so TypeORM connection doesn't recognize them. Because the `TypeORM` connection
manager is not aware of entity class reloads, the connection object quickly gets out of sync and stops being useful.</br>

If you decide that you would like to use `TypeORM`, you can simply pass in the connection options
and `next-type-graphql` will take care of the rest. No `ormconfig` necessary.

```ts
import { ConnectionOptions } from 'typeorm';
import { User } from '../entities/User';

export const typeormOptions: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'password',
  database: 'db_name',
  synchronize: true,
  logging: true,
  entities: [User],
};
```

```ts
import { TypeGraphQLServer } from 'next-type-graphql';
import { resolvers } from './resolvers';
import { typeormOptions } from './utils/typeormOptions';

export const apolloServer = new TypeGraphQLServer({
  path: '/api/graphql',
  context: (ctx) => ctx,
  schema: { resolvers },
  typeormOptions,
});
```
