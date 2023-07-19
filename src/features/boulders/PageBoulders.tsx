import { HStack, Heading, Stack } from '@chakra-ui/react';
import { LuPlus } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import { Page, PageContent, PageTopBar } from '@/components/Page';
import { ResponsiveIconButton } from '@/components/ResponsiveIconButton';

import { BoulderNav } from './BoulderNav';
import { BoulderList } from './_partials/BoulderList/BoulderList';

export default function PageBoulders() {
  return (
    <Page containerSize="xl" nav={<BoulderNav />}>
      <PageTopBar>
        <Heading size="lg">Boulders</Heading>
      </PageTopBar>
      <PageContent>
        <Stack spacing={4}>
          <HStack spacing={4}>
            <Heading flex="1" size="md">
              Les blocs
            </Heading>
            <ResponsiveIconButton
              as={Link}
              to="/boulders/create"
              variant="@primary"
              icon={<LuPlus />}
            >
              Ajouter un block
            </ResponsiveIconButton>{' '}
          </HStack>
          <BoulderList />
        </Stack>
      </PageContent>
    </Page>
  );
}
