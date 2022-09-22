import { BrowserEvent } from '@privacy-one/browser';
import { BrowserUser } from './types';
import UAParser from 'ua-parser-js';
import { lookup } from 'geoip-lite';
import { ga4Target } from './targets/ga4-target';

/**
 * This function hands the events further to the targets.
 * @param event
 * @param user
 */
export const forwardToTargets = async (event: BrowserEvent, user: BrowserUser) => {
  const uaData = new UAParser(user.ua).getResult();
  const geoData = lookup(user.ip);
  //console.log(geoData);
  //console.debug({ event, user, uaData });
  const { body, statusCode, headers } = await ga4Target(event, user);
  console.log({ statusCode, headers });
  const resultBody = await body.text();
  console.log({ resultBody });
};
