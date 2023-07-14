import { Stack, Text } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';

import { Page, PageContent } from '@/components/Page';

export default function PageBoulderCreate() {
  const form = useForm();
  return (
    <Page>
      <PageContent>
        <Formiz connect={form}>
          <Stack>
            <Text> Page pour la création de blocks</Text>
          </Stack>
        </Formiz>
      </PageContent>
    </Page>
  );
}
