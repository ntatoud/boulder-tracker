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

import {
  DataList,
  DataListAccordion,
  DataListAccordionButton,
  DataListAccordionIcon,
  DataListAccordionPanel,
  DataListCell,
  DataListFooter,
  DataListHeader,
  DataListProps,
  DataListRow,
} from '@/components/DataList';
import {
  Pagination,
  PaginationButtonFirstPage,
  PaginationButtonLastPage,
  PaginationButtonNextPage,
  PaginationButtonPrevPage,
  PaginationInfo,
} from '@/components/Pagination';

const statuses = {
  success: 'success',
  pending: 'warning',
  abandon: 'error',
};

type Status = keyof typeof statuses;

const badgeContent = {
  success: {
    icon: <LuCheck />,
    content: 'Validé',
    color: '',
  },
  pending: {
    icon: <LuClock />,
    content: 'En Cours',
  },
  abandon: {
    icon: <LuX />,
    content: 'Abandon',
  },
};

type StatusCellProps = {
  isMobile: boolean | undefined;
  status: Status;
};

const StatusCell = ({ isMobile, status }: StatusCellProps) => {
  const { icon, content } = badgeContent[status];
  return (
    <DataListCell colName="status" align="center">
      <Badge
        h="5"
        justifyContent="center"
        variant="subtle"
        colorScheme={statuses[status]}
      >
        {!isMobile ? content : icon}
      </Badge>
    </DataListCell>
  );
};

type BoulderDataListProps = DataListProps;

export const BoulderDataList: FC<
  React.PropsWithChildren<BoulderDataListProps>
> = ({ ...props }) => {
  const { t } = useTranslation(['boulders']);
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <DataList defaultIndex={[0]} minW="-moz-fit-content" {...props}>
      <DataListHeader>
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

      <DataListAccordion>
        <DataListRow as={DataListAccordionButton}>
          <DataListCell colName="boulder">
            <HStack>
              <Avatar variant="solid" size="sm" name={'Bec&Ongles'} />
              <Text noOfLines={1}>Bec&Ongles</Text>
            </HStack>
          </DataListCell>
          <DataListCell
            colName="difficulty"
            align={{ base: 'flex-end', md: 'flex-start' }}
          >
            <Text>
              7b<sup>+</sup>
            </Text>
          </DataListCell>
          <DataListCell colName="tags" isVisible={{ base: false, md: true }}>
            Arqués
          </DataListCell>
          <StatusCell isMobile={isMobile} status={'success'} />
          <DataListCell colName="actions">
            <DataListAccordionIcon />
          </DataListCell>
        </DataListRow>
        <DataListAccordionPanel>Détails de fou</DataListAccordionPanel>
      </DataListAccordion>
      <DataListAccordion>
        <DataListRow as={DataListAccordionButton}>
          <DataListCell colName="boulder">
            <HStack>
              <Avatar variant="solid" size="sm" name={'PiedTasTerre'} />
              <Text noOfLines={1}>PiedTasTerre</Text>
            </HStack>
          </DataListCell>
          <DataListCell
            colName="difficulty"
            align={{ base: 'flex-end', md: 'flex-start' }}
          >
            7c
          </DataListCell>
          <DataListCell colName="tags">Dalle</DataListCell>
          <StatusCell isMobile={isMobile} status={'pending'} />
          <DataListCell colName="actions">
            <DataListAccordionIcon />
          </DataListCell>
        </DataListRow>
        <DataListAccordionPanel>Détails de fou</DataListAccordionPanel>
      </DataListAccordion>
      <DataListAccordion>
        <DataListRow as={DataListAccordionButton}>
          <DataListCell colName="boulder">
            <HStack>
              <Avatar variant="solid" size="sm" name={'VolOnTerre'} />
              <Text noOfLines={1}>VolOnTerre</Text>
            </HStack>
          </DataListCell>
          <DataListCell
            colName="difficulty"
            align={{ base: 'flex-end', md: 'flex-start' }}
          >
            8a
          </DataListCell>
          <DataListCell colName="tags">Dynamique</DataListCell>
          <StatusCell isMobile={isMobile} status={'abandon'} />
          <DataListCell colName="actions">
            <DataListAccordionIcon />
          </DataListCell>
        </DataListRow>
        <DataListAccordionPanel>Détails de fou</DataListAccordionPanel>
      </DataListAccordion>
      <DataListFooter>
        <Pagination
          isLoadingPage={false}
          setPage={() => undefined}
          page={1}
          pageSize={10}
          totalItems={3}
        >
          <PaginationButtonFirstPage />
          <PaginationButtonPrevPage />
          <PaginationInfo flex="1" />
          <PaginationButtonNextPage />
          <PaginationButtonLastPage />
        </Pagination>
      </DataListFooter>
    </DataList>
  );
};
