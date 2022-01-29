/**
 * This badboy is copied from
 * https://github.com/johno/normalize-email
 *
 * Project seem to not be in any active development, so I just include it here
 * for security scans and all that.
 *
 */

const PLUS_ONLY = /\+.*$/;
const PLUS_AND_DOT = /\.|\+.*$/g;
const normalizeableProviders = {
  'gmail.com': {
    cut: PLUS_AND_DOT,
  },
  'googlemail.com': {
    cut: PLUS_AND_DOT,
    aliasOf: 'gmail.com',
  },
  'hotmail.com': {
    cut: PLUS_ONLY,
  },
  'live.com': {
    cut: PLUS_AND_DOT,
  },
  'outlook.com': {
    cut: PLUS_ONLY,
  },
};

export function normalizeEmail(inputEmail) {
  if (typeof inputEmail != 'string') {
    throw new TypeError('normalize-email expects a string');
  }

  const email = inputEmail.toLowerCase();
  const emailParts = email.split(/@/);

  if (emailParts.length !== 2) {
    return inputEmail;
  }

  let username = emailParts[0];
  let domain = emailParts[1];

  if (normalizeableProviders.hasOwnProperty(domain)) {
    if (normalizeableProviders[domain].hasOwnProperty('cut')) {
      username = username.replace(normalizeableProviders[domain].cut, '');
    }
    if (normalizeableProviders[domain].hasOwnProperty('aliasOf')) {
      domain = normalizeableProviders[domain].aliasOf;
    }
  }

  return username + '@' + domain;
}
