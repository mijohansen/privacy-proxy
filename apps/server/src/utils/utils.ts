export const isProduction = () => {
  return false;
};

export const createUrlWithParams = (url: string, params: object) => {
  const urlObj = new URL(url);
  Object.keys(params).forEach((key) => {
    urlObj.searchParams.append(key, params[key]);
  });
  return url.toString();
};

export const allEqual = (arr: any[]) => {
  return new Set(arr).size == 1;
};
