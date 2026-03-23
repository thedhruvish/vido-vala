import { db } from "@vido-vala/db";
import { usersTable } from "@vido-vala/db/schema";
import { eq } from "drizzle-orm";
import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/response-handler";
import { redis } from "bun";

export const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const sessionId = req.signedCookies.sessionId;
  if (!sessionId) {
    throw new ApiError(401, "Unauthorized: No session found");
  }

  const sessionKey = `session:${sessionId}`;

  // 1. Check Redis for userId
  let userId = await redis.get(sessionKey);

  if (!userId) {
    throw new ApiError(401, "Unauthorized: Session expired or invalid");
  }

  // 2. Check Redis for user details (cached user)
  const userCacheKey = `user:${userId}`;
  const cachedUser = await redis.get(userCacheKey);

  if (cachedUser) {
    req.user = JSON.parse(cachedUser);
    return next();
  }

  // 3. If not in cache, check DB
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, parseInt(userId)),
  });

  if (!user) {
    throw new ApiError(401, "Unauthorized: User not found");
  }

  // 4. Set user in request and cache in Redis
  req.user = user;
  await redis.set(userCacheKey, JSON.stringify(user));
  await redis.expire(userCacheKey, 60 * 60 * 24);

  next();
};
