/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
'use strict';
var k,
  aa = function (a) {
    var b = 0;
    return function () {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
    };
  },
  ba =
    'function' == typeof Object.defineProperties
      ? Object.defineProperty
      : function (a, b, c) {
          if (a == Array.prototype || a == Object.prototype) return a;
          a[b] = c.value;
          return a;
        },
  la = function (a) {
    a = [
      'object' == typeof globalThis && globalThis,
      a,
      'object' == typeof window && window,
      'object' == typeof self && self,
      'object' == typeof global && global,
    ];
    for (var b = 0; b < a.length; ++b) {
      var c = a[b];
      if (c && c.Math == Math) return c;
    }
    throw Error('Cannot find global object');
  },
  ma = la(this),
  na = function (a, b) {
    if (b)
      a: {
        var c = ma;
        a = a.split('.');
        for (var d = 0; d < a.length - 1; d++) {
          var e = a[d];
          if (!(e in c)) break a;
          c = c[e];
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d && null != b && ba(c, a, { configurable: !0, writable: !0, value: b });
      }
  };
na('Symbol', function (a) {
  if (a) return a;
  var b = function (g, f) {
    this.O = g;
    ba(this, 'description', { configurable: !0, writable: !0, value: f });
  };
  b.prototype.toString = function () {
    return this.O;
  };
  var c = 'jscomp_symbol_' + ((1e9 * Math.random()) >>> 0) + '_',
    d = 0,
    e = function (g) {
      if (this instanceof e) throw new TypeError('Symbol is not a constructor');
      return new b(c + (g || '') + '_' + d++, g);
    };
  return e;
});
na('Symbol.iterator', function (a) {
  if (a) return a;
  a = Symbol('Symbol.iterator');
  for (
    var b =
        'Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array'.split(
          ' '
        ),
      c = 0;
    c < b.length;
    c++
  ) {
    var d = ma[b[c]];
    'function' === typeof d &&
      'function' != typeof d.prototype[a] &&
      ba(d.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function () {
          return oa(aa(this));
        },
      });
  }
  return a;
});
var oa = function (a) {
    a = { next: a };
    a[Symbol.iterator] = function () {
      return this;
    };
    return a;
  },
  w = function (a) {
    function b(d) {
      return a.next(d);
    }
    function c(d) {
      return a.throw(d);
    }
    return new Promise(function (d, e) {
      function g(f) {
        f.done ? d(f.value) : Promise.resolve(f.value).then(b, c).then(g, e);
      }
      g(a.next());
    });
  },
  pa = this || self;
var qa = function (a) {
  const b = Buffer.from(a, 'base64');
  if (b.toString('base64') === a) return b.toString();
};
var ra = function (a, b, c = !1) {
    a = (a || '')
      .split(';')
      .map((d) => d.replace(/^\s+/, ''))
      .filter((d) => d.startsWith(b + '='))
      .map((d) => d.substring(b.length + 1));
    return c ? a : a.map(decodeURIComponent);
  },
  x = function (a, b, c = !1) {
    return ra(a.headers.cookie || '', b, c)[0] || '';
  };
function sa(a, b) {
  var c = a.headers;
  if (c['x-gtm-server-preview']) {
    a = Object;
    var d = a.assign;
    c = c['x-gtm-server-preview'];
    Array.isArray(c) && (c = c[0] || '');
    c = (qa(c) || '').split('|');
    if (3 != c.length) throw Error("Invalid 'x-gtm-server-preview' header value.");
    return d.call(a, { containerId: b }, { l: c[0], m: c[1], s: c[2] });
  }
  d = { containerId: b, m: z(ta(c['x-gtm-auth']), b), s: z(ta(c['x-gtm-debug']), b), l: z(ta(c['x-gtm-preview']), b) };
  if (void 0 !== d.m || void 0 !== d.s || void 0 !== d.l) return d;
  c = x(a, 'gtm_auth');
  const e = x(a, 'gtm_debug');
  a = x(a, 'gtm_preview');
  d.m = z(c, b);
  d.s = z(e, b);
  d.l = z(a, b);
  return d;
}
function z(a, b) {
  const c = `${b}=`;
  a = a.split(':').find((d) => !d.indexOf(c));
  if (void 0 !== a) return a.substring(c.length);
}
function ua(a, b, c) {
  const d = `${b}=`;
  a = a.split(':').filter((e) => e.length && e.indexOf(d));
  c && a.push(`${d}${c}`);
  return a.join(':');
}
function ta(a) {
  Array.isArray(a) && (a = a[0]);
  return a || '';
}
var A = {
  'Cache-Control': 'no-store',
  'Content-Disposition': 'attachment; filename="f.txt"',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
};
const va = require('url'),
  wa = Date.now() + 10368e5 + Math.floor(1728e5 * Math.random());
var xa = 0,
  ya = 0;
