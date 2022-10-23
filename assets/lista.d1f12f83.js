import{u as p}from"./todo.62f91210.js";import{d as r,_ as i,b as _,o as a,c,a as t,F as h,h as y,t as e,i as u,e as m,w as x,f as g}from"./index.a0a96878.js";const f=r({setup(){const o=p();async function d(l){await o.deleteAll(l),await o.listar()}return{todoStore:o,deleteData:d}},mounted(){this.todoStore.listar()}}),b={class:"overflow-x-auto relative"},w={class:"w-full text-sm text-center text-gray-500 dark:text-gray-400"},k=t("thead",{class:"text-xs text-gray-700 uppercase bg-gray-50"},[t("tr",null,[t("th",{scoped:"col",class:"py-3 pg-6"},"Client Name"),t("th",{scoped:"col",class:"py-3 pg-6"},"DOB"),t("th",{scoped:"col",class:"py-3 pg-6"},"Phone"),t("th",{scoped:"col",class:"py-3 pg-6"},"Email"),t("th",{scoped:"col",class:"py-3 pg-6"},"Address"),t("th",{scoped:"col",class:"py-3 pg-6"},"Payments"),t("th",{scoped:"col",class:"py-3 pg-6"},"Total"),t("th",{scoped:"col",class:"py-3 pg-6"},"Actions")])],-1),C={class:""},v={class:"py-4 px-6 font-medium text-white whitespace-nowrap"},S={class:"py-4 px-6"},$={class:"py-4 px-6"},B={class:"py-4 px-6"},D={class:"py-4 px-6"},N={class:"py-4 px-6"},A={class:"py-4 px-6"},F={class:"py-4 px-6"},T=["onClick"];function V(o,d,l,E,P,L){const n=_("router-link");return a(),c("div",b,[t("table",w,[k,t("tbody",C,[(a(!0),c(h,null,y(o.todoStore.persons,s=>(a(),c("tr",{class:"border-b bg-gray-800 border-gray-700",key:s.id},[t("td",v,e(s.name),1),t("td",S,e(s.bod),1),t("td",$,e(s.phone),1),t("td",B,e(s.email),1),t("td",D,e(s.address),1),t("td",N,e(s.payments),1),t("td",A,e(s.total),1),t("td",F,[t("button",{type:"button",onClick:u(M=>o.deleteData(s.id),["prevent"])}," \u274C ",8,T),m(n,{class:"ml-4",to:{name:"editar",params:{id:s.id}}},{default:x(()=>[g(" \u270F ")]),_:2},1032,["to"])])]))),128))])])])}const q=i(f,[["render",V]]);export{q as default};
