import prisma from '@/lib/prisma';

export async function GET() {
  const publishedPosts = await prisma.vaultEntry.findMany({
    where: { published: true },
  });
  return Response.json(publishedPosts);
}