function Da(a, b) {
  if ('GET' !== a.method) return !1;
  var c = va.parse(a.url, !0);
  if (!c.pathname.endsWith('/healthz') && !c.pathname.endsWith('/healthy')) return !1;
  (c = c.query.servertype) && 'serverjs' !== c
    ? (b = B(b, 500))
    : ((c = a.headers['x-sgtm-healthz'])
        ? ((c = c.split(',')[0]),
          (c = c.split('=')),
          (a = c[0]),
          (c = parseInt(c[1], 10)),
          (a = isNaN(c)
            ? B(b, 500)
            : 'server_start_millis' === a
            ? Date.now() - xa > c
              ? B(b, 500)
              : B(b, 200, 'ok')
            : 'container_refresh_millis' === a
            ? Date.now() - ya > c
              ? B(b, 500)
              : B(b, 200, 'ok')
            : !1))
        : (a = !1),
      (b = a ? !0 : Date.now() > wa ? B(b, 503) : B(b, 200, 'ok')));
  return b;
}
function B(a, b, c = '') {
  a.writeHead(b, { 'Content-Type': 'text/plain' });
  a.end(c);
  return !0;
}
const Ea = require('http'),
  Fa = require('https'),
  Ga = require('url');
var Ha = class extends Error {
  constructor(a) {
    super(a);
    this.name = 'HttpTimeoutError';
    Error.captureStackTrace(this, Ha);
  }
};
function Ia(a, b, c) {
  const d = !!b.followRedirects,
    e = Number(b.maxRedirects),
    g = isNaN(e) ? 3 : e;
  if (d && 0 > g) return Promise.reject(Error('Too many redirects.'));
  let f, h;
  return new Promise((p, q) => {
    var u = Number(b.timeout);
    let v = b.timeoutCallbacks;
    0 < u &&
      ((v = v || []),
      (h = setTimeout(() => {
        for (const r of v) r();
      }, u)));
    v &&
      v.push(() => {
        f.abort();
        q(new Ha('Request timed out.'));
      });
    const t = Object.assign({}, b);
    b.headers && (t.headers = Object.assign({}, b.headers));
    delete t.timeout;
    Ja(t);
    c && (t.headers || (t.headers = {}), (t.headers['content-length'] = Buffer.byteLength(c)));
    u = Object.assign(Ga.parse(a), t);
    f = Ka(a).request(u, (r) => {
      if (d && 300 <= r.statusCode && 400 > r.statusCode && r.headers.location) {
        r.resume();
        const C = r.headers.location;
        La(a) && !La(C)
          ? q(Error('Unable to follow HTTPS -> HTTP redirect.'))
          : p(
              Ia(
                r.headers.location,
                Object.assign(t, { timeoutCallbacks: v, followRedirects: d, maxRedirects: g - 1 }),
                c
              )
            );
      } else {
        var y = [];
        r.on('data', (C) => {
          y.push(C);
        });
        r.on('end', () => {
          p({
            statusCode: r.statusCode,
            headers: r.headers,
            body: 0 === y.length ? void 0 : Buffer.concat(y).toString(),
          });
        });
      }
    });
    f.on('error', q);
    f.end(c);
  }).finally(() => void clearTimeout(h));
}
function D(a) {
  return Ia(a, Object.assign({}, { method: 'GET' }));
}
function Ma(a) {
  if (400 <= a.statusCode) throw Error(`Received HTTP status code ${a.statusCode}.`);
}
function La(a) {
  return a.toLowerCase().startsWith('https://');
}
function Ka(a) {
  if (La(a)) return Fa;
  if (a.toLowerCase().startsWith('http://')) return Ea;
  throw Error(`URL ${a} uses unsupported protocol; must be HTTP or HTTPS.`);
}
function Ja(a) {
  global.server_js_dev_only && (a.headers || (a.headers = {}), (a.headers['X-Google-GFE-Frontline-Info'] = 'ssl'));
}
class Na {
  constructor(a, b) {
    this.P = a[pa.Symbol.iterator]();
    this.T = b;
    this.V = 0;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    const a = this.P.next();
    return { value: a.done ? void 0 : this.T.call(void 0, a.value, this.V++), done: a.done };
  }
}
var Oa = function (a, b) {
  return new Na(a, b);
};
var Pa =
  Object.freeze ||
  function (a) {
    return a;
  };
var E = 'StopIteration' in pa ? pa.StopIteration : { message: 'StopIteration', stack: '' },
  F = function () {};
