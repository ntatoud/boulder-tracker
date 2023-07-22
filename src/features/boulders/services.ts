import { createQueryKeys } from '@lukemorales/query-key-factory';
import {
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import Axios, { AxiosError } from 'axios';

import { Boulder, BoulderList, zBoulder, zBoulderList } from './schema';

type BoulderMutateError = ApiErrorResponse & {
  errorKey: 'boulderexists';
};

const bouldersKeys = createQueryKeys('bouldersService', {
  boulders: (params: { page?: number; size?: number }) => [params],
  boulder: (params: { name?: string }) => [params],
  boulderForm: null,
});

export const useBoulderCreate = (
  config: UseMutationOptions<
    Boulder,
    AxiosError<BoulderMutateError>,
    Pick<Boulder, 'name' | 'location' | 'tags' | 'grade' | 'statusByUsers'>
  > = {}
) => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ ...payload }) => {
      const response = await Axios.post('/boulders', {
        ...payload,
      });
      return zBoulder().parse(response.data);
    },
    {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries(bouldersKeys.boulders._def);
        config?.onSuccess?.(...args);
      },
    }
  );
};

export const useBoulderList = (
  { page = 0, size = 10 } = {},
  queryOptions: UseQueryOptions<BoulderList> = {}
) => {
  const query = useQuery({
    queryKey: bouldersKeys.boulders({ page, size }).queryKey,
    queryFn: async () => {
      const response = await Axios.get('/boulders', {
        params: { page, size, sort: 'id,desc' },
      });
      return zBoulderList().parse({
        boulders: response.data,
        totalItems: response.headers?.['x-total-count'],
      });
    },
    keepPreviousData: true,
    ...queryOptions,
  });

  const boulders = query.data?.boulders;
  const totalItems = query.data?.totalItems ?? 0;
  const totalPages = Math.ceil(totalItems / size);
  const hasMore = page + 1 < totalPages;
  const isLoadingPage = query.isFetching;

  return {
    boulders,
    totalItems,
    hasMore,
    totalPages,
    isLoadingPage,
    ...query,
  };
};

export const useBoulderDelete = (
  config: UseMutationOptions<
    void,
    AxiosError<ApiErrorResponse>,
    Pick<Boulder, 'name'>
  > = {}
) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (boulder) => {
      await Axios.delete(`/boulders/${boulder.name}`);
    },
    {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries(bouldersKeys.boulders._def);
        config?.onSuccess?.(...args);
      },
    }
  );
};
