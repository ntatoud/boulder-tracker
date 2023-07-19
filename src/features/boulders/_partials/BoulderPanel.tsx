import { FC } from 'react';

import {
  AccordionPanel,
  AccordionPanelProps,
  Box,
  Center,
  IconButton,
  IconButtonProps,
  Stack,
  StackProps,
  Text,
} from '@chakra-ui/react';
import { LuCheck } from 'react-icons/lu';
import { RiHeart3Fill, RiHeart3Line } from 'react-icons/ri';

import { Boulder } from '../schema';

export type BoulderPanelProps = AccordionPanelProps & {
  boulder: Boulder;
};

export const PanelMenuButton: FC<
  Omit<IconButtonProps, 'aria-label'> & { label: string }
> = ({ label, icon, ...props }) => {
  return (
    <IconButton
      {...props}
      w="2.5rem"
      h="2.5rem"
      borderRadius="1.25rem"
      aria-label={label}
      icon={icon}
    />
  );
};
const BoulderPanelMenu: FC<StackProps> = ({ ...props }) => {
  return (
    <Stack
      justifySelf="flex-end"
      h="full"
      zIndex="2"
      align="flex-end"
      justify="flex-end"
      pb="1rem"
      {...props}
    >
      <PanelMenuButton label="Done" icon={<LuCheck />} />
      <PanelMenuButton label="Like" icon={<RiHeart3Line />} />
      <PanelMenuButton label="Like" icon={<RiHeart3Fill />} />
    </Stack>
  );
};

export const BoulderPanel: FC<BoulderPanelProps> = ({ boulder, ...props }) => {
  return (
    <AccordionPanel h="32rem" {...props}>
      <Stack alignItems="center" position="absolute" h="30rem" w="90%">
        <Text>{boulder.location}</Text>
        <Box flex="1" bg="gray.600" w="full">
          <Center h="full">Image placeholder</Center>
        </Box>
      </Stack>
      <BoulderPanelMenu flex="1" />
    </AccordionPanel>
  );
};
