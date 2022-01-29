import { Logger } from './logging';
import { request } from 'undici';
import { promisify } from 'util';
import { gzip } from 'zlib';
import { createUrlWithParams } from './utils';

const zip = promisify(gzip);

const cache = new Map();
export const scriptFetcher = async (urlToFetch: string, params: object): Promise<Buffer> => {
  const urlString = createUrlWithParams(urlToFetch, params);
  if (!cache.has(urlString)) {
    Logger.info('Fetching content from: ' + urlString);
    const { body } = await request(urlString);
    const content = await body.text();
    const buffer = await zip(content);
    cache.set(urlString, buffer);
  }
  return cache.get(urlString);
};
