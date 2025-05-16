import {
  pgTable,
  uniqueIndex,
  text,
  serial,
  timestamp,
  integer,
  foreignKey,
  boolean,
  jsonb,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const iconKey = pgEnum('IconKey', [
  'github',
  'node',
  'html',
  'css',
  'js',
  'react',
  'backend',
  'database',
  'default',
  'git',
]);
export const role = pgEnum('Role', ['SUPERADMIN', 'MODERATOR', 'GUEST']);

export const user = pgTable(
  'User',
  {
    id: text().primaryKey().notNull(),
    numericId: serial().notNull(),
    username: text().notNull(),
    password: text().notNull(),
    email: text().notNull(),
    role: role().default('GUEST').notNull(),
    authorName: text(),
    createdAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    uniqueIndex('User_email_key').using(
      'btree',
      table.email.asc().nullsLast().op('text_ops'),
    ),
    uniqueIndex('User_numericId_key').using(
      'btree',
      table.numericId.asc().nullsLast().op('int4_ops'),
    ),
    uniqueIndex('User_username_key').using(
      'btree',
      table.username.asc().nullsLast().op('text_ops'),
    ),
  ],
);

export const category = pgTable(
  'Category',
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    slug: text().notNull(),
    order: integer().notNull(),
    iconKey: iconKey().default('default').notNull(),
    createdAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    uniqueIndex('Category_name_key').using(
      'btree',
      table.name.asc().nullsLast().op('text_ops'),
    ),
    uniqueIndex('Category_slug_key').using(
      'btree',
      table.slug.asc().nullsLast().op('text_ops'),
    ),
  ],
);

export const vaultEntry = pgTable(
  'VaultEntry',
  {
    id: text().primaryKey().notNull(),
    numericId: serial().notNull(),
    title: text().notNull(),
    slug: text().notNull(),
    authorId: text().notNull(),
    published: boolean().default(false).notNull(),
    createdAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    categoryId: text().notNull(),
    content: jsonb().notNull(),
  },
  (table) => [
    uniqueIndex('VaultEntry_numericId_key').using(
      'btree',
      table.numericId.asc().nullsLast().op('int4_ops'),
    ),
    uniqueIndex('VaultEntry_slug_key').using(
      'btree',
      table.slug.asc().nullsLast().op('text_ops'),
    ),
    foreignKey({
      columns: [table.authorId],
      foreignColumns: [user.id],
      name: 'VaultEntry_authorId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('restrict'),
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [category.id],
      name: 'VaultEntry_categoryId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('restrict'),
  ],
);
