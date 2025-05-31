import { db } from '@/drizzle/db';
import { vaultEntries } from '@/drizzle/db/schema';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const { title, content, slug, categoryId, authorId, description } = body;
  const order = Number(body.order);
  const parsedContent = JSON.parse(content);

  if (!parsedContent?.blocks?.length) {
    return NextResponse.json(
      { message: 'Content must include at least one block.' },
      { status: 400 },
    );
  }
  if (
    !title?.trim() ||
    !slug?.trim() ||
    !categoryId?.trim() ||
    !authorId?.trim() ||
    !order ||
    !description?.trim()
  ) {
    return NextResponse.json(
      { message: 'Invalid or missing fields in payload.' },
      { status: 400 },
    );
  }

  try {
    await db.insert(vaultEntries).values({
      title,
      content: parsedContent,
      slug,
      categoryId,
      authorId,
      order,
      description,
    });

    return NextResponse.json(
      {
        message: 'Entry saved successfully.',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error saving entry:', error);
    return NextResponse.json(
      { message: 'Failed to save entry.', error: error },
      { status: 500 },
    );
  }
}
