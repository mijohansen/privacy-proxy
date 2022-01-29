import {
  generateTrackingUuid,
  hashUserString,
  privacyPack,
} from './privacy-pack';

describe('privacyPack', () => {
  it('should work', () => {
    expect(privacyPack()).toEqual('privacy-pack');
  });
  it('should work', () => {
    const hashed = hashUserString('something,weird', 'asdfasdfsa');
    console.log(hashed);
    const trackingUuid = generateTrackingUuid();
    console.log(trackingUuid);
  });
});
