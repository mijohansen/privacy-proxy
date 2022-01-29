import { IngressEntry } from '../types';
import { notifyChannel, subscribeToChannel } from '../db/connection';
import { INGRESS_CHANNEL_NAME } from '../config';

const createIngressMap = () => {
  return new Map<string, IngressEntry>();
};
const subscribeToIngresses = async (ingressMap: Map<string, IngressEntry>) => {
  await subscribeToChannel(INGRESS_CHANNEL_NAME, (ingressEntry: IngressEntry) => {
    ingressMap.set(ingressEntry.ingress, ingressEntry.eventData);
  });
};

const notifyAboutIngresses = async (ingressEntry: Map<string, IngressEntry>) => {
  return await notifyChannel(INGRESS_CHANNEL_NAME, ingressEntry);
};

const addIngressEntry = async (ingressEntry) => {};
export { createIngressMap, subscribeToIngresses, notifyAboutIngresses };
