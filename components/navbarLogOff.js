import {
  Flex,
  Spacer,
  Box,
  Link,
  Text,
  Heading,
  ButtonGroup,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Center,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,

} from '@chakra-ui/react'

import { BsFillBagCheckFill, PhoneIcon, AddIcon, WarningIcon } from "react-icons/bs";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FcGoogle } from 'react-icons/fc';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import UseAuth from '../hooks/useAuth'
import Router from "next/router";

export default function navbarLogOff() {
  const NavLink = ({ children }) => (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}>
      {children}
    </Link>
  );
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, signin, signout } = UseAuth();
  const toast = useToast()

  function goHome() {
    Router.push('/');
  }

  async function authFornecedor() {
    await signin();
    Router.push('/authFornecedor');
  }
  async function authConsumidor() {
    await signin();
    Router.push('/authConsumidor');
  }
  async function cadastrar() {
    await signin();
    Router.push('/cadastro');
  }
  return (
    <>
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Flex minWidth='max-content' alignItems='center' gap='2'>
          <Box p='2'>
            <Heading fontSize='40px' ml='50'>I-Tiplace</Heading>
          </Box>
          <Spacer />

          <ButtonGroup gap='2'>
            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={7}>
                <Button onClick={toggleColorMode}>
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
              </Stack>
            </Flex>
            <Button colorScheme='green' onClick={() => goHome()}> Home</Button>
          </ButtonGroup>
          <Menu>
            <MenuButton as={Button} mr='30'>
              Login/Register
            </MenuButton>
            <MenuList>
              <Stack>
                <Button onClick={() => { cadastrar() }}
                  w={'full'}

                  variant={'outline'}
                  leftIcon={<FcGoogle />}>
                  <Center>
                    <Text>Sign in with Google</Text>
                  </Center>
                </Button>
                <Button onClick={() => { authFornecedor() }}
                  w={'full'}
                  variant={'outline'}
                  leftIcon={<BsFillBagCheckFill />}>
                  Login como Fornecedor
                </Button>
                <Button onClick={() => { authConsumidor() }}
                  w={'full'}
                  variant={'outline'}
                  leftIcon={<BsFillCartCheckFill />}>
                  Login como Consumidor </Button>
              </Stack>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    </>
  )
}