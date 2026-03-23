import { relations } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { videosTable } from "./videos.sql";

export const videoQtyTable = pgTable("video_qty", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  size: integer(),
  quality: integer(),
  videoId: integer().references(() => videosTable.id, {
    onDelete: "cascade",
  }),
  videoPath: text(),
});

export const videoQtyRelations = relations(videoQtyTable, ({ one }) => ({
  video: one(videosTable, {
    fields: [videoQtyTable.videoId],
    references: [videosTable.id],
  }),
}));
