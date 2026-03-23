import { describe, expect, it, mock } from "bun:test";
import request from "supertest";
import sign from "cookie-signature";

const COOKIE_SECRET = env.COOKIE_SECRET;
console.log(COOKIE_SECRET);
mock.module("@vido-vala/db", () => ({
  db: {
    query: {
      videosTable: {
        findMany: mock(() => Promise.resolve([])),
        findFirst: mock(() => Promise.resolve({ id: 1, title: "Test Video" })),
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

describe("Videos Routes", () => {
  const sessionId = "mock-session-id";
  const signedSessionId = "s:" + sign.sign(sessionId, COOKIE_SECRET);
  const authCookie = `sessionId=${encodeURIComponent(signedSessionId)}`;

  it("POST /api/videos should create a video when authenticated", async () => {
    const res = await request(app).post("/api/videos").set("Cookie", [authCookie]).send({
      title: "Test Video",
      description: "Test Description",
    });
    expect(res.status).toBe(201);
  });

  it("GET /api/videos should return all videos", async () => {
    const res = await request(app).get("/api/videos").set("Cookie", [authCookie]);
    expect(res.status).toBe(200);
  });

  it("GET /api/videos/abc should return 400 for invalid numeric id", async () => {
    const res = await request(app).get("/api/videos/abc").set("Cookie", [authCookie]);
    expect(res.status).toBe(400);
  });
});
