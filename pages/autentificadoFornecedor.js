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

import NavbarLogOn from '../components/navbarLogOnFornecedor';
import { CheckCircleIcon } from '@chakra-ui/icons';
import UseAuth from '../hooks/useAuth'
import Router from "next/router";
import Axios from 'axios';
import React, { useState } from 'react';



export default function autentificadoFornecedor() {

    const { user, signin, signout } = UseAuth();

    var [idFornecedor, setIdFornecedor] = useState("Id preset")
    var [nomeFantasia, setNomeFantasia] = useState("Nome preset")
    var [cnpj, setCnpj] = useState("Cnpj preset")
    var [telefone, setTelefone] = useState("Telefone preset")
    var [hora_abre, setHora_abre] = useState("Hora Abre preset")
    var [hora_fecha, setHora_fecha] = useState("Hora Fecha preset")

    var usuario = null;

    console.log("Pagina de autentificação do Fornecedor: ");
    console.log(user);

    async function loadUser() {
        const options = {
            method: 'GET',
            url: `http://localhost:3000/api/usuario/cadastro/${user.email}/fornecedor`
        };
        await Axios.request(options).then(function (response) {
            console.log(response.data);
            usuario = response.data;
            console.log("Usuario: ");
            console.log(usuario);
        }).catch(function (error) {
            console.log("Erro do sistema: " + error);
        });

        await loadFornecedor(usuario.id);
    }

    async function loadFornecedor(id) {
        const options = {
            method: 'GET',
            url: `http://localhost:3000/api/fornecedor/${id}`
        };
        await Axios.request(options).then(function (response) {
            console.log(response.data);
            setIdFornecedor(response.data.idFornecedor);
            setNomeFantasia(response.data.nomeFantasia);
            setCnpj(response.data.cnpj);
            setTelefone(response.data.telefone);
            setHora_abre(response.data.hora_abre);
            setHora_fecha(response.data.hora_fecha);

            console.log("Fornecedor: ")
            console.log("Id: " + idFornecedor);
            console.log("Nome: " + nomeFantasia);
            console.log("CNPJ: " + cnpj);
            console.log("Telefone: " + telefone);
            console.log("Hora Abre: " + hora_abre);
            console.log("Hora Fecha: " + hora_abre);
        }).catch(function (error) {
            console.log("Erro do sistema: " + error);
        });
    }

    loadUser();

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
                                {nomeFantasia}
                            </Heading>
                            <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
                                Email: {user.email}
                            </Text>
                            <Text href={'#'} color={'blue.400'}>
                                Dados Cadastrados
                            </Text>
                                <Badge
                                    px={2}
                                    py={1}
                                    bg={useColorModeValue('gray.50', 'gray.800')}
                                    fontWeight={'400'}>
                                    Cnpj: {cnpj}
                                </Badge>
                                <Badge
                                    px={2}
                                    py={1}
                                    bg={useColorModeValue('gray.50', 'gray.800')}
                                    fontWeight={'400'}>
                                    Telefone: {telefone}
                                </Badge>
                                <Badge
                                    px={2}
                                    py={1}
                                    bg={useColorModeValue('gray.50', 'gray.800')}
                                    fontWeight={'400'}>
                                    Tipo de Conta: Fornecedor
                                </Badge>
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
                                <Button onClick={() => Router.push('/authFornecedor')}
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
                                    }}
                                >
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