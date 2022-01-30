import { AppContext } from './types';
import { identityRoute } from './routes/identities';
import { connectedIdentitiesRoute } from './routes/connected-identities';
import { defaultRoutes } from './routes/default';
import { providerGa4Routes } from './routes/providers/ga4';

const attachRoutes = (context: AppContext) => {
  [connectedIdentitiesRoute, identityRoute, defaultRoutes, providerGa4Routes].forEach((route) => {
    route(context);
  });
};

export { attachRoutes };
