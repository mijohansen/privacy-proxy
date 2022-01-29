import getUuidByString from 'uuid-by-string';
import { randomUUID } from 'crypto';
import validator from 'validator';

export function privacyPack(): string {
  return 'privacy-pack';
}
export const validUrl = (s: string) => {
  return validator.isURL(s);
};

export const urlMapLookup = (urlRaw: URL, map: Map<string, string>) => {
  const url = urlRaw.toString().replace(/\/$/, '').replace(/\#$/, '');
  const parts = url.split('/');
  let entry;
  for (let i = 7; i >= 3; i--) {
    if (parts.length >= i) {
      entry = map.get(parts.slice(0, i).join('/'));
      if (entry) {
        break;
      }
    }
  }
  return entry;
};
export const hashUserString = (pii: string, salt: string) => {
  return getUuidByString(JSON.stringify([pii, salt]), 5);
};
export const generateTrackingUuid = () => {
  return randomUUID();
};
export const cleanUrlRegexes = [
  //  HEX and DASH 6+ usually is an ID, for example start of (faceb)ook actually contains 5 legal hex chars =)
  { regex: /[a-f0-9\-]{6,}/gi },
  // id format https://www.nav.no/initial/1000Ro2Fi
  { regex: /\d[oiA-Z0-9]{8,}/g },
];

export const cleanUrl = (url: any, replaceText: string) => {
  let outputUrl = url;
  if (typeof url === 'string' || url instanceof String) {
    cleanUrlRegexes.forEach((format) => {
      outputUrl = outputUrl.replace(format.regex, replaceText);
    });
  }
  return outputUrl;
};
