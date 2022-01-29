import { AppContext } from '../types';
import { Logger } from '../utils/logging';

const connectedIdentitiesRoute = (context: AppContext) => {
  Logger.info('I would connect identities');
};

export { connectedIdentitiesRoute };
