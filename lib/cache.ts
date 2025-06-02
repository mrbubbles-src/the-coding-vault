import { ICategories } from '@/types/types';
import { getCategories } from './db';

let cachedCategories: ICategories[] | null = null;

export const getCachedCategories = async () => {
  if (cachedCategories) return cachedCategories;
  const categories = await getCategories();
  cachedCategories = categories;
  return categories;
};
