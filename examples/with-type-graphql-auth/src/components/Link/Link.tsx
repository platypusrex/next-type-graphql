import React, { PropsWithChildren } from 'react';
import NextLink from 'next/link';
import { LinkProps as NextLinkProps } from 'next/dist/client/link';
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';

export type NextChakraLinkProps = PropsWithChildren<NextLinkProps & Omit<ChakraLinkProps, 'as'>>;

export const Link: React.FC<NextChakraLinkProps> = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  children,
  ...chakraProps
}) => {
  return (
    <NextLink
      passHref={true}
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
    >
      <ChakraLink {...chakraProps}>{children}</ChakraLink>
    </NextLink>
  );
};
