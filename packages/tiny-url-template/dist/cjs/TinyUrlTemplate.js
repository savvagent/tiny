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

// src/TinyUrlTemplate.js
var TinyUrlTemplate_exports = {};
__export(TinyUrlTemplate_exports, {
  default: () => TinyUrlTemplate
});
module.exports = __toCommonJS(TinyUrlTemplate_exports);

// ../tiny-uri/dist/esm/TinyUri.js
var h = class {
  constructor(t, e = {}) {
    return this.ctx = e, this._path = [], this.parse(t);
  }
  append(t) {
    return this._path.push(t), this.ctx;
  }
  delete(t) {
    return Array.isArray(t) ? t.reverse().forEach((e) => this._path.splice(e, 1)) : Number.isInteger(t) ? this._path.splice(t, 1) : this._path.pop(), this.ctx;
  }
  get() {
    return this._path;
  }
  parse(t = "") {
    let e = decodeURIComponent(t), s = e.split("/");
    return Array.isArray(s) && (e.match(/^\//) && s.shift(), s[0] === "" && s.shift(), s.length > 1 && e.match(/\/$/) && s.pop(), this._path = s), this;
  }
  replace(t, e) {
    return e === "file" ? (this._path.splice(this._path.length - 1, 1, t), this.ctx) : Number.isInteger(e) ? (this._path.splice(e, 1, t), this.ctx) : (this.parse(t), this.ctx);
  }
  toString(t) {
    return t ? this.ctx.toString() : Array.isArray(this._path) ? this._path.join("/") : "";
  }
};
var u = class {
  constructor(t, e = {}) {
    return Object.assign(this, e), this.ctx = e, this.set(t), this;
  }
  add(t = {}) {
    return this._query = this._convert(t, this._query[0], this._query[1]), this.ctx;
  }
  clear() {
    return this._query = [[], []], this.ctx;
  }
  _convert(t, e = [], s = []) {
    for (let i in t)
      if (Array.isArray(t[i]))
        for (let a = 0; a < t[i].length; a++) {
          let n = t[i][a];
          e.push(i), s.push(n);
        }
      else
        t[i] && (e.push(i), s.push(t[i]));
    return [e, s];
  }
  get(t) {
    let e = {}, s = this._query;
    for (let i = 0; i < s[0].length; i++) {
      let a = s[0][i], n = s[1][i];
      e[a] ? e[a].push(n) : e[a] = [n];
    }
    return t ? e[t] && e[t].length ? e[t][0] : null : e;
  }
  getUrlTemplateQuery() {
    return this._urlTemplateQueryString;
  }
  merge(t) {
    let e = this._query[0], s = this._query[1];
    for (let i in t) {
      let a = false;
      for (let n = 0; n < e.length; n++) {
        let o = e[n];
        if (i === o) {
          if (a) {
            e.splice(n, 1), s.splice(n, 1);
            continue;
          }
          Array.isArray(t[i]) ? s[n] = t[i].shift() : typeof t[i] > "u" || t[i] === null ? (e.splice(n, 1), s.splice(n, 1), delete t[i]) : (s[n] = t[i], delete t[i]), a = true;
        }
      }
    }
    return this._query = this._convert(t, this._query[0], this._query[1]), this.ctx;
  }
  _parse(t = "") {
    let e = [[], []], s = t.split(/&|;/);
    for (let i = 0; i < s.length; i++) {
      let n = s[i].match(this.qRegEx);
      if (n && typeof n[n.length - 1] < "u") {
        n.shift();
        for (let o = 0; o < n.length; o++) {
          let d = n[o];
          e[o].push(decodeURIComponent(d.replace("+", " ", "g")));
        }
      }
    }
    return e;
  }
  set(...t) {
    let e = [...t];
    if (e.length === 1)
      typeof e[0] == "object" ? this._query = this._convert(e[0]) : this._query = this._parse(e[0]);
    else if (e.length === 0)
      this.clear();
    else {
      let s = {};
      s[e[0]] = e[1], this.merge(s);
    }
    return this.ctx;
  }
  setUrlTemplateQuery(t) {
    this._urlTemplateQueryString = t;
  }
  toString(t) {
    if (t)
      return this.ctx.toString();
    let e = [], s = this._query[0], i = this._query[1];
    for (let a = 0; a < s.length; a++)
      e.push(encodeURIComponent(s[a]) + "=" + encodeURIComponent(i[a]));
    return e.join("&");
  }
};
var x = typeof window < "u";
var l = x;
var p = (r2) => typeof r2 == "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(r2);
function y(r2, t) {
  return p(t) ? new Date(t) : p(r2) ? new Date(r2) : t;
}
function m(r2) {
  try {
    return JSON.parse(r2), true;
  } catch {
    return false;
  }
}
var v = (r2) => m(r2) ? JSON.parse(r2, y) : r2;
var _ = v;
var S = (r2) => JSON.stringify(r2);
var g = S;
var w = class {
  constructor() {
    this.db = /* @__PURE__ */ new Map();
  }
  clear() {
    return this.db.clear();
  }
  del(r2) {
    return this.db.delete(r2);
  }
  get(r2) {
    return this.db.get(r2);
  }
  put(r2, t) {
    return this.set(r2, t);
  }
  set(r2, t) {
    return this.db.set(r2, t);
  }
};
var E = class {
  constructor() {
    window.matchMedia("(display-mode: standalone)").matches ? this.store = window.localStorage : this.store = window.sessionStorage;
  }
  clear() {
    return this.store.clear();
  }
  del(r2) {
    return this.store.removeItem(r2);
  }
  get(r2) {
    if (l)
      return _(this.store.getItem(r2));
  }
  put(r2, t) {
    return this.store.setItem(r2, g({ ...this.get(r2), ...t }));
  }
  set(r2, t) {
    return this.store.setItem(r2, g(t));
  }
};
var R = l ? new E() : new w();
var f = class {
  constructor(r2) {
    !r2 || typeof r2 > "u" ? this.string = "" : this.string = String(r2);
  }
  toString() {
    return this.string;
  }
  append(r2) {
    return this.string += r2, this;
  }
  insert(r2, t) {
    let e = this.string.length, s = this.string.slice(0, r2), i = this.string.slice(r2);
    return this.string = s + t + i, this;
  }
};
var k = l && typeof navigator < "u" && navigator.languages && navigator.languages.length ? navigator.languages[0] : "en";
var q = k.replace(/-.*/, "");
var c = class r {
  constructor(t) {
    return this.uriRegEx = /^(([^:/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/, this.authRegEx = /^([^@]+)@/, this.portRegEx = /:(\d+)$/, this.qRegEx = /^([^=]+)(?:=(.*))?$/, this.urlTempQueryRegEx = /\{\?(.*?)\}/, this.parse(t);
  }
  authority(t = "") {
    if (t !== "") {
      let i = t.match(this.authRegEx);
      this._authority = t, i && (t = t.replace(this.authRegEx, ""), this.userInfo(i[1]));
      let a = t.match(this.portRegEx);
      return a && (t = t.replace(this.portRegEx, ""), this.port(a[1])), this.host(t.replace("{", "")), this;
    }
    let e = this.userInfo();
    e && (t = e + "@"), t = t + this.host();
    let s = this.port();
    return s && (t = t + (":" + s)), t;
  }
  fragment(t = "") {
    return this.gs(t, "_fragment");
  }
  gs(t, e, s) {
    return typeof t < "u" ? (this[e] = t, this) : s ? s(this[e]) : this[e] ? this[e] : "";
  }
  host(t) {
    return this.gs(t, "_host");
  }
  parse(t) {
    let e = t ? t.match(this.uriRegEx) : [], s = t ? t.match(this.urlTempQueryRegEx) : [];
    return this.scheme(e[2]), this.authority(e[4]), this.path = new h(e[5] ? e[5].replace(/{$/, "") : "", this), this.fragment(e[9]), this.query = new u(e[7] ? e[7] : "", this), s && this.query.setUrlTemplateQuery(s[1]), this;
  }
  port(t) {
    return this.gs(t, "_port");
  }
  protocol(t) {
    return (this._scheme || "").toLowerCase();
  }
  scheme(t) {
    return this.gs(t, "_scheme");
  }
  userInfo(t) {
    return this.gs(t, "_userinfo", (e) => e && encodeURI(e));
  }
  toString() {
    let t = this.query.toString(), e = this.path.toString(), s = this.fragment(), i = this.scheme();
    return new f().append(i ? i + "://" : "").append(this.authority()).append("/").append(e).append(t !== "" ? "?" : "").append(t).toString().replace("/?", "?").replace(/\/$/, "");
  }
  static clone(t) {
    return new r(t.toString());
  }
};

// src/TinyUrlTemplate.js
var TinyUrlTemplate = class {
  constructor(template) {
    this.uri = new c(template);
    this.path = this.uri.path.get();
    this.urlTemplateQuery = this.uri.query.getUrlTemplateQuery();
    return this;
  }
  expand(obj = {}) {
    this.path.forEach((path, i) => {
      let substitution = path.substring(path.lastIndexOf("{") + 1, path.lastIndexOf("}"));
      if (substitution)
        this.uri.path.replace(obj[substitution], i);
    });
    if (this.urlTemplateQuery) {
      let tEls = this.urlTemplateQuery.split(",");
      tEls.forEach((te) => {
        if (typeof obj[te] !== "undefined") {
          let o = {};
          o[te] = String(obj[te]);
          this.uri.query.add(o);
        }
      });
    }
    this.template = this.uri.toString();
    return this;
  }
  toString() {
    return this.template;
  }
};
