(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[565],{6216:function(e,t,n){Promise.resolve().then(n.bind(n,3827))},3827:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return g}});var r=n(9268),l=n(1),a=n(6493),s=n(6006),c=n(9944),o=n(2801),i=n(1856),d=n(4522),u=n(5846),x=n.n(u),p=n(3182);function g(){let{userData:e,setUserData:t}=(0,d.Z)(),{cartData:n,setCartData:u}=(0,l.Z)(),[g,h]=(0,s.useState)([]),{currency:m}=(0,c.Z)(),{lang:f}=(0,i.Z)(),[v,j]=(0,s.useState)(!1),[N,y]=(0,s.useState)({id:""}),{setPackage:b}=(0,p.Z)();(0,s.useEffect)(()=>{null!=e&&(async()=>{let n={headers:{"Content-Type":"application/json","x-siloah":"siloah"},method:"POST",body:JSON.stringify({token:e.token})},r=await fetch("".concat("https://node.taiwanviptravel.com","/hotel/verifyToken"),n),l=await r.json();"Error"===l.status&&(t(null),window.location.reload())})()},[]),(0,s.useEffect)(()=>{h(e=>JSON.parse((0,a.Jx)(n)))},[n]);let w=e=>{h(t=>(u(JSON.stringify(t=JSON.parse((0,a.Jx)(n)).filter((t,n)=>n!==e))),t))},O=e=>{let t=new Date(e);return"TW"===f?"".concat(t.getFullYear()," 年 ").concat(t.getMonth()+1," 月 ").concat(t.getDate()," 日 (").concat(["日","一","二","三","四","五","六"][t.getDay()],")"):"".concat(["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][t.getDay()]," ").concat(t.getDate()," ").concat(["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()]," ").concat(t.getFullYear())},k=(e,t)=>{let n=g.map((n,r)=>r===e?{...n,selected:t}:n);h(n),y({id:(0,a.cv)(JSON.stringify(n.filter(e=>!0===e.selected)))}),b(JSON.stringify(n.filter(e=>!0===e.selected)))};return(0,s.useEffect)(()=>{g&&g.length>0&&j(e=>g.some(e=>!0===e.selected))},[g]),(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("div",{className:"container mx-auto max-w-[1024px]",children:g&&g.length>0?(0,r.jsxs)("div",{className:"flex flex-col lg:flex-row gap-5",children:[(0,r.jsxs)("div",{className:"flex flex-col gap-2 lg:gap-5 mt-5 p-2 lg:p-0 w-full lg:w-8/12",children:[(0,r.jsx)("div",{className:"p-2 lg:p-5 border border-luxgreen rounded",children:(0,r.jsx)("p",{className:"text-xl",children:"TW"===f?"您的購物車 (".concat(g.length,")"):"Your cart (".concat(g.length,")")})}),g.map((e,t)=>(0,r.jsxs)("div",{className:"p-2 lg:p-5 border border-luxgreen rounded flex flex-col gap-2 lg:gap-5",children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"flex justify-between items-center",children:[(0,r.jsx)("p",{className:"text-lg font-bold",children:e.hotelName}),(0,r.jsx)("button",{className:"min-w-[30px]",onClick:()=>w(t),children:(0,r.jsx)(o.lp8,{})})]}),(0,r.jsx)("p",{children:e.roomType})]}),(0,r.jsxs)("div",{className:"flex justify-between border-t mt-5 items-center pt-2 lg:pt-5",children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("p",{className:"flex items-center gap-2",children:[(0,r.jsx)("span",{children:(0,r.jsx)("input",{type:"checkbox",checked:e.selected,onChange:e=>k(t,e.target.checked)})}),(0,r.jsx)("span",{children:e.ratePlanName})]}),(0,r.jsxs)("p",{className:"text-gray-500 text-xs",children:[O(e.checkIn)," ~"," ",O(e.checkOut)]}),(0,r.jsxs)("p",{className:"text-gray-500 text-xs",children:[e.noOfRoom," ","TW"===f?"房間":e.noOfRoom>1?"Rooms":"Room"]})]}),(0,r.jsxs)("div",{className:"min-w-[130px] text-right",children:[(0,r.jsxs)("p",{children:[(0,r.jsx)("span",{className:"text-xs",children:"TWD"===m?"NT$ ":"$ "}),(0,r.jsx)("span",{className:"text-xl text-pink-700",children:(e.price*e.noOfRoom).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")})]}),(0,r.jsx)("p",{className:"text-gray-500 text-xs",children:"TW"===f?"包含稅金":"includes taxes"})]})]})]},t))]}),(0,r.jsx)("div",{className:"w-full lg:w-4/12 p-2 lg:p-0",children:(0,r.jsxs)("div",{className:"border border-luxgreen rounded p-2 lg:p-5 lg:mt-5",children:[(0,r.jsx)("p",{children:"TW"===f?"最終價格將在下一頁計算":"Final price will be calculated on the next page"}),(0,r.jsx)(x(),{href:"/package",children:(0,r.jsx)("button",{className:"w-full bg-luxorange text-gray-100 hover:bg-orange-400 rounded p-2 mt-5 disabled:bg-gray-300",disabled:!v,children:"TW"===f?"下一步":"Next"})})]})})]}):(0,r.jsxs)("div",{className:"flex flex-col justify-center items-center h-screen -mt-[110px]",children:[(0,r.jsx)("p",{className:"text-xl font-bold",children:"TW"===f?"您的購物車是空的":"Your cart is empty"}),(0,r.jsx)("div",{className:"mt-5",children:(0,r.jsx)(x(),{href:"/",children:(0,r.jsx)("button",{className:"text-gray-100 bg-luxorange text-lg py-2 px-5 rounded hover:bg-orange-400",children:"TW"===f?"找飯店":"Search Hotel"})})})]})})})}},1:function(e,t,n){"use strict";var r=n(2561),l=n(4475),a=n(6493);let s=(0,r.Ue)()((0,l.tJ)(e=>({cartData:(0,a.cv)("null"),setCartData:t=>e({cartData:(0,a.cv)(t)})}),{name:"_cd"}));t.Z=s},9944:function(e,t,n){"use strict";var r=n(2561),l=n(4475);let a=(0,r.Ue)()((0,l.tJ)(e=>({currency:"TWD",setCurrency:t=>e({currency:t})}),{name:"_cr"}));t.Z=a},1856:function(e,t,n){"use strict";var r=n(2561),l=n(4475);let a=(0,r.Ue)()((0,l.tJ)((e,t)=>({lang:"TW",setLang:t=>e({lang:t})}),{name:"_ln"}));t.Z=a},3182:function(e,t,n){"use strict";var r=n(2561),l=n(4475),a=n(6493);let s=(0,r.Ue)()((0,l.tJ)(e=>({packs:(0,a.cv)("null"),setPackage:t=>e({packs:(0,a.cv)(t)})}),{name:"_pk"}));t.Z=s},4522:function(e,t,n){"use strict";var r=n(2561),l=n(6493);let a=e=>null!==window.localStorage.getItem(e)?JSON.parse((0,l.Jx)(window.localStorage.getItem(e))):null,s=(e,t)=>{window.localStorage.setItem(e,(0,l.cv)(JSON.stringify(t)))},c=(0,r.Ue)(e=>({userData:a("_ud"),setUserData:e=>{s("_ud",e)}}));t.Z=c},3270:function(e,t,n){"use strict";n.d(t,{w_:function(){return o}});var r=n(6006),l={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},a=r.createContext&&r.createContext(l),s=function(){return(s=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var l in t=arguments[n])Object.prototype.hasOwnProperty.call(t,l)&&(e[l]=t[l]);return e}).apply(this,arguments)},c=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>t.indexOf(r)&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var l=0,r=Object.getOwnPropertySymbols(e);l<r.length;l++)0>t.indexOf(r[l])&&Object.prototype.propertyIsEnumerable.call(e,r[l])&&(n[r[l]]=e[r[l]]);return n};function o(e){return function(t){return r.createElement(i,s({attr:s({},e.attr)},t),function e(t){return t&&t.map(function(t,n){return r.createElement(t.tag,s({key:n},t.attr),e(t.child))})}(e.child))}}function i(e){var t=function(t){var n,l=e.attr,a=e.size,o=e.title,i=c(e,["attr","size","title"]),d=a||t.size||"1em";return t.className&&(n=t.className),e.className&&(n=(n?n+" ":"")+e.className),r.createElement("svg",s({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,l,i,{className:n,style:s(s({color:e.color||t.color},t.style),e.style),height:d,width:d,xmlns:"http://www.w3.org/2000/svg"}),o&&r.createElement("title",null,o),e.children)};return void 0!==a?r.createElement(a.Consumer,null,function(e){return t(e)}):t(l)}}},function(e){e.O(0,[296,23,846,253,488,744],function(){return e(e.s=6216)}),_N_E=e.O()}]);