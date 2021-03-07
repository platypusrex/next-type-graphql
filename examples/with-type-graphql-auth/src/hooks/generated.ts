import * as Types from '../types/generated';

import * as Operations from '../graphql';
import * as Apollo from '@apollo/client';

export type LoginMutationFn = Apollo.MutationFunction<
  Types.LoginMutation,
  Types.LoginMutationVariables
>;
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<Types.LoginMutation, Types.LoginMutationVariables>
) {
  return Apollo.useMutation<Types.LoginMutation, Types.LoginMutationVariables>(
    Operations.Login,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<Types.LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  Types.LoginMutation,
  Types.LoginMutationVariables
>;
export type RegisterMutationFn = Apollo.MutationFunction<
  Types.RegisterMutation,
  Types.RegisterMutationVariables
>;
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<Types.RegisterMutation, Types.RegisterMutationVariables>
) {
  return Apollo.useMutation<Types.RegisterMutation, Types.RegisterMutationVariables>(
    Operations.Register,
    baseOptions
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<Types.RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  Types.RegisterMutation,
  Types.RegisterMutationVariables
>;
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<Types.MeQuery, Types.MeQueryVariables>
) {
  return Apollo.useQuery<Types.MeQuery, Types.MeQueryVariables>(Operations.Me, baseOptions);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.MeQuery, Types.MeQueryVariables>
) {
  return Apollo.useLazyQuery<Types.MeQuery, Types.MeQueryVariables>(Operations.Me, baseOptions);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<Types.MeQuery, Types.MeQueryVariables>;
export function useUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<Types.UsersQuery, Types.UsersQueryVariables>
) {
  return Apollo.useQuery<Types.UsersQuery, Types.UsersQueryVariables>(
    Operations.Users,
    baseOptions
  );
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.UsersQuery, Types.UsersQueryVariables>
) {
  return Apollo.useLazyQuery<Types.UsersQuery, Types.UsersQueryVariables>(
    Operations.Users,
    baseOptions
  );
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<Types.UsersQuery, Types.UsersQueryVariables>;
