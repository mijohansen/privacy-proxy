import { Logger } from '../utils/logging';
import { SERVER_PORT } from '../config';

export const onServerReady = () => {
  Logger.info(`Listening at http://localhost:${SERVER_PORT}/`);
};
