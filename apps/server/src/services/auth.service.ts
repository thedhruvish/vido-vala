import { db } from "@vido-vala/db";
import { authMethodsTable, usersTable } from "@vido-vala/db/schema";
import { env } from "@vido-vala/env/server";
import { eq } from "drizzle-orm";
import { OAuth2Client } from "google-auth-library";
import { ApiError } from "../utils/response-handler";
import { redis } from "bun";

const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

export const sendOtp = async (email: string) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const redisKey = `otp:${email}`;

  // Set OTP in redis with 5 mins expiry
  await redis.set(redisKey, otp);
  await redis.expire(redisKey, 300);

  console.log(`Sending OTP ${otp} to ${email}`);
  return otp;
};

export const register = async (data: any) => {
  const { name, email, password } = data;

  const existingAuth = await db.query.authMethodsTable.findFirst({
    where: eq(authMethodsTable.email, email),
  });

  if (existingAuth) {
    throw new ApiError(400, "Email already exists");
  }

  const [newUser] = await db
    .insert(usersTable)
    .values({
      name,
    })
    .returning();

  const hashedPassword = await Bun.password.hash(password);
  if (!newUser) {
    throw new ApiError(500, "user crateding failed");
  }
  await db.insert(authMethodsTable).values({
    userId: newUser.id,
    email,
    password: hashedPassword,
    provider: "EMAIL",
  });

  const otp = await sendOtp(email);
  return { user: newUser, otp };
};

export const login = async (data: any) => {
  const { email, password } = data;

  const authMethod = await db.query.authMethodsTable.findFirst({
    where: eq(authMethodsTable.email, email),
    with: {
      user: true,
    },
  });

  if (!authMethod || authMethod.provider !== "EMAIL" || !authMethod.password) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await Bun.password.verify(password, authMethod.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  return authMethod.user;
};

export const googleLogin = async (idToken: string) => {
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (!payload || !payload.email) {
    throw new ApiError(400, "Invalid Google ID token");
  }

  const { email, name, sub: oauthId, picture } = payload;

  let authMethod = await db.query.authMethodsTable.findFirst({
    where: eq(authMethodsTable.email, email),
    with: {
      user: true,
    },
  });

  if (!authMethod) {
    const [newUser] = await db
      .insert(usersTable)
      .values({
        name: name || "Google User",
        picture,
      })
      .returning();
    if (!newUser) {
      throw new ApiError(500, "user crateding failed");
    }
    [authMethod] = await db
      .insert(authMethodsTable)
      .values({
        userId: newUser.id,
        email,
        provider: "GOOGLE",
        oauthId,
      })
      .returning({
        userId: authMethodsTable.userId,
        email: authMethodsTable.email,
        provider: authMethodsTable.provider,
        oauthId: authMethodsTable.oauthId,
      });

    authMethod!.user = newUser;
  } else if (authMethod.provider !== "GOOGLE") {
    await db
      .update(authMethodsTable)
      .set({
        provider: "GOOGLE",
        oauthId,
      })
      .where(eq(authMethodsTable.id, authMethod.id));
  }

  return authMethod!.user;
};

export const resendOtp = async (email: string) => {
  const redisKey = `otp:${email}`;
  await redis.del(redisKey);
  return await sendOtp(email);
};

export const verifyOtp = async (email: string, otp: string) => {
  const redisKey = `otp:${email}`;
  const storedOtp = await redis.get(redisKey);

  if (!storedOtp || storedOtp !== otp) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  await redis.del(redisKey);
  return true;
};

export const createSession = async (userId: number) => {
  const sessionId = crypto.randomUUID();
  const sessionKey = `session:${sessionId}`;
  const userSessionsKey = `userSessions:${userId}`;

  // 1. Clear old sessions
  const oldSessions = await redis.smembers(userSessionsKey);
  if (oldSessions && oldSessions.length > 0) {
    await redis.send("MULTI", []);
    for (const id of oldSessions) {
      await redis.send("DEL", [`session:${id}`]);
    }
    await redis.send("DEL", [userSessionsKey]);
    await redis.send("EXEC", []);
  }

  // 2. Set new session
  await redis.set(sessionKey, userId.toString());
  await redis.expire(sessionKey, 60 * 60 * 24 * 7); // 7 days
  await redis.sadd(userSessionsKey, sessionId);

  return sessionId;
};
