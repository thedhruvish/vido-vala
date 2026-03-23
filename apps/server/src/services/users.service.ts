import { db } from "@vido-vala/db";
import { usersTable } from "@vido-vala/db/schema";
import { eq } from "drizzle-orm";
import { ApiError } from "../utils/response-handler";

export const getAllUsers = async () => {
  return await db.query.usersTable.findMany();
};

export const getUserById = async (id: number) => {
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, id),
  });
  if (!user) throw new ApiError(404, "User not found");
  return user;
};

export const updateUser = async (id: number, data: any) => {
  const [updatedUser] = await db
    .update(usersTable)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(usersTable.id, id))
    .returning();
  if (!updatedUser) throw new ApiError(404, "User not found");
  return updatedUser;
};

export const deleteUser = async (id: number) => {
  const [deletedUser] = await db.delete(usersTable).where(eq(usersTable.id, id)).returning();
  if (!deletedUser) throw new ApiError(404, "User not found");
  return deletedUser;
};
