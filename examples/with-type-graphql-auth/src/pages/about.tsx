import React from 'react';
import { useRouter } from 'next/router';
import { useUsersQuery } from '../hooks/generated';
import { Container, Heading, VStack } from '@chakra-ui/layout';
import { CircularProgress } from '@chakra-ui/progress';
import { Layout } from '../components/Layout';

const About: React.FC = () => {
  const { push } = useRouter();
  const { data, loading } = useUsersQuery({
    onCompleted: (data) => {
      if (!data.users) {
        push('/login');
      }
    },
  });

  if (loading) {
    return (
      <Container height="100vh">
        <VStack spacing={4} align="center" justify="center" h="100%">
          <CircularProgress />
          <Heading as="h1" size="l">
            Loading users...
          </Heading>
        </VStack>
      </Container>
    );
  }

  return (
    <Layout>
      <p>Welcome to the about page. Here's a list of new users:</p>
      {data?.users?.map((user) => (
        <p key={user.id}>
          <strong>{user.fullName}</strong>
        </p>
      ))}
    </Layout>
  );
};

export default About;
