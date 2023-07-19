import React, { ReactNode } from 'react';

import { Box, BoxProps, Flex, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { LuMountainSnow, LuUser, LuUserCog } from 'react-icons/lu';
import { RiDashboardLine } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';

import { useAccount } from '@/features/account/service';
import { useRtl } from '@/hooks/useRtl';
import { useLayoutContext } from '@/layout/LayoutContext';

export const MainMenu = ({ ...rest }) => {
  const { t } = useTranslation(['layout']);
  const { isAdmin } = useAccount();
  return (
    <Stack direction="row" spacing="1" {...rest}>
      <MainMenuItem to="/" icon={<RiDashboardLine />}>
        {t('layout:mainMenu.dashboard')}
      </MainMenuItem>
      <MainMenuItem to="/boulders" icon={<LuMountainSnow />}>
        {t('layout:mainMenu.boulders')}
      </MainMenuItem>
      <MainMenuItem to="/account" icon={<LuUser />}>
        Profile
      </MainMenuItem>
      {isAdmin && (
        <MainMenuItem to="/admin" icon={<LuUserCog />}>
          {t('layout:mainMenu.admin')}
        </MainMenuItem>
      )}
    </Stack>
  );
};
type MainMenuItemProps = BoxProps & {
  to: string;
  icon: ReactNode;
};
const MainMenuItem = ({ to, icon, ...props }: MainMenuItemProps) => {
  const { children, ...rest } = { ...props };
  const { rtlValue } = useRtl();
  const { isAdmin } = useAccount();
  const { navOnClose } = useLayoutContext();
  const { pathname } = useLocation();
  const isActive = to === '/' ? pathname === '/' : pathname?.startsWith(to);
  return (
    <Box
      as={Link}
      to={to}
      justifyContent="flex-start"
      position="relative"
      opacity={isActive ? 1 : 0.8}
      fontSize={{ base: 'sm', md: 'md' }}
      fontWeight="bold"
      borderRadius="full"
      w={isAdmin ? '25vw' : '33vw'}
      px="4"
      py="2"
      bg={isActive ? 'gray.900' : 'gray.800'}
      _dark={{
        bg: isActive ? 'gray.700' : 'gray.900',
      }}
      _hover={{
        bg: 'gray.700',
        _dark: {
          bg: 'gray.800',
        },
      }}
      _focusVisible={{
        outline: 'none',
        bg: 'gray.900',
        _after: {
          opacity: 1,
          w: '2rem',
        },
      }}
      _after={{
        opacity: isActive ? 1 : 0,
        content: '""',
        position: 'absolute',
        insetStart: '50%',
        bottom: '0.2em',
        transform: rtlValue('translateX(-50%)', 'translateX(50%)'),
        transition: '0.2s',
        w: isActive ? '2rem' : 0,
        h: '2px',
        borderRadius: 'full',
        bg: 'currentColor',
        justifyItems: 'center',
      }}
      onClick={navOnClose}
      {...rest}
    >
      <Flex direction="column" align="center" fontSize="lg">
        {icon}
        <Text fontSize="xs">{children}</Text>
      </Flex>
    </Box>
  );
};
