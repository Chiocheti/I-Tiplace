import {
    Button,
    Checkbox,
    Flex,
    Tag,
    FormControl,
    FormLabel,
    Input,
    Avatar,
    Link,
    Stack,
    IconButton,
    ButtonGroup,
    Heading,
    Center,
    Editable,
    EditableInput,
    EditablePreview,
    useEditableControls,
    Image,
    keyframes
} from '@chakra-ui/react';

import UseAuth from '../hooks/useAuth'
import NavbarLogOn from '../components/navbarLogOnFornecedor';
import { AspectRatio, useToast } from '@chakra-ui/react'
import Axios from 'axios';
import Router from "next/router";
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

export default function autentificado() {

    const { user, signin, signout } = UseAuth();
    console.log(user);

    const toast = useToast()

    const options = {
        method: 'GET',
        url: `http://localhost:3000/api/usuario/cadastro/${user.email}/fornecedor`
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

    function EditableControls() {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
        } = useEditableControls()

        return isEditing ? (
            <ButtonGroup justifyContent='center' size='sm'>
                <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
                <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
            </ButtonGroup>
        ) : (
            <Flex justifyContent='center'>
                <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
            </Flex>
        )
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
                    boxShadow={'lg'}
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
                                    Fornecedor
                                </Tag>
                            </Center>
                        </Stack>
                        <Heading fontSize={'2xl'}>E-mail da pessoa</Heading>
                        <Stack spacing={6}>


                            <Editable
                                spacing={6}
                                textAlign='center'
                                defaultValue='JohnJohn Entretenimentos'
                                fontSize='2xl'
                                isPreviewFocusable={false}>
                                <EditablePreview />
                                <Input as={EditableInput} />
                                <EditableControls />
                            </Editable>

                            <Heading fontSize={'2xl'}>CNPJ: 123.456.789/987/6543-21</Heading>

                            <Editable
                                textAlign='center'
                                defaultValue='Telefone'
                                fontSize='2xl'
                                isPreviewFocusable={false}>
                                <EditablePreview />
                                <Input as={EditableInput} />
                                <EditableControls />
                            </Editable>
                            <Heading fontSize={'2xl'}>Aberto das</Heading>
                            <Editable
                                textAlign='center'
                                defaultValue='08:00:00'
                                fontSize='2xl'
                                isPreviewFocusable={false}>
                                <EditablePreview />
                                <Input as={EditableInput} />
                                <EditableControls />
                            </Editable>
                            <Heading fontSize={'2xl'}>até</Heading>
                            <Editable
                                textAlign='center'
                                defaultValue='20:00:00'
                                fontSize='2xl'
                                isPreviewFocusable={false}>
                                <EditablePreview />
                                <Input as={EditableInput} />
                                <EditableControls />
                            </Editable>


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
                            'https://i0.wp.com/uniacademy.com.br/wp-content/uploads/2020/01/Como-saber-o-ultimo-logon-de-um-usuario-no-Active-Directory-via-PowerShell-2.jpeg?fit=1000%2C562&ssl=1'
                        }
                    />
                </Flex>
            </Stack>


        </>
    )
}