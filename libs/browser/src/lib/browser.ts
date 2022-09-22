import 'unfetch/polyfill';
import { BrowserEvent, TrackingOptions } from './types';

let trackingOptions: TrackingOptions = {
  endpoint: '',
  headers: {
    'Content-Type': 'application/json',
  },
};

export function setUp(options: TrackingOptions) {
  trackingOptions = Object.assign(trackingOptions, options);
}
export async function track(
  event: string,
  props?: object,
  items?: any[]
): Promise<Response | unknown> {
  try {
    const { title, location, referrer } = window.document;
    const { width, height } = window.screen;
    const { innerWidth, innerHeight } = window;
    const e: BrowserEvent = {
      en: event,
      props,
      i: items,
      dt: title,
      dl: location.toString(),
      dr: referrer,
      uid: trackingOptions.userId,
      sr: width + 'x' + height,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ul: navigator.language || navigator.userLanguage,
      vp: innerWidth + 'x' + innerHeight,
    };

    return fetch(trackingOptions.endpoint, {
      method: 'POST',
      headers: trackingOptions.headers,
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(e),
    });
  } catch (e) {
    console.error(e);
    return e;
  }
}
