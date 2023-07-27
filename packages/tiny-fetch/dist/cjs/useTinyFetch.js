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

// src/useTinyFetch.js
var useTinyFetch_exports = {};
__export(useTinyFetch_exports, {
  default: () => useTinyFetch
});
module.exports = __toCommonJS(useTinyFetch_exports);

// src/utils.js
var isJson = (str) => {
  try {
    if (JSON.parse(str))
      return true;
  } catch (e) {
    return false;
  }
};
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
var toRequest = (request) => request instanceof Request ? request : new Request(request);
var overloadMethod = (method, request) => {
  const { url } = request;
  return new Request(url, { ...request, method });
};

// src/TinyFetch.js
var TinyFetch = class {
  constructor(interceptors = [], _fetch) {
    const f = typeof fetch === "function" && typeof window !== "undefined" ? fetch.bind(window) : typeof globalThis !== "undefined" ? fetch.bind(globalThis) : _fetch;
    this.cache = /* @__PURE__ */ new Map();
    this.interceptors = [...interceptors];
    this.requestPromise = null;
    this.requestMap = /* @__PURE__ */ new Map();
    this.fetch = f;
  }
  clear() {
    this.interceptors = [];
  }
  interceptor(req) {
    let promise = Promise.resolve(req);
    this.interceptors.forEach(({ request, requestError }) => {
      if (request || requestError) {
        promise = promise.then((arg) => {
          return request(arg);
        }, requestError);
      }
    });
    promise = promise.then((a) => {
      return this.fetch(a);
    });
    this.interceptors.forEach(({ response, responseError }) => {
      if (response || responseError) {
        promise = promise.then(response, responseError);
      }
    });
    return promise;
  }
  register(_interceptor, pos) {
    if (Array.isArray(_interceptor))
      this.interceptors = [...this.interceptors, ..._interceptor];
    else {
      const existing = Boolean(this.interceptors.find((i) => i.id === _interceptor.id));
      if (pos !== "undefined" && !existing) {
        this.interceptors.splice(pos, 0, _interceptor);
      } else if (!existing)
        this.interceptors = [...this.interceptors, _interceptor];
    }
  }
  request(request) {
    const req = toRequest(request);
    const s = JSON.stringify({
      url: req.url,
      method: req.method,
      ...req.body && isJson(req.body) && { body: JSON.stringify(req.body) }
    });
    if (this.cache.has(s))
      return this.cache.get(s);
    this.cache.set(
      s,
      this.interceptor(req).finally(() => this.cache.delete(s))
    );
    return this.cache.get(s);
  }
  delete(request) {
    const req = toRequest(request);
    const r = overloadMethod("DELETE", req);
    return this.request(r);
  }
  get(request) {
    const req = toRequest(request);
    const r = overloadMethod("GET", req);
    return this.request(r);
  }
  head(request) {
    const req = toRequest(request);
    const r = overloadMethod("HEAD", req);
    return this.request(r);
  }
  patch(request) {
    const req = toRequest(request);
    const r = overloadMethod("PATCH", req);
    return this.request(r);
  }
  post(request) {
    const req = toRequest(request);
    const r = overloadMethod("POST", req);
    return this.request(r);
  }
  put(request) {
    const req = toRequest(request);
    const r = overloadMethod("PUT", req);
    return this.request(r);
  }
  unregister(interceptorId) {
    this.interceptors = this.interceptors.filter((i) => i.id !== interceptorId);
  }
  get interceptors() {
    return this._interceptors;
  }
  set interceptors(val) {
    this._interceptors = val;
  }
};
var TinyFetch_default = TinyFetch;

// src/interceptors/json-request.js
var jsonRequest = {
  request(req) {
    req.headers.set("Content-Type", "application/json");
    req.headers.set("Accept", "application/json");
    if (isNotEmpty(req.body) && isJson(req.body))
      req.body = JSON.stringify(req.body);
    return req;
  },
  id: "TINY_FETCH_JSON_REQUEST"
};
var json_request_default = jsonRequest;

// src/interceptors/json-response.js
var jsonResponse = {
  async response(response) {
    if (response.bodyUsed)
      return response;
    try {
      const text = await response.text();
      const resp = { ...response, ...JSON.parse(text) };
      return resp;
    } catch (error) {
      return response;
    }
  },
  id: "TINY_FETCH_JSON_RESPONSE"
};
var json_response_default = jsonResponse;

// src/interceptors/reject-errors.js
var rejectErrors = {
  response(response) {
    if (isJson(response))
      return response;
    if (!response.ok)
      throw response;
    return response;
  },
  id: "TINY_FETCH_REJECT_ERRORS"
};
var reject_errors_default = rejectErrors;

// src/interceptors/lrucache.js
var cache = /* @__PURE__ */ new Map();
var ttl = 1e3 * 60 * 10;
var jsonRequest2 = { id: "TINY_FETCH_LRUCACHE" };
jsonRequest2.mapKey = null;
jsonRequest2.request = (request) => {
  if (request.cache) {
    const { headers, url } = request;
    const headerValues = [...headers.values()];
    const headerString = headerValues.join("");
    jsonRequest2.mapKey = JSON.stringify({
      url,
      method: request.method,
      headerString
    });
  }
  return request;
};
jsonRequest2.response = (response) => {
  if (jsonRequest2.mapKey) {
    if (cache.has(jsonRequest2.mapKey))
      return cache.get(jsonRequest2.mapKey);
    cache.set(jsonRequest2.mapKey, response.clone());
    setTimeout(() => {
      cache.delete(jsonRequest2.mapKey);
    }, ttl);
  }
  return response;
};
var lrucache_default = jsonRequest2;

// src/useTinyFetch.js
function useTinyFetch(config = {}) {
  const client = new TinyFetch_default(json_request_default, json_response_default, reject_errors_default, lrucache_default);
  return client.request(config);
}
