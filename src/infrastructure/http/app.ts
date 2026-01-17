import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "../config";
import { httpLogger } from "./logger";
import { errorHandlerMiddleware } from "./middlewares";
import { router } from "./routes";
import { Sentry } from "../services/sentry";

const app = express();

// ═══════════════════════════════════════════════════════════
// SEGURANÇA
// ═══════════════════════════════════════════════════════════

app.set("trust proxy", 1);

app.use(helmet());

app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutos
    max: 1000, // 1000 requests por windowMs
    message: {
      ok: false,
      error: { message: "Too many requests", code: "RATE_LIMIT" },
    },
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// ═══════════════════════════════════════════════════════════
// MIDDLEWARES
// ═══════════════════════════════════════════════════════════

app.use(
  cors({
    origin: env.ALLOWED_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10kb" }));

app.use(httpLogger);

// ═══════════════════════════════════════════════════════════
// ROTAS
// ═══════════════════════════════════════════════════════════

app.get("/healthz", (_req, res) => res.status(200).send("ok"));

app.use("/api", router);

app.use((_req, res) => {
  return res.status(404).json({
    ok: false,
    error: { message: "Not found", code: "NOT_FOUND" },
  });
});

Sentry.setupExpressErrorHandler(app);

app.use(errorHandlerMiddleware);

export { app };