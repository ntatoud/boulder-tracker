import { Button, Card, CardBody, Flex, Heading, Stack } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { LuArrowRight, LuPlus } from 'react-icons/lu';

import { FieldInput } from '@/components/FieldInput';
import { FieldMultiSelect } from '@/components/FieldMultiSelect';
import { FieldSelect } from '@/components/FieldSelect';
import { Page, PageContent } from '@/components/Page';

import { GRADES, TAGS } from './types';

export default function PageBoulderCreate() {
  const form = useForm();
  return (
    <Page containerSize="lg">
      <PageContent>
        <Heading size="lg" mb="4">
          Add your boulder
        </Heading>
        <Card minH="22rem">
          <CardBody>
            <Stack spacing={6}>
              <Formiz connect={form} autoForm>
                <FieldInput
                  required={'Name must be specified' as string}
                  name="name"
                  label="Boulder Name"
                  helper="Block en Stock"
                />
                <FieldSelect
                  required="Please select a grade"
                  name="grade"
                  label="Grade"
                  options={Object.keys(GRADES).map((grade) => {
                    return { label: grade, value: grade };
                  })}
                  helper="Chose the grade of your boulder"
                />
                <FieldMultiSelect
                  name="tags"
                  label="Tags"
                  options={Object.values(TAGS).map((tag) => {
                    return { label: tag, value: tag };
                  })}
                  helper="Chose the attributes of your boulder"
                />
                <Flex>
                  <Button
                    type="submit"
                    rightIcon={<LuArrowRight />}
                    variant="@primary"
                    ms="auto"
                  >
                    FINISH
                  </Button>
                </Flex>
              </Formiz>
            </Stack>
          </CardBody>
        </Card>
      </PageContent>
    </Page>
  );
}
