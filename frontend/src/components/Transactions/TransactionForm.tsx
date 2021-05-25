import React, { useState } from 'react';
import { Formik, FormikErrors, FormikHelpers, Form, Field } from 'formik';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Stack,
  Select
} from '@chakra-ui/react';

import DatePicker from '../DatePicker';
import { Transaction as ITransaction } from '../../types';

const TransactionForm = ({mode = 'edit', transaction, formikRef, handleSubmission}: {
  mode: 'create' | 'edit',
  transaction: Partial<ITransaction>,
  formikRef: React.RefObject<HTMLFormElement>,
  handleSubmission: (values: Partial<ITransaction>, actions: FormikHelpers<Partial<ITransaction>>) => void
}) => {
  const [transactionType, setTransactionType] = React.useState(String(transaction.type));
  const [transactionCategory, setTransactionCategory] = React.useState(String(transaction.category));
  const [transactionDate, setTransactionDate] = useState<Date>(new Date(transaction.created_at as string));

  const onDatePickerChange = (value: Date) => setTransactionDate(value);

  const onCategorySelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTransactionCategory(event.target.value);
  }

  const categoryNames = {
    0: 'No category',
    1: 'Shopping',
    2: 'Food and Restaurants',
    3: 'Transport',
    4: 'Expenses and Services',
    5: 'Entertainment',
    6: 'Travel'
  }

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        created_at: transaction.created_at,
        type: transaction.type,
        category: transaction.category,
        amount: transaction.amount,
        comment: transaction.comment
      }}
      validate={(values) => {
        const errors: FormikErrors<Partial<Itransaction>> = {};
        if (typeof values.amount === 'undefined' || String(values.amount).length < 1) {
          errors.amount = 'Required';
        } else if (values.amount <= 0) {
          errors.amount = 'Must be greater than 0';
        }
        if (!values.comment) errors.comment = 'Required';
        return errors;
      }}
      onSubmit={(values, actions) => {
        values.type = Number(transactionType);
        values.category = Number(transactionCategory);
        values.created_at = transactionDate.toISOString();
        handleSubmission(values, actions);
      }}
    >
      {(props) => (
        <Form>
          {mode === 'create' &&
            <Field name="type">
              {({field, form}) => (
                <FormControl mb="3" isInvalid={form.errors.type && form.touched.type}>
                  <FormLabel htmlFor="type">Type</FormLabel>
                  <RadioGroup name="type" onChange={setTransactionType} value={transactionType}>
                    <Stack direction="row">
                      <Radio value="1">Income</Radio>
                      <Radio value="2">Outcome</Radio>
                    </Stack>
                  </RadioGroup>
                  <FormErrorMessage>{form.errors.type}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          }
          <Field name="created_at">
            {({field, form}) => (
              <FormControl mb="2">
                <FormLabel htmlFor="created_at">Date and time</FormLabel>
                <DatePicker
                  id="created_at"
                  selectedDate={transactionDate}
                  onChange={onDatePickerChange}
                  showPopperArrow={true}
                />
              </FormControl>
            )}
          </Field>
          {transactionType === '2' &&
            <Field name="category">
              {({field, form}) => (
                <FormControl mb="2" isInvalid={form.errors.category && form.touched.category}>
                  <FormLabel htmlFor="category">Category</FormLabel>
                  <Select id="category" name="category" value={transactionCategory} onChange={onCategorySelectChange}>
                    {Object.entries(categoryNames).map(([key, name]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </Select>
                  <FormErrorMessage>{form.errors.category}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          }
          <Field name="amount">
            {({field, form}) => (
              <FormControl mb="2" isInvalid={form.errors.amount && form.touched.amount}>
                <FormLabel htmlFor="amount">Amount</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children="$"
                  />
                  <Input{...field} type="number" id="amount" placeholder="Amount" />
                </InputGroup>
                <FormErrorMessage>{form.errors.amount}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="comment">
            {({field, form}) => (
              <FormControl isInvalid={form.errors.comment && form.touched.comment}>
                <FormLabel htmlFor="comment">Comment</FormLabel>
                <Input {...field} id="comment" placeholder="Comment" />
                <FormErrorMessage>{form.errors.comment}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
}

export default TransactionForm;
