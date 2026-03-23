import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./users.sql";
import { timestamps } from "./columns.helpers";

export const authMethodsTable = pgTable("auth_methods", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().references(() => usersTable.id, {
    onDelete: "cascade",
  }),
  email: varchar().unique().notNull(),
  password: varchar(), // can be null for google oauth
  provider: varchar().notNull(), // 'GOOGLE' | 'EMAIL'
  oauthId: varchar(), // for google
  ...timestamps,
});

export const authMethodsRelations = relations(authMethodsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [authMethodsTable.userId],
    references: [usersTable.id],
  }),
}));
