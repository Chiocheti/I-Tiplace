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
} from '@chakra-ui/react'

import React, { useState } from 'react';
import UseAuth from '../hooks/useAuth'
import Axios from 'axios';

import NavbarLogOn from '../components/navbarLogOn';
import Router from "next/router";

export default function criarConta() {

    const { user, signin, signout } = UseAuth();

    const [cadastro, setCadastro] = useState('consumidor');

    const toast = useToast()

    console.log("Usuario->")
    console.log(user)
    console.log("---------");

    function isFornecedor() {
        const elementFornecedor = document.getElementById("fornecedor");
        elementFornecedor.hidden = false;

        const elementConsumidor = document.getElementById("consumidor");
        elementConsumidor.hidden = true;

        setCadastro("fornecedor");
    }

    function isConsumidor() {
        const elementFornecedor = document.getElementById("fornecedor");
        elementFornecedor.hidden = true;

        const elementConsumidor = document.getElementById("consumidor");
        elementConsumidor.hidden = false;

        setCadastro("consumidor");
    }

    function validaCNPJ(cnpj){
        const options = {
            method: 'GET',
            url: `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`
        };
        Axios.request(options).then(function (response) {
            console.log(response);

            if(response.status == '200'){
                return true;
            }

            return false;

            
        }).catch(function (error) {
            return false;
        });
    }

    function formataCNPJ(cnpj){
        var cnpjFormatado = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
        console.log("cnpjFormatado");
        console.log(cnpjFormatado);
        return cnpjFormatado;
    }

    function TestaCPF(strCPF) {
        var Soma;
        var Resto;
        var i;
        Soma = 0;
        if (strCPF == "00000000000" || strCPF == "11111111111" || strCPF == "22222222222" || strCPF == "33333333333" || strCPF == "44444444444" || strCPF == "55555555555" || strCPF == "66666666666" || strCPF == "77777777777" || strCPF == "88888888888" || strCPF == "99999999999") {
            return false;
        }

        for (i = 1; i <= 9; i++) {
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        }
        console.log("Soma1:")
        console.log(Soma)
        Resto = (Soma * 10) % 11;
        console.log("Resto1:")
        console.log(Resto)
        if ((Resto == 10) || (Resto == 11)) {
            Resto = 0;
        }

        if (Resto != parseInt(strCPF.substring(9, 10))) {
            return false;
        }

        Soma = 0;

        for (i = 1; i <= 10; i++) {
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        }

        console.log("Soma1:")
        console.log(Soma)
        Resto = (Soma * 10) % 11;
        console.log("Resto1:")
        console.log(Resto)

        if ((Resto == 10) || (Resto == 11)) {
            Resto = 0;
        }

        if (Resto != parseInt(strCPF.substring(10, 11))) {
            return false;
        }

        return true;
    }

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
    
    function verificaFornecedor() {
        const telefone = document.getElementById("telefoneFornecedor").value;
        const cnpj = document.getElementById("cnpj").value;
        var telefoneFormatado = formatadorDeTelefone(telefone)
        const nomeFantasia = document.getElementById("nomeFantasia").value;

        if (cnpj.length != 14 || isNaN(cnpj)) {
            console.log("leng")
            console.log(cnpj.length)
            console.log("isNaN")
            console.log(isNaN(cnpj))
            console.log("ValidaCNPJ")
            console.log(validaCNPJ(cnpj))
            toast({
                title: 'Insira um CNPJ valido',
                description: "Valor de CNPJ invalido",
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })
        } else {
            if (telefone.length != 11 || isNaN(telefone) || !testaTelefone(telefoneFormatado)) {
                toast({
                    title: 'Insira um Numero de Telefone valido',
                    description: "Valor de Telefone invalido",
                    status: 'warning',
                    duration: 9000,
                    isClosable: true,
                })
            } else {
                if (nomeFantasia.length < 1) {
                    toast({
                        title: 'Insira um nome valido',
                        description: "Nome deve conter pelo menos 1 caractere",
                        status: 'warning',
                        duration: 9000,
                        isClosable: true,
                    })
                } else {
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
                        registerFornecedor(formataPraSalvar(telefoneFormatado) , formataCNPJ(cnpj));
                    });
                }
            }
        }
    }

    function verificaConsumidor() {
        const cpf = document.getElementById("cpf").value;
        const telefone = document.getElementById("telefoneConsumidor").value;
        var telefoneFormatado = formatadorDeTelefone(telefone)
        const nomeConsumidor = document.getElementById("nomeConsumidor").value;
        if (cpf.length != 11 || isNaN(cpf) || !TestaCPF(cpf)) {
            toast({
                title: 'Insira um CPF valido',
                description: "Valor de CPF invalido",
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })
        } else {
            if (telefone.length != 11 || isNaN(telefone) || !testaTelefone(telefoneFormatado)) {
                console.log("telefone.lenght:")
                console.log(telefone.length != 11)
                console.log("IsNaN: ")
                console.log(isNaN(telefone))
                console.log("testaTelefone: ")
                console.log(!testaTelefone(telefoneFormatado))
                toast({
                    title: 'Insira um Numero de Telefone valido',
                    description: "Valor de Telefone invalido",
                    status: 'warning',
                    duration: 9000,
                    isClosable: true,
                })
            } else {
                if (nomeConsumidor.length < 1) {
                    toast({
                        title: 'Insira um nome valido',
                        description: "Nome deve conter pelo menos 1 caractere",
                        status: 'warning',
                        duration: 9000,
                        isClosable: true,
                    })
                } else {
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
                            description: `Bem Vindo ${nomeConsumidor} !!!`,
                            status: 'success',
                            duration: 3000,
                            isClosable: true,
                        })
                        registerConsumidor(formataPraSalvar(telefoneFormatado));
                    });

                }
            }
        }
    }

    function registerUsuario() {
        // Cadastra o usuario 
        var options = {
            method: 'POST',
            url: 'http://localhost:3000/api/usuario',
            headers: { 'Content-Type': 'application/json' },
            data: { email: user.email, cadastro: cadastro }
        };
        Axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }

    async function registerConsumidor(telefone) {
        // Cadastra o usuario
        await registerUsuario();

        var idConsumidor = null;
        const nome = document.getElementById("nomeConsumidor").value;
        const cpf = document.getElementById("cpf").value;

        const options = {
            method: 'GET',
            url: `http://localhost:3000/api/usuario/cadastro/${user.email}/${cadastro}`
        };
        await Axios.request(options).then(function (response) {
            console.log(response.data);
            idConsumidor = response.data.id;
            console.log("idConsumidor: " + idConsumidor);
            Router.push('/autentificadoConsumidor');
        }).catch(function (error) {
            console.log(error);
        });

        // Cadastra o consumidor
        const options2 = {
            method: 'POST',
            url: 'http://localhost:3000/api/consumidor',
            headers: { 'Content-Type': 'application/json' },
            data: { idConsumidor: idConsumidor, nome: nome, cpf: cpf, telefone: telefone }
        };
        await Axios.request(options2).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });

        console.log("idConsumidor: " + idConsumidor)
        console.log("Nome: " + nome)
        console.log("CPF: " + cpf)
        console.log("Telefone: " + telefone)
    }

    async function registerFornecedor(telefone , cnpj) {

        // Cadastra o usuario
        await registerUsuario();

        var idFornecedor = null;
        const nomeFantasia = document.getElementById("nomeFantasia").value;
        const hora_abre = document.getElementById("hora_abre").value;
        const hora_fecha = document.getElementById("hora_fecha").value;

        const options = {
            method: 'GET',
            url: `http://localhost:3000/api/usuario/cadastro/${user.email}/${cadastro}`
        };
        await Axios.request(options).then(function (response) {
            console.log(response.data);
            idFornecedor = response.data.id;
            console.log("idFornecedor: " + idFornecedor);
            Router.push('/autentificadoFornecedor');
        }).catch(function (error) {
            console.log(error);
        });

        // Cadastra o fornecedor
        const options2 = {
            method: 'POST',
            url: 'http://localhost:3000/api/fornecedor',
            headers: { 'Content-Type': 'application/json' },
            data: { idFornecedor: idFornecedor, nomeFantasia: nomeFantasia, cnpj: cnpj, telefone: telefone, hora_abre: hora_abre, hora_fecha: hora_fecha }
        };
        await Axios.request(options2).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });

        console.log("idFornecedor: " + idFornecedor)
        console.log("nomeFantasia: " + nomeFantasia)
        console.log("CNPJ: " + cnpj)
        console.log("Telefone: " + telefone)
        console.log("hora_abre: " + hora_abre)
        console.log("hora_fecha: " + hora_fecha)
    }
    return (
        <>
            <NavbarLogOn />
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
                                Cadastro
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
                                <Stack
                                    direction={['column', 'row']}
                                    spacing={6}
                                    align={'center'}
                                    justify={'center'}>
                                    <center
                                        lineHeight={1.1}
                                        fontSize={{ base: '2xl', sm: '3xl' }}
                                    >
                                        <FormControl isRequired>
                                            <FormLabel> Email:
                                            </FormLabel>
                                            <Input
                                                id='email'
                                                type='email'
                                                value={user.email}
                                                readOnly />
                                        </FormControl>

                                    </center>
                                </Stack>
                                <Stack
                                    direction={['column', 'row']}
                                    spacing={6} align={'center'}
                                    justify={'center'}
                                >
                                    <center
                                        id='fornecedor'
                                        hidden={true}
                                        align={['flex-start', 'center']}>
                                        <Stack >
                                            <Button bg={'blue.400'}
                                                color={'white'}
                                                w="full"
                                                _hover={{
                                                    bg: 'blue.500',
                                                }} size='xs' onClick={isConsumidor}>
                                                Criar Conta como Consumidor:
                                            </Button>
                                        </Stack>
                                        <FormControl isRequired>
                                            <FormLabel> Nome Fantasia:
                                            </FormLabel>
                                            <Input
                                                placeholder='Nome: '
                                                id='nomeFantasia' />

                                            <FormLabel> CNPJ:
                                            </FormLabel>
                                            <Input
                                                placeholder='Ex: XXXXXXXXXXXXXXXXXX'
                                                id='cnpj' />

                                            <FormLabel> Telefone:
                                            </FormLabel>
                                            <Input
                                                placeholder='Ex: 19999999999'
                                                id='telefoneFornecedor'
                                                maxLength={15} />

                                            <FormLabel> Hora Abre:
                                            </FormLabel>
                                            <Input
                                                placeholder='Ex: 08:00:00 '
                                                id='hora_abre' />

                                            <FormLabel> Hora Fecha:
                                            </FormLabel>
                                            <Input
                                                placeholder='Ex: 20:00:00 '
                                                id='hora_fecha' />
                                            <Button
                                                colorScheme='teal'
                                                variant='outline'
                                                onClick=
                                                {() => { verificaFornecedor() }}
                                                align={['center']}>
                                                Criar Conta
                                            </Button>
                                        </FormControl>
                                    </center>
                                </Stack>
                                <Stack direction={['column', 'row']} spacing={6} align={'center'}
                                    justify={'center'}>
                                    <center
                                        id='consumidor'
                                        bg='#F0FFF4'
                                        align={['flex-start', 'center']}>
                                        <Stack >
                                            <Button bg={'red.400'}
                                                color={'white'}
                                                w="full"
                                                _hover={{
                                                    bg: 'red.500',
                                                }} size='xs' onClick={isFornecedor}>
                                                Criar Conta como Fornecedor:
                                            </Button>
                                        </Stack>
                                        <FormControl isRequired>
                                            <FormLabel > Nome:
                                            </FormLabel>
                                            <Input
                                                placeholder='Nome: '
                                                id='nomeConsumidor' />

                                            <FormLabel> CPF:
                                            </FormLabel>
                                            <Input
                                                placeholder='Ex: 12345678911'
                                                id='cpf' />

                                            <FormLabel> Telefone:
                                            </FormLabel>
                                            <Input
                                                placeholder='Ex: 19999999999'
                                                id='telefoneConsumidor' />
                                            <Button
                                                colorScheme='teal'
                                                variant='outline'
                                                onClick=
                                                {() => { verificaConsumidor() }}
                                                align={['center']}>
                                                Criar Conta
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