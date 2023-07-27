var e={async response(t){if(t.bodyUsed)return t;try{let r=await t.text();return{...t,...JSON.parse(r)}}catch{return t}},id:"TINY_FETCH_JSON_RESPONSE"},c=e;export{c as default};
//# sourceMappingURL=json-response.js.map
