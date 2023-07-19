import React, { FC } from 'react';

import { Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import {
  DataList,
  DataListCell,
  DataListErrorState, // DataListFooter,
  DataListHeader,
  DataListHeaderProps,
  DataListLoadingState,
  DataListProps,
} from '@/components/DataList';

import { useBoulderList } from '../../services';
import { BoulderRow } from './BoulderRow';

type BoulderListHeaderProps = DataListHeaderProps;
const BoulderListHeader: FC<
  React.PropsWithChildren<BoulderListHeaderProps>
> = ({ ...props }) => {
  const { t } = useTranslation(['boulders']);
  return (
    <DataListHeader {...props}>
      <DataListCell colName="name" colWidth="1" align="flex-start">
        <Text>{t('boulders:dataList.headers.name')}</Text>
      </DataListCell>
      <DataListCell colName="difficulty" colWidth="0.4">
        <Text>{t('boulders:dataList.headers.difficulty')}</Text>
      </DataListCell>
      <DataListCell colName="tags" isVisible={{ base: false, md: true }}>
        <Text>{t('boulders:dataList.headers.tags')}</Text>
      </DataListCell>
      <DataListCell colName="status" colWidth="0.8" align="center">
        <Text>{t('boulders:dataList.headers.status')}</Text>
      </DataListCell>
      <DataListCell colName="actions" colWidth="2rem" align="flex-end" />
    </DataListHeader>
  );
};

type BoulderListProps = DataListProps;
export const BoulderList: FC<React.PropsWithChildren<BoulderListProps>> = ({
  ...props
}) => {
  const {
    data,
    refetch,
    isLoading: bouldersLoading,
    isError: bouldersError,
  } = useBoulderList();

  return (
    <DataList
      minH="-moz-fit-content"
      {...props}
      alignSelf="center"
      w={{ base: '100vw', md: 'full' }}
    >
      <BoulderListHeader />
      {bouldersLoading && <DataListLoadingState />}
      {bouldersError && (
        <DataListErrorState
          title="Failed to load Boulders"
          retry={() => refetch}
        />
      )}
      {data?.boulders.map((boulder) => {
        return <BoulderRow key={boulder.id} boulder={boulder} />;
      })}
    </DataList>
  );
};
