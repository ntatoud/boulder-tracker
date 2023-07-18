import { HStack, Heading, Stack } from '@chakra-ui/react';
import { LuPlus } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import { Page, PageContent } from '@/components/Page';
import { ResponsiveIconButton } from '@/components/ResponsiveIconButton';

import { BoulderDataList } from './_partials/BoulderDataList';

export default function PageBoulders() {
  return (
    <Page containerSize="xl">
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
          <BoulderDataList />
        </Stack>
      </PageContent>
    </Page>
  );
}
