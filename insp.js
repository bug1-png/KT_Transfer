const X=require('xlsx');
for(const f of ['TF_Colony','TF_Shift','TF_Space','TF_ISLAND']){
 const wb=X.readFile('D:/Users/pharanroj.s/Downloads/'+f+'.xlsx',{cellDates:true});
 console.log('==',f,wb.SheetNames);
 for(const s of wb.SheetNames){const r=X.utils.sheet_to_json(wb.Sheets[s],{header:1,raw:true});
  console.log(s,r.length,'cols',r[0]&&r[0].length);
  r.slice(0,3).forEach(x=>console.log(JSON.stringify(x).slice(0,1800)));
  console.log('AJ col idx35 sample:',r.slice(0,6).map(x=>x[35]));
 }}
