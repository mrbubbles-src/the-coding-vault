-- CreateTable
CREATE TABLE "VaultEntry" (
    "id" TEXT NOT NULL,
    "numericId" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VaultEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VaultEntry_numericId_key" ON "VaultEntry"("numericId");

-- CreateIndex
CREATE UNIQUE INDEX "VaultEntry_slug_key" ON "VaultEntry"("slug");
