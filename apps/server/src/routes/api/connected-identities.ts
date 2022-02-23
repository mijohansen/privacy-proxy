import { AppContext } from '../../types';
import { Logger } from '../../utils/logging';
import { connectIdentities } from '../../data/connect-identities';

export type ConnectIdentitiesRequest = {
  identities: string[];
};
/**
 * Identities might be connected as long as just one of them exists in the
 * database. This allows actors with several identification patterns to follow
 * a customer journey anonymous across identities.
 *
 * @param app
 */
const connectedIdentitiesRoute = ({ app }: AppContext) => {
  Logger.info('I would connect identities');
  app.post('/api/connected-identities', (req, res) => {
    const json = req.body as ConnectIdentitiesRequest;
    res.send(connectIdentities(json.identities));
  });
};

export { connectedIdentitiesRoute };
