import React from 'react';

import { Box, Flex, SlideFade, useTheme } from '@chakra-ui/react';

import { MainMenu } from '@/layout/MainMenu';

export const BottomNavBar = () => {
  const theme = useTheme();

  return (
    <>
      <SlideFade in offsetY={-40} style={{ zIndex: 2 }}>
        <Flex
          position="fixed"
          bottom="0"
          insetStart="0"
          insetEnd="0"
          color="gray.50"
          align="center"
          justify="center"
          pt="safe-bottom"
          px="4"
          h={theme.layout.topBar.height}
          bg="gray.800"
          _dark={{ bg: 'gray.900' }}
        >
          <MainMenu />
        </Flex>
      </SlideFade>
      <Box h={theme.layout.topBar.height} />
    </>
  );
};
