import {
  Stack,
  Box,
  Text,
  Link,
  useColorModeValue,
  Container,
} from '@chakra-ui/react'
import React, { useState } from 'react';

export default function Footer() {
  return (
    <>
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Text>{"Github dos Colaboradores ->"}</Text>
          <Stack direction={'row'} spacing={6}>
            <Link href={'https://github.com/Chiocheti'}>Chiocheti</Link>
            <Link href={'https://github.com/MarceloGod'}>Marcelo</Link>
            <Link href={'https://github.com/SAMSantos42'}>Samuel</Link>
          </Stack>
            <Link href={'https://github.com/Chiocheti/I-Tiplace'}>Link deste projeto</Link>
          <Text>© 2022 I-Tiplace by Chakra . All rights reserved for Dupla de Tres </Text>
        </Container>
      </Box>
    </>
  )
}
