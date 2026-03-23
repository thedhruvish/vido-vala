import { db } from "@vido-vala/db";
import { videosTable } from "@vido-vala/db/schema";
import { eq } from "drizzle-orm";
import { ApiError } from "../utils/response-handler";

export const createVideo = async (userId: number, data: any) => {
  const [newVideo] = await db
    .insert(videosTable)
    .values({ ...data, userId })
    .returning();
  return newVideo;
};

export const getAllVideos = async () => {
  return await db.query.videosTable.findMany({
    with: { user: true },
  });
};

export const getVideoById = async (id: number) => {
  const video = await db.query.videosTable.findFirst({
    where: eq(videosTable.id, id),
    with: { user: true },
  });
  if (!video) throw new ApiError(404, "Video not found");
  return video;
};

export const updateVideo = async (id: number, _userId: number, data: any) => {
  const [updatedVideo] = await db
    .update(videosTable)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(videosTable.id, id))
    // Note: In real app, check userId ownership
    .returning();
  if (!updatedVideo) throw new ApiError(404, "Video not found");
  return updatedVideo;
};

export const deleteVideo = async (id: number, _userId: number) => {
  const [deletedVideo] = await db.delete(videosTable).where(eq(videosTable.id, id)).returning();
  if (!deletedVideo) throw new ApiError(404, "Video not found");
  return deletedVideo;
};
