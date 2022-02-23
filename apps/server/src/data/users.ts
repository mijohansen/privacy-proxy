import LRUCache from 'lru-cache';
import { createNewUserInDb, getUserByHashFromDb } from '../db';
import { generateTrackingUuid, hashUserString } from '@privacy/privacy-pack';
import { Logger } from '../utils/logging';
import { notifyChannel, subscribeToChannel } from '../db/connection';
import { UserEntry } from '../types';
import { SECRET_SALT, USER_CHANNEL_NAME, USER_MAX_CACHE } from '../config';

const cacheOptions = {
  max: USER_MAX_CACHE,
};

const createUserMap = (): LRUCache<string, string> => {
  return new LRUCache(cacheOptions);
};
const notifyAboutUserEntry = async (userEntry: UserEntry) => {
  return await notifyChannel(USER_CHANNEL_NAME, userEntry);
};

const subscribeToUserEntries = async (userMap: LRUCache<string, string>) => {
  await subscribeToChannel(USER_CHANNEL_NAME, (user: UserEntry) => {
    userMap.set(user.piiHash, user.trackingId);
  });
};
const getUserByPii = async (userCache: LRUCache<string, string>, pii: string) => {
  const piiHash = hashUserString(pii, SECRET_SALT);
  return getUserByHash(userCache, piiHash);
};
const getUserByHash = async (userCache: LRUCache<string, string>, piiHash: string) => {
  const userFromCache = userCache.get(piiHash);
  if (userFromCache) {
    return userFromCache;
  } else {
    const fromDb = await getUserByHashFromDb(piiHash);
    if (fromDb) {
      return fromDb;
    } else {
      // user need to be created.
      const trackingId = generateTrackingUuid();
      createNewUserInDb({ piiHash: piiHash, trackingId }).then(() => {
        Logger.debug('user was created async', { userHash: piiHash, trackingId });
        notifyAboutUserEntry({ piiHash: piiHash, trackingId });
      });
      return trackingId;
    }
  }
};

export { createUserMap, getUserByHash, subscribeToUserEntries, getUserByPii };
