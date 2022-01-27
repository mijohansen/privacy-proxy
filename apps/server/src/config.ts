import { PoolConfig } from 'pg';
import * as env from 'env-var';

const databaseConfig: PoolConfig = {
  user: env.get('DB_USERNAME').required().asString(),
  host: env.get('DB_HOST').required().asString(),
  database: env.get('DB_DATABASE').required().asString(),
  password: env.get('DB_PASSWORD').required().asString(),
  port: env.get('DB_PORT').required().asPortNumber(),
};

const REDACTED = env.get('REDACTED_TEXT').default('REDACTED').asString();
const UNKNOWN = env.get('UNKNOWN').default('UNKNOWN').asString();
const SECRET_SALT = env.get('SECRET_SALT').required().asString();
export { databaseConfig, REDACTED, UNKNOWN, SECRET_SALT };
