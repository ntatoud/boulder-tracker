import { FC } from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  CardProps,
  HStack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

import { Icon } from '@/components/Icons';

export type FeatureCardProps = CardProps & {
  icon: IconType;
  iconColor: string;
  title: string;
};

export const FeatureCard: FC<React.PropsWithChildren<FeatureCardProps>> = ({
  children,
  icon,
  iconColor,
  title,
  ...props
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <>
      <Card
        borderRadius="2xl"
        {...props}
        h="fit-content"
        w={{ base: '80vw', md: '40vw' }}
      >
        <CardHeader fontSize={{ base: 'lg', md: '2xl' }} borderRadius="md">
          <HStack justify="flex-start">
            <Icon
              icon={icon}
              color={iconColor}
              fontSize="2rem"
              h="4rem"
              w="4rem"
              borderRadius="2rem"
              bg="gray.900"
              _dark={{ bg: 'gray.300' }}
            />
            <Text fontWeight="bold" px="2">
              {title}
            </Text>
          </HStack>
        </CardHeader>
        {!isMobile && (
          <CardBody fontSize={{ base: 'lg', md: 'xl' }}>{children}</CardBody>
        )}
      </Card>
    </>
  );
};
