import { Heading } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useNavigate } from 'react-router-dom';

import { Page, PageContent, PageTopBar } from '@/components/Page';
import { useToastError, useToastSuccess } from '@/components/Toast';

import { useAccount } from '../account/service';
import { BoulderCreateForm } from './_partials/BoulderCreateForm';
import { Boulder } from './schema';
import { useBoulderCreate } from './services';

export default function PageBoulderCreate() {
  const navigate = useNavigate();
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();
  const account = useAccount();
  const { mutate: createBoulder, isLoading: boulderLoading } = useBoulderCreate(
    {
      onError: (error) => {
        if (error.response) {
          const { title, errorKey } = error.response.data;
          toastError({
            title: 'Erreur lors de la création',
            description: title,
          });

          if (errorKey === 'boulderexists') {
            boulderForm.setErrors({
              name: 'Name already used',
            });
          } else {
            boulderForm.setErrors({
              name: errorKey,
            });
          }
        }
      },
      onSuccess: () => {
        toastSuccess({
          title: 'Success',
        });
        navigate('../');
      },
    }
  );

  const boulderForm = useForm<
    Pick<Boulder, 'name' | 'location' | 'tags' | 'grade' | 'statusByUsers'>
  >({
    onValidSubmit: (values) => {
      const { tags, statusByUsers: status, ...restValues } = { ...values };
      const newBoulder = {
        ...restValues,
        tags: [...tags].join(', '),
        statusByUsers: `${
          account.data?.firstName ?? account.data?.email
        } ${status}`,
      };
      createBoulder(newBoulder);
    },
  });

  return (
    <Page containerSize="lg" isFocusMode>
      <PageTopBar showBack onBack={() => navigate('../')}>
        <Heading size="md">Add your boulder</Heading>
      </PageTopBar>
      <Formiz connect={boulderForm}>
        <form noValidate onSubmit={boulderForm.submit}>
          <PageContent>
            <BoulderCreateForm
              w={{ base: '100vw', md: 'full' }}
              alignSelf="center"
              isLoading={boulderLoading}
            />
          </PageContent>
        </form>
      </Formiz>
    </Page>
  );
}
