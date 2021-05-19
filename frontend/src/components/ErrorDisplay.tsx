import React from 'react';
import {
  Box,
  Button,
  Center,
  Circle,
  Flex,
  Heading,
  Icon,
  Text,
  VStack
} from '@chakra-ui/react';
import { MdError } from 'react-icons/md';

const ErrorDisplay = ({message}: {message: string}) => (
  <Flex justify="center">
    <Box maxW="360px" padding="4"  borderRadius="5" boxShadow="md">
      <Center>
        <VStack>
          <Circle size="52px">
            <Icon w="48px" h="48px" color="red.500" as={MdError} />
          </Circle>
          <Heading size="md">Something went wrong</Heading>
          <Text>({message})</Text>
          <Text>Check your connection and try to reload the page.</Text>
          <Button colorScheme="blue" onClick={() => window.location.reload()}>Reload</Button>
        </VStack>
      </Center>
    </Box>
  </Flex>
)

export default ErrorDisplay;
