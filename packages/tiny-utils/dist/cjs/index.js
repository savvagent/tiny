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

// src/index.js
var src_exports = {};
__export(src_exports, {
  StringBuilder: () => StringBuilder,
  atSize: () => atSize_default,
  clickOutside: () => clickOutside,
  clipboard: () => clipboard,
  copy: () => copy_default,
  dateReviver: () => dateReviver,
  deserialize: () => deserialize_default,
  digest: () => digest,
  equal: () => equal,
  getCookie: () => getCookie,
  getPWADisplayMode: () => getPWADisplayMode,
  isArray: () => isArray,
  isEmailInvalid: () => isEmailInvalid,
  isEmailValid: () => isEmailValid,
  isEmpty: () => isEmpty,
  isJson: () => isJson,
  isNotEmpty: () => isNotEmpty,
  isObject: () => isObject,
  isString: () => isString,
  noop: () => noop_default,
  notEqual: () => notEqual,
  portal: () => portal_default,
  serialize: () => serialize_default,
  sessionStore: () => sessionStore_default,
  simpleLocale: () => simpleLocale,
  userLocale: () => userLocale,
  uuid: () => uuid
});
module.exports = __toCommonJS(src_exports);

// src/isBrowser.js
var isBrowser = typeof window !== "undefined";
var isBrowser_default = isBrowser;

// src/clipboard.js
function clipboard(node, { trigger = "click", text = "" } = {}) {
  const handle = async () => {
    if (isBrowser_default && typeof navigator !== "undefined") {
      await navigator.clipboard.writeText(text).then(
        () => node.dispatchEvent(new CustomEvent("copied", { detail: { clipboard: text } })),
        (e) => node.dispatchEvent(new CustomEvent("error", { detail: { error: e } }))
      );
    }
  };
  if (isBrowser_default) {
    node.addEventListener(trigger, handle, true);
  }
  return {
    update: (params) => {
      if (params.trigger !== void 0)
        trigger = params.trigger;
      if (params.text !== void 0)
        text = params.text;
    },
    destroy() {
      node.removeEventListener(trigger, handle, true);
    }
  };
}

// src/atSize.js
var atSize_default = (bp, { default: defaultValue, xxs, xs, sm, md, lg, xl, xxl }) => {
  let retVal;
  switch (bp) {
    case "xxl":
      retVal = xxl ?? xl ?? lg ?? md ?? sm ?? xs ?? xxs ?? defaultValue;
      break;
    case "xl":
      retVal = xl ?? lg ?? md ?? sm ?? xs ?? xxs ?? defaultValue;
      break;
    case "lg":
      retVal = lg ?? md ?? sm ?? xs ?? xxs ?? defaultValue;
      break;
    case "md":
      retVal = md ?? sm ?? xs ?? xxs ?? defaultValue;
      break;
    case "sm":
      retVal = sm ?? xs ?? xxs ?? defaultValue;
      break;
    case "xs":
      retVal = xs ?? xxs ?? defaultValue;
      break;
    case "xxs":
      retVal = xxs ?? defaultValue;
      break;
    default:
      retVal = defaultValue;
      break;
  }
  return retVal;
};

// src/clickOutside.js
function clickOutside(node) {
  const handleClick = (event) => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(
        new CustomEvent("click_outside", node)
      );
    }
  };
  document.addEventListener("click", handleClick, true);
  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
    }
  };
}

// src/copy.js
var copy = (thing) => typeof thing === "object" ? JSON.parse(JSON.stringify(thing)) : thing;
var copy_default = copy;

// src/dateReviver.js
var isSerializedDate = (value) => {
  const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
  return typeof value === "string" && datePattern.test(value);
};
function dateReviver(key, value) {
  if (isSerializedDate(value)) {
    return new Date(value);
  }
  if (isSerializedDate(key)) {
    return new Date(key);
  }
  return value;
}