F.prototype.F = function () {
  throw E;
};
F.prototype.next = function () {
  return Qa;
};
var Qa = Pa({ done: !0, value: void 0 });
F.prototype.v = function () {
  return this;
};
var Ta = function (a) {
  if (a instanceof G || a instanceof Ra || a instanceof M) return a;
  if ('function' == typeof a.F) return new G(() => Sa(a));
  if ('function' == typeof a[Symbol.iterator]) return new G(() => a[Symbol.iterator]());
  if ('function' == typeof a.v) return new G(() => Sa(a.v()));
  throw Error('Not an iterator or iterable.');
};
const Sa = (a) => {
  if (!(a instanceof F)) return a;
  let b = !1;
  return {
    next() {
      let c;
      for (; !b; )
        try {
          c = a.F();
          break;
        } catch (d) {
          if (d !== E) throw d;
          b = !0;
        }
      return { value: c, done: b };
    },
  };
};
class G {
  constructor(a) {
    this.J = a;
  }
  v() {
    return new Ra(this.J());
  }
  [Symbol.iterator]() {
    return new M(this.J());
  }
  L() {
    return new M(this.J());
  }
}
class Ra extends F {
  constructor(a) {
    super();
    this.A = a;
  }
  F() {
    const a = this.A.next();
    if (a.done) throw E;
    return a.value;
  }
  next() {
    return this.A.next();
  }
  [Symbol.iterator]() {
    return new M(this.A);
  }
  L() {
    return new M(this.A);
  }
}
class M extends G {
  constructor(a) {
    super(() => a);
    this.A = a;
  }
  next() {
    return this.A.next();
  }
}
var N = function (a, b) {
  this.i = {};
  this.h = [];
  this.B = this.size = 0;
  var c = arguments.length;
  if (1 < c) {
    if (c % 2) throw Error('Uneven number of arguments');
    for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1]);
  } else a && this.addAll(a);
};
k = N.prototype;
k.D = function () {
  return this.size;
};
k.K = function () {
  Ua(this);
  return this.h.concat();
};
k.has = function (a) {
  return O(this.i, a);
};
k.clear = function () {
  this.i = {};
  this.B = this.size = this.h.length = 0;
};
k.remove = function (a) {
  return this.delete(a);
};
k.delete = function (a) {
  return O(this.i, a) ? (delete this.i[a], --this.size, this.B++, this.h.length > 2 * this.size && Ua(this), !0) : !1;
};
var Ua = function (a) {
  if (a.size != a.h.length) {
    for (var b = 0, c = 0; b < a.h.length; ) {
      var d = a.h[b];
      O(a.i, d) && (a.h[c++] = d);
      b++;
    }
    a.h.length = c;
  }
  if (a.size != a.h.length) {
    var e = {};
    for (c = b = 0; b < a.h.length; ) (d = a.h[b]), O(e, d) || ((a.h[c++] = d), (e[d] = 1)), b++;
    a.h.length = c;
  }
};
k = N.prototype;
k.get = function (a, b) {
  return O(this.i, a) ? this.i[a] : b;
};
k.set = function (a, b) {
  O(this.i, a) || ((this.size += 1), this.h.push(a), this.B++);
  this.i[a] = b;
};
k.addAll = function (a) {
  if (a instanceof N) for (var b = a.K(), c = 0; c < b.length; c++) this.set(b[c], a.get(b[c]));
  else for (b in a) this.set(b, a[b]);
};
k.forEach = function (a, b) {
  for (var c = this.K(), d = 0; d < c.length; d++) {
    var e = c[d],
      g = this.get(e);
    a.call(b, g, e, this);
  }
};
k.clone = function () {
  return new N(this);
};
k.keys = function () {
  return Ta(this.v(!0)).L();
};
k.values = function () {
  return Ta(this.v(!1)).L();
};
k.entries = function () {
  const a = this;
  return Oa(this.keys(), function (b) {
    return [b, a.get(b)];
  });
};
k.v = function (a) {
  Ua(this);
  var b = 0,
    c = this.B,
    d = this,
    e = new F();
  e.next = function () {
    if (c != d.B) throw Error('The map has changed since the iterator was created');
    if (b >= d.h.length) return Qa;
    var f = d.h[b++];
    return { value: a ? f : d.i[f], done: !1 };
  };
  const g = e.next;
  e.F = function () {
    var f = g.call(e);
    if (f.done) throw E;
    return f.value;
  };
  return e;
};
var O = function (a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
};
var Wa = function (a) {
    this.N = a || null;
    this.G = !0;
    this.M = void 0;
    this.i = new N();
    this.g = new Va('', void 0);
    this.g.next = this.g.j = this.g;
  },
  Ya = function (a, b) {
    (b = a.i.get(b)) && a.G && (b.remove(), Xa(a, b));
    return b;
  };
k = Wa.prototype;
k.get = function (a, b) {
  return (a = Ya(this, a)) ? a.value : b;
};
k.set = function (a, b) {
  var c = Ya(this, a);
  c ? (c.value = b) : ((c = new Va(a, b)), this.i.set(a, c), Xa(this, c));
};
k.shift = function () {
  return Za(this, this.g.next);
};
k.pop = function () {
  return Za(this, this.g.j);
};
k.remove = function (a) {
  return (a = this.i.get(a)) ? (this.removeNode(a), !0) : !1;
};
k.removeNode = function (a) {
  a.remove();
  this.i.remove(a.key);
};
k.D = function () {
  return this.i.D();
};
k.K = function () {
  return this.map(function (a, b) {
    return b;
  });
};
k.contains = function (a) {
  return this.some(function (b) {
    return b == a;
  });
};
k.clear = function () {
  $a(this, 0);
};
k.forEach = function (a, b) {
  for (var c = this.g.next; c != this.g; c = c.next) a.call(b, c.value, c.key, this);
};
k.map = function (a, b) {
  for (var c = [], d = this.g.next; d != this.g; d = d.next) c.push(a.call(b, d.value, d.key, this));
  return c;
};
k.some = function (a, b) {
  for (var c = this.g.next; c != this.g; c = c.next) if (a.call(b, c.value, c.key, this)) return !0;
  return !1;
};
k.every = function (a, b) {
  for (var c = this.g.next; c != this.g; c = c.next) if (!a.call(b, c.value, c.key, this)) return !1;
  return !0;
};
var Xa = function (a, b) {
    a.G
      ? ((b.next = a.g.next), (b.j = a.g), (a.g.next = b), (b.next.j = b))
      : ((b.j = a.g.j), (b.next = a.g), (a.g.j = b), (b.j.next = b));
    null != a.N && $a(a, a.N);
  },
  $a = function (a, b) {
    for (; a.D() > b; ) {
      var c = a.G ? a.g.j : a.g.next;
      a.removeNode(c);
      a.M && a.M(c.key, c.value);
    }
  },
  Za = function (a, b) {
    a.g != b && a.removeNode(b);
    return b.value;
  },
  Va = function (a, b) {
    this.key = a;
    this.value = b;
  };
