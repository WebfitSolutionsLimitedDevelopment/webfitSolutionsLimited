'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { toast, Toaster } from 'sonner'
import {
  Code2, Smartphone, Cloud, ShoppingCart, Layout, LineChart, ArrowRight, Phone, Mail, MapPin,
  CheckCircle2, Sparkles, Users, Shield, Rocket, Lightbulb, Handshake, Menu,
  Globe, Zap, Heart, Quote, Star, ChevronDown, Calendar, Clock, ArrowUpRight,
  Circle, MoveUpRight,
} from 'lucide-react'

/* ============================================================================
   SITE CONFIG — EDIT THIS BLOCK TO UPDATE WEBSITE CONTENT
   ============================================================================ */

const SITE = {
  company: 'Webfit Solutions Limited',
  shortName: 'Webfit Solutions',
  tagline: 'Software & Digital Solutions',
  logoUrl: 'https://customer-assets.emergentagent.com/job_9e1be266-7281-40e0-9ad8-d984708adecf/artifacts/gxak5mjz_webfit%20Solutions%20Limited%20New%20Logo.png',
  website: 'webfitt.com',
  websiteUrl: 'https://webfitt.com',
  address: 'Sandringham Road, Auckland, New Zealand',
  phone: '022 605 9422',
  phoneRaw: '0226059422',
  email: 'hello@webfitt.com',
  kiwiTag: '100% Kiwi software partner in Aotearoa',
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Team', href: '#team' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Blog', href: '#blog' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const SERVICES = [
  { icon: Code2, title: 'Custom Software', desc: 'Tailored web and business applications built to fit your exact workflow.', accent: 'blue' },
  { icon: Smartphone, title: 'Mobile Apps', desc: 'Beautiful, performant iOS and Android apps that keep customers engaged.', accent: 'lime' },
  { icon: Layout, title: 'Web Design & Development', desc: 'Conversion-focused websites that look sharp on every device and rank well on Google.', accent: 'cyan' },
  { icon: Cloud, title: 'Cloud & SaaS', desc: 'Scalable cloud platforms on AWS, Azure and GCP — ship faster, scale safely.', accent: 'blue' },
  { icon: ShoppingCart, title: 'E-commerce', desc: 'Shopify, WooCommerce and custom stores that turn visitors into customers.', accent: 'cyan' },
  { icon: LineChart, title: 'Digital Strategy', desc: 'We translate business goals into a clear technology roadmap that works.', accent: 'lime' },
]

const TEAM = [
  {
    name: 'Sangita Gupta',
    role: 'Founder & Managing Director',
    image: 'https://images.pexels.com/photos/7580822/pexels-photo-7580822.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=700',
    shortBio: "Founder and Managing Director of Webfit Solutions Limited. Based in Auckland, holds a Master's in Science and leads both strategy and operations.",
    fullBio: "Sangita Gupta, the Founder and Managing Director of Webfit Solutions Limited, brings a unique blend of professional expertise and personal insight to the company. Based in Auckland, she holds a Master's Degree in Science and is a mother of two. Sangita understands the connection between humans and technology and focuses on delivering solutions that improve accuracy and usability. She leads both strategy and operations, ensuring high-quality software delivery.",
  },
  {
    name: 'Sheetal Bhusari',
    role: 'Technology Leader',
    image: 'https://images.pexels.com/photos/7581115/pexels-photo-7581115.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=700',
    shortBio: 'Over 20 years of software development experience across leading multinational corporations before becoming an entrepreneur.',
    fullBio: 'With over 20 years of experience in software development, Sheetal has worked with leading multinational corporations before becoming an entrepreneur. Her expertise and innovative approach have driven many successful projects. At Webfit Solutions, she focuses on delivering high-quality, practical technology solutions.',
  },
  {
    name: 'Aarti Jangid',
    role: 'Senior Software Engineer',
    image: 'https://images.unsplash.com/photo-1580643735948-c52d25d9c07d?crop=entropy&cs=srgb&fm=jpg&q=85&w=800',
    shortBio: '10+ years in software development, specialising in Java technologies and delivering solutions across multiple domains.',
    fullBio: 'Aarti brings over 10 years of experience in software development. She specializes in Java technologies and has delivered high-quality solutions across multiple domains. She focuses on solving complex problems using modern technologies.',
  },
]

