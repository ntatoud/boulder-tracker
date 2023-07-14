import React from 'react';

import {
  Box,
  Flex,
  IconButton,
  IconButtonProps,
  SlideFade,
  useBreakpointValue,
  useTheme,
} from '@chakra-ui/react';
import { LuMenu } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import { Logo } from '@/components/Logo';
import { AccountMenu } from '@/layout/AccountMenu';
import { useLayoutContext } from '@/layout/LayoutContext';
import { MainMenu } from '@/layout/MainMenu';
import { NavDrawer } from '@/layout/NavDrawer';

const MenuButton = (props: Partial<IconButtonProps>) => {
  const { navOnOpen } = useLayoutContext();
  return (
    <IconButton
      aria-label="Navigation"
      icon={<LuMenu size="1.5em" />}
      onClick={navOnOpen}
      variant="unstyled"
      _active={{ bg: 'gray.700' }}
      _hover={{ bg: 'gray.900' }}
      {...props}
    />
  );
};

export const TopBar = () => {
  const theme = useTheme();

  const showDrawer = useBreakpointValue(
    {
      base: true,
      [theme.layout.breakpoints.desktop]: false,
    },
    { ssr: false }
  );

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
      {showDrawer && <NavDrawer />}
    </>
  );
};
