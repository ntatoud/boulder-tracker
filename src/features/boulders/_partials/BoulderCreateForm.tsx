import { FC } from 'react';

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardProps,
  Stack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { FieldInput } from '@/components/FieldInput';
import { FieldMultiSelect } from '@/components/FieldMultiSelect';
import { FieldSelect } from '@/components/FieldSelect';

import { zBoulderGrade, zBoulderTag } from '../schema';

export type BoulderCreateFormProps = CardProps & {
  isLoading: boolean;
};
export const BoulderCreateForm: FC<BoulderCreateFormProps> = ({
  isLoading: boulderLoading,
  ...rest
}) => {
  const navigate = useNavigate();
  return (
    <Card minH="22rem" {...rest}>
      <CardBody>
        <Stack>
          <FieldInput
            required="Name must be specified"
            name="name"
            label="Boulder Name"
            helper="Block en Stock"
          />
          <FieldSelect
            required="Please select a grade"
            name="grade"
            label="Grade"
            options={Object.keys(zBoulderGrade().enum).map((grade) => {
              return { label: grade, value: grade };
            })}
            helper="Chose the grade of your boulder"
          />
          <FieldMultiSelect
            name="tags"
            label="Tags"
            options={Object.keys(zBoulderTag().enum).map((tag) => {
              return { label: tag, value: tag };
            })}
            helper="Chose the attributes of your boulder"
          />
          <FieldInput
            name="location"
            label="Location"
            helper="Ex: Arkose Rouen"
          />
          {/* <FieldSelect
            name="status"
            label="Status"
            options={Object.keys(zBoulderStatus().enum).map((status) => {
              return { label: status, value: status };
            })}
            helper="Did you top this boulder ?"
          /> */}
        </Stack>
      </CardBody>
      <CardFooter>
        <ButtonGroup flex="1" justifyContent="space-between">
          <Button onClick={() => navigate('../')}>cancel</Button>
          <Button type="submit" variant="@primary" isLoading={boulderLoading}>
            Submit
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
