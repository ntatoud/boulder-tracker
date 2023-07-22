import { NextResponse } from 'next/server';
import { z } from 'zod';

import {
  apiMethod,
  badRequestResponse,
} from '@/app/api/jhipster-mocks/_helpers/api';
import { formatBoulderFromDb } from '@/app/api/jhipster-mocks/_helpers/boulder';
import { db } from '@/app/api/jhipster-mocks/_helpers/db';

export const GET = apiMethod({
  admin: true,
  handler: async ({ params }) => {
    const safeParams = z.object({ name: z.string() }).safeParse(params);
    if (!safeParams.success) {
      return badRequestResponse({ details: safeParams.error });
    }

    const boulder = formatBoulderFromDb(
      await db.boulder.findUnique({ where: { name: safeParams.data.name } })
    );
    console.log(boulder);
    return NextResponse.json(boulder);
  },
});

export const DELETE = apiMethod({
  admin: true,
  handler: async ({ params, user }) => {
    console.log(user);

    const safeParams = z.object({ name: z.string() }).safeParse(params);
    if (!safeParams.success) {
      return badRequestResponse({ details: safeParams.error });
    }

    await db.boulder.delete({
      where: { name: safeParams.data.name, NOT: { id: 0 } },
    });

    return new NextResponse('ok', { status: 200 });
  },
});
