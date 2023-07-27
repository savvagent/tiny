var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/TinyUri.js
var TinyUri_exports = {};
__export(TinyUri_exports, {
  default: () => TinyUri
});
module.exports = __toCommonJS(TinyUri_exports);

// src/Path.js
var Path = class {
  /**
   * @param {string} f - string path
   * @param {object} ctx - context of Uri class
   */
  constructor(f, ctx = {}) {
    this.ctx = ctx;
    this._path = [];
    return this.parse(f);
  }
  /**
   * Append to a path
   * @param {string} s path to append
   * @return {instance} for chaining
   */
  append(s) {
    this._path.push(s);
    return this.ctx;
  }
  /**
   * Delete end of path
   * @param {integer} loc - segment of path to delete
   * @return {instance} for chaining
   */
  delete(loc) {
    if (Array.isArray(loc)) {
      loc.reverse().forEach((l2) => this._path.splice(l2, 1));
    } else if (Number.isInteger(loc)) {
      this._path.splice(loc, 1);
    } else {
      this._path.pop();
    }
    return this.ctx;
  }
  /**
   * Get the path
   * @return {array} path as array
   */
  get() {
    return this._path;
  }
  /**
   * Parse the path part of a URl
   * @param {string} f - string path
   * @return {instance} for chaining
   */
  parse(f = "") {
    let path = decodeURIComponent(f);
    let split = path.split("/");
    if (Array.isArray(split)) {
      if (path.match(/^\//))
        split.shift();
      if (split[0] === "")
        split.shift();
      if (split.length > 1 && path.match(/\/$/))
        split.pop();
      this._path = split;
    }
    return this;
  }
  /**
   * Replace part of a path
   * @param {string} f - path replacement
   * @param {integer} loc - location to replace
   * @return {instance} for chaining
   */
  replace(f, loc) {
    if (loc === "file") {
      this._path.splice(this._path.length - 1, 1, f);
      return this.ctx;
    } else if (Number.isInteger(loc)) {
      this._path.splice(loc, 1, f);
      return this.ctx;
    }
    this.parse(f);
    return this.ctx;
  }
  /**
   * Get string representatio of the path or the uri
   * @param {boolen} uri - if true return string represention of uri
   * @return {string} path or uri as string
   */
  toString(uri) {
    if (uri)
      return this.ctx.toString();
    return Array.isArray(this._path) ? this._path.join("/") : "";
  }
};

// src/Query.js
var Query = class {
  /**
   * @param {string} f - query string
   * @param {object} ctx - context of uri instance
   * @return {instance} for chaining
   */
  constructor(f, ctx = {}) {
    Object.assign(this, ctx);
    this.ctx = ctx;
    this.set(f);
    return this;
  }
  /**
   * Add a query string
   * @param {object} obj {name: 'value'}
   * @return {instance} for chaining
   */
  add(obj = {}) {
    this._query = this._convert(obj, this._query[0], this._query[1]);
    return this.ctx;
  }
  /**
   * Remove the query string
   * @return {instance} for chaining
   */
  clear() {
    this._query = [[], []];
    return this.ctx;
  }
  _convert(obj, p = [], q2 = []) {
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        for (let i = 0; i < obj[key].length; i++) {
          const val = obj[key][i];
          p.push(key);
          q2.push(val);
        }
      } else if (obj[key]) {
        p.push(key);
        q2.push(obj[key]);
      }
    }
    return [p, q2];
  }
  /**
   * Get the query string or get the value of a single query parameter
   * @param {string} name representing single query string
   * @returns {array} or {string} representing the query string the value of a single query parameter
   */
  get(name) {
    const dict = {};
    const obj = this._query;
    for (let i = 0; i < obj[0].length; i++) {
      const k2 = obj[0][i];
      const v = obj[1][i];
      if (dict[k2]) {
        dict[k2].push(v);
      } else {
        dict[k2] = [v];
      }
    }
    if (name)
      return dict[name] && dict[name].length ? dict[name][0] : null;
    return dict;
  }
  getUrlTemplateQuery() {
    return this._urlTemplateQueryString;
  }
  /**
   * Merge with the query string - replaces query string values if they exist
   * @param {object} obj {name: 'value'}
   * @return {instance} for chaining
   */
  merge(obj) {
    const p = this._query[0];
    const q2 = this._query[1];
    for (const key in obj) {
      let kset = false;
      for (let i = 0; i < p.length; i++) {
        const xKey = p[i];
        if (key === xKey) {
          if (kset) {
            p.splice(i, 1);
            q2.splice(i, 1);
            continue;
          }
          if (Array.isArray(obj[key])) {
            q2[i] = obj[key].shift();
          } else if (typeof obj[key] === "undefined" || obj[key] === null) {
            p.splice(i, 1);
            q2.splice(i, 1);
            delete obj[key];
          } else {
            q2[i] = obj[key];
            delete obj[key];
          }
          kset = true;
        }
      }
    }
    this._query = this._convert(obj, this._query[0], this._query[1]);
    return this.ctx;
  }
  _parse(q2 = "") {
    const struct = [[], []];
    const pairs = q2.split(/&|;/);
    for (let j2 = 0; j2 < pairs.length; j2++) {
      const pair = pairs[j2];
      const nPair = pair.match(this.qRegEx);
      if (nPair && typeof nPair[nPair.length - 1] !== "undefined") {
        nPair.shift();
        for (let i = 0; i < nPair.length; i++) {
          const p = nPair[i];
          struct[i].push(decodeURIComponent(p.replace("+", " ", "g")));
        }
      }
    }
    return struct;
  }
  /**
   * Set with the query string - replaces existing query string
   * @param {obj} or {string} ...q
   * @return {instance} for chaining
   */
  set(...q2) {
    const args = [...q2];
    if (args.length === 1) {
      if (typeof args[0] === "object") {
        this._query = this._convert(args[0]);
      } else {
        this._query = this._parse(args[0]);
      }
    } else if (args.length === 0) {
      this.clear();
    } else {
      const obj = {};
      obj[args[0]] = args[1];
      this.merge(obj);
    }
    return this.ctx;
  }
  /**
   * Set the url template query string vale
   * @param {string} s url-template query string
   * @return {instance} for chaining
   */
  setUrlTemplateQuery(s) {
    this._urlTemplateQueryString = s;
  }
  /**
   * Get string representation of the path or the uri
   * @param {boolean} uri - if true return string representation of uri
   * @return {string} query or uri as string
   */
  toString(uri) {
    if (uri)
      return this.ctx.toString();
    const pairs = [];
    const n = this._query[0];
    const v = this._query[1];
    for (let i = 0; i < n.length; i++) {
      pairs.push(encodeURIComponent(n[i]) + "=" + encodeURIComponent(v[i]));
    }
    return pairs.join("&");
  }
};

