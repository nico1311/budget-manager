import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Container,
  Button,
  Stack,
  Heading,
  Icon,
  Text,
  Center,
  Flex,
  Spacer,
  useToast
} from '@chakra-ui/react';

import { MdAdd } from 'react-icons/md';

import { UserContext } from '../context/UserContext';

import LoadingSpinner from '../components/LoadingSpinner';
import Transaction from '../components/Transactions/Transaction';

import ApiClient from '../services/ApiClient';

import type { Transaction as ITransaction } from '../types';

const Transactions = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  console.log(user);

  useEffect(() => {
    ApiClient.getTransactions({limit: 10}).then(({ data }: {data: {data: ITransaction[]}}) => {
      console.log(data);
      setTransactions(data.data);
      console.log(transactions);
    }).catch((err) => {
      if (err.response?.status !== 404) {
        console.error(err);
      }
    }).finally(() => setLoading(false));
  }, []);

  return (
    <Box>
      <Flex>
        <Heading size="lg">Transactions</Heading>
        <Spacer />
        <Button
          colorScheme="blue"
          leftIcon={<Icon w="24px" h="24px" as={MdAdd} />}
          onClick={() => alert('not implemented')}
        >
          Add
        </Button>
      </Flex>
      <Box>
        {loading ? <LoadingSpinner /> :
          transactions.length ? <Box>
            {transactions.map((transaction) => (
              <Transaction
                key={transaction.id}
                transaction={transaction}
                handleEdit={(id) => console.log('handleEdit', id)}
                handleDelete={(id) => console.log('handleDelete', id)}
              />
            ))}
          </Box> :
          <Flex
            boxShadow="lg"
            margin="2"
            padding="4"
            justify="center"
          >
            No transactions to show.
          </Flex>
        }
      </Box>
    </Box>
  );
}

export default Transactions;
