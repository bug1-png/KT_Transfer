const fs=require('fs');const h=fs.readFileSync('KAVALON_Transfer_Trend_Dashboard.html','utf8');
const scripts=[...h.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const els={};const el=id=>els[id]||(els[id]={innerHTML:'',textContent:'',value:'1000',classList:{toggle(){}},dataset:{}});
global.document={getElementById:el,querySelectorAll:()=>[],documentElement:{}};
global.getComputedStyle=()=>({getPropertyValue:()=>'#123'});
let n=0;global.Chart=function(c,cfg){n++;cfg.data.datasets.forEach(d=>{if(d.data.some(v=>v!=null&&!isFinite(v)))console.log('BAD DATA',d.label)})};
Chart.register=()=>{};eval(scripts[1]);
console.log('charts',n);
for(const k of ['kpis','big','iTimeline','iHeat','iMoy','iLife','iDom','iPay','iLead','rec'])console.log(k,'::',(els[k].innerHTML||els[k].textContent).replace(/<[^>]+>/g,' ').slice(0,420));