Va.prototype.remove = function () {
  this.j.next = this.next;
  this.next.j = this.j;
  delete this.j;
  delete this.next;
};
function ab(a) {
  const b = new Wa(a);
  return Object.freeze({
    get: (c) => {
      const d = b.get(c);
      if (d) {
        if (d.expires > Date.now()) return d.data;
        b.remove(c);
      }
    },
    set: (c, d, e) => {
      b.set(c, { data: d, expires: Date.now() + 1e3 * e });
    },
    count: () => b.D(),
  });
}
require('process');
const bb = require('console'),
  P = require('flags'),
  Q = require('process');
var T = class {
  constructor(a, b, c) {
    this.C = a;
    this.I = b;
    this.u = c;
  }
  isSet() {
    return P.isSet(this.I) || !!(this.u && this.u in Q.env);
  }
  get() {
    if (this.u && this.u in Q.env)
      if (P.isSet(this.I))
        bb.warn(
          `Ignored environment variable ${this.u}=${Q.env[this.u]} because command-line flag --${
            this.I
          }=${this.C.get()} was given.`
        );
      else return this.C.parseInput(Q.env[this.u]);
    return this.C.get();
  }
  setSecret(a) {
    this.C.setSecret(a);
  }
};
function U(a, b) {
  a.endsWith('.') || (a += '.');
  return b ? `${a} May also be set by ${b} environment variable.` : a;
}
var V = function (a, b, c, d) {
    b = U(b, d);
    return new T(P.defineString(a, c, b), a, d);
  },
  W = function (a, b, c) {
    b = U(b, c);
    return new T(P.defineBoolean(a, !1, b), a, c);
  },
  X = function (a, b, c, d) {
    b = U(b, d);
    return new T(P.defineInteger(a, c, b), a, d);
  },
  cb = function (a, b, c, d) {
    b = U(b, d);
    return new T(P.defineNumber(a, c, b), a, d);
  },
  hb = P.parse;
const ib = require('vm');
function jb() {
  return w(
    (function* () {
      try {
        return new (require('cacheable-lookup'))();
      } catch (a) {}
      return new Promise((a) =>
        w(
          (function* () {
            const b = setTimeout(() => void a(void 0), 3e3);
            try {
              const d = yield kb();
              if (d) {
                var c = { exports: {} };
                ib.runInThisContext(`(function () { return function (require, module) {${d}}; })();`, { timeout: 1e3 })(
                  require,
                  c
                );
                a(new c.exports());
              } else a(void 0);
            } catch (d) {
              console.error('Error loading remote CacheableLookup script:\n', d), a(void 0);
            } finally {
              clearTimeout(b);
            }
          })()
        )
      );
    })()
  );
}
function kb() {
  return w(
    (function* () {
      return D(
        'https://www.googletagmanager.com/static/serverjs/nodejs_modules/cacheable_lookup/v6_0_0/source/index.js'
      ).then((a) => {
        Ma(a);
        return a.body;
      });
    })()
  );
}
const lb = require('querystring'),
  mb = Object.freeze(['id', 'env', 'auth']);
function nb(a) {
  a = a ? qa(a) : void 0;
  if (!a) throw Error('Failed to decode the container config.');
  a = lb.parse(a);
  for (const b of mb)
    if (!a[b] || 'string' != typeof a[b]) throw Error(`Missing or invalid container config parameter: ${b}`);
  return { containerId: a.id, R: a.env, H: a.auth };
}
const ob = require('console'),
  pb = require('vm');
function qb(a) {
  return D(a).then((b) => {
    try {
      if ((Ma(b), !b.body)) throw Error('Empty or missing response body.');
    } catch (d) {
      throw Error(`Fetching container from ${a} failed: ${d.message}`);
    }
    const c = {};
    try {
      pb.runInThisContext(b.body).call(c, require);
    } catch (d) {
      throw (ob.error('Unable to eval container response.\n', d), `Unable to eval container response: ${d.message}`);
    }
    return c;
  });
}
const rb = require('url');
var tb = function (a) {
    a = rb.parse(a.url, !0).query;
    return { containerId: sb(a.id), m: sb(a.gtm_auth), l: sb(a.gtm_preview) };
  },
  vb = function (a, b) {
    var c = tb(a);
    const d = {};
    c.containerId &&
      c.m &&
      c.l &&
      ((d.containerId = c.containerId),
      (d.m = c.m),
      (d.l = c.l),
      (c = x(a, 'gtm_debug')),
      (c = z(c, d.containerId)),
      (d.s =
        c ||
        Date.now().toString(16) +
          Math.floor(1e12 * Math.random())
            .toString(16)
            .padStart(10, '0')));
    ub(a, b, d);
    return d;
  };
