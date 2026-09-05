import Link from 'next/link'
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Clock3, MapPin, ShieldCheck } from 'lucide-react'
import { EXPERIENCE_PACKAGES, EXPERIENCE_TRACKS } from '@/lib/industryExperience'

export default function IndustryExperiencePage() {
  return (
    <main className="min-h-screen bg-mesh text-slate-950">
      <section className="relative overflow-hidden border-b border-white/70 px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="relative mx-auto max-w-6xl">
          <Link href="/" className="text-sm font-semibold text-violet-700">← Webfit Solution Limited</Link>
          <div className="mt-10 max-w-4xl">
            <span className="glass-pill inline-flex rounded-full px-4 py-2 text-sm font-semibold">Practical NZ industry exposure</span>
            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl">Build practical experience for the role you want next.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">Choose a role-specific experience track and work through supervised practical assignments and project activities with a New Zealand software and digital business.</p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-700">
              <span className="glass-pill rounded-full px-4 py-2"><MapPin className="mr-2 inline h-4 w-4" />New Zealand based participants</span>
              <span className="glass-pill rounded-full px-4 py-2"><Clock3 className="mr-2 inline h-4 w-4" />Mostly remote</span>
              <span className="glass-pill rounded-full px-4 py-2"><ShieldCheck className="mr-2 inline h-4 w-4" />NDA required</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-700">Choose your track</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">13 practical experience tracks</h2>
            <p className="mt-4 text-slate-600">Select the area that best matches the type of role you are targeting in New Zealand.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {EXPERIENCE_TRACKS.map((track, index) => (
              <Link key={track.slug} href={`/industry-experience/${track.slug}`} className="glass-card holo-border group rounded-3xl p-6 transition hover:-translate-y-1">
                <div className="flex items-center justify-between"><span className="text-sm font-bold text-violet-600">{String(index + 1).padStart(2, '0')}</span><ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" /></div>
                <h3 className="mt-5 text-xl font-bold">{track.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{track.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-700">Programme options</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">Choose the duration that suits you</h2></div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {EXPERIENCE_PACKAGES.map((pkg) => (
              <div key={pkg.code} className={`rounded-3xl border p-7 ${pkg.popular ? 'border-violet-400 bg-white shadow-xl shadow-violet-100' : 'border-slate-200 bg-white/80'}`}>
                {pkg.popular && <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">MOST POPULAR</span>}
                <h3 className="mt-4 text-2xl font-black">{pkg.name}</h3>
                <p className="mt-2 text-slate-600">{pkg.months} month{pkg.months > 1 ? 's' : ''} · {pkg.hours}</p>
                <div className="mt-6 text-4xl font-black">NZ${pkg.price}</div>
                <p className="mt-4 text-sm leading-6 text-slate-600">{pkg.description}</p>
                <Link href={`/industry-experience/apply?package=${pkg.code}`} className="btn-holo mt-7 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 font-bold">Apply now <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-700">Included support</p><h2 className="mt-3 text-3xl font-black">More than project tasks</h2><p className="mt-4 leading-7 text-slate-600">Alongside your selected track, Webfit can provide practical guidance around professional communication, CV and LinkedIn presentation, interviews, workplace expectations and navigating the NZ job market.</p></div><div className="glass-card rounded-3xl p-7">{['Role-specific practical assignments and project exposure','Supervision, feedback and progress review','NZ workplace and corporate communication guidance','CV, LinkedIn and interview support','Completion record and reference verification where applicable'].map(item => <div key={item} className="flex gap-3 py-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"/><span>{item}</span></div>)}</div></div></section>

      <section className="bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8"><div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between"><div><div className="flex items-center gap-2 text-violet-300"><BriefcaseBusiness className="h-5 w-5"/><span className="font-semibold">Webfit Solution Limited</span></div><h2 className="mt-3 text-3xl font-black">Ready to apply?</h2><p className="mt-2 text-slate-300">info@webfitt.co.nz · 022 605 9422</p></div><Link href="/industry-experience/apply" className="rounded-2xl bg-white px-6 py-3 text-center font-bold text-slate-950">Start application</Link></div></section>
    </main>
  )
}
