/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to soaker!' });
});
app.get('*', async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log('Soaker received traffic', req.path);
  res.send('ok');
});
const port = process.env.SOAKER_PORT;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
