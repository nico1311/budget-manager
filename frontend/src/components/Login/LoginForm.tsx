import React, { useState } from 'react';
import {
  FormControl,
  Input,
  FormErrorMessage,
  Button,
  Stack,
} from '@chakra-ui/react';

import {
  Formik, Form, Field, FormikErrors, FormikHelpers, FormikProps, FieldInputProps,
} from 'formik';

import type { LoginPayload } from '../../types';

const LoginForm = ({ onSubmit }: {
  onSubmit: (values: LoginPayload, actions: FormikHelpers<LoginPayload>) => void
}) => {
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={(values: LoginPayload) => {
        const errors: FormikErrors<LoginPayload> = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        if (!values.password) errors.password = 'Required';
        setLoginButtonDisabled((Object.keys(errors).length > 0));
        return errors;
      }}
      onSubmit={onSubmit}
    >
      {(props: FormikProps<LoginPayload>) => (
        <Form>
          <Stack spacing="16px">
            <Field name="email" type="email">
              {({ field, form }: { field: FieldInputProps<any>, form: FormikProps<LoginPayload> }) => (
                <FormControl isInvalid={Boolean(form.errors.email && form.touched.email)}>
                  <Input {...field} id="email" placeholder="Email" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }: { field: FieldInputProps<any>, form: FormikProps<LoginPayload> }) => (
                <FormControl isInvalid={Boolean(form.errors.password && form.touched.password)}>
                  <Input {...field} type="password" id="password" placeholder="Password" />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Stack>
          <Button
            isFullWidth
            mt={4}
            colorScheme="teal"
            disabled={loginButtonDisabled || props.isSubmitting}
            isLoading={props.isSubmitting}
            type="submit"
          >
            Log in
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export type { LoginPayload };
export default LoginForm;
