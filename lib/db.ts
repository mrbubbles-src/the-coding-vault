// import prisma from './prisma';
// import { Route } from 'next';
import { ICategories } from '@/types/types';

const getCategories = async (): Promise<Array<ICategories>> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    console.log('Fetch baseUrl:', baseUrl);
    const res = await fetch(`/api/vault/categories`, {
      next: { revalidate: 86400 },
    });
    const data: Array<ICategories> = await res.json();
    return data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Kategorien:', error);
    return [];
  }
};
// const getCategories = async (): Promise<Array<ICategories>> => {
//   try {
//     return await prisma.category.findMany({
//       orderBy: { order: 'asc' },
//     });
//   } catch (error) {
//     console.error('Fehler beim Abrufen der Kategorien:', error);
//     return [];
//   }
// };
// const getEntryBySlug = async () => {};
// const fetchEntryBySlug = async () => {};
// // const getEntryBySlug = async () => {};
// // const getEntryBySlug = async () => {};
// // const getEntryBySlug = async () => {};

export { getCategories };
