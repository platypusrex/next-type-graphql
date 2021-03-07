export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
}

export interface Query {
  __typename?: 'Query';
  users?: Maybe<Array<User>>;
  me?: Maybe<User>;
}

export interface QueryUsersArgs {
  confirmed?: Maybe<Scalars['Boolean']>;
}

export interface User {
  __typename?: 'User';
  id: Scalars['ID'];
  createAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  fullName: Scalars['String'];
  email: Scalars['String'];
  confirmed: Scalars['Boolean'];
}

export interface Mutation {
  __typename?: 'Mutation';
  register: User;
  login?: Maybe<User>;
}

export interface MutationRegisterArgs {
  input: RegisterInput;
}

export interface MutationLoginArgs {
  input: LoginInput;
}

export interface RegisterInput {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}

export interface LoginInput {
  email: Scalars['String'];
  password: Scalars['String'];
}

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login?: Maybe<{
    __typename?: 'User';
    createAt: any;
    email: string;
    firstName: string;
    fullName: string;
    id: string;
    lastName: string;
    updatedAt: any;
  }>;
};

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'User';
    createAt: any;
    email: string;
    firstName: string;
    fullName: string;
    id: string;
    lastName: string;
    updatedAt: any;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me?: Maybe<{
    __typename?: 'User';
    createAt: any;
    email: string;
    firstName: string;
    fullName: string;
    id: string;
    lastName: string;
    updatedAt: any;
  }>;
};

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = {
  __typename?: 'Query';
  users?: Maybe<
    Array<{
      __typename?: 'User';
      createAt: any;
      email: string;
      firstName: string;
      fullName: string;
      id: string;
      lastName: string;
      updatedAt: any;
    }>
  >;
};
