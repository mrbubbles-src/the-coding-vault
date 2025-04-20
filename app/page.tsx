// import { fetchEntriesMetadata } from '@/lib/db';

// export async function generateStaticParams() {
//   const entriesMetadata = await fetchEntriesMetadata();
//   return entriesMetadata.map(
//     (data: { slug: string; title: string; category: string }) => ({
//       slug: data.slug,
//       title: data.title,
//       category: data.category,
//     }),
//   );
// }

export default function Home() {
  return (
    <>
      <h1>This is currently a Work in progress. Stay tuned</h1>
    </>
  );
}
