const X=require('xlsx'),fs=require('fs');
const FILES=['TF_Space','TF_Shift','TF_Colony','TF_ISLAND'];
const out=[];
FILES.forEach((f,pi)=>{
 const r=X.utils.sheet_to_json(X.readFile('D:/Users/pharanroj.s/Downloads/'+f+'.xlsx').Sheets['Sheet 1'],{defval:null});
 for(const x of r){ if(!x.TransferDate)continue;
  const d=new Date(x.TransferDate+'T00:00:00Z');const b=x.BookDate?new Date(x.BookDate+'T00:00:00Z'):null;
  const pur=['อยู่เอง','ปล่อยเช่า','ขายต่อ'].includes(x['03:วัตถุประสงค์ในการซื้อ'])?x['03:วัตถุประสงค์ในการซื้อ']:'ไม่ระบุ';
  const pay=x.ExpectTransferBy==='สินเชื่อ'?'l':x.ExpectTransferBy==='เงินสด'?'c':'n';
  const bank=(pay==='l'&&x.BankSelected_CS&&/^[A-Z]{2,4}$/.test(x.BankSelected_CS))?x.BankSelected_CS:null;
  out.push([pi,d.getUTCFullYear(),d.getUTCMonth()+1,d.getUTCDate(),d.getUTCDay(),Math.round((+x.TransferNetPrice||0)/1000),pay,
   b?Math.round((d-b)/864e5):null,pur,b?b.getUTCFullYear():null,x.Build,b?b.getUTCFullYear()*12+b.getUTCMonth():null,bank,x.TransferDate]);
 }});
const last=out.map(r=>r[13]).sort().pop();
let h=fs.readFileSync('tpl.html','utf8');
h=h.replace('__CHART__',()=>fs.readFileSync('node_modules/chart.js/dist/chart.umd.js','utf8')).replace('__DATA__',()=>JSON.stringify(out)).split('__LAST__').join(last);
fs.writeFileSync('KAVALON_Transfer_Trend_Dashboard.html',h);console.log(h.length,last,out.length);
