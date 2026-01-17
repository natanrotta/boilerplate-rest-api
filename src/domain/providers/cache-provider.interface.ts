export interface ICacheProvider {
  get<T = string>(key: string): Promise<T | null>;
  set(key: string, value: string, ttlSeconds?: number): Promise<void>;
  delete(key: string): Promise<void>;
  exists(key: string): Promise<boolean>;
}