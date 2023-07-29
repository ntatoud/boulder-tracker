import { Heading, Stack } from '@chakra-ui/react';

import { Page, PageContent, PageTopBar } from '@/components/Page';

import { BoulderNav } from '../_partials/BoulderNav';

export default function PageRanking() {
  return (
    <Page nav={<BoulderNav />}>
      <PageTopBar>
        <Heading>Boulders</Heading>
      </PageTopBar>
      <PageContent>
        <Stack>
          <Heading> RANKING </Heading>
        </Stack>
      </PageContent>
    </Page>
  );
}