function sb(a) {
  return a ? (Array.isArray(a) && a.length ? a[0] : a) : '';
}
function ub(a, b, c) {
  let d = x(a, 'gtm_auth'),
    e = x(a, 'gtm_debug');
  a = x(a, 'gtm_preview');
  c.containerId && ((d = ua(d, c.containerId, c.m)), (a = ua(a, c.containerId, c.l)), (e = ua(e, c.containerId, c.s)));
  b.getHeaders()['set-cookie'] || b.setHeader('Set-Cookie', []);
  wb(b, 'gtm_auth', d);
  wb(b, 'gtm_debug', e);
  wb(b, 'gtm_preview', a);
}
function wb(a, b, c) {
  a = a.getHeaders()['set-cookie'];
  c
    ? a.push(`${b}=${c}${'; Max-Age=300; Path=/; HttpOnly; SameSite=None; Secure'}`)
    : a.push(`${b}=x${'; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; HttpOnly; SameSite=None; Secure'}`);
}
const xb = require('events');
function yb(a, b) {
  const c = {},
    d = 1e3 * a,
    e = new xb(),
    g = (f) => ((f = c[f]) ? f.splice(0, 5).map((h) => h.U) : []);
  setInterval(() => {
    const f = [],
      h = Date.now();
    Object.entries(c).forEach((p) => {
      const q = p[0];
      p = p[1];
      const u = p.findIndex((v) => v.expires > h);
      if (-1 === u) return void f.push(q);
      p.splice(0, u);
    });
    f.forEach((p) => void delete c[p]);
  }, 3e4);
  return {
    S: (f, h, p) => {
      const q = (v) => {
          clearTimeout(u);
          h(v);
        },
        u = setTimeout(() => {
          e.removeListener(f, q);
          p();
        }, 1e3 * b);
      e.once(f, q);
    },
    X: (f, h) => {
      c[f] || (c[f] = []);
      c[f].push({ expires: Date.now() + d, U: h });
      e.listenerCount(f) && e.emit(f, g(f));
    },
    W: g,
  };
}
function zb(a) {
  return {
    preview: x(a, 'gtm_preview')
      .split(':')
      .map((b) => b.split('='))
      .filter((b) => 2 === b.length),
  };
}
require('process');
const Ab = require('querystring'),
  Y = require('url');
var Eb = function (a, b, c, d) {
    return (e, g) => {
      if ('OPTIONS' !== e.method || e.headers.origin !== b) var f = !1;
      else
        g.writeHead(204, {
          'Access-Control-Allow-Headers': ['x-gtm-auth', 'x-gtm-preview', 'x-gtm-debug'],
          'Access-Control-Allow-Methods': ['GET'],
          'Access-Control-Allow-Origin': [b],
          'Access-Control-Max-Age': 86400,
        }),
          g.end(),
          (f = !0);
      if (!f && !Da(e, g))
        if (((f = Y.parse(e.url).pathname), f.endsWith('/gtm/debug'))) {
          f = d.containerId;
          const h = tb(e);
          h.containerId && h.m && h.l
            ? ((e =
                h.containerId === f
                  ? '<!DOCTYPE html><html><head><meta charset="utf-8">' +
                    `<meta name="sgtm:debug-session" content="${vb(e, g).s || ''}">` +
                    '<link rel="shortcut icon" href="//ssl.gstatic.com/analytics-suite/header/suite/v2/Favicon_GTM_suite_16.png">' +
                    `<script src="${b}/debug/fps-bootstrap">` +
                    '\x3c/script></head><body></body></html>'
                  : '<!DOCTYPE html><html><head><meta charset="utf-8"><link rel="shortcut icon" href="//ssl.gstatic.com/analytics-suite/header/suite/v2/Favicon_GTM_suite_16.png"></head><body style="padding: 20px; background-color: #f7f7f7; color: #646464;font-family: \'Google Sans\';"><img src="https://fonts.gstatic.com/s/i/googlematerialicons/sentiment_very_dissatisfied/v10/gm_grey-48dp/1x/gm_sentiment_very_dissatisfied_gm_grey_48dp.png"><h1 style="color: #333; font-weight: normal; font-size: 1.6em;">Preview failed to load</h1><h4 style="margin: 0">The preview container ID does not match the server configuration. You can preview only the container that is deployed on the server.</h4></body></html>'),
              g.writeHead(200, {
                'Content-Length': Buffer.byteLength(e),
                'Content-Type': 'text/html',
                'Cache-Control': 'no-store',
              }),
              g.end(e))
            : (g.writeHead(404, { 'Content-Type': 'text/plain' }), g.end('Not Found'));
        } else
          f.endsWith('/gtm/exit_preview')
            ? ((f = tb(e)),
              f.containerId
                ? (ub(e, g, { containerId: f.containerId }), g.writeHead(200, A), g.end())
                : (g.writeHead(404, { 'Content-Type': 'text/plain' }), g.end('Not Found')))
            : f.endsWith('/gtm/get_memo')
            ? Bb(e, g, a)
            : f.endsWith('/gtm/post_memo')
            ? Cb(e, g, a, d.H)
            : f.endsWith('/gtm/preview_status')
            ? (g.writeHead(
                200,
                Object.assign({ 'Access-Control-Allow-Origin': b, 'Access-Control-Allow-Credentials': !0 }, A)
              ),
              g.end(")]}'\n" + JSON.stringify(zb(e))))
            : Db(e, g, c) || (g.writeHead(404), g.end('Not Found'));
    };
  },
  Gb = function (a) {
    return (b, c) => {
      const d = Y.parse(`${a}${b.url}`);
      d.method = b.method;
      d.headers = b.headers;
      d.headers.forwarded = `host=${d.headers.host}`;
      delete d.headers.host;
      Fb(b, c, Ka(a), d, (e) => {
        console.error(
          'An exception was thrown while proxying preview request. Make sure the PREVIEW_SERVER_URL is set correctly and the preview server is healthy. Message: ' +
            ((e && e.message) || 'Unknown error')
        );
        c.writeHead(500);
        c.end();
      });
    };
  };
