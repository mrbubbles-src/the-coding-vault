import { NextResponse } from 'next/server';
import { db } from '@/drizzle/db/index';
import { categories } from '@/drizzle/db/schema';
import { asc } from 'drizzle-orm';

export async function GET() {
  const dbCategories = await db
    .select()
    .from(categories)
    .orderBy(asc(categories.order));

  return NextResponse.json(dbCategories, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
