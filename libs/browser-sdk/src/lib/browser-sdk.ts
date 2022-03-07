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
export function track(eventData: BrowserEvent): Promise<Response> {
  try {
    const { title, location } = window.document;
    eventData.dt = title;
    eventData.dl = location.toString();

    const { width, height } = window.screen;
    eventData.sr = width + 'x' + height;

    const { innerWidth, innerHeight } = window;
    eventData.va = innerWidth + 'x' + innerHeight;

    return fetch(trackingOptions.endpoint, {
      method: 'POST',
      headers: trackingOptions.headers,
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(eventData),
    });
  } catch (e) {
    console.error(e);
    return e;
  }
}
