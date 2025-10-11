import { ZodError, ZodTypeAny } from "zod";
import { ValidationError } from "../core/errors";
import type { RequestHandler } from "express";

type Schemas = {
  params?: ZodTypeAny;
  query?: ZodTypeAny;
  body?: ZodTypeAny;
};

export function validateRequest(schemas: Schemas): RequestHandler {
  return (req, _res, next) => {
    try {
      if (schemas.params) req.params = schemas.params.parse(req.params);
      if (schemas.query) req.query = schemas.query.parse(req.query);
      if (schemas.body) req.body = schemas.body.parse(req.body);
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        return next(new ValidationError("Invalid request data", e.flatten(), e));
      }
      next(e);
    }
  };
}
