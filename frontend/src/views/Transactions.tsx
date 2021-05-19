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

const Transactions = () => {
  const {user, setUser} = useContext(UserContext);
  console.log(user);

  return (
    <Box>
      Not implemented yet
    </Box>
  );
}

export default Transactions;
