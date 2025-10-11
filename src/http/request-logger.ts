import pinoHttp from "pino-http";
import pino from "pino";
import crypto from "node:crypto";

const redactPaths = [
  "req.headers.authorization",
  'req.headers["x-api-key"]',
  "req.body.password",
  "req.body.token",
  "res.headers.authorization",
];

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: process.env.NODE_ENV === "production" ? undefined : { target: "pino-pretty" },
});

export const requestLogger = pinoHttp({
  logger,
  genReqId: (req) =>
    (req.headers["x-request-id"] as string) ||
    crypto.randomUUID(),
  redact: { paths: redactPaths, censor: "[REDACTED]" },
  customLogLevel: (_req, res, err) => {
    if (err) return "error";
    if (res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
});
