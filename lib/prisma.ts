import { PrismaClient } from '@prisma/client';
// import { PrismaClient } from '@/generated/prisma/client'; // falls das mit dem oberen nicht funzt

const globalForPrisma = global as unknown as { prisma: PrismaClient };

/**
 * Initializes or retrieves a singleton instance of the PrismaClient.
 * 
 * This ensures that only one instance of PrismaClient is created and reused
 * across the application, preventing issues such as multiple database connections
 * in environments like serverless functions or hot-reloading during development.
 * 
 * @remarks
 * - If `globalForPrisma.prisma` exists, it reuses the existing instance.
 * - Otherwise, it creates a new instance of PrismaClient.
 * 
 * @see {@link https://www.prisma.io/docs/concepts/components/prisma-client Prisma Client Documentation}
 */
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
