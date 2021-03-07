import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { Layout } from '../components/Layout';
import { useMeQuery } from '../hooks/generated';
import { initializeApollo } from '../apollo';
import { Me } from '../graphql';

const Index: React.FC = () => {
  const { data } = useMeQuery();

  return (
    <Layout>
      <div>
        {data && (
          <p>
            Welcome to the next-type-graphql auth example <strong>{data.me?.fullName}!</strong>
          </p>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: Me,
    context: {
      headers: {
        Cookie: ctx.req.headers.cookie,
      },
    },
  });

  if (!data.me) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default Index;
