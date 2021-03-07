import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Box, Center, Heading, Stack } from '@chakra-ui/layout';
import { Button, Text } from '@chakra-ui/react';
import { Link } from '../../components/Link';
import { TextField } from '../../components/TextField';
import { useRegisterMutation } from '../../hooks/generated';
import { useRouter } from 'next/router';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
const initialState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const Register: React.FC = () => {
  const { push } = useRouter();
  const [formState, setFormState] = useState<FormState>(initialState);
  const [register] = useRegisterMutation({
    onCompleted: () => {
      push('/');
    },
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = formState;
    register({
      variables: {
        input: { firstName, lastName, email, password },
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
          Register
        </Heading>
        <Stack spacing={4}>
          <TextField
            label="First name"
            name="firstName"
            id="firstName"
            type="text"
            isRequired
            onChange={handleOnChange}
          />
          <TextField
            label="Last name"
            name="lastName"
            id="lastName"
            type="text"
            isRequired
            onChange={handleOnChange}
          />
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
              or <Link href="/login">Login now!</Link>
            </Text>
          </Box>
        </Stack>
      </Box>
    </Center>
  );
};

export default Register;
