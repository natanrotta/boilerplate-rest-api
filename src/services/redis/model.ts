export interface RedisConnectOptions {
  host?: string;
  port?: number;
  password?: string;
  db?: number;
}

export interface RedisGetInput {
  key: string;
}

export interface RedisSetInput {
  key: string;
  value: string;
  expiration?: number; // seconds
}

export interface RedisDelInput {
  key: string;
}

export interface RedisExistsInput {
  key: string;
}
