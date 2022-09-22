import { BrowserEvent } from '@privacy-one/browser';
import { BrowserUser } from '../types';

export const kafkaTarget = (event: BrowserEvent, user: BrowserUser) => {
  return { event, user };
};
