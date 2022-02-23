import { Express } from 'express';
import compression from 'compression';
import { collectDefaultMetrics, register } from 'prom-client';

export const configureServer = (app: Express) => {
  collectDefaultMetrics({});
  app.use(compression());

  app.get('/metrics', async (req, res) => {
    const metrics = await register.metrics();
    res.contentType(register.contentType);
    res.send(metrics);
  });
};
