import 'reflect-metadata';
import compose from 'lodash.flowright';
import { ApolloServer, Config as ApolloServerConfig } from 'apollo-server-micro';
import { RequestHandler } from 'express';
import { ServerResponse } from 'http';
import { ServerRegistration } from 'apollo-server-micro/dist/ApolloServer';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { BuildSchemaOptions, buildSchemaSync } from 'type-graphql/dist/utils/buildSchema';
import { ConnectionOptions } from 'typeorm';
import { connectTypeorm } from './adapters/typeorm';
import { initMiddleware } from './utils/initMiddleware';

export interface TypeGraphQLOptions {
  schema: BuildSchemaOptions;
  middleware?: RequestHandler[];
}

export interface TypeormConnectionOptions {
  typeormOptions?: ConnectionOptions;
}

export type Config = Omit<ApolloServerConfig, 'schema' | 'typeDefs' | 'resolvers'> &
  ServerRegistration &
  TypeGraphQLOptions &
  TypeormConnectionOptions;

export class TypeGraphQLServer extends ApolloServer {
  readonly typeormOptions: TypeormConnectionOptions['typeormOptions'];
  readonly buildSchema: BuildSchemaOptions;
  readonly serverRegistration: ServerRegistration;
  readonly middleware?: TypeGraphQLOptions['middleware'];

  constructor({
    schema,
    middleware,
    typeormOptions,
    path,
    disableHealthCheck,
    onHealthCheck,
    ...rest
  }: Config) {
    super({ ...rest, schema: buildSchemaSync(schema) });
    this.typeormOptions = typeormOptions;
    this.buildSchema = schema;
    this.serverRegistration = { path, disableHealthCheck, onHealthCheck };
    this.middleware = middleware;
  }

  public createHandler(): (req: MicroRequest, res: ServerResponse) => Promise<void> {
    const handler = this.typeormOptions
      ? async (req: MicroRequest, res: ServerResponse) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          await connectTypeorm(this.typeormOptions!);
          return super.createHandler(this.serverRegistration)(req, res);
        }
      : super.createHandler(this.serverRegistration);

    const middleware = this.createMiddleware(this.middleware);
    return middleware ? compose(...middleware)(handler) : handler;
  }

  private createMiddleware(middleware?: TypeGraphQLOptions['middleware']) {
    if (!middleware?.length) {
      return;
    }

    return middleware.map((middlewareFn) => {
      const wrappedMiddleware = initMiddleware(middlewareFn);
      // eslint-disable-next-line @typescript-eslint/ban-types
      return (handler: Function) => async (req: MicroRequest, res: ServerResponse) => {
        await wrappedMiddleware(req, res);
        return handler(req, res);
      };
    });
  }
}
