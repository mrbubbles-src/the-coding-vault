import { ICategories } from '@/types/types';
import { db } from '@/drizzle/db/index';
import { categories } from '@/drizzle/db/schema';
import { asc } from 'drizzle-orm';

const getCategories = async (): Promise<Array<ICategories>> => {
  try {
    const dbCategories = await db
      .select()
      .from(categories)
      .orderBy(asc(categories.order));
    return dbCategories;
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
