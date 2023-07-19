import { NextResponse } from 'next/server';
import { z } from 'zod';

import {
  apiMethod,
  badRequestResponse,
} from '@/app/api/jhipster-mocks/_helpers/api';
import {
  boulderErrorResponse,
  formatBoulderFromDb,
  prepareBoulderForDb,
} from '@/app/api/jhipster-mocks/_helpers/boulder';
import { db } from '@/app/api/jhipster-mocks/_helpers/db';

export const GET = apiMethod({
  handler: async ({ searchParams }) => {
    const options = z
      .object({
        page: z.string().optional().default('0').transform(Number),
        size: z.string().optional().default('10').transform(Number),
      })
      .default({ page: '0', size: '10' })
      .parse({
        page: searchParams.get('page'),
        size: searchParams.get('size'),
      });

    const [boulders, total] = await Promise.all([
      db.boulder.findMany({
        skip: options.page * options.size,
        take: options.size,
      }),
      db.boulder.count(),
    ]);

    const headers = new Headers();
    headers.set('x-total-count', total.toString());
    return NextResponse.json(boulders.map(formatBoulderFromDb), { headers });
  },
});

export const POST = apiMethod({
  handler: async ({ req }) => {
    const bodyParsed = z
      .object({
        name: z.string(),
        grade: z.string(),
        location: z.string(),
        tags: z.string(),
        statusByUsers: z.string(),
      })
      .safeParse(await req.json());
    if (!bodyParsed.success) {
      return badRequestResponse({ details: bodyParsed.error });
    }

    try {
      const boulder = formatBoulderFromDb(
        await db.boulder.create({
          data: prepareBoulderForDb(bodyParsed.data),
        })
      );
      return NextResponse.json(boulder);
    } catch (e) {
      return boulderErrorResponse(e);
    }
  },
});

export const PUT = apiMethod({
  handler: async ({ req }) => {
    const bodyParsed = z
      .object({
        id: z.number(),
        name: z.string(),
        grade: z.string(),
        location: z.string(),
        tags: z.string(),
      })
      .safeParse(await req.json());

    if (!bodyParsed.success) {
      return badRequestResponse({ details: bodyParsed.error });
    }

    try {
      const boulder = formatBoulderFromDb(
        await db.boulder.update({
          where: { id: bodyParsed.data.id },
          data: prepareBoulderForDb(bodyParsed.data),
        })
      );
      return NextResponse.json(boulder);
    } catch (e) {
      return boulderErrorResponse(e);
    }
  },
});
