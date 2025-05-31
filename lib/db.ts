import { ICategories, IVaultEntry, TContent } from '@/types/types';
import { db } from '@/drizzle/db/index';
import { vaultEntries } from '@/drizzle/db/schema';
import { desc } from 'drizzle-orm';
import { toast } from 'sonner';
import { cache } from 'react';

const getCategories = cache(async (): Promise<Array<ICategories>> => {
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
});

const getMaxOrder = async (): Promise<number> => {
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

const getVaultEntryBySlug = cache(
  async (slug: string): Promise<IVaultEntry | null> => {
    const entry = await db.query.vaultEntries.findFirst({
      where: (entries, { eq }) => eq(entries.slug, slug),
      columns: {
        title: true,
        content: true,
      },
      with: {
        user: true,
      },
    });

    if (!entry) {
      return null;
    }
    const { user, ...rest } = entry;
    return {
      ...rest,
      content: rest.content as TContent,
      author: user.authorInfo ? { ...user.authorInfo } : user.username,
    };
  },
);

export { getCategories, getMaxOrder, getVaultEntryBySlug };
