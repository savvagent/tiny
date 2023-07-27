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

// src/interceptors/lrucache.js
var lrucache_exports = {};
__export(lrucache_exports, {
  default: () => lrucache_default
});
module.exports = __toCommonJS(lrucache_exports);
var cache = /* @__PURE__ */ new Map();
var ttl = 1e3 * 60 * 10;
var jsonRequest = { id: "TINY_FETCH_LRUCACHE" };
jsonRequest.mapKey = null;
jsonRequest.request = (request) => {
  if (request.cache) {
    const { headers, url } = request;
    const headerValues = [...headers.values()];
    const headerString = headerValues.join("");
    jsonRequest.mapKey = JSON.stringify({
      url,
      method: request.method,
      headerString
    });
  }
  return request;
};
jsonRequest.response = (response) => {
  if (jsonRequest.mapKey) {
    if (cache.has(jsonRequest.mapKey))
      return cache.get(jsonRequest.mapKey);
    cache.set(jsonRequest.mapKey, response.clone());
    setTimeout(() => {
      cache.delete(jsonRequest.mapKey);
    }, ttl);
  }
  return response;
};
var lrucache_default = jsonRequest;
