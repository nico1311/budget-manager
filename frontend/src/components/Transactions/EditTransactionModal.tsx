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

const EditTransactionModal = ({
  isOpen, buttonLoading, transaction, handleCancel, handleConfirm,
}: {
  isOpen: boolean,
  buttonLoading: boolean,
  transaction: ITransaction,
  handleCancel: () => void,
  handleConfirm: (values: Partial<ITransaction>, actions: FormikHelpers<Partial<ITransaction>>) => void
}) => {
  const pendingTransaction = transaction;
  const formRef = useRef<FormikProps<Partial<ITransaction>>>() as React.MutableRefObject<FormikProps<Partial<ITransaction>>>;

  const handleConfirmButton = () => formRef!.current!.handleSubmit();

  const handleFormSubmission = (
    values: Partial<ITransaction>,
    actions: FormikHelpers<Partial<ITransaction>>,
  ) => handleConfirm(values, actions);

  return (
    <Modal isOpen={isOpen} onClose={handleCancel}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TransactionForm
            formikRef={formRef}
            transaction={pendingTransaction}
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

export default EditTransactionModal;
