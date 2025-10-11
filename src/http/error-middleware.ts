import { Request, Response, NextFunction } from "express";
import { AppError } from "../core/errors";

const isProd = process.env.NODE_ENV === "production";

export function errorMiddleware(err: unknown, req: Request, res: Response, _next: NextFunction) {
  const isAppError = err instanceof AppError;

  const status = isAppError ? err.status : 500;
  const code = isAppError ? err.code ?? "APP_ERROR" : "INTERNAL_ERROR";
  const message = isAppError ? err.message : "Internal server error";
  const details = isAppError ? err.details : undefined;

  // logging estruturado
  const log = req.log || console;
  const logPayload = {
    code,
    status,
    url: req.originalUrl,
    method: req.method,
    reqId: (req as any).id, // pino-http adiciona
    details: isAppError ? details : undefined,
    stack: !isAppError && err instanceof Error ? err.stack : undefined,
  };

  if (status >= 500) log.error({ err, ...logPayload }, "Unhandled error");
  else log.warn(logPayload, "Handled error");

  const body: any = {
    ok: false,
    error: { message, code }
  };

  if (details) body.error.details = details;

  if (!isProd && !isAppError && err instanceof Error) {
    body.error.debug = { cause: err.stack };
  }

  res.status(status).json(body);
}
