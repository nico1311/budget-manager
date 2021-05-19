import React, {useContext} from 'react';
import {
  Box,
  Container,
  Button,
  Stack,
  Heading,
  Text,
  Center,
  Flex,
  Spacer,
  useToast
} from '@chakra-ui/react';
import { UserContext } from '../context/UserContext';

import Balance from '../components/Dashboard/Balance';

const Dashboard = () => {
  const {user, setUser} = useContext(UserContext);
  console.log(user);

  return (
    <Flex>
      <Heading size="lg">Welcome, {user!.name}</Heading>
      <Spacer />
      <Flex mt="2" justify="right">
        <Balance balance={user!.balance} />
      </Flex>
    </Flex>
  );
}

export default Dashboard;
