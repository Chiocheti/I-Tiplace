import { Divider , Box } from '@chakra-ui/react'

import Item from './itemEndereco'


export default function card({ enderecos }) {
    return (
        <>
            <Box margin={'10px'}>
                {
                    enderecos.map((endereco) => (
                        <Item key={endereco.idUsuario} endereco={endereco} />
                    ))
                }
            </Box>
        </>
    )
}