/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import { createIngressMap, IngressEntry } from './data/ingresses';
import { createUserMap, UserEntry } from './data/users';
import { connect, sendSampleMessage, subscribe } from './db/connection';
import { attachRoutes } from "./routes";

const bootstrap = async () => {
  const app = express();

  const userMap = createUserMap();
  subscribe('users', (user: UserEntry) => {
    userMap.set(user.user_id, user);
  });

  const ingressMap = createIngressMap();
  subscribe('ingresses', (ingressEntry: IngressEntry) => {
    ingressMap.set(ingressEntry.ingress, ingressEntry.eventData);
  });

  attachRoutes(app);
  app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to server!' });
  });
  app.get('/test-notification', async (req, res) => {
    const message = await sendSampleMessage();
    res.send({ message });
  });
  const port = process.env.PORT || 3333;
  await connect();
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
};
bootstrap().then(() => {
  console.log('Done...');
});
