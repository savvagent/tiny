var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../tiny-uri/index.js
var require_tiny_uri = __commonJS({
  "../tiny-uri/index.js"(exports, module2) {
    "use strict";
    var Path = class {
      constructor(f, ctx = {}) {
        this.ctx = ctx;
        this._path = [];
        return this.parse(f);
      }
      append(s) {
        this._path.push(s);
        return this.ctx;
      }
      delete(loc) {
        if (Array.isArray(loc)) {
          loc.reverse().forEach((l) => this._path.splice(l, 1));
        } else if (Number.isInteger(loc)) {
          this._path.splice(loc, 1);
        } else {
          this._path.pop();
        }
        return this.ctx;
      }
      get() {
        return this._path;
      }
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
      toString(uri) {
        if (uri)
          return this.ctx.toString();
        return Array.isArray(this._path) ? this._path.join("/") : "";
      }
    };
    var Query = class {
      constructor(f, ctx = {}) {
        Object.assign(this, ctx);
        this.ctx = ctx;
        this.set(f);
        return this;
      }
      add(obj = {}) {
        this._query = this._convert(obj, this._query[0], this._query[1]);
        return this.ctx;
      }
      clear() {
        this._query = [[], []];
        return this.ctx;
      }
      _convert(obj, p = [], q = []) {
        for (const key in obj) {
          if (Array.isArray(obj[key])) {
            for (let i = 0; i < obj[key].length; i++) {
              const val = obj[key][i];
              p.push(key);
              q.push(val);
            }
          } else if (obj[key]) {
            p.push(key);
            q.push(obj[key]);
          }
        }
        return [p, q];
      }
      get(name) {
        const dict = {};
        const obj = this._query;
        for (let i = 0; i < obj[0].length; i++) {
          const k = obj[0][i];
          const v = obj[1][i];
          if (dict[k]) {
            dict[k].push(v);
          } else {
            dict[k] = [v];
          }
        }
        if (name)
          return dict[name] && dict[name].length ? dict[name][0] : null;
        return dict;
      }
      getUrlTemplateQuery() {
        return this._urlTemplateQueryString;
      }
      merge(obj) {
        const p = this._query[0];
        const q = this._query[1];
        for (const key in obj) {
          let kset = false;
          for (let i = 0; i < p.length; i++) {
            const xKey = p[i];
            if (key === xKey) {
              if (kset) {
                p.splice(i, 1);
                q.splice(i, 1);
                continue;
              }
              if (Array.isArray(obj[key])) {
                q[i] = obj[key].shift();
              } else if (typeof obj[key] === "undefined" || obj[key] === null) {
                p.splice(i, 1);
                q.splice(i, 1);
                delete obj[key];
              } else {
                q[i] = obj[key];
                delete obj[key];
              }
              kset = true;
            }
          }
        }
        this._query = this._convert(obj, this._query[0], this._query[1]);
        return this.ctx;
      }
      _parse(q = "") {
        const struct = [[], []];
        const pairs = q.split(/&|;/);
        for (let j = 0; j < pairs.length; j++) {
          const pair = pairs[j];
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
      set(...q) {
        const args = [...q];
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
      setUrlTemplateQuery(s) {
        this._urlTemplateQueryString = s;
      }
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
    var StringBuilder = class {
      constructor(string) {
        if (!string || typeof string === "undefined")
          this.string = String("");
        else
          this.string = String(string);
      }
      toString() {
        return this.string;
      }
      append(val) {
        this.string += val;
        return this;
      }
      insert(pos, val) {
        this.string.length;
        let left = this.string.slice(0, pos);
        let right = this.string.slice(pos);
        this.string = left + val + right;
        return this;
      }
    };
    var TinyUri2 = class {
      constructor(uri) {
        this.uriRegEx = /^(([^:/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
        this.authRegEx = /^([^@]+)@/;
        this.portRegEx = /:(\d+)$/;
        this.qRegEx = /^([^=]+)(?:=(.*))?$/;
        this.urlTempQueryRegEx = /\{\?(.*?)\}/;
        return this.parse(uri);
      }
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
      host(f) {
        return this.gs(f, "_host");
      }
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
      port(f) {
        return this.gs(f, "_port");
      }
      protocol(f) {
        return (this._scheme || "").toLowerCase();
      }
      scheme(f) {
        return this.gs(f, "_scheme");
      }
      userInfo(f) {
        return this.gs(f, "_userinfo", (r) => {
          return r ? encodeURI(r) : r;
        });
      }
      toString() {
        let q = this.query.toString();
        let p = this.path.toString();
        this.fragment();
        let s = this.scheme();
        let str = new StringBuilder();
        let retStr = str.append(s ? s + "://" : "").append(this.authority()).append("/").append(p).append(q !== "" ? "?" : "").append(q).toString().replace("/?", "?").replace(/\/$/, "");
        return retStr;
      }
      static clone(uri) {
        return new TinyUri2(uri.toString());
      }
    };
    module2.exports = TinyUri2;
  }
});

// src/interceptors/bust-cache.js
var bust_cache_exports = {};
__export(bust_cache_exports, {
  default: () => bust_cache_default
});
module.exports = __toCommonJS(bust_cache_exports);
var import_tiny_uri = __toESM(require_tiny_uri(), 1);
var bustCache = {
  request(req) {
    const uri = new import_tiny_uri.default(req.url).query.add({ rn: new Date().getTime().toString() }).toString();
    const request = new Request(uri, req);
    return request;
  },
  id: "TINY_FETCH_BUST_CACHE"
};
var bust_cache_default = bustCache;
