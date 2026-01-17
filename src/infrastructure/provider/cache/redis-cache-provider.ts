import { injectable } from "tsyringe";
import Redis from "ioredis";
import { ICacheProvider } from "../../../domain/providers";
import { env } from "../../config";
import { logger } from "../../http/logger";

@injectable()
export class RedisCacheProvider implements ICacheProvider {
  private client: Redis | null = null;
  private readonly DEFAULT_TTL = 60 * 60 * 12; // 12 hours

  constructor() {
    if (env.NODE_ENV !== "production" || env.REDIS_HOST) {
      this.connect();
    }
  }

  private connect(): void {
    try {
      this.client = new Redis({
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
        password: env.REDIS_PASSWORD,
        db: env.REDIS_DB,
        retryStrategy: (times) => {
          if (times > 3) {
            logger.warn("Redis connection failed, running without cache");
            return null;
          }
          return Math.min(times * 200, 2000);
        },
      });

      this.client.on("connect", () => {
        logger.info("🟢 Redis connected");
      });

      this.client.on("error", (error) => {
        logger.error({ error }, "Redis error");
      });
    } catch (error) {
      logger.warn({ error }, "Failed to initialize Redis, running without cache");
      this.client = null;
    }
  }

  async get<T = string>(key: string): Promise<T | null> {
    if (!this.client) return null;

    const value = await this.client.get(key);
    if (!value) return null;

    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T;
    }
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (!this.client) return;

    const ttl = ttlSeconds ?? this.DEFAULT_TTL;
    await this.client.set(key, value, "EX", ttl);
  }

  async delete(key: string): Promise<void> {
    if (!this.client) return;

    await this.client.del(key);
  }

  async exists(key: string): Promise<boolean> {
    if (!this.client) return false;

    const result = await this.client.exists(key);
    return result === 1;
  }
}