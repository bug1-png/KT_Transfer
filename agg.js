const X=require('xlsx'),fs=require('fs');
const P=[['Space','TF_Space','Kave Town Space'],['Shift','TF_Shift','Kave Town Shift'],['Colony','TF_Colony','Kave Town Colony'],['Island','TF_ISLAND','Kave Town Island']];
const rows=[];
for(const [k,f] of P){
 const r=X.utils.sheet_to_json(X.readFile('D:/Users/pharanroj.s/Downloads/'+f+'.xlsx').Sheets['Sheet 1'],{defval:null});
 for(const x of r){ if(!x.TransferDate) continue;
  const d=new Date(x.TransferDate+'T00:00:00Z'); const b=x.BookDate?new Date(x.BookDate+'T00:00:00Z'):null;
  rows.push({p:k,d:x.TransferDate,y:d.getUTCFullYear(),m:d.getUTCMonth()+1,dom:d.getUTCDate(),wd:d.getUTCDay(),
   v:+x.TransferNetPrice||0,sp:+x.SellingPrice||0,pay:x.ExpectTransferBy==='สินเชื่อ'?'loan':x.ExpectTransferBy==='เงินสด'?'cash':'na',
   lead:b?Math.round((d-b)/864e5):null,pur:x['03:วัตถุประสงค์ในการซื้อ']||'-',bank:x.BankSelected_CS||x.LoanBankName_FINPlus||null,by:x.BookDate?+x.BookDate.slice(0,4):null,area:+x.Area||0});
 }}
fs.writeFileSync('rows.json',JSON.stringify(rows));
// quick insights
const g=(fn)=>{const m={};rows.forEach(r=>{const k=fn(r);m[k]=(m[k]||0)+1});return m};
console.log('total',rows.length);
console.log('moy',g(r=>r.m));
const first={};rows.forEach(r=>{const ym=r.y*12+r.m-1;if(!(r.p in first)||ym<first[r.p])first[r.p]=ym});
const rel={};rows.forEach(r=>{const k=r.p+':'+(r.y*12+r.m-1-first[r.p]);rel[k]=(rel[k]||0)+1});
console.log(rel);
const org=rows.filter(r=>(r.y*12+r.m-1-first[r.p])>=2);
console.log('organic moy',g.call(null,r=>r.m) && (()=>{const m={};org.forEach(r=>m[r.m]=(m[r.m]||0)+1);return m})());
console.log('dom bucket',(()=>{const m={};rows.forEach(r=>{const k=r.dom<=10?'1-10':r.dom<=20?'11-20':'21-31';m[k]=(m[k]||0)+1});return m})());
console.log('wd',g(r=>r.wd));
const lead=rows.filter(r=>r.lead!=null).map(r=>r.lead).sort((a,b)=>a-b);console.log('lead med',lead[lead.length>>1]);
console.log('pay by p',(()=>{const m={};rows.forEach(r=>{const k=r.p+r.pay;m[k]=(m[k]||0)+1});return m})());
console.log('value by p',(()=>{const m={};rows.forEach(r=>m[r.p]=(m[r.p]||0)+r.v);return m})());
