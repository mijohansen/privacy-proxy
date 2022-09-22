import { BrowserEvent } from '@privacy-one/browser';
import { BrowserUser } from '../types';

export const amplitudeTarget = (event: BrowserEvent, user: BrowserUser) => {
  return { event, user };
};

export const amplitudeEventMapper = () => {};
