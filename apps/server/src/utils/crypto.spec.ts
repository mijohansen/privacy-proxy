import { hashUserString, generateTrackingUuid } from './crypto';

it('should work', () => {
  const hashed = hashUserString('something,weird');
  console.log(hashed);
  const trackingUuid = generateTrackingUuid();
  console.log(trackingUuid);
});
