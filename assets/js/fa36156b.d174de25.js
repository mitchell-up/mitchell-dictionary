"use strict";(self.webpackChunkmitchell_dictionary=self.webpackChunkmitchell_dictionary||[]).push([[398],{3314:(n,e,l)=>{l.r(e),l.d(e,{assets:()=>t,contentTitle:()=>c,default:()=>o,frontMatter:()=>s,metadata:()=>d,toc:()=>h});var i=l(5893),r=l(1151);const s={},c="\uc774\uc9c4 \ud799",d={id:"data-structure/binary-heap",title:"\uc774\uc9c4 \ud799",description:"\uc774\uc9c4\uac80\uc0c9\ud2b8\ub9ac\uc640 \uc720\uc0ac\ud558\uc9c0\ub9cc \ub2e4\ub978 \uaddc\uce59\uc774 \uc874\uc7ac\ud55c\ub2e4.",source:"@site/docs/data-structure/binary-heap.md",sourceDirName:"data-structure",slug:"/data-structure/binary-heap",permalink:"/mitchell-dictionary/docs/data-structure/binary-heap",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{}},t={},h=[{value:"\uc0ac\uc6a9\ucc98",id:"\uc0ac\uc6a9\ucc98",level:2},{value:"\ud45c\ud604",id:"\ud45c\ud604",level:2},{value:"\ucd5c\ub300\uc774\uc9c4\ud799\uc5d0 \ucd94\uac00\ud558\uae30",id:"\ucd5c\ub300\uc774\uc9c4\ud799\uc5d0-\ucd94\uac00\ud558\uae30",level:2},{value:"\ucd5c\ub313\uac12 \ucd94\ucd9c\ud558\uae30",id:"\ucd5c\ub313\uac12-\ucd94\ucd9c\ud558\uae30",level:2},{value:"\ucd5c\uc18c\uc774\uc9c4\ud799",id:"\ucd5c\uc18c\uc774\uc9c4\ud799",level:2},{value:"\uc774\uc9c4\ud799\uc758 \uc2dc\uac04\ubcf5\uc7a1\ub3c4",id:"\uc774\uc9c4\ud799\uc758-\uc2dc\uac04\ubcf5\uc7a1\ub3c4",level:2},{value:"\uc6b0\uc120\uc21c\uc704 \ud050",id:"\uc6b0\uc120\uc21c\uc704-\ud050",level:2}];function a(n){const e={code:"code",h1:"h1",h2:"h2",hr:"hr",li:"li",ol:"ol",p:"p",ul:"ul",...(0,r.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h1,{id:"\uc774\uc9c4-\ud799",children:"\uc774\uc9c4 \ud799"}),"\n",(0,i.jsx)(e.p,{children:"\uc774\uc9c4\uac80\uc0c9\ud2b8\ub9ac\uc640 \uc720\uc0ac\ud558\uc9c0\ub9cc \ub2e4\ub978 \uaddc\uce59\uc774 \uc874\uc7ac\ud55c\ub2e4."}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\ucd5c\ub300\uc774\uc9c4\ud799(MaxBinaryHeap)\uc5d0\uc11c\ub294, \ubd80\ubaa8\ub178\ub4dc\uac00 \uc790\uc2dd\ub178\ub4dc\ubcf4\ub2e4 \ud56d\uc0c1 \ud06c\ub2e4."}),"\n",(0,i.jsx)(e.li,{children:"\ucd5c\uc18c\uc774\uc9c4\ud799(MinBinaryHeap)\uc5d0\uc11c\ub294, \ubd80\ubaa8\ub178\ub4dc\uac00 \uc790\uc2dd\ub178\ub4dc\ubcf4\ub2e4 \ud56d\uc0c1 \uc791\ub2e4."}),"\n",(0,i.jsx)(e.li,{children:"\uac01 \ub178\ub4dc\uc758 \uc790\uc2dd\uc740 \uc67c\ucabd\ubd80\ud130 \ucc44\uc6cc\uc9c0\uba70 \uac00\ub2a5\ud55c \ubaa8\ub450 \ucc44\uc6cc\uc57c \ud55c\ub2e4."}),"\n"]}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(e.h2,{id:"\uc0ac\uc6a9\ucc98",children:"\uc0ac\uc6a9\ucc98"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\uc790\ub8cc\uad6c\uc870\uc5d0\uc11c \ud754\ud788 \uc0ac\uc6a9\ub418\ub294 \uc6b0\uc120\uc21c\uc704 \ud050\ub97c \uad6c\ud604\ud558\ub294\ub370 \uc0ac\uc6a9\ud55c\ub2e4."}),"\n",(0,i.jsx)(e.li,{children:"\uadf8\ub798\ud504 \uc21c\ud68c \uc54c\uace0\ub9ac\uc998\uc5d0\uc11c\ub3c4 \uaf64 \uc0ac\uc6a9\ub41c\ub2e4."}),"\n"]}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(e.h2,{id:"\ud45c\ud604",children:"\ud45c\ud604"}),"\n",(0,i.jsx)(e.p,{children:"\ubc30\uc5f4\ub85c \ud45c\ud604\ud560 \uc218 \uc788\ub2e4."}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\uc5b4\ub290 n\ubc88\uc9f8 \uc778\ub371\uc2a4 \ub178\ub4dc\uc758 \uc790\uc2dd\ub178\ub4dc \uc911 \uc67c\ucabd\uc740 ",(0,i.jsx)(e.code,{children:"2n + 1"})," \uc778\ub371\uc2a4\uc5d0, \uc624\ub978\ucabd\uc740 ",(0,i.jsx)(e.code,{children:"2n + 2"}),"\uc5d0 \uc874\uc7ac\ud55c\ub2e4."]}),"\n",(0,i.jsxs)(e.li,{children:["\uc5b4\ub290 n\ubc88\uc9f8 \uc778\ub371\uc2a4 \ub178\ub4dc\uc758 \ubd80\ubaa8\ub178\ub4dc\ub294 ",(0,i.jsx)(e.code,{children:"(n-1)/2"}),"\uc5d0 \uc874\uc7ac\ud55c\ub2e4. (\uc18c\uc218\uc810 \ubc84\ub9bc)"]}),"\n"]}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(e.h2,{id:"\ucd5c\ub300\uc774\uc9c4\ud799\uc5d0-\ucd94\uac00\ud558\uae30",children:"\ucd5c\ub300\uc774\uc9c4\ud799\uc5d0 \ucd94\uac00\ud558\uae30"}),"\n",(0,i.jsxs)(e.ol,{children:["\n",(0,i.jsx)(e.li,{children:"\ubc30\uc5f4\uc758 \ub9e8 \ub05d\uc5d0 \ucd94\uac00\ud55c\ub2e4."}),"\n",(0,i.jsx)(e.li,{children:"\ubd80\ubaa8\uc640 \ube44\uad50\ud558\uba70 \uc790\uc2e0\uc774 \ub354 \uc791\uc744 \ub54c\uae4c\uc9c0 \ub04c\uc5b4\uc62c\ub9b0\ub2e4."}),"\n"]}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(e.h2,{id:"\ucd5c\ub313\uac12-\ucd94\ucd9c\ud558\uae30",children:"\ucd5c\ub313\uac12 \ucd94\ucd9c\ud558\uae30"}),"\n",(0,i.jsxs)(e.ol,{children:["\n",(0,i.jsx)(e.li,{children:"\ubc30\uc5f4\uc758 \uccab \uac12\uacfc \ub9c8\uc9c0\ub9c9 \uac12\uc744 \uad50\ud658\ud558\uace0 \ubc30\uc5f4\uc758 \ub9c8\uc9c0\ub9c9 \uc694\uc18c\ub97c \ubf51\uc544 \ubc18\ud658 \uac12\uc73c\ub85c \ud55c\ub2e4."}),"\n",(0,i.jsxs)(e.li,{children:["\uc0c8\ub85c\uc6b4 \ub8e8\ud2b8 \ub178\ub4dc\ub97c \uc790\uc2dd\uacfc \ube44\uad50\ud558\uc5ec \ubcf8\uc778\uc758 \uc704\uce58\uae4c\uc9c0 \ub04c\uc5b4\ub0b4\ub9b0\ub2e4.","\n",(0,i.jsxs)(e.ol,{children:["\n",(0,i.jsxs)(e.li,{children:["\uc67c\ucabd\uacfc \uc624\ub978\ucabd \uc790\uc2dd \uac12\uc744 \ucc3e\ub294\ub2e4. (",(0,i.jsx)(e.code,{children:"2n + 1"}),", ",(0,i.jsx)(e.code,{children:"2n + 2"}),")"]}),"\n",(0,i.jsx)(e.li,{children:"\ud604\uc7ac \ub178\ub4dc\ubcf4\ub2e4 \ud070 \uc790\uc2dd\uacfc \uc704\uce58\ub97c \ubc14\uafbc\ub2e4."}),"\n",(0,i.jsx)(e.li,{children:"\ub450 \uc790\uc2dd\uc774 \ubaa8\ub450 \ud06c\ub2e4\uba74 \ub354 \ud070 \uc790\uc2dd\ucabd\uc73c\ub85c \uc704\uce58\ub97c \ubc14\uafbc\ub2e4."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(e.h2,{id:"\ucd5c\uc18c\uc774\uc9c4\ud799",children:"\ucd5c\uc18c\uc774\uc9c4\ud799"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\ucd5c\ub300\uc774\uc9c4\ud799\uc758 \ucd94\uac00, \ucd94\ucd9c\uc758 \ubc18\ub300\ub85c \uc9c4\ud589 (\uc791\uc740\uac8c \ub8e8\ud2b8 \ucabd\uc73c\ub85c)"}),"\n"]}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(e.h2,{id:"\uc774\uc9c4\ud799\uc758-\uc2dc\uac04\ubcf5\uc7a1\ub3c4",children:"\uc774\uc9c4\ud799\uc758 \uc2dc\uac04\ubcf5\uc7a1\ub3c4"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\uc0bd\uc785: O(log N)"}),"\n",(0,i.jsx)(e.li,{children:"\uc0ad\uc81c: O(log N)"}),"\n",(0,i.jsx)(e.li,{children:"\uac80\uc0c9: O(N)"}),"\n"]}),"\n",(0,i.jsx)(e.hr,{}),"\n",(0,i.jsx)(e.h2,{id:"\uc6b0\uc120\uc21c\uc704-\ud050",children:"\uc6b0\uc120\uc21c\uc704 \ud050"}),"\n",(0,i.jsx)(e.p,{children:"\uac01 \uc694\uc18c\ub4e4\uc774 \uc6b0\uc120\uc21c\uc704\ub97c \uac00\uc9c0\ub294 \uc790\ub8cc\uad6c\uc870\uc774\ub2e4. \uc6b0\uc120\uc21c\uc704\uac00 \ub192\uc740 \uc694\uc18c\uac00 \uadf8\ub807\uc9c0 \uc54a\uc740 \uc694\uc18c\ubcf4\ub2e4 \uba3c\uc800 \uc704\uce58\ud55c\ub2e4.\n\ucd5c\ub300\uc774\uc9c4\ud799 \ub610\ub294 \ucd5c\uc18c\uc774\uc9c4\ud799\uc73c\ub85c \uad6c\ud604\ud55c\ub2e4."})]})}function o(n={}){const{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(a,{...n})}):a(n)}},1151:(n,e,l)=>{l.d(e,{Z:()=>d,a:()=>c});var i=l(7294);const r={},s=i.createContext(r);function c(n){const e=i.useContext(s);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:c(n.components),i.createElement(s.Provider,{value:e},n.children)}}}]);