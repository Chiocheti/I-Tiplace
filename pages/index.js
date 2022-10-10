import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
} from '@chakra-ui/react';
import NavbarLogOff from '../components/navbarLogOff';
import Head from 'next/head';

export default function Home() {

  return (
    <>
      <NavbarLogOff />
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Container maxW={'3x1'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            I-Tiplace <br />
            <Text as={'span'} color={'green.400'}>
              O seu Aplicativo de Serviços
            </Text>
          </Heading>
          <Text color={'gray.500'}>
          UM SISTEMA WEB PARA GERENCIAMENTO <br/> DE COMPRAS ONLINE
          </Text>
          <Text color={'gray.500'}>
          Entre, crie sua conta
          </Text>
        </Stack>
      </Container>
    </>
  );
}


