import { generateTrackingUuid, hashUserString } from '@privacy/privacy-pack';
import { AppContext } from '../types';
import { SECRET_SALT } from '../config';

export const identityRoute = (context: AppContext) => {
  const { app } = context;
  app.get('/api/ident', (req, res) => {
    res.send({
      message: hashUserString('michael.johansen@gmail.com', SECRET_SALT),
      trackingId: generateTrackingUuid(),
    });
  });
};
