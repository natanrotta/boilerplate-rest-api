import pino from "pino";
import pinoHttp from "pino-http";
import crypto from "node:crypto";
import { env } from "../config";

const redactPaths = [
  "req.headers.authorization",
  'req.headers["x-api-key"]',
  "req.body.password",
  "req.body.token",
  "res.headers.authorization",
];

export const logger = pino({
  level: env.LOG_LEVEL,
  transport: env.NODE_ENV !== "production" ? { target: "pino-pretty" } : undefined,
});

export const httpLogger = pinoHttp({
  logger,
  genReqId: (req) => (req.headers["x-request-id"] as string) || crypto.randomUUID(),
  redact: { paths: redactPaths, censor: "[REDACTED]" },
  customLogLevel: (_req, res, err) => {
    if (err) return "error";
    if (res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
});