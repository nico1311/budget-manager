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

import { MdAdd } from 'react-icons/md';

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
    ApiClient.getTransactions({ limit: 10 }).then(({ data }: { data: { data: ITransaction[] } }) => {
      console.log(data);
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
  }, []);

  const handleAction = (action: 'edit' | 'delete', id: number) => {
    console.log('handleAction', { action, id });
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

  const handleCreateModalConfirm = (values, actions) => {
    setCreateModalLoading(true);
    console.log('create', values);
    ApiClient.createTransaction(values).then(({ data }) => {
      console.log(data);

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
      console.error(err);
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

    console.log('changed values: ', changedValues);

    ApiClient.editTransaction(pendingTransaction!.id, changedValues).then(({ data }) => {
      console.log(data);

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
      console.error(err);
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
            </Box>
          ) : (
            <Flex boxShadow="lg" margin="2" padding="4" justify="center">
              No transactions to show.
            </Flex>
          )}
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
    </Box>
  );
};

export default Transactions;
