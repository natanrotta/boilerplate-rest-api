import express from "express";
import cors from "cors";
import { env } from "../config";
import { httpLogger } from "./logger";
import { errorHandlerMiddleware } from "./middlewares";
import { router } from "./routes";

const app = express();

app.use(
  cors({
    origin: env.ALLOWED_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use(httpLogger);

app.use("/api", router);

app.use((_req, res) => {
  return res.status(404).json({
    ok: false,
    error: { message: "Not found", code: "NOT_FOUND" },
  });
});

app.use(errorHandlerMiddleware);

export { app };