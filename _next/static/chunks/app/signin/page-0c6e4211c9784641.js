(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[281],{6317:function(e,t,a){Promise.resolve().then(a.bind(a,5534))},5534:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return p}});var o=a(9268),n=a(6006),s=a(1856),r=a(4522),l=a(5670),i=a(5149),c=a(5846),d=a.n(c),m=a(8529),g=a(6008),u=a(1741);function p(e){var t,a;let{}=e,{routeList:c,acceptedList:p}=(0,u.Z)(e=>e),h=(0,g.usePathname)(),{lang:w}=(0,s.Z)(e=>e),{setUserData:x}=(0,r.Z)(e=>e),[f,b]=(0,n.useState)({email:"",password:"",platform:"EMAIL"}),[v,N]=(0,n.useState)({email:{error:!1},password:{error:!1},dbResponse:{error:!1}}),j=e=>{b({...f,[e.name]:e.value});let t=e.name;""===e.value?N({...v,[t]:{error:!0}}):"email"===e.name&&null==e.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)?N({...v,[t]:{error:!0}}):"password"===e.name&&e.value.length<8?N({...v,[t]:{error:!0}}):N({...v,[t]:{error:!1}})},y=async e=>{e.preventDefault(),N({email:{error:!(""!=f.email&&f.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))},password:{error:""==f.password&&!(f.password.length>=8)},dbResponse:{error:!1}}),N(e=>{let t=[];for(let a in e)t.push(e[a].error);return t.includes(!0)||(async()=>{let e={headers:{"Content-Type":"application/json","x-siloah":"siloah"},method:"POST",body:JSON.stringify(Object.fromEntries(Object.entries(f).filter(e=>"rePassword"!=e[0])))},t=await fetch("".concat("https://node.taiwanviptravel.com","/hotel/customer/signin"),e),a=await t.json();"Error"===a.status?N({...v,dbResponse:{error:!0,msgCN:a.msgCN,msgEN:a.msgEN}}):(x({logged:!0,name:"".concat(a.data.firstName," ").concat(a.data.lastName),token:a.data.token}),void 0!==c[c.length-2]&&p.some(e=>c[c.length-2].includes(e))?window.location.replace(c[c.length-2]):window.location.replace("".concat("https://do1fendi.github.io/siloah-hotel-booking").concat(h))),console.log(a)})(),e})};return(0,o.jsx)("div",{className:"flex justify-center items-center p-2 lg:p-5 lg:p-0 mt-2 lg:mt-8 text-md lg:text-lg",children:(0,o.jsxs)("div",{className:"shadow-xl p-5 border rounded-lg w-full lg:w-auto lg:min-w-[500px]",children:[(0,o.jsx)(m.Z,{show:v.dbResponse.error,msg:"TW"===w?null===(t=v.dbResponse)||void 0===t?void 0:t.msgCN:null===(a=v.dbResponse)||void 0===a?void 0:a.msgEN}),(0,o.jsx)("p",{className:"text-lg font-bold hidden lg:block",children:"TW"===w?"免費入會":"Sign Up"}),(0,o.jsxs)("form",{className:"mt-0 lg:mt-5",children:[(0,o.jsxs)("div",{className:"flex flex-col mb-2 lg:mb-5",children:[(0,o.jsx)("label",{htmlFor:"email",className:"mb-[2px]",children:"TW"===w?"電子信箱":"Email"}),(0,o.jsx)("input",{className:"border rounded-lg p-2 ".concat(!0===v.email.error&&"border-pink-800"),type:"email",name:"email",id:"email",onChange:e=>j(e.target)}),!0===v.email.error&&(0,o.jsx)("label",{className:"text-sm text-pink-800",children:"TW"===w?"請輸入有效的電子信箱。":"Please enter a valid email address."})]}),(0,o.jsxs)("div",{className:"flex flex-col mb-2 lg:mb-5",children:[(0,o.jsx)("label",{htmlFor:"password",className:"mb-[2px]",children:"TW"===w?"密碼":"Password"}),(0,o.jsx)("input",{className:"border rounded-lg p-2 ".concat(!0===v.password.error&&"border-pink-800"),type:"password",name:"password",id:"password",onChange:e=>j(e.target)}),!0===v.password.error&&(0,o.jsx)("label",{className:"text-sm text-pink-800",children:"TW"===w?"請輸入有效的密碼。 最少須由8個英數字組合!":"Please enter a valid password. At least 8 characters"})]}),(0,o.jsx)("button",{className:"rounded-lg bg-orange-500 hover:bg-orange-400 text-gray-100 p-2 w-full",onClick:e=>y(e),children:"TW"===w?"送出":"Submit"})]}),(0,o.jsxs)("div",{className:"splitter flex justify-center items-center gap-2 mt-5 text-gray-500 text-sm",children:[(0,o.jsx)("p",{className:"flex-grow h-px bg-gray-400"}),(0,o.jsx)("p",{className:"",children:"TW"===w?"或用以下帳號登入":"or continue with"}),(0,o.jsx)("p",{className:"flex-grow h-px bg-gray-400"})]}),(0,o.jsxs)("div",{className:"social-media-login flex flex-col gap-2 mt-5",children:[(0,o.jsx)(l.Z,{clientId:"267711026176-4qvtdrssib8rid36b01kp3eoduh1ie9u.apps.googleusercontent.com"}),(0,o.jsx)(i.Z,{appId:"746859163687935"})]}),(0,o.jsx)("div",{className:"splitter mt-5",children:(0,o.jsx)("p",{className:"flex-grow h-px bg-gray-400"})}),(0,o.jsx)("div",{className:"signup mt-5",children:(0,o.jsx)(d(),{href:"/signup",children:(0,o.jsx)("button",{className:"border border-orange-500 hover:bg-orange-500 hover:text-gray-100 p-2 rounded w-full",children:"TW"===w?"我是新朋友":"Create account"})})}),(0,o.jsx)("div",{className:"term-policy text-xs text-gray-400 text-center mt-5",children:"TW"===w?"點擊登錄即代表我同意Siloah的服務條款和隱私權政策。":"By signing in, I agree to Siloah's Terms of Use and Privacy Policy."})]})})}},8529:function(e,t,a){"use strict";a.d(t,{Z:function(){return n}});var o=a(9268);function n(e){let{show:t,msg:a}=e;return(0,o.jsx)(o.Fragment,{children:t&&(0,o.jsx)("div",{className:"border-l-2 border-pink-800 shadow p-5 mb-5",children:(0,o.jsx)("p",{className:"text-pink-800",children:a})})})}},5149:function(e,t,a){"use strict";a.d(t,{Z:function(){return i}});var o=a(9268),n=a(6341),s=a.n(n),r=a(4522),l=a(1741);function i(e){let{userData:t,setUserData:a}=(0,r.Z)(e=>e),{routeList:n,acceptedList:i}=(0,l.Z)(e=>e);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s(),{src:"https://connect.facebook.net/en_US/sdk.js",strategy:"lazyOnload",onLoad:()=>window.fbAsyncInit=function(){window.FB.init({appId:e.appId,cookie:!0,xfbml:!0,version:"v16.0"})}}),(0,o.jsx)("button",{className:"border border-orange-500 hover:bg-orange-500 hover:text-gray-100 p-2 rounded w-full",onClick:()=>void window.FB.login(function(e){"connected"===e.status&&window.FB.api("/me?fields=id,first_name,last_name,email",function(e){(async()=>{let t={headers:{"Content-Type":"application/json","x-siloah":"siloah"},method:"POST",body:JSON.stringify({firstName:e.first_name,lastName:e.last_name,email:e.email,platform:"FACEBOOK"})},o=await fetch("".concat("https://node.taiwanviptravel.com","/hotel/customer/signin"),t),s=await o.json();"Error"===s.status?(a(null),window.location.replace("/")):(a({logged:!0,name:"".concat(s.data.firstName," ").concat(s.data.lastName),token:s.data.token}),void 0!==n[n.length-1]&&i.some(e=>n[n.length-1].includes(e))&&window.location.replace(n[n.length-1]),window.location.replace("".concat("https://do1fendi.github.io/siloah-hotel-booking")))})()})},{scope:"email",return_scopes:!0}),children:"Facebook"})]})}},5670:function(e,t,a){"use strict";a.d(t,{Z:function(){return d}});var o=a(9268),n=a(6341),s=a.n(n),r=a(6006),l=a(9477),i=a(4522),c=a(1741);function d(e){let{routeList:t,acceptedList:a}=(0,c.Z)(e=>e),{userData:n,setUserData:d}=(0,i.Z)(e=>e),[m,g]=(0,r.useState)(!1),u=e=>{let o=(0,l.Z)(e.credential);(async()=>{let e={headers:{"Content-Type":"application/json","x-siloah":"siloah"},method:"POST",body:JSON.stringify({firstName:o.given_name,lastName:o.family_name,email:o.email,platform:"GOOGLE"})},n=await fetch("".concat("https://node.taiwanviptravel.com","/hotel/customer/signin"),e),s=await n.json();"Error"===s.status?d(null):(d({logged:!0,name:"".concat(s.data.firstName," ").concat(s.data.lastName),token:s.data.token}),void 0!==t[t.length-1]&&a.some(e=>t[t.length-1].includes(e))?window.location.replace(t[t.length-1]):window.location.replace("".concat("https://do1fendi.github.io/siloah-hotel-booking")))})()},p=()=>{window.googleButtonWrapper.click()};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s(),{src:"https://accounts.google.com/gsi/client",strategy:"lazyOnload",onLoad:()=>{window.google.accounts.id.initialize({client_id:e.clientId,callback:u}),window.googleButtonWrapper=(()=>{let e=document.createElement("div");e.style.display="none",e.classList.add("custom-google-button"),document.body.appendChild(e),window.google.accounts.id.renderButton(e,{type:"icon",width:"200"});let t=e.querySelector("div[role=button]");return{click:()=>{t.click()}}})()}}),JSON.stringify(t),(0,o.jsx)("button",{className:"border border-orange-500 hover:bg-orange-500 hover:text-gray-100 p-2 rounded w-full",onClick:()=>p(),children:"Google"})]})}},1856:function(e,t,a){"use strict";var o=a(2561);let n=(0,o.Ue)()(e=>({lang:"TW",setLang:t=>e({lang:t})}));t.Z=n},1741:function(e,t,a){"use strict";var o=a(2561);let n=(0,o.Ue)()(e=>({routeList:[],acceptedList:["search"],setRouteList:t=>{e({routeList:t})}}));t.Z=n},4522:function(e,t,a){"use strict";var o=a(2561),n=a(6493);let s=e=>null!==window.localStorage.getItem(e)?JSON.parse((0,n.Jx)(window.localStorage.getItem(e))):null,r=(e,t)=>{window.localStorage.setItem(e,(0,n.cv)(JSON.stringify(t)))},l=(0,o.Ue)(e=>({userData:s("_ud"),setUserData:e=>{r("_ud",e)}}));t.Z=l},6008:function(e,t,a){e.exports=a(3027)}},function(e){e.O(0,[554,846,973,253,488,744],function(){return e(e.s=6317)}),_N_E=e.O()}]);