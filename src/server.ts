import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import { config } from "./config";
import routes from "./routes";
import { PrismaClient } from "@prisma/client";
import { requestLogger } from "./http/request-logger";
import { errorMiddleware } from "./http/error-middleware";

import cron from "node-cron";
import cronService from "./services/cron/service";

const prisma = new PrismaClient();
const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: config.api.allowedOrigin,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(express.json());

app.use(requestLogger);

app.use("/api", routes);

app.use((req: Request, res: Response) => {
  return res
    .status(404)
    .json({ ok: false, error: { message: "Not found", code: "NOT_FOUND" } });
});

app.use(errorMiddleware);

server.listen(3333, () => {
  console.log(`🚀 Server running on port 3333`);
});

cron.schedule("*/1 * * * *", async () => cronService.runCron()); // every minute

export default app;
