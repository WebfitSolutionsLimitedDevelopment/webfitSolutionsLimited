import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { randomUUID, createHash } from 'crypto';
import { COMPANY, NDA_VERSION, agreementText } from '@/lib/nda-agreement';
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
    if(name.length<3 || !validEmail.test(email) || !categories.includes(category) || payload.accepted!==true || payload.website) {
      return NextResponse.json({error:'Please provide valid details and accept the agreement.'},{status:400});
    }
    const mongoUri=process.env.MONGODB_URI, resendKey=process.env.RESEND_API_KEY;
    const sender=process.env.NDA_FROM_EMAIL || 'Webfit Solutions <info@webfitt.co.nz>';
    const admin=process.env.NDA_NOTIFY_EMAIL || 'info@webfitt.co.nz';
    if(!mongoUri || !resendKey) return NextResponse.json({error:'Agreement service is not configured. Please contact us.'},{status:503});
    const now=new Date(), id=randomUUID();
    const nzDate=new Intl.DateTimeFormat('en-NZ',{timeZone:'Pacific/Auckland',day:'2-digit',month:'long',year:'numeric'}).format(now);
    const document=[agreementText(),'','SIGNED ACCEPTANCE','Reference: '+id,'Agreement version: '+NDA_VERSION,'Engagement: '+category,'Full legal name: '+name,'Email: '+email,'Organisation: '+(organisation||'Not supplied'),'Date (New Zealand): '+nzDate,'UTC timestamp: '+now.toISOString(),'Electronic acceptance: I have read and agree to the terms.','Company: '+COMPANY].join('\n');
    const pdf=signedAgreementPdf(document);
    const record={_id:id,name,email,organisation,category,version:NDA_VERSION,acceptedAt:now,nzDate,documentSha256:createHash('sha256').update(pdf).digest('hex'),pdf:pdf.toString('base64'),notificationStatus:'pending'};
    const client=new MongoClient(mongoUri,{serverSelectionTimeoutMS:5000});
    try{await client.connect();await client.db().collection('nda_signatures').insertOne(record);}
    finally{await client.close();}
    const attachment={filename:'webfit-signed-agreement-'+id+'.pdf',content:pdf.toString('base64')};
    const headers={Authorization:'Bearer '+resendKey,'Content-Type':'application/json'};
    const send=async(to,subject,html)=>{const response=await fetch('https://api.resend.com/emails',{method:'POST',headers,body:JSON.stringify({from:sender,to:[to],subject,html,attachments:[attachment]})});if(!response.ok)throw Error('Email provider returned '+response.status);};
    const safe=(v)=>v.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const results=await Promise.allSettled([
      send(email,'Your signed Webfit Solutions agreement','<p>Hi '+safe(name)+',</p><p>Thank you for signing. Your signed agreement is attached.</p><p>Reference: '+id+'</p><p>Webfit Solutions Limited</p>'),
      send(admin,'NDA signed: '+safe(name),'<p>A new agreement has been signed.</p><p>Name: '+safe(name)+'<br>Email: '+safe(email)+'<br>Organisation: '+safe(organisation)+'<br>Engagement: '+safe(category)+'<br>Date: '+nzDate+'<br>Reference: '+id+'</p>')
    ]);
    try{const c=new MongoClient(mongoUri);await c.connect();await c.db().collection('nda_signatures').updateOne({_id:id},{$set:{notificationStatus:results.every(r=>r.status==='fulfilled')?'sent':'partial_or_failed'}});await c.close();}catch{}
    return NextResponse.json({success:true,reference:id,pdfBase64:pdf.toString('base64'),emailStatus:results.every(r=>r.status==='fulfilled')?'sent':'delayed'});
  } catch(error){console.error('NDA signing failed',error);return NextResponse.json({error:'Unable to complete signing. Please try again.'},{status:500});}
}
