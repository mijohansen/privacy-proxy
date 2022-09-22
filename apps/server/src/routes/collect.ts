/***
 * Collect endpoint
 */
import { AppContext } from '../types';
import { COOKIE_NAME } from '../config';
import { COLLECT_PATH } from '../paths';
import { BrowserEvent } from '@privacy-one/browser';
import { forwardToTargets } from '../targets';

export const collectRoutes = (context: AppContext) => {
  const { app } = context;

  app.all(COLLECT_PATH, async (req, res) => {
    const event = req.body as BrowserEvent;
    await forwardToTargets(event, {
      ip: '84.20.102.121' ?? req.ip,
      ua: req.get('User-Agent'),
      deviceId: req.cookies[COOKIE_NAME],
    });
    res.send('success');
  });
};
