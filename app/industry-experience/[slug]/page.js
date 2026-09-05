import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { EXPERIENCE_TRACKS, getTrack } from '@/lib/industryExperience'

export function generateStaticParams() {
  return EXPERIENCE_TRACKS.map(({ slug }) => ({ slug }))
}

export function generateMetadata({ params }) {
  const track = getTrack(params.slug)
  return track ? { title: `${track.title} Industry Experience | Webfit Solution Limited`, description: track.summary } : {}
}

export default function TrackPage({ params }) {
  const track = getTrack(params.slug)
  if (!track) notFound()
  return <main className="min-h-screen bg-mesh px-4 pb-20 pt-24 sm:px-6 lg:px-8"><div className="mx-auto max-w-5xl"><Link href="/industry-experience" className="text-sm font-bold text-violet-700">← All experience tracks</Link><div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_.8fr]"><section><span className="glass-pill inline-flex rounded-full px-4 py-2 text-sm font-semibold">Webfit Industry Experience Programme</span><h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl">{track.title}</h1><p className="mt-6 text-lg leading-8 text-slate-700">{track.summary}</p><h2 className="mt-10 text-2xl font-black">What you can work on</h2><div className="mt-5 space-y-3">{track.skills.map(skill => <div key={skill} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600"/><span>{skill}</span></div>)}</div><div className="mt-10 rounded-3xl border border-slate-200 bg-white/80 p-6"><h3 className="font-bold">How the experience works</h3><p className="mt-2 text-sm leading-6 text-slate-600">Assignments vary according to current Webfit projects, participant capability, confidentiality requirements and supervision availability. Participants are expected to meet agreed deadlines, follow Webfit processes and comply with the NDA and information-security requirements.</p></div></section><aside className="glass-card h-fit rounded-3xl p-7 lg:sticky lg:top-24"><h2 className="text-2xl font-black">Choose your duration</h2><div className="mt-5 space-y-4">{[['1 month','NZ$399','foundation-1m'],['3 months','NZ$799','professional-3m'],['6 months','NZ$1,299','advanced-6m']].map(([duration, price, code]) => <Link key={code} href={`/industry-experience/apply?track=${track.slug}&package=${code}`} className="group block rounded-2xl border border-slate-200 bg-white p-5 hover:border-violet-300"><div className="flex items-center justify-between"><div><div className="font-bold">{duration}</div><div className="mt-1 text-2xl font-black">{price}</div></div><ArrowRight className="h-5 w-5 transition group-hover:translate-x-1"/></div></Link>)}</div><p className="mt-5 text-xs leading-5 text-slate-500">Application is reviewed before programme participation is confirmed. Participants must be based in New Zealand and provide accurate immigration-status information.</p></aside></div></div></main>
}
