import prisma from '@/lib/prisma';

export default async function Home() {
  const publishedPosts = await prisma.vaultEntry.findMany({
    where: { published: true },
  });
  console.log(publishedPosts);
  return (
    <>
      <h1>This is currently a Work in progress. Stay tuned</h1>
    </>
  );
}