function Bb(a, b, c) {
  const d = tb(a).containerId;
  var e = Ab.parse(ra(a.headers.cookie, 'gtm_debug').join(':'), ':');
  if (d && e[d]) {
    vb(a, b);
    var g = (h) => {
      b.finished ||
        (b.writeHead(200, A), b.end(")]}'\n" + JSON.stringify({ [d]: h.reduce((p, q) => p.concat(q), []) })));
    };
    e = e[d];
    var f = c.W(e);
    f.length
      ? g(f)
      : (c.S(
          e,
          (h) => void g(h),
          () => {
            b.finished || Hb(b, 204);
          }
        ),
        a.on('aborted', () => void Hb(b, 204)));
  } else b.writeHead(404, A), b.end();
}
function Cb(a, b, c, d) {
  const e = Y.parse(a.url, !0).query.auth_code;
  if (d !== e) Hb(b, 403, 'Not authorized.');
  else {
    var g = [];
    a.on('data', (f) => void g.push(f)).on('end', () => {
      try {
        const f = JSON.parse(g.join(''));
        if (!Array.isArray(f)) throw Error();
        f.forEach((h) => {
          const p = h.sessionId;
          h = h.memos;
          if (!p || !Array.isArray(h)) throw Error();
          c.X(p, h);
        });
        b.end();
      } catch (f) {
        Hb(b, 400, 'Incoming request memo was malformed.');
      }
    });
  }
}
function Db(a, b, c) {
  const { pathname: d, search: e } = Y.parse(a.url);
  var g = e ? d + e : d,
    f = g.indexOf('/gtm/debug/');
  if (-1 === f) return !1;
  f = g.substring(f + 4);
  g = Y.parse(c + f);
  g.method = a.method;
  f.startsWith('/debug/api/') &&
    ((f = [
      `${'gtm_auth'}=${x(a, 'gtm_auth', !0)}`,
      `${'gtm_debug'}=${x(a, 'gtm_debug', !0)}`,
      `${'gtm_preview'}=${x(a, 'gtm_preview', !0)}`,
    ]),
    (g.headers = { cookie: f.join('; ') }));
  Fb(a, b, Ka(c), g, (h) => {
    console.error(
      `An exception was thrown while sending a request to ${a.url}: ` + ((h && h.message) || 'Unknown error')
    );
    b.writeHead(500);
    b.end();
  });
  return !0;
}
function Fb(a, b, c, d, e) {
  c = c.request(d, (g) => {
    b.writeHead(g.statusCode, g.headers);
    g.pipe(b, { end: !0 });
  });
  a.pipe(c, { end: !0 }).on('error', e);
}
function Hb(a, b, c) {
  a.writeHead(b);
  a.end(c);
}
function Ib(a) {
  D('https://publicsuffix.org/list/public_suffix_list.dat')
    .then((b) => void a(200 === b.statusCode ? b.body : void 0))
    .catch(() => void a(void 0));
}
function Jb(a) {
  if (a) {
    var b = new Kb();
    for (const c of a.split('\n')) c.length && !c.startsWith('//') && Lb(b, c.split(' ')[0].split('.'));
    return (c) => Mb(b, c);
  }
}
function Nb() {
  return new Promise((a, b) => {
    Ib((c) => {
      (c = Jb(c)) ? a(c) : b();
    });
  });
}
function Ob() {
  return new Promise((a) => {
    let b;
    const c = (f) => (b ? b(f) : f),
      d = setTimeout(() => void a(c), 2e3);
    let e = 0;
    const g = () =>
      void Nb().then(
        (f) => {
          clearTimeout(d);
          b = f;
          a(c);
        },
        () => {
          setTimeout(g, Math.floor(1e3 * (Math.pow(e, 4) + Math.pow(e, 2) * Math.random())));
          e++;
        }
      );
    g();
  });
}
var Qb = function (a, b, c, d) {
    let e = 0;
    if (c) {
      if (!b) return 1;
      e += 1;
      d && ((e = Pb(d, a, b - 1)), (e += 0 > e ? -1 : 1));
    }
    return e;
  },
  Lb = function (a, b) {
    const c = b.pop();
    a.o.get(c) || a.o.set(c, b.length ? new Kb() : void 0);
    b.length && Lb(a.o.get(c), b);
  },
  Mb = function (a, b) {
    if (b.startsWith('.')) return '';
    b = b.toLowerCase().split('.');
    if (2 > b.length) return '';
    a = Pb(a, b);
    if (0 > a) return b.splice(0, b.length + a), 1 < b.length ? b.join('.') : '';
    if (b.length === a) return '';
    0 === a ? b.splice(0, b.length - 2) : b.splice(0, b.length - a - 1);
    return 1 < b.length ? b.join('.') : '';
  },
  Pb = function (a, b, c = b.length - 1) {
    var d = b[c];
    if (a.o.has('!' + d)) return -1;
    d = Qb(b, c, a.o.has(d), a.o.get(d));
    a = Qb(b, c, a.o.has('*'), a.o.get('*'));
    return 0 > d && 0 > a ? Math.min(d, a) : 0 > d ? d : 0 > a ? a : Math.max(d, a);
  };
