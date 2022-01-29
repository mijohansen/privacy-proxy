import { Express } from 'express';
import compression from 'compression';

export const configureServer = (app: Express) => {
  app.use(compression());
};
