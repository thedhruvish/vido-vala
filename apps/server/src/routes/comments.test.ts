import { describe, expect, it, mock } from "bun:test";
import request from "supertest";
import sign from "cookie-signature";

const COOKIE_SECRET = env.COOKIE_SECRET;
console.log(COOKIE_SECRET);
mock.module("@vido-vala/db", () => ({
  db: {
    query: {
      commentsTable: {
        findMany: mock(() => Promise.resolve([])),
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

describe("Comments Routes", () => {
  const sessionId = "mock-session-id";
  const signedSessionId = "s:" + sign.sign(sessionId, COOKIE_SECRET);
  const authCookie = `sessionId=${encodeURIComponent(signedSessionId)}`;

  it("POST /api/comments should add a comment", async () => {
    const res = await request(app).post("/api/comments").set("Cookie", [authCookie]).send({
      videoId: 1,
      content: "Great video!",
    });
    expect(res.status).toBe(201);
  });

  it("GET /api/comments/video/1 should return comments", async () => {
    const res = await request(app).get("/api/comments/video/1").set("Cookie", [authCookie]);
    expect(res.status).toBe(200);
  });
});