class Kb {
  constructor() {
    this.o = new Map();
  }
}
const Rb = require('vm');
function Sb(a) {
  const b = {};
  if (!a) return b;
  const c = {};
  for (const d of 'debug error info log warn trace'.split(' ')) c[d] = (...e) => void console[d](...e);
  Rb.runInNewContext(
    `(function(){\n${a}\n})();`,
    {
      console: c,
      gtag: (d, e, g) => {
        if ('policy' !== d || 'string' !== typeof e || 'function' !== typeof g) return !1;
        b[e] || (b[e] = []);
        b[e].push(g);
        return !0;
      },
    },
    { timeout: 100 }
  );
  return b;
}
const Tb = require('process'),
  Ub = require('url'),
  Vb = /^https:\/\/.+/i;
Tb.on('unhandledRejection', (a) => {
  console.error('Unhandled promise rejection.');
  throw a;
});
function Wb(a) {
  return w(
    (function* () {
      if (!a) return Promise.resolve({});
      let b = '';
      try {
        const c = yield D(a);
        Ma(c);
        b = c.body || '';
      } catch (c) {
        throw (
          (console.error(`Error loading policy script from ${a}:\n`, c),
          Error(`Error loading policy script from ${a}: ${c.message}`))
        );
      }
      try {
        return Sb(b);
      } catch (c) {
        throw (
          (console.error(`Error processing policy script at ${a}:\n`, c),
          Error(`Error processing policy script from ${a}: ${c.message}`))
        );
      }
    })()
  );
}
function Xb(a) {
  return w(
    (function* () {
      const b = yield qb(a);
      if (b.newRequestProcessor) return b;
      throw Error(`Invalid container returned from ${a} (no ${'newRequestProcessor'}).`);
    })()
  );
}
function Yb(a, b, c) {
  a = `${a}/server.js?id=${b.containerId}`;
  c
    ? ((a += `&gtm_auth=${c.m}`), (a += c.s ? '&gtm_debug=x' : ''), (a += c.l ? `&gtm_preview=${c.l}` : ''))
    : (a += `&gtm_preview=env-${b.R}&gtm_auth=${b.H}`);
  /^https?:\/\/.+/i.test(a) || Z(`Invalid container URL: ${a}`);
  return a;
}
function Z(a) {
  throw Error(a);
}
w(
  (function* () {
    function a(l) {
      return w(
        (function* () {
          var m = sa(l, R.containerId);
          if (!m.l && !m.s) return Promise.resolve(ca);
          if (!m.m)
            return (
              e.log(`Request ${l.method} ${l.url} from ${l.socket.remoteAddress} missing required authentication.`),
              Promise.resolve((n, H) => {
                b(H, 401);
              })
            );
          m = yield Xb(Yb(da, R, m));
          return ea(m, {}, I);
        })()
      );
    }
    function b(l, m, n) {
      n
        ? (l.writeHead(m, { 'Content-Length': Buffer.byteLength(n), 'Content-Type': 'text/plain' }), l.end(n))
        : (l.writeHead(m), l.end());
    }
    function c(l, m) {
      return w(
        (function* () {
          if ('OPTIONS' !== l.method || 'https://tagmanager.googleusercontent.com' !== l.headers.origin) var n = !1;
          else
            m.writeHead(204, {
              'Access-Control-Allow-Credentials': !0,
              'Access-Control-Allow-Headers': ['x-gtm-auth', 'x-gtm-preview', 'x-gtm-debug', 'x-gtm-cloud-test'],
              'Access-Control-Allow-Methods': ['GET'],
              'Access-Control-Allow-Origin': ['https://tagmanager.googleusercontent.com'],
              'Access-Control-Max-Age': 86400,
            }),
              m.end(),
              (n = !0);
          if (!n && !Da(l, m)) {
            try {
              var H = yield a(l);
            } catch (za) {
              e.error(`getServerJsRequestHandler failed\n${za}`);
              b(m, 500);
              return;
            }
            H(l, m);
          }
        })()
      );
    }
    function d(l, m) {
      const n = g.createServer(l).listen(fa, v.get() || void 0);
      void 0 !== m && (n.timeout = m);
      return new Promise((H, za) => {
        xa || (xa = Date.now());
        n.on('listening', () => {
          e.log(`***Listening on ${JSON.stringify(n.address())}***`);
          Aa = n.address().port;
          H(n);
        });
        n.on('error', (db) => {
          e.error('Server failed to start', db);
          za(db);
        });
      });
    }
    const e = require('console'),
      g = require('http');
    var f = V(
        'container_config',
        'Base64-encoded container parameters in the URL query string format. This flag is required to be set.',
        void 0,
        'CONTAINER_CONFIG'
      ),
      h = W(
        'run_as_debug_server',
        'Enable when the server should run as a debug server. See the documentation for additional details.',
        'RUN_AS_DEBUG_SERVER'
      );
    h.setSecret(!0);
    const p = W(
      'run_as_preview_server',
      'Enable when the server should run as a preview server. See the documentation for additional details.',
      'RUN_AS_PREVIEW_SERVER'
    );
    var q = V(
        'preview_server_url',
        'URL for the preview server. This should not be set with the run_as_preview_server setting set to true.',
        void 0,
        'PREVIEW_SERVER_URL'
      ),
      u = X('container_refresh_seconds', 'Interval between container refreshes', 60, 'CONTAINER_REFRESH_SECONDS');
    const v = V(
      'host',
      'Host on which to bind. Set the value to empty string to listen on the unspecified IPv6 address (::) if available, or the unspecified IPv4 address (0.0.0.0) otherwise.',
      '',
      'HOST'
    );
    var t = X('port', 'Port to listen on', 8080, 'PORT'),
      r = X(
        'debug_message_expiration_seconds',
        'Number of seconds after which an unread debug message is deleted. This flag is applicable only when running as the debug server.',
        600,
        'DEBUG_MESSAGE_EXPIRATION_SECONDS'
      ),
      y = V('policy_script_url', 'HTTPS URL from which to load the policy script.', void 0, 'POLICY_SCRIPT_URL'),
      C = X(
        'policy_script_refresh_seconds',
        'Interval between policy script refreshes',
        60,
        'POLICY_SCRIPT_REFRESH_SECONDS'
      );
    let ha, ia, ja;
    if (global.server_js_dev_only) {
      ha = V(
        'tag_manager_ui_url',
        'The Google Tag Manager UI URL. Value must not end in a /.',
        'https://tagmanager.google.com',
        'TAG_MANAGER_UI_URL'
      );
      ha.setSecret(!0);
      ia = V(
        'ctfe_url',
        'The Google Tag Manager Frontend URL. Value must not end in a /.',
        'https://www.googletagmanager.com',
        'CTFE_URL'
      );
      ia.setSecret(!0);
      ja = X(
        'socketTimeoutInMillis',
        'Number of milliseconds socket can remain idle before timeout.',
        void 0,
        'SOCKET_TIMEOUT_IN_MILLIS'
      );
      ja.setSecret(!0);
      var J = W('fetch_uncompiled', 'Fetch the uncompiled container from CTFE', 'FETCH_UNCOMPILED');
      J.setSecret(!0);
    }
    J = cb('cache_size', 'Number of items the cache can hold.', 50, 'CACHE_SIZE');
    J.setSecret(!0);
    const Ba = W(
      'include_debug_server',
      'Enable to include the debug server in the server-side GTM server. When enabled, all requests sent to /gtm/* will be routed to the internal debug server. This is intended for QA only. Do not use in production.',
      'INCLUDE_DEBUG_SERVER'
    );
    Ba.setSecret(!0);
    const eb = cb(
      'get_memo_long_poll_timeout_sec',
      'Number of seconds until a get memo request times out.',
      20,
      'GET_MEMO_LONG_POLL_TIMEOUT_SEC'
    );
    eb.setSecret(!0);
    P.usageInfo +=
      '\nFor options that can be set via either command-line flag or an environment variable, the command-line flag value takes precedence.';
    hb();
    const fa = t.get();
    (0 > fa || 65535 < fa) && Z(`Invalid port: ${fa}`);
    t = ja && ja.get();
    (f = f.get()) ||
      Z(
        'Missing container config. Please provide the CONTAINER_CONFIG environment variable or the container_config command line option.'
      );
    const R = nb(f);
    let Aa, S;
    const da = (ia && ia.get()) || 'https://www.googletagmanager.com';
    if ((h = h.get() || p.get()) || Ba.get())
      if (((r = yb(r.get(), eb.get())), (S = Eb(r, (ha && ha.get()) || 'https://tagmanager.google.com', da, R)), h))
        return (
          q.get() && e.log('Warning: PREVIEW_SERVER_URL should not be set if RUN_AS_PREVIEW_SERVER is set to true.'),
          d(S, t)
        );
    const K = q.get();
    K && (Vb.test(K) || Z(`Invalid preview server URL: ${K}`), (S = Gb(K)));
    q = u.get();
    0 > q && Z(`Invalid container refresh seconds: ${q}`);
    const L = y.get();
    L && !Vb.test(L) && Z(`Invalid policy script URL: ${L}`);
    y = C.get();
    0 > y && Z(`Invalid policy script refresh seconds: ${y}`);
    let I = {},
      ca = () => {};
    const Zb = ab(J.get()),
      Ca = {};
    let fb;
    const $b = () => (K ? K : Ba.get() && Aa ? `http://localhost:${Aa}` : void 0);
    jb().then((l) => {
      if (l) {
        var m = require('https'),
          n = require('http');
        try {
          l.install(m.globalAgent), l.install(n.globalAgent);
        } catch (H) {
          e.warn('Failed to install cacheable lookup on HTTP(S) library.');
        }
      }
    });
    const ea = (l, m, n) =>
        w(
          (function* () {
            return l.newRequestProcessor({
              authCode: R.H,
              cache: Zb,
              ctfeUrl: da,
              getDebugServerEndpointOverride: $b,
              persistentStorage: m,
              policyMap: n,
              registerableDomainResolver: fb,
            });
          })()
        ),
      gb = Yb(da, R);
    C = Xb(gb);
    J = Wb(L);
    u = Ob();
    let ka = yield C;
    ya = Date.now();
    I = yield J;
    fb = yield u;
    0 < q &&
      setInterval(
        () =>
          w(
            (function* () {
              try {
                (ka = yield Xb(gb)), (ya = Date.now()), (ca = yield ea(ka, Ca, I));
              } catch (l) {
                console.error(l.message);
              }
            })()
          ),
        1e3 * q
      );
    L &&
      0 < y &&
      setInterval(
        () =>
          w(
            (function* () {
              try {
                (I = yield Wb(L)), (ca = yield ea(ka, Ca, I));
              } catch (l) {
                console.error(l.message);
              }
            })()
          ),
        1e3 * y
      );
    ca = yield ea(ka, Ca, I);
    return S
      ? d((l, m) => {
          const n = Ub.parse(l.url).pathname;
          n.endsWith('/gtm') || n.includes('/gtm/') ? S(l, m) : c(l, m);
        }, t)
      : d(c, t);
  })()
);
