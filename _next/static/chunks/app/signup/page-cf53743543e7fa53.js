(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[966],{3278:function(e,a,t){Promise.resolve().then(t.bind(t,5625))},5625:function(e,a,t){"use strict";t.r(a),t.d(a,{default:function(){return u}});var s=t(9268),r=t(6006),n=t(1856),o=t(4522),l=t(5670),i=t(5149),c=t(5846),d=t.n(c),m=t(8529),g=t(6008),p=t(1741);function u(e){var a,t;let{}=e,{lang:c}=(0,n.Z)(e=>e),u=(0,g.usePathname)(),{setUserData:h}=(0,o.Z)(e=>e),[x,w]=(0,r.useState)({firstName:"",lastName:"",email:"",password:"",rePassword:"",platform:"EMAIL"}),[f,b]=(0,r.useState)({firstName:{error:!1},lastName:{error:!1},email:{error:!1},password:{error:!1},rePassword:{error:!1},dbResponse:{error:!1}}),{routeList:N,acceptedList:v}=(0,p.Z)(e=>e),j=e=>{w({...x,[e.name]:e.value});let a=e.name;""===e.value?b({...f,[a]:{error:!0}}):"email"===e.name&&null==e.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)?b({...f,[a]:{error:!0}}):"password"===e.name&&e.value.length<8||"rePassword"===e.name&&e.value.length<8||"rePassword"===e.name&&e.value!==x.password?b({...f,[a]:{error:!0}}):b({...f,[a]:{error:!1}})},y=async e=>{e.preventDefault(),b({firstName:{error:""==x.firstName},lastName:{error:""==x.lastName},email:{error:!(""!=x.email&&x.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))},password:{error:""==x.password&&!(x.password.length>=8)},rePassword:{error:""==x.rePassword&&!(x.password.length>=8)},dbResponse:{error:!1}}),b(e=>{let a=[];for(let t in e)a.push(e[t].error);return a.includes(!0)||(async()=>{let e={headers:{"Content-Type":"application/json","x-siloah":"siloah"},method:"POST",body:JSON.stringify(Object.fromEntries(Object.entries(x).filter(e=>"rePassword"!=e[0])))},a=await fetch("".concat("https://node.taiwanviptravel.com","/hotel/customer/signup"),e),t=await a.json();"Error"===t.status?b({...f,dbResponse:{error:!0,msgCN:t.msgCN,msgEN:t.msgEN}}):(h({logged:!0,name:"".concat(t.data.firstName," ").concat(t.data.lastName),token:t.data.token}),void 0!==N[N.length-2]&&v.some(e=>N[N.length-2].includes(e))?window.location.replace(N[N.length-2]):window.location.replace("".concat("https://do1fendi.github.io").concat(u))),console.log(t)})(),e})};return(0,s.jsx)("div",{className:"flex justify-center items-center p-2 lg:p-5 lg:p-0 mt-2 lg:mt-8 text-md lg:text-lg",children:(0,s.jsxs)("div",{className:"shadow-xl p-5 border rounded-lg w-full lg:w-auto lg:min-w-[500px]",children:[(0,s.jsx)(m.Z,{show:f.dbResponse.error,msg:"TW"===c?null===(a=f.dbResponse)||void 0===a?void 0:a.msgCN:null===(t=f.dbResponse)||void 0===t?void 0:t.msgEN}),(0,s.jsx)("p",{className:"text-lg font-bold hidden lg:block",children:"TW"===c?"免費入會":"Sign Up"}),(0,s.jsxs)("form",{className:"mt-0 lg:mt-5",children:[(0,s.jsxs)("div",{className:"flex flex-col mb-2 lg:mb-5",children:[(0,s.jsx)("label",{htmlFor:"firstName",className:"mb-[2px]",children:"TW"===c?"護照英文名":"First Name"}),(0,s.jsx)("input",{className:"border rounded-lg p-2 ".concat(!0===f.firstName.error&&"border-pink-800"),type:"text",name:"firstName",id:"firstName",onChange:e=>j(e.target)}),!0===f.firstName.error&&(0,s.jsx)("label",{className:"text-sm text-pink-800",children:"TW"===c?"請輸入有效的名字(限英文)。":"Please enter a valid first name (English only)."})]}),(0,s.jsxs)("div",{className:"flex flex-col mb-2 lg:mb-5",children:[(0,s.jsx)("label",{htmlFor:"lastName",className:"mb-[2px]",children:"TW"===c?"護照英文姓":"Last Name"}),(0,s.jsx)("input",{className:"border rounded-lg p-2 ".concat(!0===f.lastName.error&&"border-pink-800"),type:"text",name:"lastName",id:"lastName",onChange:e=>j(e.target)}),!0===f.lastName.error&&(0,s.jsx)("label",{className:"text-sm text-pink-800",children:"TW"===c?"請輸入有效的姓氏(限英文)。。":"Please enter a valid last name (English only)."})]}),(0,s.jsxs)("div",{className:"flex flex-col mb-2 lg:mb-5",children:[(0,s.jsx)("label",{htmlFor:"email",className:"mb-[2px]",children:"TW"===c?"電子信箱":"Email"}),(0,s.jsx)("input",{className:"border rounded-lg p-2 ".concat(!0===f.email.error&&"border-pink-800"),type:"email",name:"email",id:"email",onChange:e=>j(e.target)}),!0===f.email.error&&(0,s.jsx)("label",{className:"text-sm text-pink-800",children:"TW"===c?"請輸入有效的電子信箱。":"Please enter a valid email address."})]}),(0,s.jsxs)("div",{className:"flex flex-col mb-2 lg:mb-5",children:[(0,s.jsx)("label",{htmlFor:"password",className:"mb-[2px]",children:"TW"===c?"密碼":"Password"}),(0,s.jsx)("input",{className:"border rounded-lg p-2 ".concat(!0===f.password.error&&"border-pink-800"),type:"password",name:"password",id:"password",onChange:e=>j(e.target)}),!0===f.password.error&&(0,s.jsx)("label",{className:"text-sm text-pink-800",children:"TW"===c?"請輸入有效的密碼。 最少須由8個英數字組合!":"Please enter a valid password. At least 8 characters"})]}),(0,s.jsxs)("div",{className:"flex flex-col mb-2 lg:mb-5",children:[(0,s.jsx)("label",{htmlFor:"rePassword",className:"mb-[2px]",children:"TW"===c?"確認密碼":"Confirm Password"}),(0,s.jsx)("input",{className:"border rounded-lg p-2 ".concat(!0===f.rePassword.error&&"border-pink-800"),type:"password",name:"rePassword",id:"rePassword",onChange:e=>j(e.target)}),!0===f.rePassword.error&&(0,s.jsx)("label",{className:"text-sm text-pink-800",children:"TW"===c?"請輸入有效的密碼。 最少須由8個英數字組合!":"Please enter a valid password. At least 8 characters"})]}),(0,s.jsx)("button",{className:"rounded-lg bg-orange-500 hover:bg-orange-400 text-gray-100 p-2 w-full",onClick:e=>y(e),children:"TW"===c?"送出":"Submit"})]}),(0,s.jsxs)("div",{className:"splitter flex justify-center items-center gap-2 mt-5 text-gray-500 text-sm",children:[(0,s.jsx)("p",{className:"flex-grow h-px bg-gray-400"}),(0,s.jsx)("p",{className:"",children:"TW"===c?"或用以下帳號登入":"or continue with"}),(0,s.jsx)("p",{className:"flex-grow h-px bg-gray-400"})]}),(0,s.jsxs)("div",{className:"social-media-login flex flex-col gap-2 mt-5",children:[(0,s.jsx)(l.Z,{clientId:"267711026176-4qvtdrssib8rid36b01kp3eoduh1ie9u.apps.googleusercontent.com"}),(0,s.jsx)(i.Z,{appId:"746859163687935"})]}),(0,s.jsx)("div",{className:"splitter mt-5",children:(0,s.jsx)("p",{className:"flex-grow h-px bg-gray-400"})}),(0,s.jsx)("div",{className:"signin mt-5",children:(0,s.jsx)(d(),{href:"/signin",children:(0,s.jsx)("button",{className:"border border-orange-500 hover:bg-orange-500 hover:text-gray-100 p-2 rounded w-full",children:"TW"===c?"已經是會員？登入":"Already have an account? Sign in"})})}),(0,s.jsx)("div",{className:"term-policy text-xs text-gray-400 text-center mt-5",children:"TW"===c?"點擊登錄即代表我同意Siloah的服務條款和隱私權政策。":"By signing in, I agree to Siloah's Terms of Use and Privacy Policy."})]})})}},8529:function(e,a,t){"use strict";t.d(a,{Z:function(){return r}});var s=t(9268);function r(e){let{show:a,msg:t}=e;return(0,s.jsx)(s.Fragment,{children:a&&(0,s.jsx)("div",{className:"border-l-2 border-pink-800 shadow p-5 mb-5",children:(0,s.jsx)("p",{className:"text-pink-800",children:t})})})}},5149:function(e,a,t){"use strict";t.d(a,{Z:function(){return c}});var s=t(9268),r=t(6341),n=t.n(r),o=t(4522),l=t(1741),i=t(6008);function c(e){let{userData:a,setUserData:t}=(0,o.Z)(e=>e),{routeList:r,acceptedList:c}=(0,l.Z)(e=>e),d=(0,i.usePathname)();return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n(),{src:"https://connect.facebook.net/en_US/sdk.js",strategy:"lazyOnload",onLoad:()=>window.fbAsyncInit=function(){window.FB.init({appId:e.appId,cookie:!0,xfbml:!0,version:"v16.0"})}}),(0,s.jsx)("button",{className:"border border-orange-500 hover:bg-orange-500 hover:text-gray-100 p-2 rounded w-full",onClick:()=>void window.FB.login(function(e){"connected"===e.status&&window.FB.api("/me?fields=id,first_name,last_name,email",function(e){(async()=>{let a={headers:{"Content-Type":"application/json","x-siloah":"siloah"},method:"POST",body:JSON.stringify({firstName:e.first_name,lastName:e.last_name,email:e.email,platform:"FACEBOOK"})},s=await fetch("".concat("https://node.taiwanviptravel.com","/hotel/customer/signin"),a),n=await s.json();"Error"===n.status?(t(null),window.location.replace("/")):(t({logged:!0,name:"".concat(n.data.firstName," ").concat(n.data.lastName),token:n.data.token}),void 0!==r[r.length-1]&&c.some(e=>r[r.length-1].includes(e))&&window.location.replace(r[r.length-1]),window.location.replace("".concat("https://do1fendi.github.io").concat(d)))})()})},{scope:"email",return_scopes:!0}),children:"Facebook"})]})}},5670:function(e,a,t){"use strict";t.d(a,{Z:function(){return m}});var s=t(9268),r=t(6341),n=t.n(r),o=t(6006),l=t(9477),i=t(4522),c=t(1741),d=t(6008);function m(e){let a=(0,d.usePathname)(),{routeList:t,acceptedList:r}=(0,c.Z)(e=>e),{userData:m,setUserData:g}=(0,i.Z)(e=>e),[p,u]=(0,o.useState)(!1),h=e=>{let s=(0,l.Z)(e.credential);(async()=>{let e={headers:{"Content-Type":"application/json","x-siloah":"siloah"},method:"POST",body:JSON.stringify({firstName:s.given_name,lastName:s.family_name,email:s.email,platform:"GOOGLE"})},n=await fetch("".concat("https://node.taiwanviptravel.com","/hotel/customer/signin"),e),o=await n.json();"Error"===o.status?g(null):(g({logged:!0,name:"".concat(o.data.firstName," ").concat(o.data.lastName),token:o.data.token}),void 0!==t[t.length-1]&&r.some(e=>t[t.length-1].includes(e))?window.location.replace(t[t.length-1]):window.location.replace("".concat("https://do1fendi.github.io").concat(a)))})()},x=()=>{window.googleButtonWrapper.click()};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n(),{src:"https://accounts.google.com/gsi/client",strategy:"lazyOnload",onLoad:()=>{window.google.accounts.id.initialize({client_id:e.clientId,callback:h}),window.googleButtonWrapper=(()=>{let e=document.createElement("div");e.style.display="none",e.classList.add("custom-google-button"),document.body.appendChild(e),window.google.accounts.id.renderButton(e,{type:"icon",width:"200"});let a=e.querySelector("div[role=button]");return{click:()=>{a.click()}}})()}}),JSON.stringify(t),(0,s.jsx)("button",{className:"border border-orange-500 hover:bg-orange-500 hover:text-gray-100 p-2 rounded w-full",onClick:()=>x(),children:"Google"})]})}},1856:function(e,a,t){"use strict";var s=t(2561);let r=(0,s.Ue)()(e=>({lang:"TW",setLang:a=>e({lang:a})}));a.Z=r},1741:function(e,a,t){"use strict";var s=t(2561);let r=(0,s.Ue)()(e=>({routeList:[],acceptedList:["search"],setRouteList:a=>{e({routeList:a})}}));a.Z=r},4522:function(e,a,t){"use strict";var s=t(2561),r=t(6493);let n=e=>null!==window.localStorage.getItem(e)?JSON.parse((0,r.Jx)(window.localStorage.getItem(e))):null,o=(e,a)=>{window.localStorage.setItem(e,(0,r.cv)(JSON.stringify(a)))},l=(0,s.Ue)(e=>({userData:n("_ud"),setUserData:e=>{o("_ud",e)}}));a.Z=l}},function(e){e.O(0,[334,846,973,253,488,744],function(){return e(e.s=3278)}),_N_E=e.O()}]);