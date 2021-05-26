import React, { useContext, useState } from 'react';
import { useLocation } from 'wouter';
import {
  Box,
  Container,
  Button,
  Stack,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';

import { FormikHelpers } from 'formik';
import LoginForm from '../components/Login/LoginForm';
import SignUpForm from '../components/Login/SignUpForm';
import type { LoginPayload, SignUpPayload } from '../types';

import { UserContext } from '../context/UserContext';

import ApiClient from '../services/ApiClient';

const Login = () => {
  const [location, setLocation] = useLocation();
  const { user, setUser } = useContext(UserContext);
  const [switchedForm, setSwitchedForm] = useState(false);
  const toast = useToast();

  const errorToast = (err: any) => {
    let errorMessage: string = err.response?.data?.errors[0]?.message
      ? err.response?.data?.errors[0]?.message : err.message;
    if (errorMessage === 'unique validation failure') errorMessage = 'Email is already in use';
    toast({
      title: 'Something went wrong',
      description: errorMessage,
      position: 'top-right',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  const onLoginFormSubmit = (values: LoginPayload, actions: FormikHelpers<LoginPayload>) => {
    ApiClient.login(values).then(() => {
      ApiClient.getUserInfo().then(({ data }) => {
        setUser(data);
        setLocation('/dashboard');
      }).catch(errorToast);
    }).catch((err) => {
      actions.setSubmitting(false);
      errorToast(err);
    });
  };

  const onSignUpFormSubmit = (values: SignUpPayload, actions: FormikHelpers<SignUpPayload>) => {
    ApiClient.signUp(values).then(() => {
      ApiClient.getUserInfo().then(({ data }) => {
        setUser(data);
        setLocation('/dashboard');
      }).catch(errorToast);
    }).catch((err) => {
      actions.setSubmitting(false);
      errorToast(err);
    });
  };

  return (
    <Container maxWidth="24rem">
      <Stack spacing="16px">
        <Heading size="lg">Log in or register</Heading>
        {switchedForm
          ? <SignUpForm onSubmit={onSignUpFormSubmit} />
          : <LoginForm onSubmit={onLoginFormSubmit} />}
        <Box>
          <Text>{switchedForm ? 'Already a user?' : 'Don\'t have an account?'}</Text>
          <Button isFullWidth mt={4} onClick={() => setSwitchedForm(!switchedForm)}>
            {switchedForm ? 'Log in' : 'Sign up'}
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
