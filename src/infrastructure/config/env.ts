import { z } from "zod";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

const envSchema = z.object({
  // Core
  NODE_ENV: z.enum(["local", "development", "staging", "production"]).default("local"),
  API_PORT: z.coerce.number().default(3333),
  ALLOWED_ORIGIN: z.string().default("*"),
  PROJECT_NAME: z.string().default("boilerplate-rest-api"),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]).default("info"),

  // Database
  DATABASE_URL: z.string(),

  // Sentry
  SENTRY_DSN: z.string().optional(),

  // Redis
  REDIS_HOST: z.string().default("localhost"),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_DB: z.coerce.number().default(0),

  // ZApi
  ZAPI_BASE_URL: z.string().default("https://api.z-api.io/instances"),
  ZAPI_CLIENT_TOKEN: z.string().optional(),
  ZAPI_INSTANCE_ID: z.string().optional(),
  ZAPI_TOKEN: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;