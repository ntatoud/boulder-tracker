import { FC } from 'react';

import {
  AccordionProps,
  Avatar,
  Badge,
  HStack,
  Tag,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { LuCheck, LuClock, LuX } from 'react-icons/lu';
import { RiQuestionMark } from 'react-icons/ri';

import {
  DataListAccordion,
  DataListAccordionButton,
  DataListAccordionIcon,
  DataListCell,
  DataListCellProps,
  DataListRow,
} from '@/components/DataList';
import { useAccount } from '@/features/account/service';

import { Boulder, BoulderStatus } from '../../schema';
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
      <Badge
        h="auto"
        py="1"
        borderRadius="md"
        justifyContent="center"
        variant="subtle"
        colorScheme={color}
      >
        {!isMobile ? content : icon}
      </Badge>
    </DataListCell>
  );
};

export type BoulderCaseProps = AccordionProps & {
  boulder: Boulder;
};
export const BoulderRow: FC<BoulderCaseProps> = ({ boulder, ...props }) => {
  console.log(boulder);
  const { data: account } = useAccount();
  const isCreator = account?.id === boulder.createdById;
  const isMobile = useBreakpointValue({ base: true, md: false });
  const status = 'DONE';
  return (
    <DataListAccordion key={boulder.id} {...props}>
      <DataListRow as={DataListAccordionButton} h="4rem">
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
          {boulder.tags.map((tag) => (
            <Tag key={boulder.tags.indexOf(tag)}>{tag}</Tag>
          ))}
        </DataListCell>
        <StatusCell
          isMobile={isMobile}
          status={status as BoulderStatus}
          colWidth="0.8"
        />
        {isCreator && <Text> Votre bloc</Text>}
        <DataListCell colName="actions">
          <DataListAccordionIcon />
        </DataListCell>
      </DataListRow>
      <BoulderPanel boulder={boulder} />
    </DataListAccordion>
  );
};
