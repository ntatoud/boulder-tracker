import { FC } from 'react';

import {
  AccordionProps,
  Avatar,
  Badge,
  HStack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { LuCheck, LuClock, LuX } from 'react-icons/lu';
import { RiQuestionMark } from 'react-icons/ri';

import {
  DataListAccordion,
  DataListAccordionButton,
  DataListAccordionIcon,
  DataListAccordionPanel,
  DataListCell,
  DataListCellProps,
  DataListRow,
  DataListRowProps,
} from '@/components/DataList';

import { Boulder, BoulderStatus } from '../schema';
import { BoulderPanel } from './BoulderPanel';

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
    content: 'Not tried',
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

export type BoulderCaseProps = AccordionProps & {
  boulder: Boulder;
};
export const BoulderRow: FC<BoulderCaseProps> = ({ boulder, ...props }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const status = boulder.statusByUsers.split(' ').pop() ?? 'NOT_TRIED';
  return (
    <DataListAccordion key={boulder.id} {...props}>
      <DataListRow as={DataListAccordionButton}>
        <DataListCell colName="boulder" colWidth="1">
          <HStack>
            <Avatar variant="solid" size="sm" name={boulder.name} />
            <Text noOfLines={1}>{boulder.name}</Text>
          </HStack>
        </DataListCell>
        <DataListCell
          colName="grade"
          align={{ base: 'flex-end', md: 'flex-start' }}
          colWidth="0.4"
        >
          <Text>{boulder.grade}</Text>
        </DataListCell>
        <DataListCell colName="tags" isVisible={{ base: false, md: true }}>
          {boulder.tags.split(',')}
        </DataListCell>
        <StatusCell
          isMobile={isMobile}
          status={status as BoulderStatus}
          colWidth="0.8"
        />
        <DataListCell colName="actions">
          <DataListAccordionIcon />
        </DataListCell>
      </DataListRow>
      <BoulderPanel boulder={boulder} />
    </DataListAccordion>
  );
};
