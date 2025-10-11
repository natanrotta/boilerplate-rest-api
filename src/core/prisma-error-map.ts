import { Prisma } from "@prisma/client";
import { AppError, ConflictError, NotFoundError } from "./errors";

export function mapPrismaError(err: unknown): AppError {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") return new ConflictError("Unique constraint failed", err);
    if (err.code === "P2025") return new NotFoundError("Record not found", err);
  }
  return new AppError("Database error", 500, "DB_ERROR", err);
}
