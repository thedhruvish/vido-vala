import { describe, expect, it, mock } from "bun:test";
import request from "supertest";
import sign from "cookie-signature";

const COOKIE_SECRET = env.COOKIE_SECRET;
console.log(COOKIE_SECRET);
mock.module("@vido-vala/db", () => ({
  db: {
    query: {
      usersTable: {
        findMany: mock(() => Promise.resolve([])),
        findFirst: mock(() => Promise.resolve({ id: 1, name: "Test User" })),
      },
    },
  },
}));

mock.module("../lib/redis", () => ({
  redis: {
    get: mock((key: string) => {
      if (key.startsWith("session:")) return Promise.resolve("1");
      if (key.startsWith("user:1"))
        return Promise.resolve(JSON.stringify({ id: 1, name: "Test User" }));
      return Promise.resolve(null);
    }),
  },
}));

import { app } from "../index";
import { env } from "@vido-vala/env/server";

describe("Users Routes", () => {
  const sessionId = "mock-session-id";
  const signedSessionId = "s:" + sign.sign(sessionId, COOKIE_SECRET);
  const authCookie = `sessionId=${encodeURIComponent(signedSessionId)}`;

  it("GET /api/users/me should be protected", async () => {
    const res = await request(app).get("/api/users/me");
    expect(res.status).toBe(401);
  });

  it("GET /api/users/me should return profile when authenticated", async () => {
    const res = await request(app).get("/api/users/me").set("Cookie", [authCookie]);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("GET /api/users should return all users", async () => {
    const res = await request(app).get("/api/users").set("Cookie", [authCookie]);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
