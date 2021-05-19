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

interface FormValues {
  email: string,
  password: string
}

const LoginForm = ({ onSubmit }: {onSubmit: (values: FormValues, actions: FormikHelpers<FormValues>) => void}) => {
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validate={(values: FormValues) => {
        const errors: FormikErrors<FormValues> = {};
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
      {(props) => (
        <Form>
          <Stack spacing="16px">
            <Field name="email" type="email">
              {({field, form}: {field: FieldInputProps<FormValues>, form: FormikProps<FormValues>}) => (
                <FormControl isInvalid={form.errors.email && form.touched.email}>
                  <Input {...field} id="email" placeholder="Email" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({field, form}: {field: FieldInputProps<any>, form: FormikProps<FormValues>}) => (
                <FormControl isInvalid={form.errors.password && form.touched.password}>
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
            disabled={loginButtonDisabled}
            isLoading={props.isSubmitting}
            type="submit"
          >
            Log in
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export type { FormValues };
export default LoginForm;
