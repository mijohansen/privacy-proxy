import { Express } from 'express';
import { generateTrackingUuid, hashUserString } from '../utils/crypto';

const identityRoute = (app: Express) => {
  app.get('/api/ident', (req, res) => {
    res.send({
      message: hashUserString('michael.johansen@gmail.com'),
      trackingId: generateTrackingUuid(),
    });
  });
};
export { identityRoute };
