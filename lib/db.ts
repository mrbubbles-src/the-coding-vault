// import prisma from './prisma';
// import { Route } from 'next';
import { ICategories } from '@/types/types';

const getCategories = async (): Promise<Array<ICategories>> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    const res = await fetch(`${baseUrl}/api/vault/categories`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);
    return await res.json();
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
