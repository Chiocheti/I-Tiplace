import {
  Spacer,
  Center,
  Box,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Wrap,
  WrapItem,
  Avatar,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  IconButton,
  ButtonGroup,
  MenuDivider,
  Flex,
  Heading,
  Stack,
  keyframes
} from '@chakra-ui/react'
import { MoonIcon , SunIcon , HamburgerIcon } from '@chakra-ui/icons';
import UseAuth from '../hooks/useAuth'
import Router from "next/router";

export default function navbarLogOnConsumidor() {
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

  function goHome() {
    Router.push('/');
  }

  return (
    <>
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Flex minWidth='max-content' alignItems='center' gap='2'>
          <Box p='2'>
            <Heading fontSize='40px' ml='100'>I-Tiplace</Heading>
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
            <Button colorScheme='green' onClick={() => Router.push("./")}> Home</Button>
          </ButtonGroup>
          <Wrap>
            <WrapItem>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <IconButton
                    marginRight='5'
                    icon={<HamburgerIcon />}
                    size={'2xl'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src="./imagens/fotousuario.jpg"
                    />
                  </Center>
                  <br />
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={() => { Router.push('./authConsumidor') }} >Abrir meu Perfil</MenuItem>
                  <MenuItem onClick={() => { Router.push('./enderecosDoConsumidor') }}>Endereços</MenuItem>
                  <MenuItem onClick={() => Routwer.push("./")} > Deslogar </MenuItem>
                </MenuList>
              </Menu>
            </WrapItem>
          </Wrap>
        </Flex>
      </Box>
    </>
  )
}