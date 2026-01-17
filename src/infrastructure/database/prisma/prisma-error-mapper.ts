import { Prisma } from "@prisma/client";
import { AppError, ConflictError, NotFoundError, InternalError } from "../../../shared/errors";

export function mapPrismaError(error: unknown): AppError {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return new ConflictError("Unique constraint violation", {
          fields: error.meta?.["target"],
        });
      case "P2025":
        return new NotFoundError("Record not found");
      case "P2003":
        return new ConflictError("Foreign key constraint violation");
      case "P2014":
        return new ConflictError("Relation violation");
      default:
        return new InternalError("Database error", { code: error.code });
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return new InternalError("Database validation error");
  }

  return new InternalError("Unknown database error");
}