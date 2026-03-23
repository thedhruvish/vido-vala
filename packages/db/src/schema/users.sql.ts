import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { authMethodsTable } from "./auth-methos.sql";
import { commentsTable } from "./comments.sql";
import { videosTable } from "./videos.sql";
import { watchHistoriesTable } from "./watch-histories.sql";
import { timestamps } from "./columns.helpers";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  userName: varchar().unique(),
  picture: varchar(),
  banner: varchar(),
  ...timestamps,
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  authMethods: many(authMethodsTable),
  videos: many(videosTable),
  watchHistories: many(watchHistoriesTable),
  comments: many(commentsTable),
}));
