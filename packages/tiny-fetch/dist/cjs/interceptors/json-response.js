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

// src/interceptors/json-response.js
var json_response_exports = {};
__export(json_response_exports, {
  default: () => json_response_default
});
module.exports = __toCommonJS(json_response_exports);
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
