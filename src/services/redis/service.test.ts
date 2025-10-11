import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Redis from 'ioredis';

const mockRedisClient = {
  ping: vi.fn(),
  quit: vi.fn(),
  get: vi.fn(),
  set: vi.fn(),
  del: vi.fn(),
  exists: vi.fn(),
};

vi.mock('ioredis', () => ({
  default: vi.fn().mockImplementation(() => mockRedisClient),
}));

describe('RedisService', () => {
  let originalNodeEnv: string | undefined;

  beforeEach(() => {
    originalNodeEnv = process.env.NODE_ENV;
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
    vi.resetModules();
  });

  describe('when client is NOT initialized (NODE_ENV is not "local")', () => {
    let redisService: any;

    beforeEach(async () => {
      process.env.NODE_ENV = 'production';
      vi.resetModules();
      const module = await import('./service');
      redisService = module.default;
    });

    it('should not create a client instance', () => {
      expect(Redis).not.toHaveBeenCalled();
    });

    it('get should return null', async () => {
      const result = await redisService.get({ key: 'any_key' });
      expect(result).toBeNull();
      expect(mockRedisClient.get).not.toHaveBeenCalled();
    });

    it('exists should return false', async () => {
      const result = await redisService.exists({ key: 'any_key' });
      expect(result).toBe(false);
      expect(mockRedisClient.exists).not.toHaveBeenCalled();
    });

    it('set should do nothing', async () => {
      await redisService.set({ key: 'any_key', value: 'any_value' });
      expect(mockRedisClient.set).not.toHaveBeenCalled();
    });
  });

  describe('when client IS initialized (NODE_ENV is "local")', () => {
    let redisService: any;

    beforeEach(async () => {
      process.env.NODE_ENV = 'local';
      vi.resetModules();
      const module = await import('./service');
      redisService = module.default;
    });

    it('should create a client instance on construction', () => {
      expect(Redis).toHaveBeenCalledOnce();
    });

    it('connect should call client.ping', async () => {
      await redisService.connect();
      expect(mockRedisClient.ping).toHaveBeenCalledOnce();
    });

    it('get should call client.get with the correct key', async () => {
      mockRedisClient.get.mockResolvedValue('cached_value');
      const result = await redisService.get({ key: 'my_key' });
      expect(mockRedisClient.get).toHaveBeenCalledWith('my_key');
      expect(result).toBe('cached_value');
    });

    it('set should call client.set with a default expiration', async () => {
      const key = 'my_key';
      const value = 'my_value';
      const defaultExpiration = 12 * 60 * 60;
      await redisService.set({ key, value });
      expect(mockRedisClient.set).toHaveBeenCalledWith(key, value, 'EX', defaultExpiration);
    });

    it('set should call client.set with a custom expiration', async () => {
      const key = 'my_key';
      const value = 'my_value';
      const customExpiration = 300;
      await redisService.set({ key, value, expiration: customExpiration });
      expect(mockRedisClient.set).toHaveBeenCalledWith(key, value, 'EX', customExpiration);
    });

    it('del should call client.del with the correct key', async () => {
      const key = 'my_key';
      await redisService.del({ key });
      expect(mockRedisClient.del).toHaveBeenCalledWith(key);
    });

    it('exists should return true if client.exists returns 1', async () => {
      mockRedisClient.exists.mockResolvedValue(1);
      const result = await redisService.exists({ key: 'my_key' });
      expect(mockRedisClient.exists).toHaveBeenCalledWith('my_key');
      expect(result).toBe(true);
    });

    it('exists should return false if client.exists returns 0', async () => {
      mockRedisClient.exists.mockResolvedValue(0);
      const result = await redisService.exists({ key: 'my_key' });
      expect(mockRedisClient.exists).toHaveBeenCalledWith('my_key');
      expect(result).toBe(false);
    });
  });
});