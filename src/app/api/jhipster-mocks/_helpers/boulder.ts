import { Boulder, Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

import { unknownErrorResponse } from '@/app/api/jhipster-mocks/_helpers/api';

export type BoulderFormatted<B extends Partial<Boulder> = Boulder> = ReturnType<
  typeof formatBoulderFromDb<B>
>;

export const formatBoulderFromDb = <B extends Partial<Boulder>>(
  boulder?: B | null
) => {
  if (!boulder) {
    return undefined;
  }

  // Drop some fields
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ...boulderSafe } = boulder;

  // Format fields for UI
  return {
    ...boulderSafe,
  };
};

export const prepareBoulderForDb = <B extends Partial<BoulderFormatted>>(
  boulder: B
) => {
  // Format fields for database
  return {
    ...boulder,
  };
};

export const boulderErrorResponse = (e: unknown) => {
  if (
    e instanceof Prisma.PrismaClientKnownRequestError &&
    e.code === 'P2002' &&
    Array.isArray(e.meta?.target) &&
    e.meta?.target?.includes('name')
  ) {
    return NextResponse.json(
      { title: 'Boulder name already used', errorKey: 'boulderexists' },
      { status: 400 }
    );
  }

  return unknownErrorResponse();
};
