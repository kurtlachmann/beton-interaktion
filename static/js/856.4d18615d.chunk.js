"use strict";(self.webpackChunkbeton_interaktion=self.webpackChunkbeton_interaktion||[]).push([[856],{856:function(t,n,e){e.r(n),e.d(n,{default:function(){return d}});var a=e(885),o=e(762),r=e(496),i=e(184);function s(t,n){return{chart:{id:"mninteraktion",type:"line",animations:{enabled:!1},toolbar:{show:!1},zoom:{enabled:!1}},xaxis:{type:"numeric",min:t,max:n,tickAmount:14,decimalsInFloat:0,title:{text:"Biegemoment M-Rd in [kNm]"}},yaxis:{tickAmount:8,decimalsInFloat:0,title:{text:"Normalkraft N-Rd in [kN]"}},stroke:{lineCap:"round"},annotations:{yaxis:[{y:0,strokeDashArray:0,borderColor:"#888",borderWidth:1,opacity:1}],xaxis:[{x:0,strokeDashArray:0,borderColor:"#888",borderWidth:1,opacity:1}]},tooltip:{intersect:!0,shared:!1},legend:{position:"top"},markers:{},grid:{xaxis:{lines:{show:!0}},yaxis:{lines:{show:!0}}}}}function d(t){var n=function(t){return[{name:"M-N-Interaktion",data:t.data},{name:"Ed",data:[t.Ed]},{name:"Rd",data:[t.Rd]}]}(t),e=function(t){var n,e=1/0,r=1/0,i=-1/0,s=-1/0,d=(0,o.Z)(t[0].data);try{for(d.s();!(n=d.n()).done;){var l=(0,a.Z)(n.value,2),u=l[0],c=l[1];u>i&&(i=u),c>s&&(s=c),u<e&&(e=u),c<r&&(r=c)}}catch(m){d.e(m)}finally{d.f()}return[500*Math.floor(e/500)-500,500*Math.floor(i/500)+500]}(n),d=(0,a.Z)(e,2),l=d[0],u=d[1];return(0,i.jsx)(r.Z,{options:s(l,u),series:n,type:"line"})}}}]);
//# sourceMappingURL=856.4d18615d.chunk.js.map