const X=require('xlsx');
const cnt=a=>{const m={};a.forEach(v=>m[v]=(m[v]||0)+1);return Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,8).map(e=>e.join(':')).join(' ')};
const med=a=>{a=a.filter(x=>x!=null&&isFinite(x)).sort((x,y)=>x-y);return a[a.length>>1]};
const dd=(a,b)=>a&&b?Math.round((new Date(b)-new Date(a))/864e5):null;
for(const f of ['TF_Space','TF_Shift','TF_Colony','TF_ISLAND']){
 const r=X.utils.sheet_to_json(X.readFile('D:/Users/pharanroj.s/Downloads/'+f+'.xlsx').Sheets['Sheet 1'],{defval:null});
 console.log('==',f);
 console.log('bank',cnt(r.filter(x=>x.ExpectTransferBy==='สินเชื่อ').map(x=>x.BankSelected_CS)));
 console.log('QC6->TF',med(r.map(x=>dd(x.QC6_Date,x.TransferDate))),'Appoint->TF',med(r.map(x=>dd(x.Appoint_Date,x.TransferDate))),'QC5->TF',med(r.map(x=>dd(x.QC5_FinishDate,x.TransferDate))),'Contract->TF',med(r.map(x=>dd(x.ContractDate,x.TransferDate))),'neg QC6',r.filter(x=>dd(x.QC6_Date,x.TransferDate)<0).length);
 const p=r.map(x=>+x.TransferNetPrice/1e6);console.log('price min/med/max',Math.min(...p).toFixed(2),med(p).toFixed(2),Math.max(...p).toFixed(2));
 console.log('QC6 null',r.filter(x=>!x.QC6_Date).length,'ContractDate null',r.filter(x=>!x.ContractDate).length);
 console.log('type top',cnt(r.map(x=>x.UnitType)));
}
