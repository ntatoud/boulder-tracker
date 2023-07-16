import React from 'react';

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Link as ChakraLink,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import signInImage from '@/app/images/signin.jpg';
import { SlideIn, SlideInUp } from '@/components/SlideIn';
import { LoginForm } from '@/features/auth/_partials/LoginForm';

import { LoginShowFeatures } from './_partials/LoginShowFeatures';

export default function PageLogin() {
  const { t } = useTranslation(['auth']);

  return (
    <>
      <Box
        position="absolute"
        top="0"
        as={Image}
        zIndex="0"
        opacity="0.7"
        w="100vw"
        h={{ base: '85vh', md: '100vh' }}
        src={signInImage}
        objectFit="cover"
        alt="Man climbing on an indoor spray wall"
        placeholder="blur"
      />
      <Stack>
        <Flex opacity="0.9" direction={{ base: 'column', md: 'row' }}>
          <SlideIn>
            <Center>
              <Box
                justifyItems="center"
                px="2"
                py={{ base: '10vh', md: '30vh' }}
                w={{ base: '90vw', md: '30vw' }}
                h="90vh"
                maxW="full"
                mx="auto"
              >
                <Card>
                  <CardHeader pb={0}>
                    <Heading size="md" data-test="login-page-heading">
                      {t('auth:login.title')}
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <LoginForm />
                  </CardBody>
                </Card>
                <Center mt="4">
                  <Button
                    as={Link}
                    to="/account/register"
                    variant="link"
                    color='"gray.700"'
                  >
                    {t('auth:login.actions.needAccount')}{' '}
                    <Box
                      as="strong"
                      ms="2"
                      color="gray.800"
                      _dark={{ color: 'gray.300' }}
                    >
                      {t('auth:login.actions.register')}
                    </Box>
                  </Button>
                </Center>
              </Box>
            </Center>
          </SlideIn>
          <SlideInUp>
            <Flex
              w={{ base: '80vw', md: '40vw' }}
              h={{ base: '50%', md: '95vh' }}
              maxW="full"
              color="gray.400"
              justify="center"
              align="center"
              mx="auto"
            >
              <LoginShowFeatures />
            </Flex>
          </SlideInUp>
        </Flex>
        <Flex
          zIndex="2"
          direction="column"
          h="2%"
          alignSelf="flex-end"
          mt="-2"
          mr="2"
          fontSize="xs"
          textAlign="right"
          color="black"
          _dark={{ color: 'gray.300' }}
        >
          <Text>
            Photo by{' '}
            <ChakraLink href="https://unsplash.com/ko/@ynsplt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              yns plt
            </ChakraLink>{' '}
            on{' '}
            <ChakraLink href="https://unsplash.com/fr/photos/NY1D4Zni7fc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Unsplash
            </ChakraLink>
          </Text>
          <Text>
            Boulder Tracker is an application developed by{' '}
            <ChakraLink isExternal href="https://github.com/ntatoud">
              @ntatoud
            </ChakraLink>
          </Text>
        </Flex>
      </Stack>
    </>
  );
}
