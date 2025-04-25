-- CreateEnum
CREATE TYPE "IconKey" AS ENUM ('github', 'node', 'html', 'css', 'js', 'react', 'backend', 'database', 'default');

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "iconKey" "IconKey" NOT NULL DEFAULT 'default';
