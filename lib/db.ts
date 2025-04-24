// import { cache } from 'react';
// import prisma from './prisma';

// const fetchEntriesMetadata = cache(
//   async (): Promise<
//     Array<{
//       slug: string;
//       title: string;
//       category: string;
//     }>
//   > => {
//     return prisma.vaultEntry.findMany({
//       select: { slug: true, title: true, category: true },
//       where: { published: true },
//     });
//   },
// );
// const fetchEntryBySlug = async () => {};
// // const getEntryBySlug = async () => {};
// // const getEntryBySlug = async () => {};
// // const getEntryBySlug = async () => {};
// // const getEntryBySlug = async () => {};

// export { fetchEntryBySlug, fetchEntriesMetadata };
