import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

const LoadingSpinner = () => (
  <Flex justify="center">
    <Spinner size="xl" color="blue.600" />
  </Flex>
);

export default LoadingSpinner;
