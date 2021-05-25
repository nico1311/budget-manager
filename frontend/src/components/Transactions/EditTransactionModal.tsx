import React, { useRef } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';

import TransactionForm from './TransactionForm';

import type { Transaction as ITransaction } from '../../types';

const EditTransactionModal = ({isOpen, buttonLoading, transaction, handleCancel, handleConfirm }: {
  isOpen: boolean,
  buttonLoading: boolean,
  transaction: ITransaction | null,
  handleCancel: () => void
}) => {
  const pendingTransaction = transaction;
  const formRef = useRef(null);

  const handleConfirmButton = () => formRef.current.handleSubmit();

  const handleFormSubmission = (values, actions) => handleConfirm(values, actions);

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
  )
}

export default EditTransactionModal;