'use client';
import { useState } from 'react';
import { clauses, COMPANY, NDA_VERSION } from '@/lib/nda-agreement';
const categories=['Media interview / podcast','Event coverage / media','Video editing / contractor','Website / software project','Business / other engagement'];
export default function NdaPage(){
 const [form,setForm]=useState({name:'',email:'',organisation:'',category:categories[0],accepted:false,website:''});
 const [status,setStatus]=useState('idle'),[error,setError]=useState(''),[result,setResult]=useState(null);
 const set=(key,value)=>setForm(f=>({...f,[key]:value}));
 const today=new Intl.DateTimeFormat('en-NZ',{timeZone:'Pacific/Auckland',day:'2-digit',month:'long',year:'numeric'}).format(new Date());
 async function submit(e){
  e.preventDefault();setStatus('sending');setError('');
  try{const response=await fetch('/api/nda/sign',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
   const data=await response.json();if(!response.ok)throw Error(data.error||'Unable to sign');
   setResult(data);setStatus('done');
  }catch(e){setError(e.message);setStatus('idle');}
 }
 function download(){
  if(!result?.pdfBase64)return;
  const bytes=Uint8Array.from(atob(result.pdfBase64),c=>c.charCodeAt(0));
  const url=URL.createObjectURL(new Blob([bytes],{type:'application/pdf'}));
  const a=document.createElement('a');a.href=url;a.download='webfit-signed-agreement-'+result.reference+'.pdf';a.click();setTimeout(()=>URL.revokeObjectURL(url),3000);
 }
 return <main className="min-h-screen bg-slate-50 text-slate-900">
  <header className="bg-slate-950 text-white"><div className="max-w-4xl mx-auto px-5 py-6 flex items-center justify-between gap-4"><a href="/" className="font-bold text-lg">WEBFIT <span className="text-sky-400">SOLUTIONS</span></a><span className="text-xs text-slate-300">Secure agreement signing</span></div></header>
  <div className="max-w-4xl mx-auto px-5 py-10">
   <div className="mb-8"><p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Electronic agreement</p><h1 className="text-3xl md:text-4xl font-bold mt-2">Confidentiality, Media Consent & Engagement Agreement</h1><p className="text-slate-600 mt-3">Please read the terms before signing. Your signed copy will be emailed to you.</p></div>
   <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm mb-7"><div className="flex flex-wrap justify-between gap-2 border-b pb-4 mb-6 text-sm"><strong>{COMPANY}</strong><span className="text-slate-500">Version {NDA_VERSION}</span></div>
    <div className="space-y-6">{clauses.map(([heading,body])=><section key={heading}><h2 className="font-semibold text-base mb-2">{heading}</h2><p className="text-sm text-slate-700 leading-7">{body}</p></section>)}</div>
   </div>
   {status==='done'?<div className="bg-white rounded-2xl border p-8" role="status"><h2 className="text-2xl font-bold text-emerald-700">Agreement signed</h2><p className="mt-3">Reference: <span className="break-all">{result.reference}</span></p><p className="mt-2">{result.emailStatus==='sent'?'A copy has been emailed to you and Webfit Solutions Limited.':'Your signed copy is ready below. Email delivery is delayed; please download and keep your copy.'}</p><button onClick={download} className="mt-6 rounded-lg bg-blue-700 text-white px-6 py-3 font-semibold">Download signed PDF</button></div>:
   <form onSubmit={submit} className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-5">
    <h2 className="text-2xl font-bold">Sign this agreement</h2>
    <label className="block text-sm font-semibold">Engagement type<select required value={form.category} onChange={e=>set('category',e.target.value)} className="mt-2 block w-full rounded-lg border p-3 bg-white">{categories.map(c=><option key={c}>{c}</option>)}</select></label>
    <label className="block text-sm font-semibold">Full legal name *<input required minLength={3} maxLength={150} autoComplete="name" value={form.name} onChange={e=>set('name',e.target.value)} className="mt-2 block w-full rounded-lg border p-3 font-normal" placeholder="Your full legal name"/></label>
    <label className="block text-sm font-semibold">Email address *<input required type="email" maxLength={254} autoComplete="email" value={form.email} onChange={e=>set('email',e.target.value)} className="mt-2 block w-full rounded-lg border p-3 font-normal" placeholder="name@example.com"/></label>
    <label className="block text-sm font-semibold">Organisation (optional)<input maxLength={180} value={form.organisation} onChange={e=>set('organisation',e.target.value)} className="mt-2 block w-full rounded-lg border p-3 font-normal" placeholder="Business or organisation name"/></label>
    <div className="hidden" aria-hidden="true"><input tabIndex={-1} value={form.website} onChange={e=>set('website',e.target.value)} autoComplete="off"/></div>
    <div className="rounded-lg bg-slate-50 p-4 text-sm"><span className="font-semibold">Date (New Zealand): </span>{today}<p className="text-slate-500 mt-1">The official date and timestamp are recorded when you submit.</p></div>
    <label className="flex items-start gap-3 text-sm leading-6"><input type="checkbox" required checked={form.accepted} onChange={e=>set('accepted',e.target.checked)} className="mt-1 h-5 w-5"/><span>I have read and agree to this agreement. I intend to sign electronically and confirm I am authorised to sign for any organisation identified above.</span></label>
    {error&&<p role="alert" className="text-red-700 text-sm">{error}</p>}
    <button type="submit" disabled={status==='sending'||!form.accepted} className="w-full rounded-lg bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white py-4 font-semibold">{status==='sending'?'Submitting securely...':'Accept & Sign Agreement'}</button>
    <p className="text-xs text-slate-500">Your signing details are used to evidence and administer this agreement. For questions, contact info@webfitt.co.nz.</p>
   </form>}
  </div>
 </main>
}
