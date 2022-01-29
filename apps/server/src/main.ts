import express from 'express';
import { createIngressMap, subscribeToIngresses } from './data/ingresses';
import { createUserMap, subscribeToUserEntries } from './data/users';
import { connectToDatabase } from './db/connection';
import { attachRoutes } from './routes';
import { SERVER_PORT } from './config';
import { onServerClose } from './server/on-close';
import { configureServer } from './server/configure-server';
import { onServerReady } from './server/on-ready';

const bootstrap = async () => {
  const app = express();
  const userMap = createUserMap();
  const ingressMap = createIngressMap();

  await connectToDatabase();
  await subscribeToUserEntries(userMap);
  await subscribeToIngresses(ingressMap);

  attachRoutes({ app, userMap, ingressMap });

  configureServer(app);

  return app.listen(SERVER_PORT, () => onServerReady);
};
bootstrap().then(onServerClose);
