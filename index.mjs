import{forwardRef as t}from"react";const r=(t,r)=>[t,r].filter(Boolean).join(" "),e=(...t)=>t.reduce(((t,o)=>{if(o){const n=(t=>{if("string"==typeof t||"number"==typeof t)return`${t}`;if(Array.isArray(t))return e(...t);if("object"==typeof t){let o="";for(let n in t)t[n]&&(o=r(o,e(n)));return o}return""})(o);return r(t,n)}return t}),""),o=t=>{if("object"!=typeof t||null===t)return!1;const r=Object.getPrototypeOf(t);return!(null!==r&&r!==Object.prototype&&null!==Object.getPrototypeOf(r)||Symbol.toStringTag in t||Symbol.iterator in t)},n=(...t)=>t.length?t.reduce(((t,r)=>{if("object"!=typeof r||Array.isArray(r))return t;for(const e in r)o(r[e])&&!Array.isArray(r[e])?t[e]=n(t[e],r[e]):"function"==typeof r[e]?t[e]=r[e]:t[e]=structuredClone(r[e]);return t}),{}):{},s=t=>t;function a(t,r){const{className:o,component:a,ref:c,props:i,extraProps:l,classNameMergeFn:f=s}=r,{component:u,slots:p={[t]:void 0},slotProps:m={[t]:void 0},...y}=i,b={[t]:void 0,...m},d=("root"===t?u:p[t])??a,g=f(e(o??"",{[i.className]:"root"===t&&!!i.className},l?.className??!1,b[t]?.className));return[d,Object.assign(n("root"===t?y:{},l,b[t],g?{className:g}:{}),{ref:c})]}function c(r,e){const o=t(r);return o.displayName=e??`@zemd/react-slottable/${r.name??"UnknownComponent"}`,o}export{c as createSlottableComponent,a as useSlot};
