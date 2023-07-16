import { FC } from 'react';

import { Heading, Stack, StackProps, Text } from '@chakra-ui/react';
import { LuLineChart, LuList } from 'react-icons/lu';
import { RiGroupFill } from 'react-icons/ri';

import { FeatureCard } from '@/components/FeatureCard';

export type LoginShowFeatureProps = StackProps;

export const LoginShowFeatures: FC<StackProps> = ({ ...props }) => {
  return (
    <Stack spacing="5" align="center" pb="5" {...props}>
      <Heading
        color="blackAlpha.900"
        zIndex="2"
        _dark={{
          color: 'gray.200',
        }}
      >
        {' '}
        Features{' '}
      </Heading>
      <FeatureCard icon={LuList} iconColor="green" title="Boulder Database">
        <Text>
          Find all sorts of boulders and track which one you did, plan to do,
          and many more options
        </Text>
      </FeatureCard>
      <FeatureCard
        icon={LuLineChart}
        iconColor="green"
        title="Progress Tracking"
      >
        <Text>
          Track your progression, determine your strenghts and weaknesses
        </Text>
      </FeatureCard>
      <FeatureCard
        icon={RiGroupFill}
        iconColor="green"
        title="Connect with your friends"
      >
        <Text>
          Find your friends and share your boulders and progress with them.
        </Text>
      </FeatureCard>
    </Stack>
  );
};
