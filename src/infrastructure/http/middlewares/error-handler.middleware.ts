import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../shared/errors";
import { env } from "../../config";
import { Sentry } from "../../services/sentry";

export function errorHandlerMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const isProduction = env.NODE_ENV === "production";

  if (err instanceof AppError) {
    const log = req.log || console;

    if (err.statusCode >= 500) {
      log.error({ err, url: req.originalUrl, method: req.method }, err.message);

      // Envia erros 500+ para o Sentry
      Sentry.captureException(err, {
        tags: { code: err.code },
        extra: {
          url: req.originalUrl,
          method: req.method,
        },
      });
    } else {
      log.warn({ err, url: req.originalUrl, method: req.method }, err.message);
    }

    res.status(err.statusCode).json({
      ok: false,
      error: err.toJSON(),
    });
    return;
  }

  const log = req.log || console;
  log.error({ err, url: req.originalUrl, method: req.method }, "Unhandled error");

  // Envia erros não tratados para o Sentry
  if (err instanceof Error) {
    Sentry.captureException(err, {
      tags: { code: "INTERNAL_ERROR" },
      extra: {
        url: req.originalUrl,
        method: req.method,
      },
    });
  }

  res.status(500).json({
    ok: false,
    error: {
      message: "Internal server error",
      code: "INTERNAL_ERROR",
      ...(!isProduction && err instanceof Error && { debug: { stack: err.stack } }),
    },
  });
}