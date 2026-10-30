const X=require('xlsx');
for(const f of ['TF_Space','TF_Shift','TF_Colony','TF_ISLAND']){
 const r=X.utils.sheet_to_json(X.readFile('D:/Users/pharanroj.s/Downloads/'+f+'.xlsx').Sheets['Sheet 1'],{defval:null});
 const m={};r.forEach(x=>{const k=x.Build;(m[k]=m[k]||{})[x.TransferDate.slice(0,7)]=((m[k]||{})[x.TransferDate.slice(0,7)]||0)+1});
 console.log('==',f);for(const b of Object.keys(m).sort()){const e=Object.entries(m[b]).sort();console.log(b,e.reduce((s,a)=>s+a[1],0),'peak',e.sort((a,b)=>b[1]-a[1]).slice(0,3).map(a=>a.join(':')).join(' '))}
 // cash vs loan timing & avg price
 const lt=(k)=>{const a=r.filter(x=>x.ExpectTransferBy===k).map(x=>x.TransferDate);return a.length};
 const sell=r.reduce((s,x)=>s+ +x.SellingPrice,0)/r.length, net=r.reduce((s,x)=>s+ +x.TransferNetPrice,0)/r.length;
 console.log('avg sell',Math.round(sell),'avg net',Math.round(net),'free avg',Math.round(r.reduce((s,x)=>s+ +x.FreeAll,0)/r.length));
}
