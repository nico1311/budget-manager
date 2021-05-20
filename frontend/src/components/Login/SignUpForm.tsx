import React, { useState } from 'react';
import {
  FormControl,
  Input,
  FormErrorMessage,
  Button,
  Stack,
} from '@chakra-ui/react';

import { Formik, Form, Field } from 'formik';
import { FormikErrors, FormikHelpers, FormikProps, FieldInputProps } from 'formik';
import type { SignUpPayload } from '../../types';

const SignUpForm = ({ onSubmit }: {onSubmit: (values: SignUpPayload, actions: FormikHelpers<SignUpPayload>) => void}) => {
  const [signUpButtonDisabled, setSignUpButtonDisabled] = useState(true);

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }}
      validate={(values: SignUpPayload) => {
        const errors: FormikErrors<SignUpPayload> = {};
        if (!values.name.trim()) errors.name = 'Required';
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        if (!values.password) errors.password = 'Required';
        if (!values.password_confirmation) {
          errors.password_confirmation = 'Required';
        } else if (values.password_confirmation !== values.password) {
          errors.password_confirmation = 'Passwords must match';
        }
        setSignUpButtonDisabled((Object.keys(errors).length > 0));
        return errors;
      }}
      onSubmit={onSubmit}
    >
      {(props) => (
        <Form>
          <Stack spacing="16px">
            <Field name="name">
              {({field, form}: {field: FieldInputProps<any>, form: FormikProps<SignUpPayload>}) => (
                <FormControl isInvalid={Boolean(form.errors.name && form.touched.name)}>
                  <Input {...field} id="name" placeholder="Name" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="email" type="email">
              {({field, form}: {field: FieldInputProps<any>, form: FormikProps<SignUpPayload>}) => (
                <FormControl isInvalid={Boolean(form.errors.email && form.touched.email)}>
                  <Input {...field} id="email" placeholder="Email" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({field, form}: {field: FieldInputProps<any>, form: FormikProps<SignUpPayload>}) => (
                <FormControl isInvalid={Boolean(form.errors.password && form.touched.password)}>
                  <Input {...field} type="password" id="password" placeholder="Password" />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password_confirmation">
              {({field, form}: {field: FieldInputProps<any>, form: FormikProps<SignUpPayload>}) => (
                <FormControl isInvalid={Boolean(form.errors.password_confirmation && form.touched.password_confirmation)}>
                  <Input {...field} type="password" id="password_confirmation" placeholder="Password confirmation" />
                  <FormErrorMessage>{form.errors.password_confirmation}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Stack>
          <Button
            isFullWidth
            mt={4}
            colorScheme="teal"
            disabled={signUpButtonDisabled || props.isSubmitting}
            isLoading={props.isSubmitting}
            type="submit"
          >
            Sign up
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default SignUpForm;
