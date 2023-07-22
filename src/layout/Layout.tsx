import React, { FC, useMemo, useState } from 'react';

import { Flex, useDisclosure } from '@chakra-ui/react';

import { Viewport } from '@/components/Viewport';
import { BottomNavBar } from '@/layout/BottomNavBar';
import { LayoutContext } from '@/layout/LayoutContext';

export const Layout: FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const nav = useDisclosure();

  const providerValue = useMemo(
    () => ({
      isFocusMode,
      setIsFocusMode,
      navIsOpen: nav.isOpen,
      navOnClose: nav.onClose,
      navOnOpen: nav.onOpen,
    }),
    [isFocusMode, nav.isOpen, nav.onClose, nav.onOpen]
  );

  return (
    <LayoutContext.Provider value={providerValue}>
      <Viewport>
        <Flex flex="1" direction="column">
          {children}
        </Flex>
        <BottomNavBar />
      </Viewport>
    </LayoutContext.Provider>
  );
};
