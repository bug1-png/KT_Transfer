const X=require('xlsx');
const cnt=(a)=>{const m={};a.forEach(v=>m[v]=(m[v]||0)+1);return JSON.stringify(m).slice(0,600)};
for(const f of ['TF_Space','TF_Shift','TF_Colony','TF_ISLAND']){
 const wb=X.readFile('D:/Users/pharanroj.s/Downloads/'+f+'.xlsx');
 const r=X.utils.sheet_to_json(wb.Sheets['Sheet 1'],{defval:null});
 console.log('==',f,r.length);
 console.log('status',cnt(r.map(x=>x.UnitStatus)));
 console.log('TF notnull',r.filter(x=>x.TransferDate).length, 'sample type',typeof r[0].TransferDate);
 const t=r.filter(x=>x.TransferDate);
 console.log('TF by ym',cnt(t.map(x=>String(x.TransferDate).slice(0,7)).sort()));
 console.log('status of TF-null',cnt(r.filter(x=>!x.TransferDate).map(x=>x.UnitStatus)));
 console.log('type',cnt(r.map(x=>x.UnitType)));
 console.log('pay',cnt(r.map(x=>x.ExpectTransferBy)), cnt(r.map(x=>x.CustomerType)),cnt(r.map(x=>x.Nationality)));
 console.log('book yrs',cnt(r.map(x=>String(x.BookDate).slice(0,4))));
 console.log('proj',cnt(r.map(x=>x.ProjectName)), 'build',cnt(r.map(x=>x.Build)));
 console.log('purpose',cnt(r.map(x=>x['03:วัตถุประสงค์ในการซื้อ'])));
 console.log('formats',r.slice(0,3).map(x=>[x.BookDate,x.TransferDate]));
}
