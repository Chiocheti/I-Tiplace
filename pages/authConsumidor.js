import {
    Button,
    Flex,
    Tag,
    Input,
    Avatar,
    Stack,
    IconButton,
    ButtonGroup,
    Heading,
    Center,
    useEditableControls,
    Image,
    keyframes,
    Divider,
} from '@chakra-ui/react';

import UseAuth from '../hooks/useAuth'
import NavbarLogOn from '../components/navbarLogOnConsumidor';
import { AspectRatio, useToast } from '@chakra-ui/react'
import Axios from 'axios';
import Router from "next/router";
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { FcPhoneAndroid, FcOk, FcApprove } from "react-icons/fc";

export default function autentificado() {

    const { user, signin, signout } = UseAuth();
    console.log(user);

    const toast = useToast()

    const options = {
        method: 'GET',
        url: `http://localhost:3000/api/usuario/cadastro/${user.email}/consumidor`
    };
    Axios.request(options).then(function (response) {
        console.log(response.data);
        toast({
            title: 'Login efetuado com sucesso',
            description: `Seja bem vindo de volta!`,
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
        loadUser();
    }).catch(function (error) {
        console.log(error);
        toast({
            title: 'Você não possuí uma conta',
            description: `Crie sua conta para ter acesso a esta area!`,
            status: 'warning',
            duration: 3000,
            isClosable: true,
        })
        Router.push('/cadastro');
    });

    var [idC, setIdC] = useState('idC preset');
    var [cpf, setCPF] = useState('CPF preset');
    var [nome, setNome] = useState('Nome preset');
    var [telefone, setTelefone] = useState('Telefone preset');

    var usuario = null

    console.log("Pagina de Autentificação do Usuario")
    console.log(user);


    function mudaNome() {
        var novoNome = document.getElementById('nome').value;
        setNome(novoNome);
        console.log("novoNome: " + novoNome)
    }

    function mudaTelefone() {
        var novoTelefone = document.getElementById('telefone').value;
        setTelefone(novoTelefone);
        console.log("novoTelefone: " + novoTelefone)
    }

    async function loadUser() {
        const options = {
            method: 'GET',
            url: `http://localhost:3000/api/usuario/cadastro/${user.email}/consumidor`
        };
        await Axios.request(options).then(function (response) {
            console.log(response.data);
            usuario = response.data;
            console.log("Usuario: ");
            console.log(usuario);
        }).catch(function (error) {
            console.log("Erro do sistema: " + error);
        });

        await loadConsumidor(usuario.id);
    }

    async function loadConsumidor(id) {
        const options = {
            method: 'GET',
            url: `http://localhost:3000/api/consumidor/${id}`
        };
        await Axios.request(options).then(function (response) {
            console.log(response.data);
            setIdC(response.data.idConsumidor);
            setCPF(response.data.CPF);
            setNome(response.data.nome);
            setTelefone(response.data.telefone);
            console.log("Consumidor: ");
            console.log("idC:" + idC);
            console.log("nome:" + nome);
            console.log("cpf:" + cpf);
            console.log("telefone:" + telefone);

        }).catch(function (error) {
            console.log("Erro do sistema: " + error);
        });
    }

    const size = '96px';
    const color = 'teal';

    const pulseRing = keyframes`
        0% {transform: scale(0.33);}
        40%,50% {opacity: 0;}
        100% {opacity: 0;}
    `;

    return (
        <>
            <NavbarLogOn />
            <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
                <Flex
                    p={8}
                    flex={1}
                    lign={'center'}
                    justify={'center'}
                >
                    <Stack spacing={4} w={'full'} maxW={'md'}>
                        <Stack direction={['column', 'row']} spacing={6}>
                            <Center>
                                <Flex>
                                    <Avatar size="xl" src={user.photoURL} />
                                </Flex>
                            </Center>
                            <Center w="full">
                                <Tag colorScheme='teal' w="full">
                                    Consumidor
                                </Tag>
                            </Center>
                        </Stack>

                        <Divider />

                        <Heading fontSize={'2xl'}>Email: {user.email}</Heading>
                        <Heading fontSize={'2xl'}>CPF : {cpf}</Heading>
                        <Stack spacing={6}>

                            <Divider />

                            <Heading fontSize={'2xl'}>Nome:</Heading>

                            <Input placeholder={nome} id="nome" />

                            <Button 
                                onClick={() => { mudaNome() }}
                                leftIcon={<FcApprove />}
                                colorScheme='teal'
                                variant='solid'
                                >
                                Save
                            </Button>

                            <Divider />

                            <Heading fontSize={'2xl'}>Telefone:</Heading>

                            <Input placeholder={telefone} id="telefone" />

                            <Divider />

                            <Button 
                                leftIcon={<FcPhoneAndroid />} 
                                colorScheme='teal' 
                                variant='solid' 
                                onClick={() =>{ mudaTelefone() }}
                                >
                                Save
                            </Button>
                            <Stack spacing={6}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Flex>
                <Flex flex={1}>
                    <Image
                        alt={'Login Image'}
                        objectFit={'cover'}
                        src={
                            'https://www.howtogeek.com/wp-content/uploads/2021/01/instagram-profile-on-a-smartphone.jpg?width=1198&trim=1,1&bg-color=000&pad=1,1'
                        }
                    />
                </Flex>
            </Stack>
        </>
    )
}