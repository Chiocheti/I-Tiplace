import {
    Center,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Checkbox,
    Button,
    useToast,
    Heading,
    Text,
    useColorModeValue,
    Flex,
    Spacer
} from '@chakra-ui/react'

import UseAuth from '../hooks/useAuth'
import { FcHighPriority , FcOk } from "react-icons/fc";
import Router from "next/router";
import Axios from 'axios';
import NavbarLogOnConsumidor from "../components/navbarLogOnConsumidor"
import React , { useState } from 'react'

export default function enderecoDoConsumidor() {

    const toast = useToast()

    const { user, signin, signout } = UseAuth();

    var[cep , setCEP] = useState('')
    var[logradouro , setLogradouro] = useState('')
    var[bairro , setBairro] = useState('')
    var[cidade , setCidade] = useState('')
    var[estado , setEstado] = useState('')

    var usuario;

    const options = {
        method: 'GET',
        url: `http://localhost:3000/api/usuario/cadastro/${user.email}/consumidor`
    };
    Axios.request(options).then(function (response) {
        console.log(response.data);
        usuario = response.data;
        console.log("Usuario: ");
        console.log(usuario);
    }).catch(function (error) {
        console.log(error);
    });


    function buscaCEP(){
        var cep = document.getElementById('cep').value
        setCEP(cep)
        const options = {
            method: 'GET',
            url: `https://viacep.com.br/ws/${cep}/json/`
        };
        Axios.request(options).then(function(response){
            console.log(response.data)
            var endereco = response.data
            console.log("Endedeço: ")
            console.log(endereco)
            setCEP(cep)
            setLogradouro(endereco.logradouro)
            setBairro(endereco.bairro)
            setCidade(endereco.localidade)
            setEstado(endereco.uf)

        }).catch(function (error){
            console.log(error)
        })
    }

    function saveEndereco(){
        var numero = document.getElementById('numero').value;

        console.log('idUsuario: ' + usuario.id)
        console.log('cep: ' + cep)
        console.log('numero: ' + numero)
        console.log('rua: ' + logradouro)
        console.log('bairro: ' + bairro)
        console.log('cidade: ' + cidade)
        console.log('estado: ' + estado)

        var options = {
            method: 'POST',
            url: 'http://localhost:3000/api/endereco',
            headers: { 'Content-Type': 'application/json' },
            data: { idUsuario: usuario.id , cep: cep , numero:numero , rua:logradouro , bairro:bairro , cidade:cidade , estado:estado}
        };
        Axios.request(options).then(function (response) {
            console.log(response.data);
            toast({
                title: 'Endereço cadastrado com sucesso',
                description: `Seu endereço foi cadastrado com sucesso !!!`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        }).catch(function (error) {
            console.error(error);
            toast({
                title: 'Falha ao cadastrar o endereço',
                description: `Erro ao cadastrar o endereço !!!`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        });
    }
    return (
        <>
            <NavbarLogOnConsumidor/>
            <div
                spacing={1}
                w={'full'}
                maxW={'md'}
                align={['flex-start', 'center']}
                alignSelf={'center'}
                justify={'center'}
                direction={['column']}
                position={'relative'}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <flex>
                    <Stack spacing={1} align='flex-start' w='full'>
                        <Stack spacing={1} align={['flex-start', 'center']} w='full'>
                            <Heading as="h2" size="xl" mt={6} mb={2}>
                                Cadastro de endereço
                            </Heading>
                            <Text as="h2" size="xl" mt={6} mb={2}>
                                Prossiga com o seu cadastro preenchendo os dados abaixo
                            </Text>
                        </Stack>
                    </Stack>
                    <Box>
                        <center py={6}>
                            <Stack
                                borderWidth="1px"
                                borderRadius="lg"
                                w={{ sm: '100%', md: '540px' }}
                                bg={useColorModeValue('white', 'gray.900')}
                                boxShadow={'2xl'}
                            >
                                <Stack direction={['column', 'row']} spacing={6} align={'center'}
                                    justify={'center'}>
                                    <center
                                        id='consumidor'
                                        bg='#F0FFF4'
                                        align={['flex-start', 'center']}>

                                        <FormControl >

                                            <FormLabel> CEP:
                                            </FormLabel>
                                            <Input
                                                id='cep'
                                                placeholder="Digite aqui seu Cep apenas com numeros"
                                            />
                                            <Stack >
                                                <Flex>
                                                    <Button
                                                        onClick={() => buscaCEP()}
                                                        leftIcon={<FcOk />}
                                                        colorScheme='teal'
                                                        variant='outline'
                                                        align={['center']}>
                                                        Validar CEP
                                                        
                                                    </Button>
                                                    <Spacer />
                                                    <Button 
                                                        leftIcon={<FcHighPriority />}
                                                        colorScheme='red'
                                                        variant='outline'
                                                        onClick={() => { Router.push('https://buscacepinter.correios.com.br/app/endereco/index.php') }}>
                                                        Não sabe seu Cep?
                                                    </Button>
                                                </Flex>
                                            </Stack>
                                            <FormLabel > Estado: </FormLabel>
                                            <Input
                                                readOnly
                                                placeholder={estado}
                                                id='estado' />

                                            <FormLabel> Cidade: </FormLabel>
                                            <Input
                                                readOnly
                                                placeholder={cidade}
                                                id='cidade' />

                                            <FormLabel> Bairro: </FormLabel>
                                            <Input
                                                readOnly
                                                placeholder={bairro}
                                                id='bairro' />

                                            <FormLabel> Rua: </FormLabel>
                                            <Input
                                                readOnly
                                                placeholder={logradouro}
                                                id='rua' />

                                            <FormLabel> Numero: </FormLabel>
                                            <Input
                                                placeholder='Numero:'
                                                id='numero' />
                                            <Button
                                                onClick={() => {saveEndereco()}}
                                                colorScheme='teal'
                                                variant='outline'
                                                align={['center']}>
                                                Adicionar
                                            </Button>
                                        </FormControl>
                                    </center>
                                </Stack>
                            </Stack>
                        </center>
                    </Box>
                </flex>
            </div>
        </>
    )
}