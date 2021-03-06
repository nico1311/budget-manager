import React, { useRef } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import type { FormikHelpers, FormikProps } from 'formik';
import TransactionForm from './TransactionForm';

import type { Transaction as ITransaction } from '../../types';

const CreateTransactionModal = ({
  isOpen, buttonLoading, handleCancel, handleConfirm,
}: {
  isOpen: boolean,
  buttonLoading: boolean,
  handleCancel: () => void,
  handleConfirm: (values: Partial<ITransaction>, actions: FormikHelpers<Partial<ITransaction>>) => void
}) => {
  const formRef = useRef<FormikProps<Partial<ITransaction>>>() as React.MutableRefObject<FormikProps<Partial<ITransaction>>>;

  const initialTransactionValues: Partial<ITransaction> = {
    created_at: new Date().toISOString(),
    type: 1,
    category: 0,
    amount: 0,
    comment: '',
  };

  const handleConfirmButton = () => formRef.current!.handleSubmit();

  const handleFormSubmission = (
    values: Partial<ITransaction>,
    actions: FormikHelpers<Partial<ITransaction>>,
  ) => handleConfirm(values, actions);

  return (
    <Modal isOpen={isOpen} onClose={handleCancel}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TransactionForm
            mode="create"
            formikRef={formRef}
            transaction={initialTransactionValues}
            handleSubmission={handleFormSubmission}
          />
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={handleCancel}>Cancel</Button>
          <Button
            form="transaction"
            type="submit"
            colorScheme="blue"
            onClick={handleConfirmButton}
            isLoading={buttonLoading}
            disabled={buttonLoading}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateTransactionModal;
