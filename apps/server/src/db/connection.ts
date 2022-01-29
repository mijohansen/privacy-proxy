import { Pool } from 'pg';
import { Logger } from '../utils/logging';
import createSubscriber from 'pg-listen';
import { DB_CONFIG } from '../config';

const dbPool = new Pool(DB_CONFIG);
const subscriber = createSubscriber(DB_CONFIG);
const sampleChannel = 'my-channel';
const subscribeToChannel = async (channelName: string, callbackFunction: (payload: any) => void) => {
  await subscriber.listenTo(channelName);
  subscriber.notifications.on(channelName, (payload) => {
    console.log('Received notification in', channelName, payload);
    callbackFunction(payload);
  });
};

subscriber.events.on('error', (error) => {
  Logger.error('(pg) Fatal database connection error:', error);
  process.exit(1);
});
const connectToDatabase = async () => {
  await subscriber.connect();
  await subscriber.listenTo(sampleChannel);
};

const notifyChannel = async (channel: string, message: any) => {
  return await subscriber.notify(channel, message);
};
const sendSampleMessage = async () => {
  return await subscriber.notify(sampleChannel, {
    greeting: 'Hey, buddy.',
    timestamp: Date.now(),
  });
};

dbPool.on('connect', () => {
  dbPool.on('error', (error) => {
    Logger.error('(pg) ' + error.name + ': ' + error.message);
  });
});

process.on('exit', async (code) => {
  Logger.info('(pg) gracefully shutdown after exit(' + code + ')');
  await subscriber.close();
  await dbPool.end();
});
process.on('SIGTERM', async () => {
  Logger.info('(pg) gracefully shutdown after SIGTERM');
  await dbPool.end();
});

export { dbPool, subscribeToChannel, connectToDatabase, sendSampleMessage, notifyChannel };
