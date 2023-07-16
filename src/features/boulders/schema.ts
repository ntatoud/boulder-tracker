import { z } from 'zod';

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
  z.enum(['Dynamic', 'Balance', 'Crimps', 'Strength']);

export type Boulder = z.infer<ReturnType<typeof zBoulder>>;
export const zBoulder = () =>
  z.object({
    id: z.number(),
    name: z.string(),
    grade: zBoulderGrade(),
    location: z.string(),
    tags: z.string(),
    statusByUsers: z.string(),
  });

export type BoulderStatusByUser = z.infer<
  ReturnType<typeof zBoulderStatusByUser>
>;
export const zBoulderStatusByUser = () => z.string();
// z.object({
//   id: z.number(),
//   boulder: zBoulder(),
//   user: zUser(),
//   status: zBoulderStatus(),
//   boulderId: z.number(),
//   userId: z.number(),
// }) ;

export type BoulderList = z.infer<ReturnType<typeof zBoulderList>>;
export const zBoulderList = () =>
  z.object({
    boulders: z.array(zBoulder()),
    totalItems: z.string().transform(Number),
  });
