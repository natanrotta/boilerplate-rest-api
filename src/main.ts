import "reflect-metadata";
import "./shared/container";
import { initSentry } from "./infrastructure/services/sentry";

initSentry();

import http from "http";
import { app } from "./infrastructure/http";
import { logger } from "./infrastructure/http/logger";
import { env } from "./infrastructure/config";
import { cronService } from "./infrastructure/services/scheduler";

const server = http.createServer(app);

server.listen(env.API_PORT, () => {
  logger.info(`🚀 Server running on port ${env.API_PORT}`);
  logger.info(`📍 Environment: ${env.NODE_ENV}`);
});

// Start cron jobs
cronService.start();

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info("SIGTERM received, shutting down gracefully");
  server.close(() => {
    logger.info("Server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  logger.info("SIGINT received, shutting down gracefully");
  server.close(() => {
    logger.info("Server closed");
    process.exit(0);
  });
});

export { server };