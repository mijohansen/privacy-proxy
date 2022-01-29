import { PoolConfig } from 'pg';
import * as env from 'env-var';

const DB_CONFIG: PoolConfig = {
  user: env.get('DB_USERNAME').required().asString(),
  host: env.get('DB_HOST').required().asString(),
  database: env.get('DB_DATABASE').required().asString(),
  password: env.get('DB_PASSWORD').required().asString(),
  port: env.get('DB_PORT').required().asPortNumber(),
};
//   const port = process.env.SERVER_PORT || 3333;
const SERVER_PORT = env.get('SERVER_PORT').default(3333).asPortNumber();
const USER_CHANNEL_NAME = env
  .get('USER_CHANNEL_NAME')
  .default('users')
  .asString();
const INGRESS_CHANNEL_NAME = env
  .get('INGRESS_CHANNEL_NAME')
  .default('ingresses')
  .asString();
const REDACTED = env.get('REDACTED_TEXT').default('REDACTED').asString();
const UNKNOWN = env.get('UNKNOWN').default('UNKNOWN').asString();
const SECRET_SALT = env.get('SECRET_SALT').required().asString();
export {
  DB_CONFIG,
  REDACTED,
  UNKNOWN,
  SECRET_SALT,
  USER_CHANNEL_NAME,
  INGRESS_CHANNEL_NAME,
  SERVER_PORT,
};
