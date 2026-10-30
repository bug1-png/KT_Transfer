const X=require('xlsx');
const P=[['Space','TF_Space'],['Shift','TF_Shift'],['Colony','TF_Colony'],['Island','TF_ISLAND']];
let all=0,allv=0;
for(const [k,f] of P){
 const wb=X.readFile('D:/Users/pharanroj.s/Downloads/'+f+'.xlsx');const r=X.utils.sheet_to_json(wb.Sheets['Sheet 1'],{defval:null});
 const hdr=X.utils.sheet_to_json(wb.Sheets['Sheet 1'],{header:1})[0];
 const codes=r.map(x=>x.UnitCode+'|'+x.Build);const dup=codes.length-new Set(codes).size;
 const ct=r.map(x=>x.ContractNumber);const dupc=ct.length-new Set(ct).size;
 const v=r.reduce((s,x)=>s+(+x.TransferNetPrice||0),0);
 const zero=r.filter(x=>!(+x.TransferNetPrice>0)).length;
 const bad=r.filter(x=>!/^\d{4}-\d\d-\d\d$/.test(x.TransferDate)).length;
 const neg=r.filter(x=>x.BookDate&&x.TransferDate<x.BookDate).length;
 const nobook=r.filter(x=>!x.BookDate).length;
 const sp=r.reduce((s,x)=>s+(+x.SellingPrice||0),0);
 const dts=r.map(x=>x.TransferDate).sort();
 const ym=r.filter(x=>x.TransferDate>='2025').length;
 console.log(k,'col AJ header=',hdr[35],'rows',r.length,'dupUnit',dup,'dupContract',dupc,'netPrice',Math.round(v/1e6),'M sell',Math.round(sp/1e6),'M zeroPrice',zero,'badDate',bad,'tf<book',neg,'noBook',nobook,'range',dts[0],dts[dts.length-1]);
 // outlier months
 const m={};r.forEach(x=>{const k=x.TransferDate.slice(0,7);m[k]=(m[k]||0)+1});
 console.log('  UnitStatus other',r.filter(x=>x.UnitStatus!=='โอน').length,' ProjectIDs',[...new Set(r.map(x=>x.ProjectID))].join(','),'Island units types uniq',new Set(r.map(x=>x.UnitType)).size);
 all+=r.length;allv+=v;
}
console.log('TOTAL',all,Math.round(allv/1e6));
// discount/free
