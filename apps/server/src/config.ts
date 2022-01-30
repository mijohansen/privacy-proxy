import { PoolConfig } from 'pg';
import * as env from 'env-var';

export const DB_CONFIG: PoolConfig = {
  user: env.get('DB_USERNAME').required().asString(),
  host: env.get('DB_HOST').required().asString(),
  database: env.get('DB_DATABASE').required().asString(),
  password: env.get('DB_PASSWORD').required().asString(),
  port: env.get('DB_PORT').required().asPortNumber(),
};
//   const port = process.env.SERVER_PORT || 3333;
export const SERVER_PORT = env.get('SERVER_PORT').default(3333).asPortNumber();
export const USER_CHANNEL_NAME = env.get('USER_CHANNEL_NAME').default('users').asString();
export const INGRESS_CHANNEL_NAME = env.get('INGRESS_CHANNEL_NAME').default('ingresses').asString();
export const MEASUREMENT_PROTOCOL_ENDPOINT = env
  .get('MEASUREMENT_PROTOCOL_ENDPOINT')
  .default('https://www.google-analytics.com/mp/collect')
  .asString();

export const AMPLITUDE_ENDPOINT = env.get('AMPLITUDE_ENDPOINT').default('').asString();

export const REDACTED = env.get('REDACTED_TEXT').default('REDACTED').asString();
export const UNKNOWN = env.get('UNKNOWN').default('UNKNOWN').asString();
export const SECRET_SALT = env.get('SECRET_SALT').required().asString();
