(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[966],{3278:function(e,s,r){Promise.resolve().then(r.bind(r,2573))},2573:function(e,s,r){"use strict";r.r(s),r.d(s,{default:function(){return d}});var a=r(9268),l=r(6006),t=r(1856),n=r(4522),o=r(5846),i=r.n(o);function m(e){let{show:s,msg:r}=e;return(0,a.jsx)(a.Fragment,{children:s&&(0,a.jsx)("div",{className:"border-l-2 border-pink-800 shadow p-5 mb-5",children:(0,a.jsx)("p",{className:"text-pink-800",children:r})})})}function d(e){var s,r;let{}=e,{lang:o}=(0,t.Z)(e=>e),{setUserData:d,refresh:c,setRefresh:g}=(0,n.Z)(e=>e),[x,p]=(0,l.useState)({firstName:"",lastName:"",email:"",password:"",rePassword:"",platform:"EMAIL"}),[h,N]=(0,l.useState)({firstName:{error:!1},lastName:{error:!1},email:{error:!1},password:{error:!1},rePassword:{error:!1},dbResponse:{error:!1}}),u=e=>{p({...x,[e.name]:e.value});let s=e.name;""===e.value?N({...h,[s]:{error:!0}}):"email"===e.name&&null==e.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)?N({...h,[s]:{error:!0}}):"password"===e.name&&e.value.length<8||"rePassword"===e.name&&e.value.length<8||"rePassword"===e.name&&e.value!==x.password?N({...h,[s]:{error:!0}}):N({...h,[s]:{error:!1}})},b=async e=>{e.preventDefault(),N({firstName:{error:""==x.firstName},lastName:{error:""==x.lastName},email:{error:!(""!=x.email&&x.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))},password:{error:""==x.password&&!(x.password.length>=8)},rePassword:{error:""==x.rePassword&&!(x.password.length>=8)},dbResponse:{error:!1}}),N(e=>{let s=[];for(let r in e)s.push(e[r].error);return s.includes(!0)||(async()=>{let e={headers:{"Content-Type":"application/json","x-siloah":"siloah"},method:"POST",body:JSON.stringify(x)},s=await fetch("".concat("http://localhost:5000","/hotel/customer/signup"),e),r=await s.json();"Error"===r.status?N({...h,dbResponse:{error:!0,msgCN:r.msgCN,msgEN:r.msgEN}}):(d({logged:!0,name:"".concat(r.msg.firstName," ").concat(r.msg.lastName),token:r.msg.token}),location.reload()),console.log(r)})(),e})};return(0,a.jsx)("div",{className:"flex justify-center items-center p-2 lg:p-5 lg:p-0 mt-2 lg:mt-8 text-md lg:text-lg",children:(0,a.jsxs)("div",{className:"shadow-xl p-5 border rounded-lg w-full lg:w-auto lg:min-w-[500px]",children:[(0,a.jsx)(m,{show:h.dbResponse.error,msg:"TW"===o?null===(s=h.dbResponse)||void 0===s?void 0:s.msgCN:null===(r=h.dbResponse)||void 0===r?void 0:r.msgEN}),(0,a.jsx)("p",{className:"text-lg font-bold hidden lg:block",children:"TW"===o?"免費入會":"Sign Up"}),(0,a.jsxs)("form",{className:"mt-0 lg:mt-5",children:[(0,a.jsxs)("div",{className:"flex flex-col mb-2 lg:mb-5",children:[(0,a.jsx)("label",{htmlFor:"firstName",className:"mb-[2px]",children:"TW"===o?"護照英文名":"First Name"}),(0,a.jsx)("input",{className:"border rounded-lg p-2 ".concat(!0===h.firstName.error&&"border-pink-800"),type:"text",name:"firstName",id:"firstName",onChange:e=>u(e.target)}),!0===h.firstName.error&&(0,a.jsx)("label",{className:"text-sm text-pink-800",children:"TW"===o?"請輸入有效的名字(限英文)。":"Please enter a valid first name (English only)."})]}),(0,a.jsxs)("div",{className:"flex flex-col mb-2 lg:mb-5",children:[(0,a.jsx)("label",{htmlFor:"lastName",className:"mb-[2px]",children:"TW"===o?"護照英文姓":"Last Name"}),(0,a.jsx)("input",{className:"border rounded-lg p-2 ".concat(!0===h.lastName.error&&"border-pink-800"),type:"text",name:"lastName",id:"lastName",onChange:e=>u(e.target)}),!0===h.lastName.error&&(0,a.jsx)("label",{className:"text-sm text-pink-800",children:"TW"===o?"請輸入有效的姓氏(限英文)。。":"Please enter a valid last name (English only)."})]}),(0,a.jsxs)("div",{className:"flex flex-col mb-2 lg:mb-5",children:[(0,a.jsx)("label",{htmlFor:"email",className:"mb-[2px]",children:"TW"===o?"電子信箱":"Email"}),(0,a.jsx)("input",{className:"border rounded-lg p-2 ".concat(!0===h.email.error&&"border-pink-800"),type:"email",name:"email",id:"email",onChange:e=>u(e.target)}),!0===h.email.error&&(0,a.jsx)("label",{className:"text-sm text-pink-800",children:"TW"===o?"請輸入有效的電子信箱。":"Please enter a valid email address."})]}),(0,a.jsxs)("div",{className:"flex flex-col mb-2 lg:mb-5",children:[(0,a.jsx)("label",{htmlFor:"password",className:"mb-[2px]",children:"TW"===o?"密碼":"Password"}),(0,a.jsx)("input",{className:"border rounded-lg p-2 ".concat(!0===h.password.error&&"border-pink-800"),type:"password",name:"password",id:"password",onChange:e=>u(e.target)}),!0===h.password.error&&(0,a.jsx)("label",{className:"text-sm text-pink-800",children:"TW"===o?"請輸入有效的密碼。 最少須由8個英數字組合!":"Please enter a valid password. At least 8 characters"})]}),(0,a.jsxs)("div",{className:"flex flex-col mb-2 lg:mb-5",children:[(0,a.jsx)("label",{htmlFor:"rePassword",className:"mb-[2px]",children:"TW"===o?"確認密碼":"Confirm Password"}),(0,a.jsx)("input",{className:"border rounded-lg p-2 ".concat(!0===h.rePassword.error&&"border-pink-800"),type:"password",name:"rePassword",id:"rePassword",onChange:e=>u(e.target)}),!0===h.rePassword.error&&(0,a.jsx)("label",{className:"text-sm text-pink-800",children:"TW"===o?"請輸入有效的密碼。 最少須由8個英數字組合!":"Please enter a valid password. At least 8 characters"})]}),(0,a.jsx)("button",{className:"rounded-lg bg-orange-500 hover:bg-orange-400 text-gray-100 p-2 w-full",onClick:e=>b(e),children:"TW"===o?"送出":"Submit"})]}),(0,a.jsxs)("div",{className:"splitter flex justify-center items-center gap-2 mt-5 text-gray-500 text-sm",children:[(0,a.jsx)("p",{className:"flex-grow h-px bg-gray-400"}),(0,a.jsx)("p",{className:"",children:"TW"===o?"或用以下帳號登入":"or continue with"}),(0,a.jsx)("p",{className:"flex-grow h-px bg-gray-400"})]}),(0,a.jsx)("div",{className:"social-media-login flex flex-col gap-2 mt-5"}),(0,a.jsx)("div",{className:"splitter mt-5",children:(0,a.jsx)("p",{className:"flex-grow h-px bg-gray-400"})}),(0,a.jsx)("div",{className:"signin mt-5",children:(0,a.jsx)(i(),{href:"/signin",children:(0,a.jsx)("button",{className:"border border-orange-500 hover:bg-orange-500 hover:text-gray-100 p-2 rounded w-full",children:"TW"===o?"已經是會員？登入":"Already have an account? Sign in"})})}),(0,a.jsx)("div",{className:"term-policy text-xs text-gray-400 text-center mt-5",children:"TW"===o?"點擊登錄即代表我同意Siloah的服務條款和隱私權政策。":"By signing in, I agree to Siloah's Terms of Use and Privacy Policy."})]})})}},1856:function(e,s,r){"use strict";var a=r(2561);let l=(0,a.Ue)()(e=>({lang:"TW",setLang:s=>e({lang:s})}));s.Z=l},4522:function(e,s,r){"use strict";var a=r(2561);let l=e=>JSON.parse(window.localStorage.getItem(e)),t=(e,s)=>{window.localStorage.setItem(e,JSON.stringify(s))},n=(0,a.Ue)(e=>({userData:l("userData"),refresh:!1,setUserData:e=>t("userData",e),setRefresh:s=>e({refresh:s})}));s.Z=n}},function(e){e.O(0,[414,253,488,744],function(){return e(e.s=3278)}),_N_E=e.O()}]);