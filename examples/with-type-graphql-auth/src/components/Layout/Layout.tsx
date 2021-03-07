import React, { ReactNode } from 'react';
import Head from 'next/head';
import { Container, Flex, Heading, HStack } from '@chakra-ui/react';
import { Link } from '../Link';

type Props = {
  children?: ReactNode;
  title?: string;
};

export const Layout: React.FC<Props> = ({ children, title = 'This is the default title' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Container maxWidth="1200px">
      <header>
        <Flex py={4} justifyContent="space-between" alignItems="center" mb={8}>
          <Flex justifyContent="space-between" alignItems="center">
            <nav>
              <HStack spacing={12}>
                <Link href="/" display="flex" alignItems="center" justifyContent="center">
                  <Heading size="lg">next-type-graphql</Heading>
                </Link>
                <Link href="/" fontWeight="bold">
                  home
                </Link>
                <Link href="/about" fontWeight="bold">
                  about
                </Link>
              </HStack>
            </nav>
          </Flex>
        </Flex>
      </header>
      {children}
    </Container>
  </div>
);
