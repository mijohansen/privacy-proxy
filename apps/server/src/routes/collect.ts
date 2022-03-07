/***
 * Collect endpoint
 */
import { AppContext } from '../types';
import { Logger } from '../utils/logging';
import { COOKIE_NAME } from '../config';

export const collectRoutes = (context: AppContext) => {
  const { app } = context;
  app.all('/collect', (req, res) => {
    const { body } = req;
    const userId = req.cookies[COOKIE_NAME];
    console.debug(body);
    Logger.debug({ body });
    res.send('success: ' + userId);
  });
};
