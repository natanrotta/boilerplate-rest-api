import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';

vi.mock('axios', () => {
  const mockAxiosInstance = {
    post: vi.fn(),
  };
  return {
    default: {
      create: vi.fn().mockReturnValue(mockAxiosInstance),
    },
  };
});

describe('ZApiService', () => {
  let zApiService: any;
  const originalEnv = process.env;

  beforeEach(async () => {
    vi.clearAllMocks();

    process.env = {
      ...originalEnv,
      BACKEND_Z_API_URL: 'https://api.z-api.io/instances',
      BACKEND_ZAPI_CLIENT_TOKEN: 'test_client_token',
    };

    vi.resetModules();
    const module = await import('./service');
    zApiService = module.default;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('sendText', () => {
    const input = {
      instanceId: 'test_instance_id',
      token: 'test_token',
      phone: '123456789',
      message: 'Hello World',
    };
    const mockAxiosInstance = (axios.create() as any);

    it('should return an error if instanceId or token is missing', async () => {
      const result = await zApiService.sendText({ ...input, instanceId: null });
      expect(result).toEqual({ ok: false, error: 'Instance ID and token are required' });
      expect(axios.create).not.toHaveBeenCalled();
    });

    it('should create an axios client with the correct URL and headers', async () => {
      mockAxiosInstance.post.mockResolvedValue({ data: { ok: true } });
      await zApiService.sendText(input);

      const expectedUrl = `https:/api.z-api.io/instances/${input.instanceId}/token/${input.token}`;
      expect(axios.create).toHaveBeenCalledWith({
        baseURL: expectedUrl,
        headers: {
          'Content-Type': 'application/json',
          'Client-Token': 'test_client_token',
        },
        timeout: 15_000,
      });
    });

    it('should call client.post with the correct payload', async () => {
      mockAxiosInstance.post.mockResolvedValue({ data: { ok: true } });
      await zApiService.sendText(input);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/send-text', {
        phone: input.phone,
        message: input.message,
      });
    });

    it('should handle a successful API response and wrap it', async () => {
      const apiResponseData = { messageId: '123' };
      mockAxiosInstance.post.mockResolvedValue({ data: apiResponseData });
      const result = await zApiService.sendText(input);
      expect(result).toEqual({ ok: true, data: apiResponseData });
    });

    it('should handle an axios error and return a formatted error object', async () => {
      const errorResponse = {
        response: {
          status: 400,
          data: { error: 'Invalid phone number' },
        },
        message: 'Request failed with status code 400',
      };
      mockAxiosInstance.post.mockRejectedValue(errorResponse);

      const result = await zApiService.sendText(input);
      expect(result).toEqual({ ok: false, error: 'Invalid phone number' });
    });
  });

  describe('sendOptionList', () => {
    const input = {
      instanceId: 'test_instance_id',
      token: 'test_token',
      phone: '123456789',
      message: 'Choose an option',
      options: [{ title: 'Menu', rows: [{ id: '1', title: 'Option 1' }] }],
    };
    const mockAxiosInstance = (axios.create() as any);

    it('should return an error if instanceId or token is missing', async () => {
      const result = await zApiService.sendOptionList({ ...input, token: null });
      expect(result).toEqual({ ok: false, error: 'Instance ID and token are required' });
    });

    it('should call client.post with the correct endpoint and payload', async () => {
      mockAxiosInstance.post.mockResolvedValue({ data: { ok: true } });
      await zApiService.sendOptionList(input);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/send-option-list', {
        phone: input.phone,
        message: input.message,
        options: input.options,
      });
    });

    it('should handle a successful response that already has an "ok" property', async () => {
      const apiResponseData = { ok: true, messageId: '456' };
      mockAxiosInstance.post.mockResolvedValue({ data: apiResponseData });
      const result = await zApiService.sendOptionList(input);
      expect(result).toEqual(apiResponseData);
    });

    it('should handle an axios error and return the generic error message if no specific error is provided', async () => {
      const errorResponse = {
        response: {
          status: 500,
          data: {},
        },
        message: 'Internal Server Error',
      };
      mockAxiosInstance.post.mockRejectedValue(errorResponse);

      const result = await zApiService.sendOptionList(input);
      expect(result).toEqual({ ok: false, error: 'Internal Server Error' });
    });
  });
});