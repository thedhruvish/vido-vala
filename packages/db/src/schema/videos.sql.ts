import { relations } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { commentsTable } from "./comments.sql";
import { usersTable } from "./users.sql";
import { videoQtyTable } from "./video-qty.sql";
import { watchHistoriesTable } from "./watch-histories.sql";
import { timestamps } from "./columns.helpers";

export const videosTable = pgTable("videos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  userId: integer().references(() => usersTable.id, { onDelete: "cascade" }),
  description: text(),
  thumbnail: text(),
  like: integer().default(0),
  dislike: integer().default(0),
  seconds: integer(),
  ...timestamps,
});

export const videosRelations = relations(videosTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [videosTable.userId],
    references: [usersTable.id],
  }),
  videoQties: many(videoQtyTable),
  watchHistories: many(watchHistoriesTable),
  comments: many(commentsTable),
}));
