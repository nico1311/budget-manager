import React, { useContext, useState } from 'react';
import { useLocation } from 'wouter';

import {
  Box,
  Container,
  Button,
  Stack,
  Heading,
  Text,
  Center,
  Flex,
  useToast
} from '@chakra-ui/react';

import { FormikHelpers } from 'formik';
import LoginForm, { FormValues as LoginFormValues } from '../components/Login/LoginForm';

import { UserContext } from '../context/UserContext';

import ApiClient from '../services/ApiClient';

const Login = () => {
  const [location, setLocation] = useLocation();
  const {user, setUser} = useContext(UserContext);
  const toast = useToast();

  const onLoginFormSubmit = (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
    console.log('login form values', values);
    const { email, password } = values;
    ApiClient.login({ email, password }).then((res) => {
      ApiClient.getUserInfo().then(({data}) => {
        setUser(data);
        setLocation('/dashboard');
      })
    }).catch((err) => {
      actions.setSubmitting(false);
      const errorMessage = err.response?.data?.errors[0]?.message ?
        err.response?.data?.errors[0]?.message : err.message;
      toast({
        title: 'Something went wrong',
        description: errorMessage,
        position: 'top-right',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    });
  }

  return (
    <Container maxWidth="24rem">
      <Stack spacing="16px">
        <Heading size="lg">Log in or register</Heading>
        <LoginForm onSubmit={onLoginFormSubmit} />
        <Box>
          <Text>Don't have an account?</Text>
          <Button isFullWidth mt={4}>Sign up</Button>
        </Box>
        </Stack>
    </Container>
  )
}

export default Login;
