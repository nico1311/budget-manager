import React, { ReactNode, useContext } from 'react';
import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Text,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdAttachMoney, MdClose, MdMenu, MdPerson } from 'react-icons/md';
import { Link as WouterLink } from 'wouter';

import { UserContext } from '../context/UserContext';

const NavLink = ({ target, children }: { target: string, children: ReactNode }) => (
  <Link
    as={WouterLink}
    px={2}
    py={1}
    rounded="md"
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={target}>
    {children}
  </Link>
);

export default function Navbar({handleLogout}: {handleLogout: () => void}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(UserContext);

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {user ?
          <IconButton
            size="md"
            icon={isOpen ? <Icon as={MdClose} /> : <Icon as={MdMenu} />}
            aria-label="Open menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
        : null}
        <HStack spacing={8} alignItems="center">
          <Flex>
            <Icon w="24px" h="24px" as={MdAttachMoney} />
            <Text fontWeight="bold">BudgetManager</Text>
          </Flex>
          {user ? 
            <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
              <NavLink target="/dashboard">Dashboard</NavLink>
              <NavLink target="/transactions">Transactions</NavLink>
            </HStack>
          : null }
        </HStack>
        <Flex alignItems="center">
          {user ?
            <Menu>
              <MenuButton as={IconButton} aria-label="User menu" icon={<Icon as={MdPerson} />} />
              <MenuList>
                <Box paddingLeft="3">
                  <Text fontWeight="bold">{user.name}</Text>
                  <Text>{user.email}</Text>
                </Box>
                <MenuDivider />
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </MenuList>
            </Menu>
            : null}
        </Flex>
      </Flex>

      {user && isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            <NavLink target="/dashboard">Dashboard</NavLink>
            <NavLink target="/transactions">Transactions</NavLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
