import Redis from "ioredis";
import {
  RedisConnectOptions,
  RedisGetInput,
  RedisSetInput,
  RedisDelInput,
  RedisExistsInput,
} from "./model";

class RedisService {
  private client: Redis | null = null;

  constructor() {
    if (process.env.NODE_ENV === "local") {
      this.client = new Redis({
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || "6379", 10),
        password: process.env.REDIS_PASSWORD || undefined,
        db: parseInt(process.env.REDIS_DB || "0", 10),
      } as RedisConnectOptions);
    }
  }

  public async connect(): Promise<void> {
    try {
      if (!this.client) return;
      await this.client.ping();
      console.log("🟢 Redis connected");
    } catch (error) {
      console.error("Redis connection error:", error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      if (!this.client) return;
      await this.client.quit();
      console.log("Redis disconnected");
    } catch (error) {
      console.error("Redis disconnection error:", error);
      throw error;
    }
  }

  public async get({ key }: RedisGetInput): Promise<string | null> {
    if (!this.client) return null;
    return this.client.get(key);
  }

  public async set({ key, value, expiration }: RedisSetInput): Promise<void> {
    if (!this.client) return;
    const expirationInSeconds = expiration ?? 12 * 60 * 60; // Default: 12h
    await this.client.set(key, value, "EX", expirationInSeconds);
  }

  public async del({ key }: RedisDelInput): Promise<void> {
    if (!this.client) return;
    await this.client.del(key);
  }

  public async exists({ key }: RedisExistsInput): Promise<boolean> {
    if (!this.client) return false;
    const result = await this.client.exists(key);
    return result === 1;
  }
}

export default new RedisService();
