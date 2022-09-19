import {
    Badge,
    Button,
    Heading,
    Image,
    Text,
    useColorModeValue,
    Flex,
    Box,
    Center,
    Stack,
} from '@chakra-ui/react';

import NavbarLogOn from '../components/navbarLogOn';
import { CheckCircleIcon } from '@chakra-ui/icons';
import UseAuth from '../hooks/useAuth'
import Axios from 'axios';

const { user, signin, signout } = UseAuth();
console.log(user);

export default function autentificado() {
    const options = {
        method: 'GET',
        url: `http://localhost:3000/api/usuario/cadastro/${user.email}/${cadastro}`
    };
    Axios.request(options).then(function (response) {
        console.log(response.data);
        console.log("Esse email ja esta em uso !!!");
        toast({
            title: 'Email Ja em uso',
            description: "Tente cadastrar com outro email",
            status: 'error',
            duration: 9000,
            isClosable: true,
        })
    }).catch(function (error) {
        toast({
            title: 'Conta Criada com Sucesso',
            description: `Bem Vindo ${nomeFantasia} vamos vender!!!`,
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
        registerFornecedor();
    });

    return (
        <>
            <NavbarLogOn />
            <Box textAlign="center" py={10} px={6}>
                <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
                <Heading as="h2" size="xl" mt={6} mb={2}>
                    Cadastrado com Sucesso
                </Heading>
                <Text color={'gray.500'}>
                    Seja bem vindo ao nosso site Estamos felizes com sua presença
                    esperamos poder te atender e te satisfazer
                    ENTÃO Respire fundo e sinta-se em casa
                </Text>
            </Box>
            <Box>
                <Center py={6}>
                    <Stack
                        borderWidth="1px"
                        borderRadius="lg"
                        w={{ sm: '100%', md: '540px' }}
                        height={{ sm: '476px', md: '20rem' }}
                        direction={{ base: 'column', md: 'row' }}
                        bg={useColorModeValue('white', 'gray.900')}
                        boxShadow={'2xl'}
                        padding={4}>
                        <Flex flex={1} bg="blue.200">
                            <Image
                                objectFit="cover"
                                boxSize="100%"
                                src={
                                    user.photoURL
                                }
                            />
                        </Flex>
                        <Stack
                            flex={1}
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            p={1}
                            pt={2}>
                            <Heading fontSize={'2xl'} fontFamily={'body'}>
                                
                            </Heading>
                            <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
                                @email da pessoa
                            </Text>
                            <Text
                                textAlign={'center'}
                                color={useColorModeValue('gray.700', 'gray.400')}
                                px={3}>
                                Endereço, Rua, bairro,cidade e Estado. CEP
                                <Text href={'#'} color={'blue.400'}>
                                    Dados Cadastrados
                                </Text>
                            </Text>
                            <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                                <Badge
                                    px={2}
                                    py={1}
                                    bg={useColorModeValue('gray.50', 'gray.800')}
                                    fontWeight={'400'}>
                                    #CPF
                                </Badge>
                                <Badge
                                    px={2}
                                    py={1}
                                    bg={useColorModeValue('gray.50', 'gray.800')}
                                    fontWeight={'400'}>
                                    #Telefone
                                </Badge>
                                <Badge
                                    px={2}
                                    py={1}
                                    bg={useColorModeValue('gray.50', 'gray.800')}
                                    fontWeight={'400'}>
                                    #Cons ou Forn
                                </Badge>
                            </Stack>

                            <Stack
                                width={'100%'}
                                mt={'2rem'}
                                direction={'row'}
                                padding={2}
                                justifyContent={'space-between'}
                                alignItems={'center'}>
                                <Button
                                    flex={1}
                                    fontSize={'sm'}
                                    rounded={'full'}
                                    _focus={{
                                        bg: 'gray.200',
                                    }}>
                                    Home
                                </Button>
                                <Button
                                    flex={1}
                                    fontSize={'sm'}
                                    rounded={'full'}
                                    bg={'blue.400'}
                                    color={'white'}
                                    boxShadow={
                                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                                    }
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    _focus={{
                                        bg: 'blue.500',
                                    }}>
                                    Meu Perfil
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Center>

            </Box>
        </>
    )
}