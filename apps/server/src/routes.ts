import { connectedIdentitiesRoute } from './routes/connected-identities';
import { Express } from 'express';

const attachRoutes = (app: Express) => {
  connectedIdentitiesRoute(app);
};

export { attachRoutes };
