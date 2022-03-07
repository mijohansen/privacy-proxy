import { browserSdk } from './browser-sdk';

describe('browserSdk', () => {
  it('should work', () => {
    expect(browserSdk()).toEqual('browser-sdk');
  });
});
