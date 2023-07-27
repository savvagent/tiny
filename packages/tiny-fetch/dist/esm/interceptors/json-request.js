(()=>{var o=typeof window<"u",c=o;function D(t,{trigger:e="click",text:n=""}={}){let i=async()=>{c&&typeof navigator<"u"&&await navigator.clipboard.writeText(n).then(()=>t.dispatchEvent(new CustomEvent("copied",{detail:{clipboard:n}})),r=>t.dispatchEvent(new CustomEvent("error",{detail:{error:r}})))};return c&&t.addEventListener(e,i,!0),{update:r=>{r.trigger!==void 0&&(e=r.trigger),r.text!==void 0&&(n=r.text)},destroy(){t.removeEventListener(e,i,!0)}}}var I=(t,{default:e,xxs:n,xs:i,sm:r,md:a,lg:u,xl:d,xxl:l})=>{let s;switch(t){case"xxl":s=l??d??u??a??r??i??n??e;break;case"xl":s=d??u??a??r??i??n??e;break;case"lg":s=u??a??r??i??n??e;break;case"md":s=a??r??i??n??e;break;case"sm":s=r??i??n??e;break;case"xs":s=i??n??e;break;case"xxs":s=n??e;break;default:s=e;break}return s};function R(t){let e=n=>{t&&!t.contains(n.target)&&!n.defaultPrevented&&t.dispatchEvent(new CustomEvent("click_outside",t))};return document.addEventListener("click",e,!0),{destroy(){document.removeEventListener("click",e,!0)}}}var x=t=>typeof t=="object"?JSON.parse(JSON.stringify(t)):t,M=x,h=t=>typeof t=="string"&&/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(t);function y(t,e){return h(e)?new Date(e):h(t)?new Date(t):e}function v(t){try{return JSON.parse(t),!0}catch{return!1}}var m=t=>v(t)?JSON.parse(t,y):t,b=m,w=t=>JSON.stringify(t),f=w;async function L(t){return f(t)}function _(){if(c){let t=typeof window<"u"&&window.matchMedia("(display-mode: standalone)").matches;return document.referrer.startsWith("android-app://")?"twa":navigator.standalone||t?"standalone":"browser"}}var S=()=>{},P=S,k=t=>{c&&document.body.appendChild(t)},U=k,E=class{constructor(){this.db=new Map}clear(){return this.db.clear()}del(t){return this.db.delete(t)}get(t){return this.db.get(t)}put(t,e){return this.set(t,e)}set(t,e){return this.db.set(t,e)}},j=class{constructor(){window.matchMedia("(display-mode: standalone)").matches?this.store=window.localStorage:this.store=window.sessionStorage}clear(){return this.store.clear()}del(t){return this.store.removeItem(t)}get(t){if(c)return b(this.store.getItem(t))}put(t,e){return this.store.setItem(t,f({...this.get(t),...e}))}set(t,e){return this.store.setItem(t,f(e))}},$=c?new j:new E,F=class{constructor(t){!t||typeof t>"u"?this.string="":this.string=String(t)}toString(){return this.string}append(t){return this.string+=t,this}insert(t,e){let n=this.string.length,i=this.string.slice(0,t),r=this.string.slice(t);return this.string=i+e+r,this}};function H(){let t=new Date().getTime();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{let n=(t+Math.random()*16)%16|0;return t=Math.floor(t/16),(e==="x"?n:n&3|8).toString(16)})}var p=(t,e)=>{if(t===e)return!0;let n=Array.isArray(t),i=Array.isArray(e),r;if(n&&i){if(t.length!==e.length)return!1;for(r=0;r<t.length;r++)if(!p(t[r],e[r]))return!1;return!0}if(n!==i)return!1;if(t&&e&&typeof t=="object"&&typeof e=="object"){let a=Object.keys(t);if(a.length!==Object.keys(e).length)return!1;let u=t instanceof Date,d=e instanceof Date;if(u&&d)return t.getTime()===e.getTime();if(u!==d)return!1;let l=t instanceof RegExp,s=e instanceof RegExp;if(l&&s)return t.toString()===e.toString();if(l!==s)return!1;for(r=0;r<a.length;r++)if(!Object.prototype.hasOwnProperty.call(e,a[r]))return!1;for(r=0;r<a.length;r++)if(!p(t[a[r]],e[a[r]]))return!1;return!0}return!1},O=p,W=(t,e)=>!O(t,e);function A(t){let e=t?.cookie,n=/([^;=\s]*)=([^;]*)/g,i={};for(let r;r=n.exec(e);)i[r[1]]=decodeURIComponent(r[2]);return i}function Z(t,e){if(typeof document<"u"){let n=new RegExp("(?:^|;)\\s?"+t+"=(.*?)(?:;|$)","i"),i=document.cookie.match(n);return i&&i[1]?i[1]:""}return A(e)?.[t]}function z(t){return Array.isArray(t)}var N=t=>/\S+@\S+\.\S+/i.test(t),B=t=>!N(t);function T(t){let e=!1;return t==null||typeof t=="string"&&t===""?e=!0:t instanceof Date?e=!1:((Array.isArray(t)||typeof t=="string")&&t.length<1||typeof t=="string"&&!/\S/.test(t)||typeof t=="object"&&Object.keys(t).length<1||typeof t=="number"&&t===0)&&(e=!0),e}function G(t){return!T(t)}var Q=t=>typeof t=="object"&&!Array.isArray(t),Y=t=>typeof t=="string",J=c&&typeof navigator<"u"&&navigator.languages&&navigator.languages.length?navigator.languages[0]:"en",K=J.replace(/-.*/,"")})();var C={request(o){return o.headers.set("Content-Type","application/json"),o.headers.set("Accept","application/json"),(void 0)(o.body)&&(void 0)(o.body)&&(o.body=JSON.stringify(o.body)),o},id:"TINY_FETCH_JSON_REQUEST"},tt=C;export{tt as default};
//# sourceMappingURL=json-request.js.map
