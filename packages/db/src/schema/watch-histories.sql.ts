import { relations } from "drizzle-orm";
import { integer, pgTable } from "drizzle-orm/pg-core";
import { usersTable } from "./users.sql";
import { videosTable } from "./videos.sql";
import { timestamps } from "./columns.helpers";

export const watchHistoriesTable = pgTable("watch_history", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().references(() => usersTable.id, {
    onDelete: "cascade",
  }),
  videoId: integer().references(() => videosTable.id, {
    onDelete: "cascade",
  }),
  videoSecond: integer(),
  ...timestamps,
});

export const watchHistoriesRelations = relations(watchHistoriesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [watchHistoriesTable.userId],
    references: [usersTable.id],
  }),
  video: one(videosTable, {
    fields: [watchHistoriesTable.videoId],
    references: [videosTable.id],
  }),
}));
