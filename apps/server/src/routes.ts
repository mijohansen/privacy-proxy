import { AppContext } from './types';
import { identityRoute } from './routes/identities';
import { connectedIdentitiesRoute } from './routes/api/connected-identities';
import { defaultRoutes } from './routes/default';
import { providerGa4Routes } from './routes/providers/ga4';
import { collectRoutes } from './routes/collect';

const attachRoutes = (context: AppContext) => {
  [
    connectedIdentitiesRoute,
    identityRoute,
    defaultRoutes,
    providerGa4Routes,
    collectRoutes,
  ].forEach((route) => {
    route(context);
  });
};

export { attachRoutes };
