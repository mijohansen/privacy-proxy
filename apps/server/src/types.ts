import { Express } from 'express';
import LRUCache from 'lru-cache';

export type AppContext = {
  app: Express;
  userMap: LRUCache<string, string>;
  ingressMap: Map<string, IngressEntry>;
};

export interface UserEntry {
  piiHash: string;
  trackingId: string;
}

export interface IngressEntry {
  ingress: string;
  eventData: any;
}

export interface BrowserUser {
  ip: string;
  deviceId: string;
  ua: string;
}
