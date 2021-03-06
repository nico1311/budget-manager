import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import {
  Box,
  Button,
  Heading,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { UserContext } from '../context/UserContext';

import LoadingSpinner from '../components/LoadingSpinner';
import Balance from '../components/Dashboard/Balance';
import Transaction from '../components/Transactions/Transaction';

import ApiClient from '../services/ApiClient';

import type { Transaction as ITransaction } from '../types';

const Dashboard = () => {
  const [location, setLocation] = useLocation();
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    ApiClient.getTransactions({ limit: 10 }).then(({ data }: { data: { data: ITransaction[] } }) => {
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
        <Heading size="lg">
          Welcome,&nbsp;
          {user!.name}
        </Heading>
        <Spacer />
        <Balance balance={user!.balance} />
      </Flex>
      <Box>
        <Heading size="md">Latest transactions</Heading>
        {loading ? <LoadingSpinner />
          : transactions.length ? (
            <Box>
              {transactions.map((transaction) => (
                <Transaction
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
              <Flex justify="center" py="2">
                <Button onClick={() => setLocation('/transactions')}>View all</Button>
              </Flex>
            </Box>
          ) : (
            <Flex
              boxShadow="lg"
              margin="2"
              padding="3"
              direction="column"
              justify="center"
            >
              Your latest transactions will appear in this page once you create some.
              <Button my="2" colorScheme="blue" onClick={() => setLocation('/transactions')}>Go to transactions page</Button>
            </Flex>
          )}
      </Box>
    </Box>
  );
};

export default Dashboard;
