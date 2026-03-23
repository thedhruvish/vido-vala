import { env } from "@vido-vala/env/server";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Express } from "express";
import type { NextFunction, Request, Response } from "express";
import authRoute from "./routes/auth.route";
import { sendError } from "./utils/response-handler";

export const app: Express = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  }),
);

app.use(express.json());
app.use(cookieParser(env.COOKIE_SECRET));

app.get("/", (_req, res) => {
  res.status(200).send("OK");
});

app.use("/api/auth", authRoute);

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  sendError(res, err);
});

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
}
