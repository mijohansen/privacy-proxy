import { normalizeEmail } from '@privacy/privacy-pack';

const gmailEmailsToNormalize = [
  'johnotander@gmail.com',
  'johnotander@googlemail.com',
  'johnotander@GMAIL.com',
  'johnotander+foobar@gmail.com',
  'john.o.t.a.n.d.er+foobar@gmail.com',
  'JOHN.o.t.a.n.d.er+foobar@googlemail.com',
  'john.otander@gmail.com',
];

const hotmailEmailsToNormalize = [
  'johnotander@hotmail.com',
  'johnotander@hotmail.com',
  'johnotander@HOTMAIL.com',
  'Johnotander@hotmail.com',
];

const liveEmailsToNormalize = [
  'johnotander@live.com',
  'johnotander@live.com',
  'johnotander@live.com',
  'johnotander+foobar@live.com',
  'john.o.t.a.n.d.er+foobar@live.com',
  'JOHN.o.t.a.n.d.er+foobar@live.com',
  'john.otander@live.com',
];

const outlookEmailsToNormalize = [
  'john.otander@outlook.com',
  'JOHN.otander@outlook.com',
  'john.Otander+any.label@outlook.com',
  'john.otander+foobar@outlook.com',
];

describe('normalize-email', function () {
  it('should normalize gmail emails', function () {
    gmailEmailsToNormalize.forEach(function (email) {
      expect(normalizeEmail(email)).toEqual('johnotander@gmail.com');
    });
  });

  it('should normalize hotmail emails', function () {
    hotmailEmailsToNormalize.forEach(function (email) {
      expect(normalizeEmail(email)).toEqual('johnotander@hotmail.com');
    });
  });

  it('should not remove dots from hotmail emails', function () {
    expect(normalizeEmail('john.otander@hotmail.com')).toEqual('john.otander@hotmail.com');
  });

  it('should normalize live emails', function () {
    liveEmailsToNormalize.forEach(function (email) {
      expect(normalizeEmail(email)).toEqual('johnotander@live.com');
    });
  });

  it('should normalize outlook emails', function () {
    outlookEmailsToNormalize.forEach(function (email) {
      expect(normalizeEmail(email)).toEqual('john.otander@outlook.com');
    });
  });
});
