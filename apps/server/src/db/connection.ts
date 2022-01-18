import { Pool } from 'pg';
import { Logger } from '../utils/logging';
import createSubscriber from 'pg-listen';
import { databaseConfig } from '../config';

const dbPool = new Pool(databaseConfig);
const subscriber = createSubscriber(databaseConfig);

const subscribe = (callbackFunction) => {
  subscriber.notifications.on('my-channel', (payload) => {
    // Payload as passed to subscriber.notify() (see below)
    console.log("Received notification in 'my-channel':", payload);
    callbackFunction(payload);
  });
};

subscriber.events.on('error', (error) => {
  Logger.error('Fatal database connection error:', error);
  process.exit(1);
});
const connect = async () => {
  await subscriber.connect();
  await subscriber.listenTo('my-channel');
};

const sendSampleMessage = async () => {
  return await subscriber.notify('my-channel', {
    greeting: 'Hey, buddy.',
    timestamp: Date.now(),
  });
};

dbPool.on('connect', () => {
  dbPool.on('error', (error) => {
    Logger.error('(pg)' + error.name + ': ' + error.message);
  });
});

process.on('exit', async (code) => {
  Logger.error('(pg) gracefully shutdown after exit(' + code + ')');
  await subscriber.close();
  await dbPool.end();
});
process.on('SIGTERM', async () => {
  Logger.error('(pg) gracefully shutdown after SIGTERM');
  await dbPool.end();
});

export { dbPool, subscribe, connect, sendSampleMessage };
