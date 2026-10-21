import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { COMPANY, NDA_VERSION, clauses } from '@/lib/nda-agreement';
import { signedAgreementPdf } from '@/lib/nda-pdf';
export const runtime = 'nodejs';
const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const categories = ['Media interview / podcast','Event coverage / media','Video editing / contractor','Website / software project','Business / other engagement'];
export async function POST(request) {
  try {
    const payload = await request.json();
    const name = String(payload.name || '').trim().slice(0,150);
    const email = String(payload.email || '').trim().toLowerCase().slice(0,254);
    const organisation = String(payload.organisation || '').trim().slice(0,180);
    const category = String(payload.category || '');
    if(name.length<3 || organisation.length<2 || !validEmail.test(email) || !categories.includes(category) || payload.accepted!==true || payload.privacyAccepted!==true || payload.website) {
      return NextResponse.json({error:'Please provide valid details and accept the agreement and Privacy Policy.'},{status:400});
    }
    const resendKey=process.env.RESEND_API_KEY;
    const sender=process.env.NDA_FROM_EMAIL || 'Webfit Solutions Limited <info@webfitt.co.nz>';
    const admin=process.env.NDA_NOTIFY_EMAIL || 'info@webfitt.co.nz';
    if(!resendKey) return NextResponse.json({error:'Agreement service is not configured. Please contact us.'},{status:503});
    const now=new Date(), id=randomUUID();
    const nzDate=new Intl.DateTimeFormat('en-NZ',{timeZone:'Pacific/Auckland',day:'2-digit',month:'long',year:'numeric'}).format(now);
    const pdf=await signedAgreementPdf({clauses,name,email,organisation,category,id,nzDate,utc:now.toISOString(),version:NDA_VERSION});
    const attachment={filename:'webfit-signed-agreement-'+id+'.pdf',content:pdf.toString('base64')};
    const headers={Authorization:'Bearer '+resendKey,'Content-Type':'application/json'};
    const send=async(to,subject,html)=>{const response=await fetch('https://api.resend.com/emails',{method:'POST',headers,body:JSON.stringify({from:sender,to:[to],subject,html,attachments:[attachment]})});if(!response.ok)throw Error('Email provider returned '+response.status);};
    const safe=(v)=>v.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const results=await Promise.allSettled([
      send(email,'Your signed Webfit Solutions Limited agreement','<p>Hi '+safe(name)+',</p><p>Thank you for signing. Your signed agreement is attached.</p><p>Reference: '+id+'</p><p>Webfit Solutions Limited</p>'),
      send(admin,'NDA signed: '+safe(name),'<p>A new agreement has been signed.</p><p>Name: '+safe(name)+'<br>Email: '+safe(email)+'<br>Organisation / Individual: '+safe(organisation)+'<br>Engagement: '+safe(category)+'<br>Date: '+nzDate+'<br>Privacy Policy accepted: Yes<br>Reference: '+id+'</p>')
    ]);
    if(results.some(r=>r.status==='rejected')) { console.error('NDA email delivery incomplete',results.map(r=>r.status)); return NextResponse.json({success:true,reference:id,pdfBase64:pdf.toString('base64'),emailStatus:'delayed'}); }
    return NextResponse.json({success:true,reference:id,pdfBase64:pdf.toString('base64'),emailStatus:'sent'});
  } catch(error){console.error('NDA signing failed',error);return NextResponse.json({error:'Unable to complete signing. Please try again.'},{status:500});}
}
