import { describe, expect, it, mock } from "bun:test";
import request from "supertest";

// Mock the DB and Redis before importing the app
mock.module("@vido-vala/db", () => ({
  db: {
    query: {
      authMethodsTable: { findFirst: mock(() => Promise.resolve(null)) },
      usersTable: { findFirst: mock(() => Promise.resolve(null)) },
    },
    insert: mock(() => ({
      values: mock(() => ({
        returning: mock(() => Promise.resolve([{ id: 1 }])),
      })),
    })),
    update: mock(() => ({
      set: mock(() => ({
        where: mock(() => Promise.resolve()),
      })),
    })),
  },
}));

mock.module("../services/auth.service", () => ({
  register: mock(() => Promise.resolve({ user: { id: 1, name: "Test User" }, otp: "123456" })),
  login: mock(() => Promise.resolve({ id: 1, name: "Test User" })),
  createSession: mock(() => Promise.resolve("mock-session-id")),
  googleLogin: mock(() => Promise.resolve({ id: 1, name: "Google User" })),
  resendOtp: mock(() => Promise.resolve("123456")),
  verifyOtp: mock(() => Promise.resolve(true)),
}));

import { app } from "../index";

describe("POST /api/auth/register", () => {
  it("should register a user successfully", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain("registered successfully");
  });

  it("should return 400 for invalid data", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "T",
      email: "invalid-email",
      password: "123",
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Validation Error");
  });
});

describe("POST /api/auth/login", () => {
  it("should login successfully and set a cookie", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.header["set-cookie"]).toBeDefined();
    expect(res.header["set-cookie"]![0]).toContain("sessionId=");
  });
});

describe("POST /api/auth/otp-verify", () => {
  it("should verify OTP successfully", async () => {
    const res = await request(app).post("/api/auth/otp-verify").send({
      email: "test@example.com",
      otp: "123456",
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain("verified successfully");
  });
});

describe("POST /api/auth/logout", () => {
  it("should logout and clear the cookie", async () => {
    const res = await request(app).post("/api/auth/logout");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    const setCookie = res.header["set-cookie"]?.[0];
    if (setCookie) {
      expect(setCookie).toContain("sessionId=;");
    }
  });
});
