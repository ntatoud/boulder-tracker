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
import { LuCheck, LuTrash } from 'react-icons/lu';
import { RiHeart3Fill, RiHeart3Line } from 'react-icons/ri';

import { useToastError, useToastSuccess } from '@/components/Toast';
import { useAccount } from '@/features/account/service';
import { useUser } from '@/features/users/service';

import { Boulder } from '../../schema';
import { useBoulderDelete } from '../../services';

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

type BoulderPanelMenuProps = StackProps & { boulder: Boulder };
const BoulderPanelMenu: FC<BoulderPanelMenuProps> = ({ boulder, ...props }) => {
  const { isAdmin } = useAccount();
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();
  const { mutate: boulderDelete, isLoading: boulderDeleteLoading } =
    useBoulderDelete({
      onSuccess: (_, { name }: TODO) => {
        toastSuccess({
          title: 'Boulder was deleted',
          description: `Boulder ${name} was deleted`,
        });
      },
      onError: (_, { name }) => {
        toastError({
          title: 'Error on boulder delete',
          description: `Boulder ${name} was not found`,
        });
      },
    });
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
      {isAdmin && (
        <PanelMenuButton
          label="delete"
          icon={<LuTrash color="red" />}
          variant="@danger"
          bg="transparent"
          onClick={() => boulderDelete(boulder)}
          isDisabled={boulderDeleteLoading}
          isLoading={boulderDeleteLoading}
        />
      )}
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
      <BoulderPanelMenu boulder={boulder} flex="1" />
    </AccordionPanel>
  );
};
