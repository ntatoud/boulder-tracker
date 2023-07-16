import React, { FC } from 'react';

import {
  Avatar,
  Badge,
  HStack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { LuCheck, LuClock, LuX } from 'react-icons/lu';
import { RiQuestionMark } from 'react-icons/ri';

import {
  DataList,
  DataListAccordion,
  DataListAccordionButton,
  DataListAccordionIcon,
  DataListAccordionPanel,
  DataListCell,
  DataListCellProps, // DataListFooter,
  DataListHeader,
  DataListHeaderProps,
  DataListProps,
  DataListRow,
} from '@/components/DataList';

// import {
//   Pagination,
//   PaginationButtonFirstPage,
//   PaginationButtonLastPage,
//   PaginationButtonNextPage,
//   PaginationButtonPrevPage,
//   PaginationInfo,
// } from '@/components/Pagination';
// import { useAccount } from '@/features/account/service';
import { BoulderStatus } from '../schema';
import { useBoulderList } from '../services';

const badgeContent = {
  DONE: {
    icon: <LuCheck />,
    content: 'Validé',
    color: 'success',
  },
  TRIED: {
    icon: <LuClock />,
    content: 'En Cours',
    color: 'warning',
  },
  ABANDONED: {
    icon: <LuX />,
    content: 'Abandon',
    color: 'error',
  },
  NOT_TRIED: {
    icon: <RiQuestionMark />,
    content: 'Abandon',
    color: 'info',
  },
};

type StatusCellProps = DataListCellProps & {
  isMobile: boolean | undefined;
  status: BoulderStatus;
};

const StatusCell = ({ isMobile, status, ...rest }: StatusCellProps) => {
  const { icon, content, color } = badgeContent[status];
  return (
    <DataListCell colName="status" align="center" {...rest}>
      <Badge h="5" justifyContent="center" variant="subtle" colorScheme={color}>
        {!isMobile ? content : icon}
      </Badge>
    </DataListCell>
  );
};

type BoulderDataListHeaderProps = DataListHeaderProps;
const BoulderDataListHeader: FC<
  React.PropsWithChildren<BoulderDataListHeaderProps>
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

type BoulderDataListProps = DataListProps;
export const BoulderDataList: FC<
  React.PropsWithChildren<BoulderDataListProps>
> = ({ ...props }) => {
  const boulders = useBoulderList();
  // const { t } = useTranslation(['boulders']);
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <DataList defaultIndex={[0]} minW="-moz-fit-content" {...props}>
      <BoulderDataListHeader />
      {boulders.data?.boulders.map((boulder) => {
        const status = boulder.statusByUsers.split(' ').pop() ?? 'NOT_TRIED';
        return (
          <DataListAccordion key={boulder.id}>
            <DataListRow as={DataListAccordionButton}>
              <DataListCell colName="boulder">
                <HStack>
                  <Avatar variant="solid" size="sm" name={boulder.name} />
                  <Text noOfLines={1}>{boulder.name}</Text>
                </HStack>
              </DataListCell>
              <DataListCell
                colName="grade"
                align={{ base: 'flex-end', md: 'flex-start' }}
              >
                <Text>{boulder.grade}</Text>
              </DataListCell>
              <DataListCell
                colName="tags"
                isVisible={{ base: false, md: true }}
              >
                {boulder.tags.split(',')}
              </DataListCell>
              <StatusCell
                isMobile={isMobile}
                status={status as BoulderStatus}
              />
              <DataListCell colName="actions">
                <DataListAccordionIcon />
              </DataListCell>
            </DataListRow>
            <DataListAccordionPanel>{boulder.location}</DataListAccordionPanel>
          </DataListAccordion>
        );
      })}
      {/* <DataListFooter>
        <Pagination
          isLoadingPage={false}
          setPage={() => undefined}
          page={1}
          pageSize={100}
          totalItems={boulders.data?.totalItems}
        >
          <PaginationButtonFirstPage />
          <PaginationButtonPrevPage />
          <PaginationInfo flex="1" />
          <PaginationButtonNextPage />
          <PaginationButtonLastPage />
        </Pagination>
      </DataListFooter> */}
    </DataList>
  );
};
