const isProduction = () => {
  return false;
};

const validUrl = (s: string) => {
  try {
    new URL(s);
    return true;
  } catch (err) {
    return false;
  }
};

const urlMapLookup = (urlRaw: URL, map: Map<string, string>) => {
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
export { validUrl, isProduction, urlMapLookup };
