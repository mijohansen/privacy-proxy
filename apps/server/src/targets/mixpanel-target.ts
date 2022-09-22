import { BrowserUser } from '../types';
import { BrowserEvent } from '@privacy-one/browser';

export const mixpanelTarget = (event: BrowserEvent, user: BrowserUser) => {
  return { event, user };
};
