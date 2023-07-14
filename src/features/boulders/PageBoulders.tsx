import { LuPlus } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import { Page, PageContent } from '@/components/Page';
import { ResponsiveIconButton } from '@/components/ResponsiveIconButton';

import { BoulderDataList } from './_partials/BoulderDataList';

export default function PageBoulders() {
  return (
    <Page containerSize="xl">
      <PageContent>
        <ResponsiveIconButton
          as={Link}
          to="/boulders/create"
          variant="@primary"
          icon={<LuPlus />}
        >
          Ajouter un block
        </ResponsiveIconButton>
        <BoulderDataList />
      </PageContent>
    </Page>
  );
}
