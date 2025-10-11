export class AppError extends Error {
  constructor(
    public message: string,
    public status = 400,
    public code?: string,
    public cause?: unknown,
    public details?: unknown
  ) {
    super(message);
    this.name = new.target.name;
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found", cause?: unknown, details?: unknown) {
    super(message, 404, "NOT_FOUND", cause, details);
  }
}

export class ValidationError extends AppError {
  constructor(message = "Validation failed", details?: unknown, cause?: unknown) {
    super(message, 422, "VALIDATION_ERROR", cause, details);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict", cause?: unknown, details?: unknown) {
    super(message, 409, "CONFLICT", cause, details);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad request", cause?: unknown, details?: unknown) {
    super(message, 400, "BAD_REQUEST", cause, details);
  }
}