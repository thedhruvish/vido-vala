import { describe, expect, it, mock } from "bun:test";
import request from "supertest";
import sign from "cookie-signature";

const COOKIE_SECRET = env.COOKIE_SECRET;
console.log(COOKIE_SECRET);
mock.module("@vido-vala/db", () => ({
  db: {
    query: {
      watchHistoriesTable: {
        findMany: mock(() => Promise.resolve([])),
        findFirst: mock(() => Promise.resolve(null)),
      },
    },
    insert: mock(() => ({
      values: mock(() => ({
        returning: mock(() => Promise.resolve([{ id: 1 }])),
      })),
    })),
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

describe("Watch History Routes", () => {
  const sessionId = "mock-session-id";
  const signedSessionId = "s:" + sign.sign(sessionId, COOKIE_SECRET);
  const authCookie = `sessionId=${encodeURIComponent(signedSessionId)}`;

  it("GET /api/watch-histories/me should return history", async () => {
    const res = await request(app).get("/api/watch-histories/me").set("Cookie", [authCookie]);
    expect(res.status).toBe(200);
  });

  it("POST /api/watch-histories should add history", async () => {
    const res = await request(app).post("/api/watch-histories").set("Cookie", [authCookie]).send({
      videoId: 1,
      videoSecond: 100,
    });
    expect(res.status).toBe(201);
  });
});
