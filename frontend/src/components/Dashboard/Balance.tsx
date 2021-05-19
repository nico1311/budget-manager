import React from 'react';
import {
  Box,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

const Balance = ({balance}: {balance: number}) => {
  return (
    <Box h="70px" ml="2" mr="2" padding="2" borderRadius="5"
      bg={useColorModeValue('blue.200', 'blue.800')}
    >
      <Heading size="md">Balance</Heading>
      <Text>$ {balance}</Text>
    </Box>
  );
}

export default Balance;