// ../tiny-utils/dist/esm/index.js
var z = typeof window < "u";
var a = z;
var k = (e) => typeof e == "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(e);
function u(e, t) {
  return k(t) ? new Date(t) : k(e) ? new Date(e) : t;
}
function l(e) {
  try {
    return JSON.parse(e), true;
  } catch {
    return false;
  }
}
var L = (e) => l(e) ? JSON.parse(e, u) : e;
var m = L;
var I = (e) => JSON.stringify(e);
var c = I;
var g = class {
  constructor() {
    this.db = /* @__PURE__ */ new Map();
  }
  clear() {
    return this.db.clear();
  }
  del(t) {
    return this.db.delete(t);
  }
  get(t) {
    return this.db.get(t);
  }
  put(t, o) {
    return this.set(t, o);
  }
  set(t, o) {
    return this.db.set(t, o);
  }
};
var h = class {
  constructor() {
    window.matchMedia("(display-mode: standalone)").matches ? this.store = window.localStorage : this.store = window.sessionStorage;
  }
  clear() {
    return this.store.clear();
  }
  del(t) {
    return this.store.removeItem(t);
  }
  get(t) {
    if (a)
      return m(this.store.getItem(t));
  }
  put(t, o) {
    return this.store.setItem(t, c({ ...this.get(t), ...o }));
  }
  set(t, o) {
    return this.store.setItem(t, c(o));
  }
};
var q = a ? new h() : new g();
var x = class {
  constructor(t) {
    !t || typeof t > "u" ? this.string = "" : this.string = String(t);
  }
  toString() {
    return this.string;
  }
  append(t) {
    return this.string += t, this;
  }
  insert(t, o) {
    let i = this.string.length, r = this.string.slice(0, t), n = this.string.slice(t);
    return this.string = r + o + n, this;
  }
};
var j = a && typeof navigator < "u" && navigator.languages && navigator.languages.length ? navigator.languages[0] : "en";
var G = j.replace(/-.*/, "");