const TESTIMONIALS = [
  { quote: 'The Webfit team delivered exactly what we needed — on time and on budget. Their senior engineers felt like part of our own team from day one.', name: 'Client Name', role: 'Operations Manager', company: 'Placeholder Co. Ltd', rating: 5 },
  { quote: 'We tried two other agencies before finding Webfit. The difference in quality, communication and outcomes was night and day.', name: 'Client Name', role: 'Founder & CEO', company: 'Placeholder Retail NZ', rating: 5 },
  { quote: 'Proper Kiwi team, proper Kiwi communication, proper Kiwi results. Our new platform runs beautifully and our team loves it.', name: 'Client Name', role: 'Head of Digital', company: 'Placeholder Group', rating: 5 },
]

const CLIENTS = [
  { name: 'Client Logo 1', logo: '' },
  { name: 'Client Logo 2', logo: '' },
  { name: 'Client Logo 3', logo: '' },
  { name: 'Client Logo 4', logo: '' },
  { name: 'Client Logo 5', logo: '' },
  { name: 'Client Logo 6', logo: '' },
]

const BLOG_POSTS = [
  { slug: 'how-kiwi-businesses-choose-software-partner', title: 'How Kiwi businesses should choose a software partner in 2025', excerpt: 'Five practical questions every NZ business owner should ask before signing with a software vendor — and the red flags to watch out for.', category: 'Insights', author: 'Webfit Team', date: 'Coming soon', readTime: '4 min read', image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200' },
  { slug: 'custom-software-vs-off-the-shelf', title: 'Custom software vs off-the-shelf: what actually makes sense for SMBs', excerpt: 'A clear, no-jargon breakdown of when custom software pays back and when a SaaS subscription is the smarter call.', category: 'Guide', author: 'Webfit Team', date: 'Coming soon', readTime: '6 min read', image: 'https://images.unsplash.com/photo-1660144425546-b07680e711d1?w=1200' },
  { slug: 'case-study-retail-mobile-app', title: 'Case study: 3.2x repeat orders with a custom retail mobile app', excerpt: 'How we helped an Auckland retailer grow repeat revenue by shipping a simple, focused iOS + Android app in 12 weeks.', category: 'Case Study', author: 'Webfit Team', date: 'Coming soon', readTime: '5 min read', image: 'https://images.unsplash.com/photo-1597075095400-fb3f0de70140?w=1200' },
]

const WHY_US = [
  { icon: Heart, title: 'Built in New Zealand for real business needs', desc: 'We understand the Kiwi market, timezone and way of doing business — no call centres, no outsourcing surprises.' },
  { icon: Shield, title: '100% Kiwi-owned & Auckland based', desc: 'Your project stays in Aotearoa — designed, built and supported locally.' },
  { icon: Users, title: 'Senior talent on every project', desc: 'You work directly with experienced engineers (20+ yrs) — not junior account managers.' },
  { icon: Zap, title: 'Fast, predictable delivery', desc: 'Clear milestones, weekly demos and fixed-scope pricing so you always know what you are getting.' },
  { icon: Shield, title: 'Quality you can trust', desc: 'Solid engineering practices, documented code and ongoing support — we are here for the long run.' },
  { icon: Handshake, title: 'True partnership, not vendor', desc: 'We invest in understanding your business so our software actually moves the needle.' },
]

const PROCESS_STEPS = [
  { n: '01', icon: Lightbulb, title: 'Discover', desc: 'We listen carefully to your goals, users and constraints — then turn them into a clear, costed plan.' },
  { n: '02', icon: Layout, title: 'Design', desc: 'Wireframes and interactive prototypes so you see and feel the solution before a line of code is written.' },
  { n: '03', icon: Code2, title: 'Build', desc: 'Agile sprints, weekly demos and transparent progress — no black boxes, no surprises.' },
  { n: '04', icon: Rocket, title: 'Launch', desc: 'Secure deployment, training for your team and a smooth go-live — done the right way.' },
  { n: '05', icon: Sparkles, title: 'Grow', desc: 'Ongoing support, improvements and new features as your business evolves.' },
]

/* ============================================================================
   HELPERS
   ============================================================================ */

const Pill = ({ children, dark = false, className = '' }) => (
  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide ${dark ? 'bg-white/5 border border-white/10 text-slate-200' : 'bg-slate-900/5 border border-slate-900/10 text-slate-700'} ${className}`}>
    {children}
  </span>
)

const accentMap = {
  blue: 'text-[#4f8fff] bg-[#4f8fff]/10 border-[#4f8fff]/20',
  lime: 'text-[#5d7a10] bg-[#c3f03d]/25 border-[#c3f03d]/40',
  cyan: 'text-[#0e7490] bg-[#22d3ee]/15 border-[#22d3ee]/25',
}

/* ============================================================================
   COMPONENTS
   ============================================================================ */

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#070b16]/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <a href="#home" className="flex items-center gap-2.5">
            <div className="relative h-10 w-10 md:h-11 md:w-11 rounded-xl bg-white p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_30px_-10px_rgba(79,143,255,0.35)]">
              <Image src={SITE.logoUrl} alt={`${SITE.shortName} Logo`} fill className="object-contain p-1" priority />
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="text-base md:text-[15px] font-semibold text-white tracking-tight">{SITE.shortName}</div>
              <div className="text-[10px] md:text-[11px] text-slate-400 -mt-0.5">{SITE.tagline}</div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-1 glass rounded-full px-2 py-1.5">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-slate-200 hover:text-white px-3.5 py-1.5 rounded-full hover:bg-white/10 transition-all">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-3">
            <Button asChild className="btn-lime rounded-full h-10 px-5 font-semibold">
              <a href="#contact">Book a call <ArrowRight className="ml-1.5 h-4 w-4" /></a>
            </Button>
          </div>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white"><Menu className="h-6 w-6" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] sm:w-[400px] bg-[#070b16] border-white/10 text-white">
              <div className="flex flex-col gap-5 mt-10">
                {NAV_LINKS.map(l => (
                  <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-lg font-medium text-slate-200 hover:text-[#c3f03d]">
                    {l.label}
                  </a>
                ))}
                <Button asChild className="btn-lime rounded-full mt-3 h-11 font-semibold" onClick={() => setMobileOpen(false)}>
                  <a href="#contact">Book a call</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

const Hero = () => (
  <section id="home" className="relative min-h-screen bg-aurora noise overflow-hidden flex items-center pt-28 md:pt-32 pb-20">
    <div className="absolute inset-0 grid-dark"></div>
    {/* Floating orbs */}
    <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-[#4f8fff]/20 blur-[100px] pointer-events-none"></div>
    <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-[#c3f03d]/10 blur-[100px] pointer-events-none"></div>

    <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-5xl mx-auto text-center">
        <div className="fade-in-up">
          <Pill dark className="mb-8">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c3f03d] dot-pulse"></span>
            <span>Available for new projects · Auckland, NZ 🇳🇿</span>
          </Pill>
          <h1 className="text-[44px] sm:text-6xl lg:text-[84px] leading-[0.95] font-semibold tracking-[-0.04em] text-white">
            Software that grows<br className="hidden sm:block" /> your business,<br className="hidden sm:block" />
            <span className="text-gradient-brand italic">built in Aotearoa.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-slate-300/90 max-w-2xl mx-auto leading-relaxed">
            A senior Kiwi team designing, building and supporting custom web, mobile and SaaS products — from first idea to scaling product. No outsourcing. Just software that works.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="btn-lime rounded-full h-12 px-8 text-base font-semibold">
              <a href="#contact">Book a free consultation <ArrowRight className="ml-2 h-5 w-5" /></a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm">
              <a href="#services">Explore services</a>
            </Button>
          </div>
        </div>

        {/* Stat row */}
        <div className="mt-20 fade-in-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden glass">
            {[
              { v: '50+', l: 'Projects delivered' },
              { v: '20+', l: 'Years experience' },
              { v: '100%', l: 'Kiwi-owned' },
              { v: '1 day', l: 'Typical reply time' },
            ].map((s, i) => (
              <div key={i} className="px-6 py-6 bg-[#070b16]/70">
                <div className="text-3xl md:text-4xl font-semibold text-white tracking-tight">{s.v}</div>
                <div className="text-xs md:text-sm text-slate-400 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
)

const Services = () => (
  <section id="services" className="py-24 md:py-32 bg-cream relative">
    <div className="absolute inset-0 grid-light opacity-60"></div>
    <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div className="max-w-2xl">
          <Pill className="mb-4"><Circle className="h-2 w-2 fill-[#4f8fff] text-[#4f8fff]" /> Services</Pill>
          <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-[-0.035em] leading-[1.02]">
            Everything you need, <span className="italic text-slate-500">end-to-end.</span>
          </h2>
        </div>
        <p className="text-lg text-slate-600 max-w-md">From first idea to scaling product — one Kiwi team, honest pricing, senior engineers.</p>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {SERVICES.map((s, i) => {
          // Bento layout: first big, rest varying
          const span = i === 0 ? 'md:col-span-3 md:row-span-2' : i === 1 ? 'md:col-span-3' : i === 5 ? 'md:col-span-3' : 'md:col-span-2'
          const featured = i === 0
          return (
            <div key={i} className={`group relative rounded-3xl bg-white border border-slate-200/70 p-7 hover-lift overflow-hidden ${span}`}>
              {featured && (
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-[#4f8fff]/15 to-[#c3f03d]/10 blur-2xl"></div>
              )}
              <div className="relative flex items-start justify-between mb-6">
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center border ${accentMap[s.accent]}`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <MoveUpRight className="h-5 w-5 text-slate-300 group-hover:text-slate-900 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </div>
              <h3 className={`relative font-semibold text-slate-900 tracking-tight mb-2 ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>{s.title}</h3>
              <p className={`relative text-slate-600 leading-relaxed ${featured ? 'text-base max-w-md' : 'text-sm'}`}>{s.desc}</p>
              {featured && (
                <div className="relative mt-8 pt-6 border-t border-slate-100 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {['#4f8fff','#22d3ee','#c3f03d'].map((c, idx) => (
                      <div key={idx} className="h-7 w-7 rounded-full border-2 border-white" style={{background:c}}></div>
                    ))}
                  </div>
                  <span className="text-sm text-slate-500">Senior team · 20+ years combined</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  </section>
)

const TeamCard = ({ member }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="group relative rounded-3xl overflow-hidden bg-[#0b1020] border border-white/5 hover-lift">
      <div className="relative aspect-[4/5] overflow-hidden">
        {member.image ? (
          <Image src={member.image} alt={member.name} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700" sizes="(max-width:768px) 100vw, 33vw" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[#1e293b] to-[#0b1020] flex items-center justify-center text-6xl font-semibold text-white/40">
            {member.name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b16] via-[#070b16]/70 to-transparent"></div>
        <div className="absolute top-4 left-4">
          <Pill dark className="!bg-black/40 !border-white/15 !text-white backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c3f03d]"></span> {member.role}
          </Pill>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-white tracking-tight mb-3">{member.name}</h3>
        <p className="text-slate-300/90 text-sm leading-relaxed">
          {open ? member.fullBio : member.shortBio}
        </p>
        <button onClick={() => setOpen(!open)} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#c3f03d] hover:text-white transition-colors">
          {open ? 'Show less' : 'Read full bio'}
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  )
}

const Team = () => (
  <section id="team" className="py-24 md:py-32 bg-aurora noise relative overflow-hidden">
    <div className="absolute inset-0 grid-dark"></div>
    <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div className="max-w-2xl">
          <Pill dark className="mb-4"><Circle className="h-2 w-2 fill-[#c3f03d] text-[#c3f03d]" /> Team</Pill>
          <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-[-0.035em] leading-[1.02]">
            The people behind <span className="italic text-slate-400">your success.</span>
          </h2>
        </div>
        <p className="text-lg text-slate-300 max-w-md">Experienced, senior engineers and leaders — working directly with you from day one.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {TEAM.map(m => <TeamCard key={m.name} member={m} />)}
      </div>
    </div>
  </section>
)

const Testimonials = () => (
  <section id="testimonials" className="py-24 md:py-32 bg-cream">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-14">
        <Pill className="mb-4"><Star className="h-3 w-3 fill-amber-500 text-amber-500" /> Client love</Pill>
        <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-[-0.035em] leading-[1.02]">
          Trusted by <span className="italic text-slate-500">Kiwi businesses.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-20">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="relative rounded-3xl bg-white border border-slate-200/70 p-7 hover-lift">
            <Quote className="h-8 w-8 text-[#4f8fff]/20 mb-5" strokeWidth={2.5} />
            <div className="flex gap-0.5 mb-5">
              {Array.from({ length: t.rating || 5 }).map((_, idx) => (
                <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-slate-800 text-[15px] leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
            <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#4f8fff] to-[#22d3ee] flex items-center justify-center text-white font-semibold text-sm">
                {t.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                <div className="text-xs text-slate-500">{t.role}{t.company ? ` · ${t.company}` : ''}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Client marquee */}
      <div>
        <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-500 font-medium mb-8">Working with leading Kiwi businesses</p>
        <div className="marquee">
          <div className="marquee-track">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <div key={i} className="flex items-center justify-center h-14 min-w-[200px] rounded-xl bg-white border border-dashed border-slate-300 text-slate-400 text-sm px-6">
                {c.logo ? <Image src={c.logo} alt={c.name} width={140} height={40} className="object-contain" /> : <span className="font-medium">{c.name}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
)

const WhyUs = () => (
  <section id="about" className="py-24 md:py-32 bg-aurora noise relative overflow-hidden">
    <div className="absolute inset-0 grid-dark"></div>
    <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-14">
        <Pill dark className="mb-4"><Circle className="h-2 w-2 fill-[#4f8fff] text-[#4f8fff]" /> Why us</Pill>
        <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-[-0.035em] leading-[1.02]">
          Built in New Zealand for <span className="italic text-[#c3f03d]">real business needs.</span>
        </h2>
        <p className="mt-5 text-lg text-slate-300 max-w-2xl">You get a senior, proactive, Kiwi team that treats your business as if it were our own.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {WHY_US.map((w, i) => (
          <div key={i} className="group glass rounded-2xl p-6 hover:bg-white/[0.07] transition-all">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#4f8fff] to-[#22d3ee] flex items-center justify-center mb-5 shadow-lg shadow-[#4f8fff]/20">
              <w.icon className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">{w.title}</h3>
            <p className="text-slate-300/80 text-sm leading-relaxed">{w.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

const Process = () => (
  <section className="py-24 md:py-32 bg-cream">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-14">
        <Pill className="mb-4"><Circle className="h-2 w-2 fill-[#c3f03d] text-[#c3f03d]" /> Process</Pill>
        <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-[-0.035em] leading-[1.02]">
          How we deliver, <span className="italic text-slate-500">every time.</span>
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {PROCESS_STEPS.map((s, i) => (
          <div key={s.n} className="relative rounded-2xl bg-white border border-slate-200/70 p-6 hover-lift">
            <div className="flex items-start justify-between mb-6">
              <span className="text-xs font-mono font-medium text-slate-400 tracking-wider">STEP {s.n}</span>
              <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center">
                <s.icon className="h-4 w-4 text-[#c3f03d]" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2 tracking-tight">{s.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            {i < PROCESS_STEPS.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                <ArrowRight className="h-4 w-4 text-slate-300" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
)

const Blog = () => {
  const [hero, ...rest] = BLOG_POSTS
  return (
    <section id="blog" className="py-24 md:py-32 bg-cream border-t border-slate-200/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <Pill className="mb-4"><Circle className="h-2 w-2 fill-[#22d3ee] text-[#22d3ee]" /> Insights</Pill>
            <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-[-0.035em] leading-[1.02]">
              Ideas that <span className="italic text-slate-500">help you decide better.</span>
            </h2>
          </div>
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-slate-900 hover:text-[#4f8fff] group">
            View all articles
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Featured article */}
          <a href={`#blog-${hero.slug}`} className="group lg:col-span-3 rounded-3xl overflow-hidden bg-white border border-slate-200/70 hover-lift">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <Image src={hero.image} alt={hero.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4">
                <Pill dark className="!bg-black/50 !border-white/20 !text-white backdrop-blur-md">{hero.category}</Pill>
              </div>
            </div>
            <div className="p-7">
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{hero.date}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{hero.readTime}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight mb-3 group-hover:text-[#4f8fff] transition-colors">{hero.title}</h3>
              <p className="text-slate-600 leading-relaxed">{hero.excerpt}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-slate-900">
                Read article <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </a>

          {/* Side articles */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {rest.map((p) => (
              <a key={p.slug} href={`#blog-${p.slug}`} className="group flex gap-4 rounded-3xl overflow-hidden bg-white border border-slate-200/70 p-4 hover-lift">
                <div className="relative h-28 w-28 flex-shrink-0 rounded-2xl overflow-hidden bg-slate-100">
                  <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="112px" />
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-1.5">
                    <span className="font-medium text-[#4f8fff]">{p.category}</span>
                    <span>·</span>
                    <span>{p.readTime}</span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 tracking-tight leading-snug mb-1 group-hover:text-[#4f8fff] transition-colors line-clamp-2">{p.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{p.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in your name, email and message.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'consultation' }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success("Kia ora! Thanks — we'll be in touch within 1 business day.")
        setForm({ name: '', email: '', phone: '', company: '', message: '' })
      } else {
        toast.error(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-aurora noise relative overflow-hidden">
      <div className="absolute inset-0 grid-dark"></div>
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[#4f8fff]/20 blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#c3f03d]/10 blur-[120px]"></div>
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <Pill dark className="mb-5"><span className="h-1.5 w-1.5 rounded-full bg-[#c3f03d] dot-pulse"></span> Get in touch</Pill>
            <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-[-0.035em] leading-[1.02]">
              Let&apos;s build something <span className="italic text-[#c3f03d]">worth building.</span>
            </h2>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-lg">
              Book a free 30-minute consultation. We&apos;ll listen to what you need, share a few ideas, and tell you honestly if we&apos;re the right fit.
            </p>
            <div className="mt-10 space-y-4">
              <a href={`tel:${SITE.phoneRaw}`} className="group flex items-center gap-4 text-white hover:text-[#c3f03d] transition-colors">
                <div className="h-12 w-12 rounded-2xl glass flex items-center justify-center"><Phone className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs text-slate-400">Call us</div>
                  <div className="font-semibold text-lg">{SITE.phone}</div>
                </div>
              </a>
              <a href={`mailto:${SITE.email}`} className="group flex items-center gap-4 text-white hover:text-[#c3f03d] transition-colors">
                <div className="h-12 w-12 rounded-2xl glass flex items-center justify-center"><Mail className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs text-slate-400">Email</div>
                  <div className="font-semibold text-lg">{SITE.email}</div>
                </div>
              </a>
              <div className="flex items-center gap-4 text-white">
                <div className="h-12 w-12 rounded-2xl glass flex items-center justify-center"><MapPin className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs text-slate-400">Visit</div>
                  <div className="font-semibold text-lg">{SITE.address}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-7 md:p-9">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-slate-300 text-xs uppercase tracking-wider">Full name *</Label>
                  <Input id="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jane Smith" className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-11 focus-visible:ring-[#c3f03d] focus-visible:ring-offset-0" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-slate-300 text-xs uppercase tracking-wider">Email *</Label>
                  <Input id="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jane@company.co.nz" className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-11 focus-visible:ring-[#c3f03d] focus-visible:ring-offset-0" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-slate-300 text-xs uppercase tracking-wider">Phone</Label>
                  <Input id="phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="022 000 0000" className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-11 focus-visible:ring-[#c3f03d] focus-visible:ring-offset-0" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="company" className="text-slate-300 text-xs uppercase tracking-wider">Company</Label>
                  <Input id="company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Your Business Ltd" className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-11 focus-visible:ring-[#c3f03d] focus-visible:ring-offset-0" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-slate-300 text-xs uppercase tracking-wider">How can we help? *</Label>
                <Textarea id="message" rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your project, timeline and goals..." className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-[#c3f03d] focus-visible:ring-offset-0" />
              </div>
              <Button type="submit" disabled={loading} className="btn-lime rounded-full w-full h-12 text-base font-semibold">
                {loading ? 'Sending...' : <>Send enquiry <ArrowRight className="ml-2 h-5 w-5" /></>}
              </Button>
              <p className="text-xs text-center text-slate-400 pt-1">We typically respond within 1 business day.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

const Footer = () => (
  <footer className="bg-[#050810] text-slate-400 border-t border-white/5">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="relative h-11 w-11 bg-white rounded-xl p-1.5">
              <Image src={SITE.logoUrl} alt={SITE.shortName} fill className="object-contain p-1" />
            </div>
            <div>
              <div className="text-white font-semibold text-base">{SITE.company}</div>
              <div className="text-xs text-slate-500">{SITE.tagline}</div>
            </div>
          </div>
          <p className="text-slate-400 leading-relaxed max-w-md text-sm">{SITE.kiwiTag}. We build practical, high-quality software for New Zealand businesses.</p>
          <div className="mt-5 inline-flex items-center gap-2 text-sm glass rounded-full px-4 py-2">
            <span className="text-base">🇳🇿</span>
            <span className="text-slate-200">Proudly based in Auckland, Aotearoa</span>
          </div>
        </div>
        <div className="md:col-span-3">
          <h4 className="text-white font-medium mb-5 text-sm uppercase tracking-wider">Company</h4>
          <ul className="space-y-3 text-sm">
            {NAV_LINKS.map(l => <li key={l.href}><a href={l.href} className="hover:text-white transition-colors">{l.label}</a></li>)}
          </ul>
        </div>
        <div className="md:col-span-4">
          <h4 className="text-white font-medium mb-5 text-sm uppercase tracking-wider">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3"><Globe className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#c3f03d]" /><a href={SITE.websiteUrl} className="hover:text-white">{SITE.website}</a></li>
            <li className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#c3f03d]" /><span>{SITE.address}</span></li>
            <li className="flex items-start gap-3"><Phone className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#c3f03d]" /><a href={`tel:${SITE.phoneRaw}`} className="hover:text-white">{SITE.phone}</a></li>
            <li className="flex items-start gap-3"><Mail className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#c3f03d]" /><a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-14 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500">© {new Date().getFullYear()} {SITE.company}. All rights reserved.</p>
        <p className="text-xs text-slate-500">Crafted with care in Auckland, Aotearoa.</p>
      </div>
    </div>
  </footer>
)

const App = () => {
  return (
    <main className="bg-[#070b16]">
      <Toaster position="top-center" richColors theme="dark" />
      <Header />
      <Hero />
      <Services />
      <Team />
      <Testimonials />
      <WhyUs />
      <Process />
      <Blog />
      <ContactSection />
      <Footer />
    </main>
  )
}

export default App
