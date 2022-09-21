import {
    Box,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Divider,
    Button,
    useToast 
} from '@chakra-ui/react'

import { FcHighPriority } from "react-icons/fc";

import Axios from 'axios';

export default function item({ endereco }) {
    console.log("+----------------------------------------------------------------+")
    console.log(endereco)
    console.log("+----------------------------------------------------------------+")

    const toast = useToast();

    function deleteEndereco(){
        const options = {
            method: 'DELETE',
            url: `http://localhost:3000/api/endereco/${endereco.idEndereco}`
        };

        Axios.request(options).then(function (response) {
            toast({
                title: 'Endereco deletado com sucesso',
                description: `Este endereço foi deletado do banco de dados`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })

        }).catch(function (error) {
            toast({
                title: 'Falha ao deletar endereço',
                description: `Houve um problema ao deletar este endereço!`,
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
            console.log("Erro do sistema: " + error);
        });
    }

    return (
        <>
            <Divider />

            <TableContainer margin={'10px'}>
                <Table size='sm'>
                    <Thead>
                        <Tr>
                            <Th>Cep</Th>
                            <Th>Numero</Th>
                            <Th>Rua</Th>
                            <Th>Bairro</Th>
                            <Th>Cidade</Th>
                            <Th>Estado</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>{endereco.cep}</Td>
                            <Td>{endereco.numero}</Td>
                            <Td>{endereco.rua}</Td>
                            <Td>{endereco.bairro}</Td>
                            <Td>{endereco.cidade}</Td>
                            <Td>{endereco.estado}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>

            <Button leftIcon={<FcHighPriority />} colorScheme='teal' variant='solid' onClick={() => deleteEndereco()}>
                Delete
            </Button>

        </>
    )
}
