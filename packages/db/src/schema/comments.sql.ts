import { relations } from "drizzle-orm";
import { type AnyPgColumn, integer, pgTable, text } from "drizzle-orm/pg-core";
import { usersTable } from "./users.sql";
import { videosTable } from "./videos.sql";
import { timestamps } from "./columns.helpers";

export const commentsTable = pgTable("comment", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  videoId: integer().references(() => videosTable.id, {
    onDelete: "cascade",
  }),
  userId: integer().references(() => usersTable.id, {
    onDelete: "cascade",
  }),
  content: text().notNull(),
  replyCommentId: integer().references((): AnyPgColumn => commentsTable.id, {
    onDelete: "cascade",
  }),
  ...timestamps,
});

export const commentsRelations = relations(commentsTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [commentsTable.userId],
    references: [usersTable.id],
  }),
  video: one(videosTable, {
    fields: [commentsTable.videoId],
    references: [videosTable.id],
  }),
  parentComment: one(commentsTable, {
    fields: [commentsTable.replyCommentId],
    references: [commentsTable.id],
    relationName: "commentReplies",
  }),
  replies: many(commentsTable, {
    relationName: "commentReplies",
  }),
}));
