import { BrowserUser } from '../types';
import { BrowserEvent } from '@privacy-one/browser';
import { GA4_API_SECRET, GA4_ENDPOINT, GA4_MEASUREMENT_ID } from '../config';
import { request } from 'undici';
import { snakeCase } from 'snake-case';

export const ga4Target = async (event: BrowserEvent, user: BrowserUser) => {
  const url = ga4Url(GA4_ENDPOINT, GA4_MEASUREMENT_ID, GA4_API_SECRET);

  const body = JSON.stringify({
    client_id: user.deviceId,
    events: [
      {
        name: 'page_view' ?? snakeCase(event.en),
        params: {
          page_title: event.dt,
          page_location: event.dl,
          language: event.ul,
          page_referrer: event.dr,
          screen_resolution: event.sr,
        },
      },
    ],
  });
  console.log({ url, body });
  return request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
};

export const ga4Url = (endpoint: string, measurementId: string, apiSecret: string) => {
  const url = new URL(endpoint);
  url.searchParams.append('measurement_id', measurementId);
  url.searchParams.append('api_secret', apiSecret);
  return url.toString();
};
