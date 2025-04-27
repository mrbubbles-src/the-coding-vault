import prisma from './prisma';
import { ICategories } from './types';

const getCategories = async (): Promise<Array<ICategories>> =>
  await prisma.category.findMany({
    orderBy: { order: 'asc' },
  });
// const getEntryBySlug = async () => {};
// const fetchEntryBySlug = async () => {};
// // const getEntryBySlug = async () => {};
// // const getEntryBySlug = async () => {};
// // const getEntryBySlug = async () => {};

export { getCategories };
