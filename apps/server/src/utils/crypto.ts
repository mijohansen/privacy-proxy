import getUuidByString from 'uuid-by-string';
import { randomUUID } from 'crypto';

import { SECRET_SALT } from '../config';

const hashUserString = (pii: string) => {
  return getUuidByString(JSON.stringify([pii, SECRET_SALT]), 5);
};
const generateTrackingUuid = () => {
  return randomUUID();
};

export { hashUserString, generateTrackingUuid };
