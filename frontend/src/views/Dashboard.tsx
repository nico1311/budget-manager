import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import {
  Box,
  Container,
  Button,
  Link,
  Heading,
  Center,
  Flex,
  Spacer,
  useToast
} from '@chakra-ui/react';
import { UserContext } from '../context/UserContext';

import LoadingSpinner from '../components/LoadingSpinner';
import Balance from '../components/Dashboard/Balance';
import Transaction from '../components/Transactions/Transaction';

import ApiClient from '../services/ApiClient';

import type { Transaction as ITransaction } from '../types';

const Dashboard = () => {
  const [location, setLocation] = useLocation();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    ApiClient.getTransactions({limit: 10}).then(({ data }: {data: {data: ITransaction[]}}) => {
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

  return (
    <Box>
      <Flex>
        <Heading size="lg">Welcome, {user!.name}</Heading>
        <Spacer />
        <Balance balance={user!.balance} />
      </Flex>
      <Box>
        <Heading size="md">Latest transactions</Heading>
        {loading ? <LoadingSpinner /> :
          transactions.length ? <Box>
            {transactions.map((transaction) => (
              <Transaction
                key={transaction.id}
                transaction={transaction}
              />
            ))}
            <Flex justify="center" py="2">
              <Button onClick={() => setLocation('/transactions')}>View all</Button>
            </Flex>
          </Box> :
          <Flex
            boxShadow="lg"
            margin="2"
            padding="4"
            justify="center"
          >
            You have no transactions. Go to <Link px="1" color="teal.500" onClick={() => setLocation('/transactions')}>Transactions</Link> to create some.
          </Flex>
        }
      </Box>
    </Box>
  );
}

export default Dashboard;
