import { createNewUserInDb, getUserByHashFromDb } from './users';
import { UserEntry } from '../types';
import { randomUUID } from 'crypto';

it('should work', async () => {
  const testData: UserEntry = {
    piiHash: randomUUID(),
    trackingId: randomUUID(),
  };

  await createNewUserInDb(testData);
  const trackingId = await getUserByHashFromDb(testData.piiHash);
  expect(trackingId).toEqual(testData.trackingId);
});
