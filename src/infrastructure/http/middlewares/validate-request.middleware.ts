import { Request, Response, NextFunction } from "express";
import { ZodError, ZodTypeAny } from "zod";
import { ValidationError } from "../../../shared/errors";

interface ValidationSchemas {
  params?: ZodTypeAny;
  query?: ZodTypeAny;
  body?: ZodTypeAny;
}

export function validateRequest(schemas: ValidationSchemas) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (schemas.params) {
        req.params = schemas.params.parse(req.params);
      }
      if (schemas.query) {
        req.query = schemas.query.parse(req.query);
      }
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(new ValidationError("Invalid request data", error.flatten()));
        return;
      }
      next(error);
    }
  };
}