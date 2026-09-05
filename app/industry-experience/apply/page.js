'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { EXPERIENCE_PACKAGES, EXPERIENCE_TRACKS, VISA_OPTIONS } from '@/lib/industryExperience'

export default function ApplyPage() {
  const initialTrack = ''
  const initialPackage = 'professional-3m'
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', mobile:'', city:'', linkedin:'', institution:'', qualification:'', studyArea:'', graduationDate:'', visaType:'', visaExpiry:'', visaWorkEligibility:'', targetRole:'', track:initialTrack, packageCode:initialPackage, availability:'', hoursPerWeek:'', notes:'', ndaAccepted:false, termsAccepted:false, privacyAccepted:false, visaDeclarationAccepted:false })
  const selectedPackage = useMemo(() => EXPERIENCE_PACKAGES.find(p => p.code === form.packageCode), [form.packageCode])
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const track = params.get('track')
    const packageCode = params.get('package')
    setForm(prev => ({ ...prev, track: track || prev.track, packageCode: packageCode || prev.packageCode }))
  }, [])
  const set = (name, value) => setForm(prev => ({ ...prev, [name]: value }))

  async function submit(e) {
    e.preventDefault(); setStatus('loading'); setMessage('')
    try {
      const res = await fetch('/api/industry-experience/apply', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to submit application.')

      setMessage(`Application received. Your reference is ${data.reference}. Opening secure payment…`)
      const checkoutRes = await fetch('/api/industry-experience/checkout', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ reference:data.reference })
      })
      const checkoutData = await checkoutRes.json()
      if (!checkoutRes.ok || !checkoutData.url) throw new Error(checkoutData.error || `Application ${data.reference} was submitted, but payment could not be opened. Please contact info@webfitt.co.nz.`)
      window.location.href = checkoutData.url
    } catch (err) { setStatus('error'); setMessage(err.message) }
  }

  return <main className="min-h-screen bg-mesh px-4 pb-20 pt-24 sm:px-6"><form onSubmit={submit} className="glass-card mx-auto max-w-4xl rounded-3xl p-6 sm:p-9"><Link href="/industry-experience" className="text-sm font-bold text-violet-700">← Industry Experience</Link><h1 className="mt-6 text-4xl font-black">Apply for the Webfit Industry Experience Programme</h1><p className="mt-3 text-slate-600">No account or password is required. Please provide accurate details so Webfit can review your application.</p>
    <Section title="Your details"><Grid><Field label="First name"><input required value={form.firstName} onChange={e=>set('firstName',e.target.value)} className="input"/></Field><Field label="Last name"><input required value={form.lastName} onChange={e=>set('lastName',e.target.value)} className="input"/></Field><Field label="Email"><input required type="email" value={form.email} onChange={e=>set('email',e.target.value)} className="input"/></Field><Field label="Mobile"><input required value={form.mobile} onChange={e=>set('mobile',e.target.value)} className="input"/></Field><Field label="Current city in New Zealand"><input required value={form.city} onChange={e=>set('city',e.target.value)} className="input"/></Field><Field label="LinkedIn URL (optional)"><input value={form.linkedin} onChange={e=>set('linkedin',e.target.value)} className="input"/></Field></Grid></Section>
    <Section title="Study and career"><Grid><Field label="Institution / university"><input value={form.institution} onChange={e=>set('institution',e.target.value)} className="input"/></Field><Field label="Qualification"><input value={form.qualification} onChange={e=>set('qualification',e.target.value)} className="input"/></Field><Field label="Area of study"><input value={form.studyArea} onChange={e=>set('studyArea',e.target.value)} className="input"/></Field><Field label="Expected / completed graduation date"><input type="date" value={form.graduationDate} onChange={e=>set('graduationDate',e.target.value)} className="input"/></Field><Field label="Role you are targeting in New Zealand" wide><input required value={form.targetRole} onChange={e=>set('targetRole',e.target.value)} className="input"/></Field></Grid></Section>
    <Section title="Immigration status"><Grid><Field label="Visa / status"><select required value={form.visaType} onChange={e=>set('visaType',e.target.value)} className="input"><option value="">Select</option>{VISA_OPTIONS.map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Visa expiry date (if applicable)"><input type="date" value={form.visaExpiry} onChange={e=>set('visaExpiry',e.target.value)} className="input"/></Field><Field label="Do your current conditions permit the activities required by this programme?" wide><select required value={form.visaWorkEligibility} onChange={e=>set('visaWorkEligibility',e.target.value)} className="input"><option value="">Select</option><option>Yes</option><option>No</option><option>Unsure</option></select></Field></Grid></Section>
    <Section title="Experience selection"><Grid><Field label="Experience track"><select required value={form.track} onChange={e=>set('track',e.target.value)} className="input"><option value="">Select a track</option>{EXPERIENCE_TRACKS.map(t=><option key={t.slug} value={t.slug}>{t.title}</option>)}</select></Field><Field label="Programme"><select required value={form.packageCode} onChange={e=>set('packageCode',e.target.value)} className="input">{EXPERIENCE_PACKAGES.map(p=><option key={p.code} value={p.code}>{p.name} · {p.months} month{p.months>1?'s':''} · NZ${p.price}</option>)}</select></Field><Field label="Availability"><select required value={form.availability} onChange={e=>set('availability',e.target.value)} className="input"><option value="">Select</option><option>Weekdays during business hours</option><option>Weekday evenings</option><option>Weekends</option><option>Flexible</option></select></Field><Field label="Hours available per week"><input required type="number" min="1" max="40" value={form.hoursPerWeek} onChange={e=>set('hoursPerWeek',e.target.value)} className="input"/></Field><Field label="Anything we should know?" wide><textarea value={form.notes} onChange={e=>set('notes',e.target.value)} className="input min-h-28"/></Field></Grid></Section>
    <Section title="Required declarations"><Checks form={form} set={set}/></Section>
    <div className="rounded-2xl bg-slate-50 p-5 text-sm text-slate-600">Selected programme fee: <strong className="text-slate-950">NZ${selectedPackage?.price || '-'}</strong>. After you submit the application, you will be taken directly to secure Stripe payment.</div>
    {message && <p className="mt-5 rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">{message}</p>}
    <button disabled={status==='loading'} className="btn-holo mt-6 w-full rounded-2xl px-6 py-4 font-bold disabled:opacity-60">{status==='loading'?'Submitting & opening payment…':'Submit application & pay'}</button>
    <p className="mt-4 text-center text-sm text-slate-500">Questions? info@webfitt.co.nz · 022 605 9422</p>
  </form><style jsx>{`.input{width:100%;border:1px solid #dbe2ea;border-radius:14px;background:white;padding:12px 14px;outline:none}.input:focus{border-color:#8b5cf6;box-shadow:0 0 0 3px rgba(139,92,246,.12)}`}</style></main>
}

