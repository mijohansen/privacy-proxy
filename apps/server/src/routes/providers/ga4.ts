import { AppContext } from '../../types';
import { scriptFetcher } from '../../utils/script-fetcher';
import { filterGA4data } from '../../providers/ga4';
import { createUrlWithParams } from '../../utils/utils';
import { Logger } from '../../utils/logging';
import { GA4_ENDPOINT } from '../../config';

export const providerGa4Routes = (context: AppContext) => {
  const { app } = context;
  Logger.info('ProviderGa4Routes is registered');

  app.get('/gtag/js', async (req, res) => {
    const { id } = req.query;
    const l = 'dataLayer',
      cx = 'c';
    const buffer = await scriptFetcher('https://www.googletagmanager.com/gtag/js', { id, l, cx });
    res.set('content-type', 'application/javascript');
    res.set('content-encoding', 'gzip');
    res.write(buffer, 'binary');
    res.end(null, 'binary');
  });

  app.all('/g/collect', async (req, res) => {
    const params = await filterGA4data(req.query);
    const urlString = createUrlWithParams(GA4_ENDPOINT, params);
    Logger.debug('Would forward' + urlString);
    res.send('ok');
  });
};
