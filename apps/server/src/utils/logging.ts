import pino from 'pino';

const Logger = pino({
  name: 'app-name',
  level: 'debug',
});
export { Logger };
