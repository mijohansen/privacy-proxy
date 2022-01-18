import { PoolConfig } from 'pg';
import * as env from 'env-var';

const databaseConfig: PoolConfig = {
  user: env.get('DB_USERNAME').required().asString(),
  host: env.get('DB_HOST').required().asString(),
  database: env.get('DB_DATABASE').required().asString(),
  password: env.get('DB_PASSWORD').required().asString(),
  port: env.get('DB_PORT').required().asPortNumber(),
};

export { databaseConfig };
