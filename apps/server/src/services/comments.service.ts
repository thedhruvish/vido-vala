import { db } from "@vido-vala/db";
import { commentsTable } from "@vido-vala/db/schema";
import { eq } from "drizzle-orm";
import { ApiError } from "../utils/response-handler";

export const addComment = async (userId: number, data: any) => {
  const [newComment] = await db
    .insert(commentsTable)
    .values({ ...data, userId })
    .returning();
  return newComment;
};

export const getCommentsByVideoId = async (videoId: number) => {
  return await db.query.commentsTable.findMany({
    where: eq(commentsTable.videoId, videoId),
    with: { user: true, replies: true },
  });
};

export const updateComment = async (id: number, _userId: number, content: string) => {
  const [updated] = await db
    .update(commentsTable)
    .set({ content })
    .where(eq(commentsTable.id, id))
    .returning();
  if (!updated) throw new ApiError(404, "Comment not found");
  return updated;
};

export const deleteComment = async (id: number, _userId: number) => {
  const [deleted] = await db.delete(commentsTable).where(eq(commentsTable.id, id)).returning();
  if (!deleted) throw new ApiError(404, "Comment not found");
  return deleted;
};
