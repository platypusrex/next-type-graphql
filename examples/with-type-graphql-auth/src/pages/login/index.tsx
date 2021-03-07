import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Box, Center, Heading, Stack } from '@chakra-ui/layout';
import { Button, Text } from '@chakra-ui/react';
import { Link } from '../../components/Link';
import { TextField } from '../../components/TextField';
import { useLoginMutation } from '../../hooks/generated';
import { useRouter } from 'next/router';

interface FormState {
  email: string;
  password: string;
}

const initialFormState: FormState = {
  email: '',
  password: '',
};

const Login: React.FC = () => {
  const { push } = useRouter();
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [login] = useLoginMutation({
    onCompleted: () => {
      push('/');
    },
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = formState;
    login({
      variables: {
        input: { email, password },
      },
    });
  };

  return (
    <Center h="100vh" color="black">
      <Box
        minW="375px"
        as="form"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md"
        p={8}
        onSubmit={handleSubmit}
      >
        <Heading as="h1" size="xl" mb={4}>
          Login
        </Heading>
        <Stack spacing={4}>
          <TextField
            label="Email address"
            name="email"
            id="email"
            type="email"
            isRequired
            helperText="We'll never share your email."
            onChange={handleOnChange}
          />
          <TextField
            label="Password"
            name="password"
            id="password"
            type="password"
            helperText="Minimum of 8 characters."
            isRequired
            onChange={handleOnChange}
          />
          <Box>
            <Button isFullWidth colorScheme="blue" isLoading={false} type="submit">
              Submit
            </Button>
            <Text>
              or <Link href="/register">Register now!</Link>
            </Text>
          </Box>
        </Stack>
      </Box>
    </Center>
  );
};

export default Login;