// src/isJson.js
function isJson(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

// src/deserialize.js
var deserialize = (str) => {
  if (isJson(str)) {
    return JSON.parse(str, dateReviver);
  }
  return str;
};
var deserialize_default = deserialize;

// src/serialize.js
var serialize = (obj) => JSON.stringify(obj);
var serialize_default = serialize;

// src/digest.js
async function digest(message) {
  return serialize_default(message);
}

// src/getPWADisplayMode.js
function getPWADisplayMode() {
  if (isBrowser_default) {
    const isStandalone = typeof window !== "undefined" && window.matchMedia("(display-mode: standalone)").matches;
    if (document.referrer.startsWith("android-app://")) {
      return "twa";
    } else if (navigator.standalone || isStandalone) {
      return "standalone";
    }
    return "browser";
  }
}

// src/noop.js
var noop = () => {
};
var noop_default = noop;

// src/portal.js
var portal = (node) => {
  if (isBrowser_default) {
    document.body.appendChild(node);
  }
};
var portal_default = portal;

// src/sessionStore.js
var MemoryStore = class {
  constructor() {
    this.db = /* @__PURE__ */ new Map();
  }
  clear() {
    return this.db.clear();
  }
  del(path) {
    return this.db.delete(path);
  }
  get(path) {
    return this.db.get(path);
  }
  put(path, value) {
    return this.set(path, value);
  }
  set(path, value) {
    return this.db.set(path, value);
  }
};
var BlockingStorage = class {
  constructor() {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      this.store = window.localStorage;
    } else {
      this.store = window.sessionStorage;
    }
  }
  clear() {
    return this.store.clear();
  }
  del(key) {
    return this.store.removeItem(key);
  }
  get(key) {
    if (isBrowser_default)
      return deserialize_default(this.store.getItem(key));
  }
  put(key, data) {
    return this.store.setItem(key, serialize_default({ ...this.get(key), ...data }));
  }
  set(key, data) {
    return this.store.setItem(key, serialize_default(data));
  }
};
var sessionStore_default = isBrowser_default ? new BlockingStorage() : new MemoryStore();

// src/StringBuilder.js
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
    const length = this.string.length;
    const left = this.string.slice(0, pos);
    const right = this.string.slice(pos);
    this.string = left + val + right;
    return this;
  }
};

// src/uuid.js
function uuid() {
  let d = (/* @__PURE__ */ new Date()).getTime();
  const uid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : r & 3 | 8).toString(16);
  });
  return uid;
}

// src/deepEquals.js
var deepEquals = (a, b) => {
  if (a === b)
    return true;
  const arrA = Array.isArray(a);
  const arrB = Array.isArray(b);
  let i;
  if (arrA && arrB) {
    if (a.length !== b.length)
      return false;
    for (i = 0; i < a.length; i++)
      if (!deepEquals(a[i], b[i]))
        return false;
    return true;
  }
  if (arrA !== arrB)
    return false;
  if (a && b && typeof a === "object" && typeof b === "object") {
    const keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length)
      return false;
    const dateA = a instanceof Date;
    const dateB = b instanceof Date;
    if (dateA && dateB)
      return a.getTime() === b.getTime();
    if (dateA !== dateB)
      return false;
    const regexpA = a instanceof RegExp;
    const regexpB = b instanceof RegExp;
    if (regexpA && regexpB)
      return a.toString() === b.toString();
    if (regexpA !== regexpB)
      return false;
    for (i = 0; i < keys.length; i++)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
        return false;
    for (i = 0; i < keys.length; i++)
      if (!deepEquals(a[keys[i]], b[keys[i]]))
        return false;
    return true;
  }
  return false;
};
var equal = deepEquals;
var notEqual = (a, b) => !equal(a, b);

// src/getCookie.js
function parseCookies(headers) {
  const cookieHeader = headers == null ? void 0 : headers.cookie;
  let rx = /([^;=\s]*)=([^;]*)/g;
  let obj = {};
  for (let m; m = rx.exec(cookieHeader); )
    obj[m[1]] = decodeURIComponent(m[2]);
  return obj;
}
function getCookie(name, headers) {
  if (typeof document !== "undefined") {
    const re = new RegExp("(?:^|;)\\s?" + name + "=(.*?)(?:;|$)", "i");
    const match = document.cookie.match(re);
    if (match && match[1])
      return match[1];
    return "";
  }
  const cookies = parseCookies(headers);
  return cookies == null ? void 0 : cookies[name];
}

// src/isArray.js
function isArray(candidate) {
  return Array.isArray(candidate);
}

// src/emailValidator.js
var isEmailValid = (email) => /\S+@\S+\.\S+/i.test(email);
var isEmailInvalid = (email) => !isEmailValid(email);

// src/empty.js
function isEmpty(value) {
  let empty = false;
  if (value === null || value === void 0)
    empty = true;
  else if (typeof value === "string" && value === "")
    empty = true;
  else if (value instanceof Date)
    empty = false;
  else if ((Array.isArray(value) || typeof value === "string") && value.length < 1)
    empty = true;
  else if (typeof value === "string" && !/\S/.test(value))
    empty = true;
  else if (typeof value === "object" && Object.keys(value).length < 1)
    empty = true;
  else if (typeof value === "number" && value === 0)
    empty = true;
  return empty;
}
function isNotEmpty(value) {
  return !isEmpty(value);
}

// src/isObject.js
var isObject = (obj) => typeof obj === "object" && !Array.isArray(obj);

// src/isString.js
var isString = (string) => typeof string === "string";

// src/locale.js
var userLocale = isBrowser_default && typeof navigator !== "undefined" && navigator.languages && navigator.languages.length ? navigator.languages[0] : "en";
var simpleLocale = userLocale.replace(/-.*/, "");
