import pino, { LoggerOptions } from 'pino';
import { isProduction } from './utils';
import { LOG_LEVEL } from '../config';

const pinoConfig: LoggerOptions = {
  timestamp: false,
  level: LOG_LEVEL,
  formatters: {
    level(label: string) {
      return { level: label };
    },
  },
  transport: null,
};

if (!isProduction()) {
  pinoConfig.transport = {
    target: 'pino-pretty',
  };
}

const Logger = pino(pinoConfig);

export { Logger };
