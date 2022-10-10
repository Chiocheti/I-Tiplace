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
import NavbarLogOn from '../components/navbarLogOnFornecedor';
import { AspectRatio, useToast } from '@chakra-ui/react'
import Axios from 'axios';
import Router from "next/router";
import React, { useState } from 'react';
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { FcPhoneAndroid, FcApprove , FcClock } from "react-icons/fc";

export default function autentificado() {

    const { user, signin, signout } = UseAuth();

    const toast = useToast()

    var [idF, setIdF] = useState(() => 'idF preset')
    var [nomeFantasia, setNomeFantasia] = useState(() => 'nomeFantasia preset')
    var [cnpj, setCnpj] = useState(() => 'cnpj preset')
    var [telefone, setTelefone] = useState(() => 'telefone preset')
    var [hora_abre, setHora_abre] = useState(() => 'hora_abre preset')
    var [hora_fecha, setHora_fecha] = useState(() => 'hora_fecha preset')

    var usuario = null

    console.log("Pagina de Fornecedor Identificado")
    console.log(user);

    const options = {
        method: 'GET',
        url: `http://localhost:3000/api/usuario/cadastro/${user.email}/fornecedor`
    };
    Axios.request(options).then(function (response) {
        console.log(response.data);
        usuario = response.data;
        console.log("Usuario: ");
        console.log(usuario);
        loadFornecedor(usuario.id);
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

    function loadFornecedor(id) {
        const options = {
            method: 'GET',
            url: `http://localhost:3000/api/fornecedor/${id}`
        };
        Axios.request(options).then(function (response) {
            console.log("Response data")
            const resp = response.data;
            console.log(response.data)

            setIdF(resp.idFornecedor)
            setNomeFantasia(resp.nomeFantasia)
            setCnpj(resp.cnpj)
            setTelefone(resp.telefone)
            setHora_abre(resp.hora_abre)
            setHora_fecha(resp.hora_fecha)

            console.log(idF)
            console.log(nomeFantasia)
            console.log(cnpj)
            console.log(telefone)
            console.log(hora_abre)
            console.log(hora_fecha)

        }).catch(function (error) {
            console.log("Erro do sistema: " + error)
        });
    }

    function mudaNome() {
        var novoNomeFantasia = document.getElementById('nomeFantasia').value;

        if (novoNomeFantasia.length < 1) {
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
                url: `http://localhost:3000/api/fornecedor/${idF}`,
                headers: { 'Content-Type': 'application/json' },
                data: { nomeFantasia: novoNomeFantasia, cnpj: cnpj, telefone: telefone, hora_abre: hora_abre, hora_fecha: hora_fecha },
            };
            Axios.request(options).then(function (response) {
                console.log(response.data)
                toast({
                    title: 'Nome Alterado com sucesso',
                    description: `Novo nome: ${novoNomeFantasia}`,
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
            })
        }
    }

    function mudaTelefone() {
        var novoTelefone = document.getElementById('telefone').value;
        var telefoneFormatado = formatadorDeTelefone(novoTelefone)

        if (novoTelefone.length != 11 || isNaN(novoTelefone) || !testaTelefone(telefoneFormatado)) {
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
                url: `http://localhost:3000/api/fornecedor/${idF}`,
                headers: { 'Content-Type': 'application/json' },
                data: { nomeFantasia: nomeFantasia, cnpj: cnpj, telefone: telefoneParaSalvar, hora_abre: hora_abre, hora_fecha: hora_fecha },
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

    function mudaHora_abre() {
        var novoHora_abre = document.getElementById('hora_abre').value;

        if (novoHora_abre == null || novoHora_abre == "") {
            toast({
                title: 'Insira uma hora valida',
                description: "Hora invalida",
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })
        } else {
            var options = {
                method: 'PUT',
                url: `http://localhost:3000/api/fornecedor/${idF}`,
                headers: { 'Content-Type': 'application/json' },
                data: { nomeFantasia: nomeFantasia, cnpj: cnpj, telefone: telefone, hora_abre: novoHora_abre, hora_fecha: hora_fecha },
            };
            Axios.request(options).then(function (response) {
                console.log(response.data)
                toast({
                    title: 'Hora Alterada com sucesso',
                    description: `Nova hora: ${novoHora_abre}`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            }).catch(function (error) {
                console.error(error);
                toast({
                    title: 'Falha ao Alterar a Hora',
                    description: `Erro ao alterar a hora !!!`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            })
        }
    }

    function mudaHora_fecha() {
        var novoHora_fecha = document.getElementById('hora_fecha').value;

        if (novoHora_fecha == null || novoHora_fecha == "") {
            toast({
                title: 'Insira uma hora valida',
                description: "Hora invalida",
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })
        } else {
            var options = {
                method: 'PUT',
                url: `http://localhost:3000/api/fornecedor/${idF}`,
                headers: { 'Content-Type': 'application/json' },
                data: { nomeFantasia: nomeFantasia, cnpj: cnpj, telefone: telefone, hora_abre: hora_abre, hora_fecha: novoHora_fecha },
            };
            Axios.request(options).then(function (response) {
                console.log(response.data)
                toast({
                    title: 'Hora Alterada com sucesso',
                    description: `Nova hora: ${novoHora_fecha}`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            }).catch(function (error) {
                console.error(error);
                toast({
                    title: 'Falha ao Alterar a Hora',
                    description: `Erro ao alterar a hora !!!`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            })
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
        <>
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
                            <Heading fontSize={'2xl'}>CNPJ : {cnpj}</Heading>
                            <Stack spacing={6}>

                                <Divider />

                                <Heading fontSize={'2xl'}>Nome Fantasia:</Heading>

                                <Input placeholder={nomeFantasia} id="nomeFantasia" />

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

                                <Divider />

                                <Heading fontSize={'2xl'}>Hora que abre:</Heading>

                                <Input placeholder={hora_abre} id="hora_abre" />

                                <Divider />

                                <Button
                                    leftIcon={<FcClock />}
                                    colorScheme='teal'
                                    variant='solid'
                                    onClick={() => { mudaHora_abre() }}
                                >
                                    Save
                                </Button>

                                <Divider />

                                <Heading fontSize={'2xl'}>Hora que Fecha:</Heading>

                                <Input placeholder={hora_fecha} id="hora_fecha" />

                                <Divider />

                                <Button
                                    leftIcon={<FcClock />}
                                    colorScheme='teal'
                                    variant='solid'
                                    onClick={() => { mudaHora_fecha() }}
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
            </div>
        </>
    )
}