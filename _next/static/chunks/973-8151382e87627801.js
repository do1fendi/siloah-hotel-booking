(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[973],{9477:function(e,t,n){"use strict";function r(e){this.message=e}r.prototype=Error(),r.prototype.name="InvalidCharacterError";var o="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(e){var t=String(e).replace(/=+$/,"");if(t.length%4==1)throw new r("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,a=0,i=0,l="";o=t.charAt(i++);~o&&(n=a%4?64*n+o:o,a++%4)&&(l+=String.fromCharCode(255&n>>(-2*a&6))))o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return l};function a(e){this.message=e}a.prototype=Error(),a.prototype.name="InvalidTokenError",t.Z=function(e,t){if("string"!=typeof e)throw new a("Invalid token specified");var n=!0===(t=t||{}).header?0:1;try{return JSON.parse(function(e){var t,n=e.replace(/-/g,"+").replace(/_/g,"/");switch(n.length%4){case 0:break;case 2:n+="==";break;case 3:n+="=";break;default:throw"Illegal base64url string!"}try{return t=n,decodeURIComponent(o(t).replace(/(.)/g,function(e,t){var n=t.charCodeAt(0).toString(16).toUpperCase();return n.length<2&&(n="0"+n),"%"+n}))}catch(e){return o(n)}}(e.split(".")[n]))}catch(e){throw new a("Invalid token specified: "+e.message)}}},6167:function(e,t){"use strict";let n;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{DOMAttributeNames:function(){return r},isEqualNode:function(){return a},default:function(){return i}});let r={acceptCharset:"accept-charset",className:"class",htmlFor:"for",httpEquiv:"http-equiv",noModule:"noModule"};function o(e){let{type:t,props:n}=e,o=document.createElement(t);for(let e in n){if(!n.hasOwnProperty(e)||"children"===e||"dangerouslySetInnerHTML"===e||void 0===n[e])continue;let a=r[e]||e.toLowerCase();"script"===t&&("async"===a||"defer"===a||"noModule"===a)?o[a]=!!n[e]:o.setAttribute(a,n[e])}let{children:a,dangerouslySetInnerHTML:i}=n;return i?o.innerHTML=i.__html||"":a&&(o.textContent="string"==typeof a?a:Array.isArray(a)?a.join(""):""),o}function a(e,t){if(e instanceof HTMLElement&&t instanceof HTMLElement){let n=t.getAttribute("nonce");if(n&&!e.getAttribute("nonce")){let r=t.cloneNode(!0);return r.setAttribute("nonce",""),r.nonce=n,n===e.nonce&&e.isEqualNode(r)}}return e.isEqualNode(t)}function i(){return{mountedInstances:new Set,updateHead:e=>{let t={};e.forEach(e=>{if("link"===e.type&&e.props["data-optimized-fonts"]){if(document.querySelector('style[data-href="'+e.props["data-href"]+'"]'))return;e.props.href=e.props["data-href"],e.props["data-href"]=void 0}let n=t[e.type]||[];n.push(e),t[e.type]=n});let r=t.title?t.title[0]:null,o="";if(r){let{children:e}=r.props;o="string"==typeof e?e:Array.isArray(e)?e.join(""):""}o!==document.title&&(document.title=o),["meta","base","link","style","script"].forEach(e=>{n(e,t[e]||[])})}}}n=(e,t)=>{let n=document.getElementsByTagName("head")[0],r=n.querySelector("meta[name=next-head-count]"),i=Number(r.content),l=[];for(let t=0,n=r.previousElementSibling;t<i;t++,n=(null==n?void 0:n.previousElementSibling)||null){var u;(null==n?void 0:null==(u=n.tagName)?void 0:u.toLowerCase())===e&&l.push(n)}let c=t.map(o).filter(e=>{for(let t=0,n=l.length;t<n;t++){let n=l[t];if(a(n,e))return l.splice(t,1),!1}return!0});l.forEach(e=>{var t;return null==(t=e.parentNode)?void 0:t.removeChild(e)}),c.forEach(e=>n.insertBefore(e,r)),r.content=(i-l.length+c.length).toString()},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1273:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{handleClientScriptLoad:function(){return h},initScriptLoader:function(){return y},default:function(){return m}});let r=n(6927),o=n(5909),a=r._(n(8431)),i=o._(n(6006)),l=n(5415),u=n(6167),c=n(1722),d=new Map,s=new Set,f=["onLoad","onReady","dangerouslySetInnerHTML","children","onError","strategy"],p=e=>{let{src:t,id:n,onLoad:r=()=>{},onReady:o=null,dangerouslySetInnerHTML:a,children:i="",strategy:l="afterInteractive",onError:c}=e,p=n||t;if(p&&s.has(p))return;if(d.has(t)){s.add(p),d.get(t).then(r,c);return}let h=()=>{o&&o(),s.add(p)},y=document.createElement("script"),g=new Promise((e,t)=>{y.addEventListener("load",function(t){e(),r&&r.call(this,t),h()}),y.addEventListener("error",function(e){t(e)})}).catch(function(e){c&&c(e)});for(let[n,r]of(a?(y.innerHTML=a.__html||"",h()):i?(y.textContent="string"==typeof i?i:Array.isArray(i)?i.join(""):"",h()):t&&(y.src=t,d.set(t,g)),Object.entries(e))){if(void 0===r||f.includes(n))continue;let e=u.DOMAttributeNames[n]||n.toLowerCase();y.setAttribute(e,r)}"worker"===l&&y.setAttribute("type","text/partytown"),y.setAttribute("data-nscript",l),document.body.appendChild(y)};function h(e){let{strategy:t="afterInteractive"}=e;"lazyOnload"===t?window.addEventListener("load",()=>{(0,c.requestIdleCallback)(()=>p(e))}):p(e)}function y(e){e.forEach(h),function(){let e=[...document.querySelectorAll('[data-nscript="beforeInteractive"]'),...document.querySelectorAll('[data-nscript="beforePageRender"]')];e.forEach(e=>{let t=e.id||e.getAttribute("src");s.add(t)})}()}function g(e){let{id:t,src:n="",onLoad:r=()=>{},onReady:o=null,strategy:u="afterInteractive",onError:d,...f}=e,{updateScripts:h,scripts:y,getIsSsr:g,appDir:m,nonce:b}=(0,i.useContext)(l.HeadManagerContext),v=(0,i.useRef)(!1);(0,i.useEffect)(()=>{let e=t||n;v.current||(o&&e&&s.has(e)&&o(),v.current=!0)},[o,t,n]);let _=(0,i.useRef)(!1);if((0,i.useEffect)(()=>{!_.current&&("afterInteractive"===u?p(e):"lazyOnload"===u&&("complete"===document.readyState?(0,c.requestIdleCallback)(()=>p(e)):window.addEventListener("load",()=>{(0,c.requestIdleCallback)(()=>p(e))})),_.current=!0)},[e,u]),("beforeInteractive"===u||"worker"===u)&&(h?(y[u]=(y[u]||[]).concat([{id:t,src:n,onLoad:r,onReady:o,onError:d,...f}]),h(y)):g&&g()?s.add(t||n):g&&!g()&&p(e)),m){if("beforeInteractive"===u)return n?(a.default.preload(n,f.integrity?{as:"script",integrity:f.integrity}:{as:"script"}),i.default.createElement("script",{nonce:b,dangerouslySetInnerHTML:{__html:"(self.__next_s=self.__next_s||[]).push("+JSON.stringify([n])+")"}})):(f.dangerouslySetInnerHTML&&(f.children=f.dangerouslySetInnerHTML.__html,delete f.dangerouslySetInnerHTML),i.default.createElement("script",{nonce:b,dangerouslySetInnerHTML:{__html:"(self.__next_s=self.__next_s||[]).push("+JSON.stringify([0,{...f}])+")"}}));"afterInteractive"===u&&n&&a.default.preload(n,f.integrity?{as:"script",integrity:f.integrity}:{as:"script"})}return null}Object.defineProperty(g,"__nextScript",{value:!0});let m=g;("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6341:function(e,t,n){e.exports=n(1273)}}]);