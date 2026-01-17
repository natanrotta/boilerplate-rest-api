import * as Sentry from "@sentry/node";
import { env } from "../../config";

export function initSentry() {
  const dsn = env.SENTRY_DSN;

  if (!dsn) {
    console.warn("⚠️  SENTRY_DSN not configured - error tracking disabled");
    return;
  }

  Sentry.init({
    dsn,
    environment: env.NODE_ENV,
    tracesSampleRate: env.NODE_ENV === "production" ? 0.1 : 1.0,
    integrations: [Sentry.httpIntegration(), Sentry.expressIntegration()],
    beforeSend(event) {
      // Remove sensitive data
      if (event.request?.headers) {
        delete event.request.headers["authorization"];
        delete event.request.headers["cookie"];
      }
      return event;
    },
  });

  console.log("✅ Sentry initialized");
}

export { Sentry };