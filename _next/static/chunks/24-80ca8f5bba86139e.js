"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[24],{7024:function(e,t,l){l.d(t,{Z:function(){return m}});var n=l(9268),r=l(4911),a=l(6006),o=l(5548),s=l(1856),i=e=>{let{setOccupation:t}=e,l=(0,a.useRef)(null),{lang:r}=(0,s.Z)(e=>e),{showOccupation:i,setShowOccupation:c}=(0,o.Z)(e=>e),[d,u]=(0,a.useState)({room:1,adult:2,children:0,childAges:""});(0,a.useEffect)(()=>{t(d)},[d]),(0,a.useEffect)(()=>{function e(e){l.current&&!l.current.contains(e.target)&&c(!1)}return document.addEventListener("mousedown",e),()=>{document.removeEventListener("mousedown",e)}},[l]);let h=(e,t,l)=>{switch(e){case"room":u(e=>("min"===t&&e.room>1?e={...e,room:e.room-1}:"add"===t&&e.room>=8||("add"===t&&e.room>=e.adult?e={...e,room:e.room+1,adult:e.room+1}:"add"===t&&e.room<e.adult&&(e={...e,room:e.room+1})),e));break;case"adult":u(e=>("min"===t&&e.adult>1&&e.adult>e.room?e={...e,adult:e.adult-1}:"add"===t&&e.adult<16&&(e={...e,adult:e.adult+1}),e));break;case"children":u(e=>{if("min"===t&&e.children>0){let t=e.childAges.split(",");t.pop(),e={...e,children:e.children-1,childAges:t.toString()}}else"add"===t&&e.children<16&&(e={...e,children:e.children+1});return e});break;case"chlidAge":if(1===d.children)u({...d,childAges:l});else if(d.children>1){let e=parseInt(t),n=d.childAges.split(",");n[e]=l,u({...d,childAges:n.toString()})}}};return(0,n.jsx)(n.Fragment,{children:i?(0,n.jsxs)("div",{ref:l,className:"z-10  absolute top-0 right-0 bottom-auto left-auto translate-y-[50px] lg:translate-y-[50px] bg-white shadow-lg rounded p-5 w-[250px]",children:[(0,n.jsxs)("div",{className:"flex justify-between gap-5",children:[(0,n.jsxs)("div",{className:"flex flex-col gap-5",children:[(0,n.jsx)("div",{children:"TW"===r?"客房":"Room"}),(0,n.jsx)("div",{children:"TW"===r?"大人":"Adult"}),(0,n.jsx)("div",{children:"TW"===r?"兒童":"Children"})]}),(0,n.jsxs)("div",{className:"flex flex-col gap-5",children:[(0,n.jsxs)("div",{className:"grid grid-cols-3 gap-5 text-center",children:[(0,n.jsx)("button",{className:"w-6 h-6 rounded-full border border-luxgreen flex justify-center items-center",onClick:()=>h("room","min"),children:"-"}),(0,n.jsx)("span",{children:d.room}),(0,n.jsx)("button",{className:"w-6 h-6 rounded-full border border-luxgreen flex justify-center items-center",onClick:()=>h("room","add"),children:"+"})]}),(0,n.jsxs)("div",{className:"grid grid-cols-3 gap-5  text-center",children:[(0,n.jsx)("button",{className:"w-6 h-6 rounded-full border border-luxgreen flex justify-center items-center",onClick:()=>h("adult","min"),children:"-"}),(0,n.jsx)("span",{children:d.adult}),(0,n.jsx)("button",{className:"w-6 h-6 rounded-full border border-luxgreen flex justify-center items-center",onClick:()=>h("adult","add"),children:"+"})]}),(0,n.jsxs)("div",{className:"grid grid-cols-3 gap-5 text-center",children:[(0,n.jsx)("button",{className:"w-6 h-6 rounded-full border border-luxgreen flex justify-center items-center",onClick:()=>h("children","min"),children:"-"}),(0,n.jsx)("span",{children:d.children}),(0,n.jsx)("button",{className:"w-6 h-6 rounded-full border border-luxgreen flex justify-center items-center",onClick:()=>h("children","add"),children:"+"})]})]})]}),d.children>0&&(()=>{var e=[];for(let t=0;t<d.children;t++)e.push(a.createElement("div",{key:t},(0,n.jsxs)("div",{className:"flex justify-between mt-5",children:[(0,n.jsx)("p",{children:"TW"===r?"第".concat(t+1,"位兒童年齡"):"Age child ".concat(t+1)}),(0,n.jsxs)("select",{onChange:e=>h("chlidAge","".concat(t),e.currentTarget.value),children:[(0,n.jsx)("option",{value:"",children:"_"}),(0,n.jsx)("option",{value:"<1",children:"<1"}),(0,n.jsx)("option",{value:"1",children:"1"}),(0,n.jsx)("option",{value:"2",children:"2"}),(0,n.jsx)("option",{value:"3",children:"3"}),(0,n.jsx)("option",{value:"5",children:"5"}),(0,n.jsx)("option",{value:"6",children:"6"}),(0,n.jsx)("option",{value:"7",children:"7"}),(0,n.jsx)("option",{value:"8",children:"8"}),(0,n.jsx)("option",{value:"9",children:"9"}),(0,n.jsx)("option",{value:"10",children:"10"}),(0,n.jsx)("option",{value:"11",children:"11"}),(0,n.jsx)("option",{value:"12",children:"12"}),(0,n.jsx)("option",{value:"13",children:"13"}),(0,n.jsx)("option",{value:"14",children:"14"}),(0,n.jsx)("option",{value:"15",children:"15"}),(0,n.jsx)("option",{value:"16",children:"16"}),(0,n.jsx)("option",{value:"17",children:"17"})]})]})));let t=a.createElement("div",null,e);return t})()]}):""})},c=l(8136),d=l(9944),u=l(6338),h=l(6008);let x=[{country:{en:"Taiwan",tw:"台灣"},cities:[{en:"Kaohsiung",tw:"高雄市"},{en:"Taichung",tw:"台中市"},{en:"Tainan",tw:"台南市"},{en:"Taipei",tw:"台北市"},{en:"Taoyuan",tw:"桃園市"},{en:"Chiayi",tw:"嘉義市"},{en:"Hsinchu",tw:"新竹市"},{en:"Keelung",tw:"基隆市"},{en:"Changhua",tw:"彰化市"},{en:"Douliu",tw:"斗六市"},{en:"Hualien",tw:"花蓮市"},{en:"Magong",tw:"馬公市"},{en:"Miaoli",tw:"苗栗市"},{en:"Nantou",tw:"南投市"},{en:"Pingtung",tw:"屏東市"},{en:"Puzi",tw:"朴子市"},{en:"Taibao",tw:"太保市"},{en:"Taitung",tw:"台東市"},{en:"Toufen",tw:"頭份市"},{en:"Yilan",tw:"宜蘭市"},{en:"Yuanlin",tw:"員林市"},{en:"Zhubei",tw:"竹北市"}]}],g=e=>{let t=e.toLowerCase(),l=[];for(let e of x)for(let n of e.cities)n.en.toLowerCase().includes(t)&&l.push({cityName:n.en,country:e.country.en});for(let e of x)for(let n of e.cities)n.tw.includes(t)&&l.push({cityName:n.tw,country:e.country.tw});return l.length>0?l.slice(0,3):null};function m(e){let{}=e,t=(0,a.useRef)(null),l=(0,h.useRouter)(),x=(0,h.useSearchParams)(),{lang:m,setLang:p}=(0,s.Z)(),{currency:w}=(0,d.Z)(),[f,v]=(0,a.useState)(""),{setShowOccupation:j}=(0,o.Z)(e=>e),[b,y]=(0,a.useState)(),[N,D]=(0,a.useState)({startDate:new Date,endDate:new Date}),[C,S]=(0,a.useState)(null);(0,a.useEffect)(()=>{let e=new Date;e.setDate(e.getDate()+7);let t=new Date(e);t.setDate(t.getDate()+1),D({startDate:e,endDate:t})},[]);let k=e=>{S(g(e.value)),v(t=>e.value)};return(0,a.useEffect)(()=>{null!==x.get("city")&&v(x.get("city")),null!==x.get("room")&&null!==x.get("adult")&&null!==x.get("children")&&y({...b,room:parseInt(x.get("room")),adult:parseInt(x.get("adult")),children:parseInt(x.get("children")),childAges:x.get("childAges")})},[x]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{className:"relative",children:[(0,n.jsxs)("label",{className:"relative focus-within:text-teal-500 block",children:[(0,n.jsx)(c.dVI,{className:"pointer-events-none w-6 h-6 absolute top-3 transform left-3"}),(0,n.jsx)("input",{ref:t,type:"text",placeholder:"City",className:"focus:text-gray-600 focus:border-luxgreen pl-14 border text-base lg:text-lg p-2 rounded mb-2 border-gray-300 w-full focus:ring-teal-500 focus:border-teal-500 shadow-sm form-input",onChange:e=>k(e.target),value:f})]}),null!==C&&""!==f&&(0,n.jsx)("div",{className:"absolute z-20 bg-white flex flex-col gap-5 border border-gray-300 w-full rounded p-5",children:C.map((e,t)=>(0,n.jsxs)("p",{className:"text-sm cursor-pointer",onClick:()=>{v(e.cityName),S(null)},children:[e.cityName,", ",e.country]},t))})]}),(0,n.jsxs)("div",{className:"flex justify-between items-center flex-col lg:flex-row gap-2 lg:gap-5",children:[(0,n.jsx)("div",{className:"datePicker w-full lg:w-1/2",children:(0,n.jsx)(r.Z,{value:N,onChange:e=>{D({startDate:new Date(e.startDate),endDate:new Date(e.endDate)})},primaryColor:"teal",startFrom:N.startDate,minDate:new Date,maxDate:(()=>{let e=new Date;return e.setFullYear(e.getFullYear()+1),e.setDate(e.getDate()),e})(),inputClassName:"w-full p-2 border rounded focus:ring-0 text-gray-500"})}),(0,n.jsxs)("div",{className:"relative border border-gray-300 rounded w-full lg:w-1/2 h-10 lg:h-11 flex justify-between items-center px-2",children:[(0,n.jsxs)("div",{className:"text-sm",children:[(0,n.jsxs)("span",{className:"mr-2 border border-gray-600 text-gray-600 rounded-xl px-2 py-[2px]",children:[null==b?void 0:b.room," ","TW"===m?"間客房":(null==b?void 0:b.room)!=void 0&&b.room>1?"Rooms":"Room"]}),(0,n.jsxs)("span",{className:"mr-2 border border-gray-600  text-gray-600 rounded-xl px-2 py-[2px]",children:[null==b?void 0:b.adult," ","TW"===m?"位大人":(null==b?void 0:b.adult)!=void 0&&b.adult>1?"Adults":"Adult"]}),void 0!==b&&b.children>0?(0,n.jsxs)("span",{className:"mr-2 border border-gray-600 text-gray-600 rounded-xl px-2 py-[2px]",children:[b.children," ","TW"===m?"位兒童":"Children"]}):""]}),(0,n.jsx)("button",{onClick:()=>j(!0),children:(0,n.jsx)(u.U0j,{size:32,color:"gray"})}),(0,n.jsx)(i,{setOccupation:y})]})]}),(0,n.jsxs)("button",{className:"w-full bg-luxorange hover:bg-orange-400 text-gray-100 mt-5 p-2 rounded text-lg",onClick:()=>{var e,n,r,a,o;if(""===f)null===(e=t.current)||void 0===e||e.focus();else{let e="".concat(new Date(N.startDate).getFullYear(),"-").concat(((null===(n=N.startDate)||void 0===n?void 0:n.getMonth())+1).toString().padStart(2,"0"),"-").concat(null===(r=N.startDate)||void 0===r?void 0:r.getDate().toString().padStart(2,"0")),t="".concat(new Date(N.endDate).getFullYear(),"-").concat(((null===(a=N.endDate)||void 0===a?void 0:a.getMonth())+1).toString().padStart(2,"0"),"-").concat(null===(o=N.endDate)||void 0===o?void 0:o.getDate().toString().padStart(2,"0"));l.push("/search/?city=".concat(f,"&checkIn=").concat(e,"&checkOut=").concat(t,"&room=").concat(null==b?void 0:b.room,"&adult=").concat(null==b?void 0:b.adult,"&children=").concat(null==b?void 0:b.children,"&childAges=").concat(null==b?void 0:b.childAges,"&lang=").concat(m,"&currency=").concat(w))}},children:["TW"===m?"搜 出 好 價":"SEARCH"," "]})]})}},5548:function(e,t,l){var n=l(2561);let r=(0,n.Ue)()(e=>({showLang:!1,showCurrency:!1,showNav:!1,showOccupation:!1,setShowLang:t=>{e({showLang:t})},setShowCurrency:t=>{e({showCurrency:t})},setShowNav:t=>{e({showNav:t})},setShowOccupation:t=>{e({showOccupation:t})},setCloseAllShow:()=>{e({showNav:!1,showCurrency:!1,showLang:!1})}}));t.Z=r}}]);