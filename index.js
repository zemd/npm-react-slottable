"use strict";var e=require("react");const t=(e,t)=>[e,t].filter(Boolean).join(" "),r=(...e)=>e.reduce(((e,o)=>{if(o){const n=(e=>{if("string"==typeof e||"number"==typeof e)return`${e}`;if(Array.isArray(e))return r(...e);if("object"==typeof e){let o="";for(let n in e)e[n]&&(o=t(o,r(n)));return o}return""})(o);return t(e,n)}return e}),""),o=e=>{if("object"!=typeof e||null===e)return!1;const t=Object.getPrototypeOf(e);return!(null!==t&&t!==Object.prototype&&null!==Object.getPrototypeOf(t)||Symbol.toStringTag in e||Symbol.iterator in e)},n=(...e)=>e.length?e.reduce(((e,t)=>{if("object"!=typeof t||Array.isArray(t))return e;for(const r in t)o(t[r])&&!Array.isArray(t[r])?e[r]=n(e[r],t[r]):e[r]=structuredClone(t[r]);return e}),{}):{},s=e=>e;exports.createSlottableComponent=function(t,r){const o=e.forwardRef(t);return o.displayName=r??`@zemd/react-slottable/${t.name??"UnknownComponent"}`,o},exports.useSlot=function(e,t){const{className:o,component:a,ref:c,props:l,extraProps:i,classNameMergeFn:u=s}=t,{component:f,slots:p={[e]:void 0},slotProps:m={[e]:void 0},...y}=l,b={[e]:void 0,...m},d=("root"===e?f:p[e])??a,g=u(r(o??"",{[l.className]:"root"===e&&!!l.className},i?.className??!1,b[e]?.className));return[d,Object.assign(n("root"===e?y:{},i,b[e],g?{className:g}:{}),{ref:c})]};
