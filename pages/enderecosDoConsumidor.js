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
    Spacer,

} from '@chakra-ui/react'

import { FcHighPriority , FcOk } from "react-icons/fc";
import Router from "next/router";
import NavbarLogOnConsumidor from "../components/navbarLogOnConsumidor"

export default function enderecoDoConsumidor() {
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
                                                id='email'
                                                type='email'
                                                placeholder="Digite aqui seu Cep apenas com numeros"
                                            />
                                            <Stack >
                                                <Flex>
                                                    <Button
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
                                                placeholder='Estado: '
                                                id='estado' />

                                            <FormLabel> Cidade: </FormLabel>
                                            <Input
                                                readOnly
                                                placeholder='Cidade: '
                                                id='cidade' />

                                            <FormLabel> Bairro: </FormLabel>
                                            <Input
                                                readOnly
                                                placeholder='Bairro:'
                                                id='bairro' />

                                            <FormLabel> Rua: </FormLabel>
                                            <Input
                                                readOnly
                                                placeholder='Rua:'
                                                id='rua' />

                                            <FormLabel> Numero: </FormLabel>
                                            <Input
                                                placeholder='Numero:'
                                                id='numero' />
                                            <Button
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