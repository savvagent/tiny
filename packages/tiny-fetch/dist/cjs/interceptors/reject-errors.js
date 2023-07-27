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

// src/interceptors/reject-errors.js
var reject_errors_exports = {};
__export(reject_errors_exports, {
  default: () => reject_errors_default
});
module.exports = __toCommonJS(reject_errors_exports);

// ../tiny-utils/dist/index.js
(() => {
  var z = typeof window < "u", a = z;
  function C(e, { trigger: t = "click", text: o = "" } = {}) {
    let i = async () => {
      a && typeof navigator < "u" && await navigator.clipboard.writeText(o).then(() => e.dispatchEvent(new CustomEvent("copied", { detail: { clipboard: o } })), (r) => e.dispatchEvent(new CustomEvent("error", { detail: { error: r } })));
    };
    return a && e.addEventListener(t, i, true), { update: (r) => {
      r.trigger !== void 0 && (t = r.trigger), r.text !== void 0 && (o = r.text);
    }, destroy() {
      e.removeEventListener(t, i, true);
    } };
  }
  var D = (e, { default: t, xxs: o, xs: i, sm: r, md: n, lg: f, xl: d, xxl: p }) => {
    let s;
    switch (e) {
      case "xxl":
        s = p ?? d ?? f ?? n ?? r ?? i ?? o ?? t;
        break;
      case "xl":
        s = d ?? f ?? n ?? r ?? i ?? o ?? t;
        break;
      case "lg":
        s = f ?? n ?? r ?? i ?? o ?? t;
        break;
      case "md":
        s = n ?? r ?? i ?? o ?? t;
        break;
      case "sm":
        s = r ?? i ?? o ?? t;
        break;
      case "xs":
        s = i ?? o ?? t;
        break;
      case "xxs":
        s = o ?? t;
        break;
      default:
        s = t;
        break;
    }
    return s;
  };
  function w(e) {
    let t = (o) => {
      e && !e.contains(o.target) && !o.defaultPrevented && e.dispatchEvent(new CustomEvent("click_outside", e));
    };
    return document.addEventListener("click", t, true), { destroy() {
      document.removeEventListener("click", t, true);
    } };
  }
  var B = (e) => typeof e == "object" ? JSON.parse(JSON.stringify(e)) : e, J = B;
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
  var L = (e) => l(e) ? JSON.parse(e, u) : e, m = L;
  var I = (e) => JSON.stringify(e), c = I;
  async function E(e) {
    return c(e);
  }
  function S() {
    if (a) {
      let e = typeof window < "u" && window.matchMedia("(display-mode: standalone)").matches;
      return document.referrer.startsWith("android-app://") ? "twa" : navigator.standalone || e ? "standalone" : "browser";
    }
  }
  var N = () => {
  }, R = N;
  var M = (e) => {
    a && document.body.appendChild(e);
  }, P = M;
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
  }, h = class {
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
  }, q = a ? new h() : new g();
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
  function b() {
    let e = new Date().getTime();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (o) => {
      let i = (e + Math.random() * 16) % 16 | 0;
      return e = Math.floor(e / 16), (o === "x" ? i : i & 3 | 8).toString(16);
    });
  }
  var y = (e, t) => {
    if (e === t)
      return true;
    let o = Array.isArray(e), i = Array.isArray(t), r;
    if (o && i) {
      if (e.length !== t.length)
        return false;
      for (r = 0; r < e.length; r++)
        if (!y(e[r], t[r]))
          return false;
      return true;
    }
    if (o !== i)
      return false;
    if (e && t && typeof e == "object" && typeof t == "object") {
      let n = Object.keys(e);
      if (n.length !== Object.keys(t).length)
        return false;
      let f = e instanceof Date, d = t instanceof Date;
      if (f && d)
        return e.getTime() === t.getTime();
      if (f !== d)
        return false;
      let p = e instanceof RegExp, s = t instanceof RegExp;
      if (p && s)
        return e.toString() === t.toString();
      if (p !== s)
        return false;
      for (r = 0; r < n.length; r++)
        if (!Object.prototype.hasOwnProperty.call(t, n[r]))
          return false;
      for (r = 0; r < n.length; r++)
        if (!y(e[n[r]], t[n[r]]))
          return false;
      return true;
    }
    return false;
  }, A = y, T = (e, t) => !A(e, t);
  function W(e) {
    let t = e == null ? void 0 : e.cookie, o = /([^;=\s]*)=([^;]*)/g, i = {};
    for (let r; r = o.exec(t); )
      i[r[1]] = decodeURIComponent(r[2]);
    return i;
  }
  function $(e, t) {
    var _a;
    if (typeof document < "u") {
      let i = new RegExp("(?:^|;)\\s?" + e + "=(.*?)(?:;|$)", "i"), r = document.cookie.match(i);
      return r && r[1] ? r[1] : "";
    }
    return (_a = W(t)) == null ? void 0 : _a[e];
  }
  function H(e) {
    return Array.isArray(e);
  }
  var O = (e) => /\S+@\S+\.\S+/i.test(e), U = (e) => !O(e);
  function v(e) {
    let t = false;
    return e == null || typeof e == "string" && e === "" ? t = true : e instanceof Date ? t = false : ((Array.isArray(e) || typeof e == "string") && e.length < 1 || typeof e == "string" && !/\S/.test(e) || typeof e == "object" && Object.keys(e).length < 1 || typeof e == "number" && e === 0) && (t = true), t;
  }
  function Z(e) {
    return !v(e);
  }
  var _ = (e) => typeof e == "object" && !Array.isArray(e);
  var F = (e) => typeof e == "string";
  var j = a && typeof navigator < "u" && navigator.languages && navigator.languages.length ? navigator.languages[0] : "en", G = j.replace(/-.*/, "");
})();

// src/interceptors/reject-errors.js
var rejectErrors = {
  response(response) {
    if ((void 0)(response))
      return response;
    if (!response.ok)
      throw response;
    return response;
  },
  id: "TINY_FETCH_REJECT_ERRORS"
};
var reject_errors_default = rejectErrors;
