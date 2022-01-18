/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import { connect, sendSampleMessage, subscribe } from './db/connection';

const bootstrap = async () => {
  const app = express();

  subscribe((payload) => {
    console.log(payload);
  });

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
