import http from 'http';
import { Logger } from '../utils/logging';
import pino from 'pino';

export const onServerClose = async (server: http.Server) => {
  server.on('error', (error: Error) => {
    const { stack, message } = error;
    Logger.error(message, { stack });
  });
  Logger.info('Bootstrap completed');
  const closeServer = (eventName) => {
    Logger.info(eventName + ' signal received.');
    pino.final(Logger);
    server.close();
  };
  process.on('SIGTERM', closeServer);
  process.on('SIGINT', closeServer);
};
