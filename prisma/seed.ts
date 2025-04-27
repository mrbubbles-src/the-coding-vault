import { PrismaClient, IconKey } from '@/generated/prisma/client';

const prisma = new PrismaClient();

const categories = [
  {
    name: 'Git',
    slug: 'git',
    iconKey: IconKey.git,
    order: 0,
  },
  {
    name: 'GitHub',
    slug: 'github',
    iconKey: IconKey.github,
    order: 1,
  },
  {
    name: 'Node.js',
    slug: 'node',
    iconKey: IconKey.node,
    order: 2,
  },
  {
    name: 'HTML',
    slug: 'html',
    iconKey: IconKey.html,
    order: 3,
  },
  {
    name: 'CSS',
    slug: 'css',
    iconKey: IconKey.css,
    order: 4,
  },
  {
    name: 'JavaScript',
    slug: 'javascript',
    iconKey: IconKey.js,
    order: 5,
  },
  {
    name: 'React',
    slug: 'react',
    iconKey: IconKey.react,
    order: 6,
  },
  {
    name: 'Backend',
    slug: 'backend',
    iconKey: IconKey.backend,
    order: 7,
  },
  {
    name: 'Database',
    slug: 'database',
    iconKey: IconKey.database,
    order: 8,
  },
];

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
