import React from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

const DeleteTransactionDialog = ({
  isOpen, buttonLoading, handleCancel, handleConfirm,
}:{ isOpen: boolean, buttonLoading: boolean, handleCancel: () => void, handleConfirm: () => void }) => {
  const cancelRef = React.useRef(null);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={handleCancel}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete transaction
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure to delete this transaction?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleCancel}>Cancel</Button>
            <Button colorScheme="red" isLoading={buttonLoading} disabled={buttonLoading} onClick={handleConfirm} ml={3}>Delete</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteTransactionDialog;
