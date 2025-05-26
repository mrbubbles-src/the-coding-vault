import { ICategories } from '@/types/types';
import { db } from '@/drizzle/db/index';
import { vaultEntries } from '@/drizzle/db/schema';
import { desc } from 'drizzle-orm';
import { toast } from 'sonner';

const getCategories = async (): Promise<Array<ICategories>> => {
  try {
    const dbCategories = await db.query.categories.findMany({
      with: {
        vaultEntries: {
          columns: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
      orderBy: (c, { asc }) => [asc(c.order)],
    });
    return dbCategories;
  } catch (error) {
    console.error('Fehler beim Abrufen der Kategorien:', error);
    toast.error(
      'Fehler beim Abrufen der Kategorien. Bitte überprüfen Sie die Konsole für Details.',
    );
    return [];
  }
};

export const getMaxOrder = async (): Promise<number> => {
  try {
    const maxOrder = await db
      .select({ order: vaultEntries.order })
      .from(vaultEntries)
      .orderBy(desc(vaultEntries.order))
      .limit(1)
      .then((rows) => rows[0]?.order ?? 0);
    return maxOrder;
  } catch (error) {
    console.error('Fehler beim Abrufen der maximalen Reihenfolge:', error);
    toast.error(
      'Fehler beim Abrufen der maximalen Reihenfolge. Bitte überprüfen Sie die Konsole für Details.',
    );
    return 0;
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
