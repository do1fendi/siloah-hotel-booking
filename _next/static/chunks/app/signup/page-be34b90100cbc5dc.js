(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[966],{3278:function(e,s,r){Promise.resolve().then(r.bind(r,6173))},6173:function(e,s,r){"use strict";r.r(s),r.d(s,{default:function(){return h}});var a=r(9268),l=r(6006),t=r(1856),o=r(4522),n=r(6341),i=r.n(n),c=r(9477),d=r(6008);function m(e){let s=(0,d.useRouter)(),[r,t]=(0,l.useState)(!1),o=e=>{console.log(e),console.log((0,c.Z)(e.credential))};return(0,l.useEffect)(()=>{setTimeout(()=>{window.google.accounts.id.initialize({client_id:e.clientId,callback:o});let s=(()=>{let e=document.createElement("div");e.style.display="none",e.classList.add("custom-google-button"),document.body.appendChild(e),window.google.accounts.id.renderButton(e,{type:"icon",width:"200"});let s=e.querySelector("div[role=button]");return{click:()=>{s.click()}}})();t(e=>(!0===e&&(console.log("pressed"),s.click()),t(!1),e))},500)},[s]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i(),{src:"https://accounts.google.com/gsi/client",async:!0,defer:!0,strategy:"beforeInteractive"}),(0,a.jsx)("button",{className:"border border-orange-500 hover:bg-orange-500 hover:text-gray-100 p-2 rounded w-full",onClick:()=>t(!0),children:"Google"})]})}function g(e){let s=(0,d.useRouter)();return(0,l.useEffect)(()=>{setTimeout(()=>{window.fbAsyncInit=function(){window.FB.init({appId:e.appId,cookie:!0,xfbml:!0,version:"v16.0"})}},500)},[s]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i(),{async:!0,defer:!0,crossOrigin:"anonymous",src:"https://connect.facebook.net/en_US/sdk.js",nonce:"29GfDbm6"}),(0,a.jsx)("button",{className:"border border-orange-500 hover:bg-orange-500 hover:text-gray-100 p-2 rounded w-full",onClick:()=>void(window.fbAsyncInit=function(){window.FB.init({appId:e.appId,cookie:!0,xfbml:!0,version:"v16.0"})},window.FB.login(function(e){"connected"===e.status?(console.log(e),window.FB.api("/me?fields=id,first_name,last_name,email",function(e){console.log(e)})):console.log(e)},{scope:"email",return_scopes:!0})),children:"Facebook"})]})}var p=r(5846),u=r.n(p);function x(e){let{show:s,msg:r}=e;return(0,a.jsx)(a.Fragment,{children:s&&(0,a.jsx)("div",{className:"border-l-2 border-pink-800 shadow p-5 mb-5",children:(0,a.jsx)("p",{className:"text-pink-800",children:r})})})}function h(e){var s,r;let{}=e,{lang:n}=(0,t.Z)(e=>e),{setUserData:i,refresh:c,setRefresh:d}=(0,o.Z)(e=>e),[p,h]=(0,l.useState)({firstName:"",lastName:"",email:"",password:"",rePassword:"",platform:"EMAIL"}),[b,f]=(0,l.useState)({firstName:{error:!1},lastName:{error:!1},email:{error:!1},password:{error:!1},rePassword:{error:!1},dbResponse:{error:!1}}),w=e=>{h({...p,[e.name]:e.value});let s=e.name;""===e.value?f({...b,[s]:{error:!0}}):"email"===e.name&&null==e.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)?f({...b,[s]:{error:!0}}):"password"===e.name&&e.value.length<8||"rePassword"===e.name&&e.value.length<8||"rePassword"===e.name&&e.value!==p.password?f({...b,[s]:{error:!0}}):f({...b,[s]:{error:!1}})},N=async e=>{e.preventDefault(),f({firstName:{error:""==p.firstName},lastName:{error:""==p.lastName},email:{error:!(""!=p.email&&p.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))},password:{error:""==p.password&&!(p.password.length>=8)},rePassword:{error:""==p.rePassword&&!(p.password.length>=8)},dbResponse:{error:!1}}),f(e=>{let s=[];for(let r in e)s.push(e[r].error);return s.includes(!0)||(async()=>{let e={headers:{"Content-Type":"application/json","x-siloah":"siloah"},method:"POST",body:JSON.stringify(p)},s=await fetch("".concat("http://localhost:5000","/hotel/customer/signup"),e),r=await s.json();"Error"===r.status?f({...b,dbResponse:{error:!0,msgCN:r.msgCN,msgEN:r.msgEN}}):(i({logged:!0,name:"".concat(r.msg.firstName," ").concat(r.msg.lastName),token:r.msg.token}),location.reload()),console.log(r)})(),e})};return(0,a.jsx)("div",{className:"flex justify-center items-center p-2 lg:p-5 lg:p-0 mt-2 lg:mt-8 text-md lg:text-lg",children:(0,a.jsxs)("div",{className:"shadow-xl p-5 border rounded-lg w-full lg:w-auto lg:min-w-[500px]",children:[(0,a.jsx)(x,{show:b.dbResponse.error,msg:"TW"===n?null===(s=b.dbResponse)||void 0===s?void 0:s.msgCN:null===(r=b.dbResponse)||void 0===r?void 0:r.msgEN}),(0,a.jsx)("p",{className:"text-lg font-bold hidden lg:block",children:"TW"===n?"免費入會":"Sign Up"}),(0,a.jsxs)("form",{className:"mt-0 lg:mt-5",children:[(0,a.jsxs)("div",{className:"flex flex-col mb-2 lg:mb-5",children:[(0,a.jsx)("label",{htmlFor:"firstName",className:"mb-[2px]",children:"TW"===n?"護照英文名":"First Name"}),(0,a.jsx)("input",{className:"border rounded-lg p-2 ".concat(!0===b.firstName.error&&"border-pink-800"),type:"text",name:"firstName",id:"firstName",onChange:e=>w(e.target)}),!0===b.firstName.error&&(0,a.jsx)("label",{className:"text-sm text-pink-800",children:"TW"===n?"請輸入有效的名字(限英文)。":"Please enter a valid first name (English only)."})]}),(0,a.jsxs)("div",{className:"flex flex-col mb-2 lg:mb-5",children:[(0,a.jsx)("label",{htmlFor:"lastName",className:"mb-[2px]",children:"TW"===n?"護照英文姓":"Last Name"}),(0,a.jsx)("input",{className:"border rounded-lg p-2 ".concat(!0===b.lastName.error&&"border-pink-800"),type:"text",name:"lastName",id:"lastName",onChange:e=>w(e.target)}),!0===b.lastName.error&&(0,a.jsx)("label",{className:"text-sm text-pink-800",children:"TW"===n?"請輸入有效的姓氏(限英文)。。":"Please enter a valid last name (English only)."})]}),(0,a.jsxs)("div",{className:"flex flex-col mb-2 lg:mb-5",children:[(0,a.jsx)("label",{htmlFor:"email",className:"mb-[2px]",children:"TW"===n?"電子信箱":"Email"}),(0,a.jsx)("input",{className:"border rounded-lg p-2 ".concat(!0===b.email.error&&"border-pink-800"),type:"email",name:"email",id:"email",onChange:e=>w(e.target)}),!0===b.email.error&&(0,a.jsx)("label",{className:"text-sm text-pink-800",children:"TW"===n?"請輸入有效的電子信箱。":"Please enter a valid email address."})]}),(0,a.jsxs)("div",{className:"flex flex-col mb-2 lg:mb-5",children:[(0,a.jsx)("label",{htmlFor:"password",className:"mb-[2px]",children:"TW"===n?"密碼":"Password"}),(0,a.jsx)("input",{className:"border rounded-lg p-2 ".concat(!0===b.password.error&&"border-pink-800"),type:"password",name:"password",id:"password",onChange:e=>w(e.target)}),!0===b.password.error&&(0,a.jsx)("label",{className:"text-sm text-pink-800",children:"TW"===n?"請輸入有效的密碼。 最少須由8個英數字組合!":"Please enter a valid password. At least 8 characters"})]}),(0,a.jsxs)("div",{className:"flex flex-col mb-2 lg:mb-5",children:[(0,a.jsx)("label",{htmlFor:"rePassword",className:"mb-[2px]",children:"TW"===n?"確認密碼":"Confirm Password"}),(0,a.jsx)("input",{className:"border rounded-lg p-2 ".concat(!0===b.rePassword.error&&"border-pink-800"),type:"password",name:"rePassword",id:"rePassword",onChange:e=>w(e.target)}),!0===b.rePassword.error&&(0,a.jsx)("label",{className:"text-sm text-pink-800",children:"TW"===n?"請輸入有效的密碼。 最少須由8個英數字組合!":"Please enter a valid password. At least 8 characters"})]}),(0,a.jsx)("button",{className:"rounded-lg bg-orange-500 hover:bg-orange-400 text-gray-100 p-2 w-full",onClick:e=>N(e),children:"TW"===n?"送出":"Submit"})]}),(0,a.jsxs)("div",{className:"splitter flex justify-center items-center gap-2 mt-5 text-gray-500 text-sm",children:[(0,a.jsx)("p",{className:"flex-grow h-px bg-gray-400"}),(0,a.jsx)("p",{className:"",children:"TW"===n?"或用以下帳號登入":"or continue with"}),(0,a.jsx)("p",{className:"flex-grow h-px bg-gray-400"})]}),(0,a.jsxs)("div",{className:"social-media-login flex flex-col gap-2 mt-5",children:[(0,a.jsx)(m,{clientId:"267711026176-4qvtdrssib8rid36b01kp3eoduh1ie9u.apps.googleusercontent.com"}),(0,a.jsx)(g,{appId:"746859163687935"})]}),(0,a.jsx)("div",{className:"splitter mt-5",children:(0,a.jsx)("p",{className:"flex-grow h-px bg-gray-400"})}),(0,a.jsx)("div",{className:"signin mt-5",children:(0,a.jsx)(u(),{href:"/signin",children:(0,a.jsx)("button",{className:"border border-orange-500 hover:bg-orange-500 hover:text-gray-100 p-2 rounded w-full",children:"TW"===n?"已經是會員？登入":"Already have an account? Sign in"})})}),(0,a.jsx)("div",{className:"term-policy text-xs text-gray-400 text-center mt-5",children:"TW"===n?"點擊登錄即代表我同意Siloah的服務條款和隱私權政策。":"By signing in, I agree to Siloah's Terms of Use and Privacy Policy."})]})})}},1856:function(e,s,r){"use strict";var a=r(2561);let l=(0,a.Ue)()(e=>({lang:"TW",setLang:s=>e({lang:s})}));s.Z=l},4522:function(e,s,r){"use strict";var a=r(2561);let l=e=>JSON.parse(window.localStorage.getItem(e)),t=(e,s)=>{window.localStorage.setItem(e,JSON.stringify(s))},o=(0,a.Ue)(e=>({userData:l("userData"),refresh:!1,setUserData:e=>t("userData",e),setRefresh:s=>e({refresh:s})}));s.Z=o}},function(e){e.O(0,[789,973,253,488,744],function(){return e(e.s=3278)}),_N_E=e.O()}]);