import pino, {LoggerOptions} from 'pino';
import { isProduction } from './utils';

const pinoConfig:LoggerOptions= {
  timestamp: false,
  formatters: {
    level(label: string) {
      return { level: label };
    },
  },
  transport: null,
};

if (!isProduction()) {
  pinoConfig.transport = {
    target: 'pino-pretty'
  }
}

const Logger = pino(pinoConfig);

export { Logger };
