ALTER TABLE "Category" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "VaultEntry" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();