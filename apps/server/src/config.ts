import { PoolConfig } from 'pg';
import * as env from 'env-var';

const DB_CONFIG: PoolConfig = {
  database: env.get('DB_DATABASE').required().asString(),
};
if (env.get('DATABASE_URL').asBool()) {
  DB_CONFIG.connectionString = env.get('DATABASE_URL').asUrlString();
} else {
  DB_CONFIG.user = env.get('DB_USERNAME').required().asString();
  DB_CONFIG.host = env.get('DB_HOST').required().asString();
  DB_CONFIG.password = env.get('DB_PASSWORD').required().asString();
  DB_CONFIG.port = env.get('DB_PORT').required().asPortNumber();
}

export { DB_CONFIG };

//   const port = process.env.SERVER_PORT || 3333;
export const SERVER_PORT = env.get('SERVER_PORT').default(3333).asPortNumber();
export const USER_CHANNEL_NAME = env.get('USER_CHANNEL_NAME').default('users').asString();
export const USER_MAX_CACHE = env.get('USER_MAX_CACHE').default(10000).asIntPositive();
export const INGRESS_CHANNEL_NAME = env.get('INGRESS_CHANNEL_NAME').default('ingresses').asString();
export const MEASUREMENT_PROTOCOL_ENDPOINT = env
  .get('MEASUREMENT_PROTOCOL_ENDPOINT')
  .default('https://www.google-analytics.com/mp/collect')
  .asString();

export const AMPLITUDE_ENDPOINT = env.get('AMPLITUDE_ENDPOINT').default('').asString();

export const REDACTED = env.get('REDACTED_TEXT').default('REDACTED').asString();
export const UNKNOWN = env.get('UNKNOWN').default('UNKNOWN').asString();
export const SECRET_SALT = env.get('SECRET_SALT').required().asString();
export const LOG_LEVEL = env
  .get('LOG_LEVEL')
  .default('info')
  .asEnum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']);