function Section({title,children}){return <section className="mt-9 border-t border-slate-200 pt-7"><h2 className="text-xl font-black">{title}</h2><div className="mt-5">{children}</div></section>}
function Grid({children}){return <div className="grid gap-5 md:grid-cols-2">{children}</div>}
function Field({label,children,wide}){return <label className={wide?'md:col-span-2':''}><span className="mb-2 block text-sm font-semibold">{label}</span>{children}</label>}
function Checks({form,set}){const items=[['ndaAccepted',<>I have read and accept the <Link className="font-bold text-violet-700 underline" href="/industry-experience/nda" target="_blank">NDA and confidentiality terms</Link>.</>],['termsAccepted',<>I have read and accept the <Link className="font-bold text-violet-700 underline" href="/industry-experience/terms" target="_blank">programme terms and refund policy</Link>.</>],['privacyAccepted','I consent to Webfit storing and using the information provided to assess and administer my application.'],['visaDeclarationAccepted','I confirm my immigration information is accurate and I am responsible for complying with my New Zealand visa conditions.']];return <div className="space-y-4">{items.map(([key,label])=><label key={key} className="flex gap-3 text-sm leading-6"><input required type="checkbox" checked={form[key]} onChange={e=>set(key,e.target.checked)} className="mt-1 h-4 w-4"/><span>{label}</span></label>)}</div>}
