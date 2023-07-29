import { z } from 'zod';

import { zUser } from '../users/schema';

export type BoulderGrade = z.infer<ReturnType<typeof zBoulderGrade>>;
export const zBoulderGrade = () =>
  z.enum([
    '5a',
    '5a+',
    '5b',
    '5b+',
    '5c',
    '5c+',
    '6a',
    '6a+',
    '6b',
    '6b+',
    '6c',
    '6c+',
    '7a',
    '7a+',
    '7b',
    '7b+',
    '7c',
    '7c+',
    '8a',
    '8a+',
    '8b',
    '8b+',
    '8c',
    '8c+',
    '9a',
    '9a+',
    '9b',
    '9b',
    '9c',
    '9c+',
  ]);

export type BoulderStatus = z.infer<ReturnType<typeof zBoulderStatus>>;
export const zBoulderStatus = () =>
  z.enum(['DONE', 'TRIED', 'ABANDONED', 'NOT_TRIED']);

export type BoulderTag = z.infer<ReturnType<typeof zBoulderTag>>;
export const zBoulderTag = () =>
  z.enum([
    'Balance',
    'Strength',
    'Dynamic',
    'Coordination',
    'Risky',
    'Crimps',
    'Sloppers',
    'Complex method',
    'Flexibility',
    'Slab',
    'Overhang',
  ]);

export type Boulder = z.infer<ReturnType<typeof zBoulder>>;
export const zBoulder = () =>
  z.object({
    id: z.number(),
    name: z.string(),
    grade: zBoulderGrade(),
    location: z.string(),
    tags: z.array(zBoulderTag()),
    createdBy: zUser().optional(),
    createdById: z.number().optional(),
    doneBy: z.array(zUser()).nullish(),
    triedBy: z.array(zUser()).nullish(),
    abandonedBy: z.array(zUser()).nullish(),
  });

export type BoulderList = z.infer<ReturnType<typeof zBoulderList>>;
export const zBoulderList = () =>
  z.object({
    boulders: z.array(zBoulder()),
    totalItems: z.string().transform(Number),
  });
