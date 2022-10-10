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
import Card from '../components/cardEndereco.js';
import { AspectRatio, useToast } from '@chakra-ui/react'
import Axios from 'axios';
import Router from "next/router";
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { FcPhoneAndroid, FcOk, FcApprove } from "react-icons/fc";

export default function autentificado(text) {

    const { user, signin, signout } = UseAuth();

    const toast = useToast()

    var [idC, setIdC] = useState(() => 'idC preset');
    var [cpf, setCPF] = useState(() => 'CPF preset');
    var [nome, setNome] = useState(() => 'Nome preset');
    var [telefone, setTelefone] = useState(() => 'Telefone preset');

    var [usuario, setUsuario] = useState(() => "usuario preset");

    var [enderecos, setEnderecos] = useState([1, 2]);

    //var usuario = null

    console.log("Pagina de Consumidor Identificado")
    console.log(user);

    const options = {
        method: 'GET',
        url: `http://localhost:3000/api/usuario/cadastro/${user.email}/consumidor`
    };
    Axios.request(options).then(function (response) {
        console.log(response.data);
        var resp = response.data
        var usuario = response.data;
        //setUsuario(() => resp.id)
        console.log("Usuario: ");
        console.log(usuario);

        loadConsumidor(usuario.id);
    }).catch(function (error) {
        console.log(error);

        Router.push('/cadastro');
    });

    function formatadorDeTelefone(telefone) {
        telefone = telefone.replace(/^(\d{2})(\d)/g, "($1)$2"); //Coloca parênteses em volta dos dois primeiros dígitos
        var novoTelefone = telefone.replace(/(\d)(\d{5})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
        console.log('Telefone formatado:')
        console.log(novoTelefone)
        return novoTelefone;
    }

    function formataPraSalvar(telefone) {
        let part1 = telefone.slice(0, 8)
        console.log(part1)
        let part2 = telefone.slice(9, 10)
        console.log(part2)
        let part3 = telefone.slice(10,)
        console.log(part3)
        console.log("Telefone para salvar: ")
        let telefoneParaSalvar = `${part1}${part2}-${part3}`
        console.log(telefoneParaSalvar)
        return telefoneParaSalvar
    }

    function testaTelefone(telefone) {
        var regex = new RegExp('^\\([0-9]{2}\\)((3[0-9]{3}-[0-9]{4})|(9[0-9]{3}-[0-9]{5}))$');
        console.log("Teste do Telefone:")
        console.log(regex.test(telefone))
        return regex.test(telefone);
    }

    function loadConsumidor(id) {
        const options = {
            method: 'GET',
            url: `http://localhost:3000/api/consumidor/${id}`
        };
        Axios.request(options).then(function (response) {
            const resp = response.data;
            console.log("Response data")
            console.log(response.data);

            setIdC(() => resp.idConsumidor)
            setNome(() => resp.nome)
            setCPF(() => resp.CPF)
            setTelefone(() => resp.telefone)
            setUsuario(() => id)

            console.log(idC)
            console.log(nome)
            console.log(cpf)
            console.log(telefone)

        }).catch(function (error) {
            console.log("Erro do sistema: " + error);
        });
    }

    function loadEnderecos(id) {

        var lista = document.getElementById('enderecos');
        lista.hidden = false;

        const options = {
            method: 'GET',
            url: `http://localhost:3000/api/endereco/usuario/${id}`
        };

        Axios.request(options).then(function (response) {
            var endereco = response.data
            setEnderecos(() => endereco);
            console.log("Endereços: ")
            console.log(enderecos);

        }).catch(function (error) {
            console.log("Erro do sistema: " + error);
        });

        /*
        var lista = document.getElementById('lista')
        var elemento = document.createElement('span')
        var parentLista = lista.parentNode

        parentLista.insertBefore(lista , elemento)
        lista.insertBefore
        */

    }

    function mudaNome() {
        var novoNome = document.getElementById('nome').value;

        if (novoNome.length < 1) {
            toast({
                title: 'Insira um nome valido',
                description: "Nome invalido",
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })
        } else {

            var options = {
                method: 'PUT',
                url: `http://localhost:3000/api/consumidor/${idC}`,
                headers: { 'Content-Type': 'application/json' },
                data: { nome: novoNome, cpf: cpf, telefone: telefone },
            };

            Axios.request(options).then(function (response) {
                console.log(response.data);
                toast({
                    title: 'Nome Alterado com sucesso',
                    description: `Novo nome: ${novoNome}`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            }).catch(function (error) {
                console.error(error);
                toast({
                    title: 'Falha ao Alterar o nome',
                    description: `Erro ao alterar o nome !!!`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            });
        }
    }

    function mudaTelefone() {
        var novoTelefone = document.getElementById('telefone').value;
        var telefoneFormatado = formatadorDeTelefone(novoTelefone);

        if (novoTelefone.length != 11 || isNaN(novoTelefone || !testaTelefone(telefoneFormatado))) {
            toast({
                title: 'Insira um Numero de Telefone valido',
                description: "Valor de Telefone invalido",
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })
        } else {
            var telefoneParaSalvar = formataPraSalvar(telefoneFormatado)
            var options = {
                method: 'PUT',
                url: `http://localhost:3000/api/consumidor/${idC}`,
                headers: { 'Content-Type': 'application/json' },
                data: { nome: nome, cpf: cpf, telefone: telefoneParaSalvar },
            };

            Axios.request(options).then(function (response) {
                console.log(response.data);
                toast({
                    title: 'Telefone Alterado com sucesso',
                    description: `Novo Telefone: ${novoTelefone}`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            }).catch(function (error) {
                console.error(error);
                toast({
                    title: 'Falha ao Alterar o telefone',
                    description: `Erro ao alterar o telefone !!!`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            });
        }
    }

    const size = '96px';
    const color = 'teal';

    const pulseRing = keyframes`
        0% {transform: scale(0.33);}
        40%,50% {opacity: 0;}
        100% {opacity: 0;}
    `;

    return (
        <div>
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
                            onClick={() => mudaNome()}
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
                            onClick={() => { mudaTelefone() }}
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

            <Center>

                <Divider orientation='vertical' />

            </Center>


            <Flex flex={1}>
                <Stack>
                        <Flex>
                            <Button
                                leftIcon={<FcPhoneAndroid />}
                                colorScheme='teal'
                                variant='solid'
                                onClick={() => { loadEnderecos(usuario) }}
                            >
                                Mostrar endereços
                            </Button>
                        </Flex>
                   
                    <div id='enderecos' hidden={true} >
                        <Card enderecos={enderecos} />
                    </div>
                </Stack>
            </Flex>

        </Stack>
    </div>
    )
}