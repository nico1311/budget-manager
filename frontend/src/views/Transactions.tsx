import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import {
  Box,
  Button,
  Heading,
  Icon,
  Flex,
  Spacer,
  useToast,
} from '@chakra-ui/react';
import {
  Paginator,
  Container,
  Previous,
  Next,
  PageGroup,
  usePaginator,
} from 'chakra-paginator';

import { MdAdd } from 'react-icons/md';

import type { FormikHelpers } from 'formik';
import { UserContext } from '../context/UserContext';

import LoadingSpinner from '../components/LoadingSpinner';
import Transaction from '../components/Transactions/Transaction';
import CreateTransactionModal from '../components/Transactions/CreateTransactionModal';
import EditTransactionModal from '../components/Transactions/EditTransactionModal';
import DeleteTransactionDialog from '../components/Transactions/DeleteTransactionDialog';

import ApiClient from '../services/ApiClient';

import type { Transaction as ITransaction } from '../types';

const Transactions = () => {
  const [location, setLocation] = useLocation();
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [pendingTransaction, setPendingTransaction] = useState<ITransaction | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // create
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createModalLoading, setCreateModalLoading] = useState(false);

  // edit
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editModalLoading, setEditModalLoading] = useState(false);

  // delete
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogLoading, setDeleteDialogLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    ApiClient.getTransactions({
      limit: 10,
      page,
    }).then(({ data }: { data: { data: ITransaction[], meta: { first_page: number, last_page: number } } }) => {
      console.log(data);
      setTotalPages(data.meta.last_page);
      setTransactions(data.data);
    }).catch((err) => {
      if (err.response?.status === 401) {
        setLocation('/login');
        setUser(null);
      }
      if (err.response?.status !== 404) {
        console.error(err);
      }
    }).finally(() => setLoading(false));
  }, [page, totalPages]);

  const handleAction = (action: 'edit' | 'delete', id: number) => {
    const transaction = transactions.find((item) => item.id === id) as ITransaction;
    setPendingTransaction(transaction);
    switch (action) {
      case 'edit':
        setEditModalOpen(true);
        break;
      case 'delete':
        setDeleteDialogOpen(true);
        break;
      default:
        console.error(`Action ${action} not implemented`);
    }
  };

  const handleCreateModalCancel = () => {
    setCreateModalOpen(false);
  };

  const handleCreateModalConfirm = (values: Partial<ITransaction>, actions: FormikHelpers<Partial<ITransaction>>) => {
    setCreateModalLoading(true);
    ApiClient.createTransaction(values).then(({ data }) => {
      toast({
        description: 'Transaction created successfully',
        position: 'top-right',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // update balance in user context
      setUser({
        ...user,
        balance: data.balance,
      });

      // add new transaction to state
      setTransactions([
        data.transaction,
        ...transactions,
      ]);

      setCreateModalOpen(false);
    }).catch((err) => {
      toast({
        title: 'Error saving transaction',
        description: err.message,
        position: 'top-right',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }).finally(() => {
      actions.setSubmitting(false);
      setCreateModalLoading(false);
    });
  };

  const handleEditModalCancel = () => {
    setEditModalOpen(false);
    setPendingTransaction(null);
  };

  const handleEditModalConfirm = (values, actions) => {
    setEditModalLoading(true);
    const changedValues: Partial<ITransaction> = Object.keys(values).reduce((obj, key) => {
      if ((pendingTransaction as ITransaction)[key] === values[key]) return obj;
      return {
        ...obj,
        [key]: values[key],
      };
    }, {});

    ApiClient.editTransaction(pendingTransaction!.id, changedValues).then(({ data }) => {
      toast({
        description: 'Transaction updated successfully',
        position: 'top-right',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // update balance in user context
      setUser({
        ...user,
        balance: data.balance,
      });

      // update transaction in state with received value
      setTransactions(transactions.map((item) => (item.id === data.transaction.id ? data.transaction : item)));

      setEditModalOpen(false);
      setPendingTransaction(null);
    }).catch((err) => {
      const errorMessage: string = err.response?.status === 404 ? 'This transaction does not exist' : err.message;
      toast({
        title: 'Error saving transaction',
        description: errorMessage,
        position: 'top-right',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }).finally(() => {
      actions.setSubmitting(false);
      setEditModalLoading(false);
    });
  };

  const handleDeleteDialogCancel = () => {
    setDeleteDialogOpen(false);
    setPendingTransaction(null);
  };

  const handleDeleteDialogConfirm = () => {
    setDeleteDialogLoading(true);
    ApiClient.deleteTransaction(pendingTransaction!.id).then(({ data }) => {
      toast({
        description: 'Transaction deleted successfully',
        position: 'top-right',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // update balance in user context
      setUser({
        ...user,
        balance: data.balance,
      });

      // delete transaction from state
      setTransactions(transactions.filter((item) => item.id !== pendingTransaction!.id));
    }).catch((err) => {
      const errorMessage = err.response?.status === 404 ? 'Transaction already deleted' : err.message;
      toast({
        title: 'Something went wrong',
        description: errorMessage,
        position: 'top-right',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }).finally(() => {
      setDeleteDialogOpen(false);
      setDeleteDialogLoading(false);
      setPendingTransaction(null);
    });
  };

  return (
    <Box>
      <Flex>
        <Heading size="lg">Transactions</Heading>
        <Spacer />
        <Button
          colorScheme="blue"
          leftIcon={<Icon w="24px" h="24px" as={MdAdd} />}
          onClick={() => setCreateModalOpen(true)}
        >
          Add
        </Button>
      </Flex>
      <Box>
        {loading ? <LoadingSpinner />
          : transactions.length ? (
            <Box my="3">
              {transactions.map((transaction) => (
                <Transaction
                  key={transaction.id}
                  transaction={transaction}
                  handleAction={handleAction}
                />
              ))}

              <Paginator
                currentPage={page}
                pagesQuantity={totalPages}
                onPageChange={setPage}
                normalStyles={{
                  w: 8,
                  fontSize: 'sm',
                }}
                activeStyles={{
                  w: 8,
                  bg: 'blue.300',
                  fontSize: 'sm',
                  _hover: {
                    bg: 'blue.400',
                  },
                }}
              >
                <Container align="center" justify="space-between" w="full" p={4}>
                  <Previous>Previous</Previous>
                  <PageGroup isInline align="center" />
                  <Next>Next</Next>
                </Container>
              </Paginator>
            </Box>
          ) : (
            <Flex boxShadow="lg" margin="2" padding="4" justify="center">
              No transactions to show.
            </Flex>
          )}
      </Box>
      <CreateTransactionModal
        isOpen={createModalOpen}
        buttonLoading={createModalLoading}
        handleCancel={handleCreateModalCancel}
        handleConfirm={handleCreateModalConfirm}
      />
      <EditTransactionModal
        isOpen={editModalOpen}
        buttonLoading={editModalLoading}
        transaction={pendingTransaction}
        handleCancel={handleEditModalCancel}
        handleConfirm={handleEditModalConfirm}
      />
      <DeleteTransactionDialog
        isOpen={deleteDialogOpen}
        buttonLoading={deleteDialogLoading}
        handleCancel={handleDeleteDialogCancel}
        handleConfirm={handleDeleteDialogConfirm}
      />
    </Box>
  );
};

export default Transactions;
