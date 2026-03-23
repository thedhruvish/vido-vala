import { db } from "@vido-vala/db";
import { watchHistoriesTable } from "@vido-vala/db/schema";
import { and, eq } from "drizzle-orm";
import { ApiError } from "../utils/response-handler";

export const addWatchHistory = async (userId: number, data: any) => {
  // Check if already exists for this user/video
  const existing = await db.query.watchHistoriesTable.findFirst({
    where: and(
      eq(watchHistoriesTable.userId, userId),
      eq(watchHistoriesTable.videoId, data.videoId),
    ),
  });

  if (existing) {
    const [updated] = await db
      .update(watchHistoriesTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(watchHistoriesTable.id, existing.id))
      .returning();
    return updated;
  }

  const [newItem] = await db
    .insert(watchHistoriesTable)
    .values({ ...data, userId })
    .returning();
  return newItem;
};

export const getWatchHistory = async (userId: number) => {
  return await db.query.watchHistoriesTable.findMany({
    where: eq(watchHistoriesTable.userId, userId),
    with: { video: true },
  });
};

export const deleteWatchHistory = async (id: number) => {
  const [deleted] = await db
    .delete(watchHistoriesTable)
    .where(eq(watchHistoriesTable.id, id))
    .returning();
  if (!deleted) throw new ApiError(404, "History item not found");
  return deleted;
};