// src/TinyUri.js
var TinyUri = class _TinyUri {
  /**
   * @param {string} uri - a URI string
   * @return {instance} - return Uri instance for chaining
   */
  constructor(uri) {
    this.uriRegEx = /^(([^:/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
    this.authRegEx = /^([^@]+)@/;
    this.portRegEx = /:(\d+)$/;
    this.qRegEx = /^([^=]+)(?:=(.*))?$/;
    this.urlTempQueryRegEx = /\{\?(.*?)\}/;
    return this.parse(uri);
  }
  /**
   * @param {string} authority - username password part of URL
   * @return {instance} - returns Uri instance for chaining
   */
  authority(authority = "") {
    if (authority !== "") {
      let auth = authority.match(this.authRegEx);
      this._authority = authority;
      if (auth) {
        authority = authority.replace(this.authRegEx, "");
        this.userInfo(auth[1]);
      }
      let port2 = authority.match(this.portRegEx);
      if (port2) {
        authority = authority.replace(this.portRegEx, "");
        this.port(port2[1]);
      }
      this.host(authority.replace("{", ""));
      return this;
    }
    let userinfo = this.userInfo();
    if (userinfo)
      authority = userinfo + "@";
    authority = authority + this.host();
    let port = this.port();
    if (port)
      authority = authority + (":" + port);
    return authority;
  }
  /**
   * @param {string} f - string representation of fragment
   * @return {instance} - returns Uri instance for chaining
   */
  fragment(f = "") {
    return this.gs(f, "_fragment");
  }
  gs(val, tar, fn) {
    if (typeof val !== "undefined") {
      this[tar] = val;
      return this;
    }
    return fn ? fn(this[tar]) : this[tar] ? this[tar] : "";
  }
  /**
   * @param {string} f - string representation of host
   * @return {instance} - returns Uri instance for chaining
   */
  host(f) {
    return this.gs(f, "_host");
  }
  /**
   * @param {string} uri - URL
   * @return {instance} - returns Uri instance for chaining
   */
  parse(uri) {
    let f = uri ? uri.match(this.uriRegEx) : [];
    let t = uri ? uri.match(this.urlTempQueryRegEx) : [];
    this.scheme(f[2]);
    this.authority(f[4]);
    this.path = new Path(f[5] ? f[5].replace(/{$/, "") : "", this);
    this.fragment(f[9]);
    this.query = new Query(f[7] ? f[7] : "", this);
    if (t)
      this.query.setUrlTemplateQuery(t[1]);
    return this;
  }
  /**
   * @param {string} f - port part of URL
   * @return {instance} - returns Uri instance for chaining
   */
  port(f) {
    return this.gs(f, "_port");
  }
  /**
   * @param {string} f - protocol part of URL
   * @return {instance} - returns Uri instance for chaining
   */
  protocol(f) {
    return (this._scheme || "").toLowerCase();
  }
  /**
   * @param {string} f - protocol scheme
   * @return {instance} - returns Uri instance for chaining
   */
  scheme(f) {
    return this.gs(f, "_scheme");
  }
  /**
   * @param {string} f - user info part of URL
   * @return {instance} - returns Uri instance for chaining
   */
  userInfo(f) {
    return this.gs(f, "_userinfo", (r) => {
      return r ? encodeURI(r) : r;
    });
  }
  /**
   * @return {string} - returns string URL
   */
  toString() {
    let q2 = this.query.toString();
    let p = this.path.toString();
    let f = this.fragment();
    let s = this.scheme();
    let str = new x();
    let retStr = str.append(s ? s + "://" : "").append(this.authority()).append("/").append(p).append(q2 !== "" ? "?" : "").append(q2).toString().replace("/?", "?").replace(/\/$/, "");
    return retStr;
  }
  static clone(uri) {
    return new _TinyUri(uri.toString());
  }
};
