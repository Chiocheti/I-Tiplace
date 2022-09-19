import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Checkbox,
  Button,
  useToast,
  Box,
  VStack,
  Heading,
  Text,
  Grid,
  Link,
  GridItem,
  useColorModeValue,
  Container,
  Image, Img
} from '@chakra-ui/react'
import React, { useState } from 'react';
import UseAuth from '../hooks/useAuth'
import Axios from 'axios';

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
          <Stack direction={'row'} spacing={6}>
            <Link href={'/'}>Home</Link>
            <Link href={'#'}>About</Link>
            <Link href={'#'}>Blog</Link>
            <Link href={'#'}>Contact</Link>
          </Stack>
          <Text>© 2022 I-Tiplace by Chakra . All rights reserved for Dupla de Tres </Text>
        </Container>
      </Box>
    </>
  )
}
