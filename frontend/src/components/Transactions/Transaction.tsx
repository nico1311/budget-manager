import React from 'react';
import {
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Square
} from '@chakra-ui/react';
import {
  MdAdd,
  MdDelete,
  MdExpandMore,
  MdFlight,
  MdLocalOffer,
  MdLocalAtm,
  MdModeEdit,
  MdMovie,
  MdRemove,
  MdRestaurant,
  MdShoppingCart,
  MdTrain
} from 'react-icons/md';
import { format } from 'date-fns';

import type { Transaction as ITransaction } from '../../types';

const Transaction = ({ transaction, handleAction }: {
  transaction: ITransaction,
  handleAction?: (action: 'edit' | 'delete', id: ITransaction['id']) => void
}) => {

  const CategoryIcon = (() => {
    switch (transaction.category) {
      case 1:
        return MdShoppingCart
      case 2:
        return MdRestaurant
      case 3:
        return MdTrain
      case 4:
        return MdLocalAtm
      case 5:
        return MdMovie
      case 6:
        return MdFlight
      default:
        return MdLocalOffer
    }
  })();

  const categoryNames = {
    0: 'No category',
    1: 'Shopping',
    2: 'Food and Restaurants',
    3: 'Transport',
    4: 'Expenses and Services',
    5: 'Entertainment',
    6: 'Travel'
  }

  return (
    <Flex
      border="1px"
      borderColor="gray.200"
      borderRadius="5"
      boxShadow="lg"
      padding="2"
      marginTop="2"
      marginBottom="2"
      alignItems="center"
    >
      <Square size="36px" mr="3" bg={transaction.type === 2 ? 'red.500': 'green.500'} borderRadius="5" color="white">
        <Icon
          w="32px"
          h="32px"
          as={transaction.type === 2 ? MdRemove : MdAdd}
        />
        </Square>
      <Flex direction="column" wrap="wrap" maxW="50%">
        <Box fontWeight="bold">{transaction.comment}</Box>
        {(transaction.type === 2) &&
          <Flex alignItems="center" fontSize="sm">
            <Icon w="16px" h="16px" mr="1" as={CategoryIcon} />
            {categoryNames[transaction.category!]}
          </Flex>
        }
      </Flex>
      <Spacer />
      <Box>
        <Box color={transaction.type === 2 ? 'red': 'green'}>
          $&nbsp;{transaction.amount.toLocaleString()}
        </Box>
        <Box fontSize="sm">
          {format(new Date(transaction.created_at), 'MM/dd/yyyy hh:mm aa')}
        </Box>
      </Box>
      <Box ml="2">
        {handleAction &&
          <Menu>
            <MenuButton as={Button} rightIcon={<MdExpandMore />}>Actions</MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleAction('edit', transaction.id)} icon={<Icon w="20px" h="20px" as={MdModeEdit} />}>Edit</MenuItem>
              <MenuItem onClick={() => handleAction('delete', transaction.id)} icon={<Icon w="20px" h="20px" as={MdDelete} />}>Delete</MenuItem>
            </MenuList>
          </Menu>
        }
      </Box>
    </Flex>
  );
}

export default Transaction;
