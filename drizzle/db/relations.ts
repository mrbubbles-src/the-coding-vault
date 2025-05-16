import { relations } from "drizzle-orm/relations";
import { user, vaultEntry, category } from "./schema";

export const vaultEntryRelations = relations(vaultEntry, ({one}) => ({
	user: one(user, {
		fields: [vaultEntry.authorId],
		references: [user.id]
	}),
	category: one(category, {
		fields: [vaultEntry.categoryId],
		references: [category.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	vaultEntries: many(vaultEntry),
}));

export const categoryRelations = relations(category, ({many}) => ({
	vaultEntries: many(vaultEntry),
}));