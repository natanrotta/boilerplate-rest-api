import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../shared/errors";
import { env } from "../../config";

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

  res.status(500).json({
    ok: false,
    error: {
      message: "Internal server error",
      code: "INTERNAL_ERROR",
      ...(!isProduction && err instanceof Error && { debug: { stack: err.stack } }),
    },
  });
}