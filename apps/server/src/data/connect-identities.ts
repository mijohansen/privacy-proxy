import { generateTrackingUuid, hashUserString } from '@privacy/privacy-pack';
import { SECRET_SALT } from '../config';
import { allEqual } from '../utils/utils';
import { createNewUserInDb, getUserByHashFromDb } from '../db';

const connectIdentities = async (identities: string[]) => {
  const status = {
    success: false,
    message: '',
    existingTrackingIds: [],
    trackingId: null,
    notConnectedUserHashes: [],
    newEntries: false,
  };

  identities.forEach((identity) => {
    const hashedPii = hashUserString(identity, SECRET_SALT);
    const existingTrackingId = getUserByHashFromDb(hashedPii);
    if (existingTrackingId) {
      status.existingTrackingIds.push(existingTrackingId);
    } else {
      status.notConnectedUserHashes.push(hashedPii);
    }
  });
  //
  if (status.existingTrackingIds.length === identities.length) {
    if (allEqual(status.existingTrackingIds)) {
      status.success = true;
      status.message = 'Ok, already connected identities';
      status.trackingId = status.existingTrackingIds[0];
    } else {
      status.success = false;
      status.message = 'Identities is connected to different users in the dataset already, need manual fix.';
    }
  } else if (allEqual(status.existingTrackingIds)) {
    status.success = true;
    status.message = 'Found one tracking identity, connecting the others';
    status.trackingId = status.existingTrackingIds[0];
  } else if (status.existingTrackingIds.length === 0) {
    status.success = true;
    status.message = 'Found none, creating a new.';
    status.trackingId = generateTrackingUuid();
  } else {
    status.success = false;
    status.message = 'Some issue that i havent thought about.';
  }
  if (status.success && status.notConnectedUserHashes.length > 0) {
    const promises = [];
    status.notConnectedUserHashes.forEach((piiHash) => {
      promises.push(createNewUserInDb({ piiHash, trackingId: status.trackingId }));
    });
    await Promise.all(promises);
    status.newEntries = true;
  }
  return status;
};

export { connectIdentities };
