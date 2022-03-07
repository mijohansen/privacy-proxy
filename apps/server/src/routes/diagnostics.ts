import { AppContext } from '../types';
import { METRICS_PATH } from '../config';
import { register } from 'prom-client';

export const diagnosticsRoutes = (context: AppContext) => {
  const { app } = context;
  app.get(METRICS_PATH, async (req, res) => {
    try {
      res.set('Content-Type', register.contentType);
      res.end(await register.metrics());
    } catch (error) {
      res.status(500).end(error);
    }
  });
};
