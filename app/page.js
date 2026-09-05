'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { toast, Toaster } from 'sonner'
import TiltCard from '@/components/TiltCard'
import Reveal from '@/components/Reveal'
import Portal from '@/components/Portal'
import SmoothScroll from '@/components/SmoothScroll'
import ScrollProgress from '@/components/ScrollProgress'
import {
  Code2, Smartphone, Cloud, ShoppingCart, Layout, LineChart, ArrowRight, Phone, Mail, MapPin,
  Sparkles, Users, Shield, Rocket, Lightbulb, Handshake, Menu,
  Globe, Zap, Heart, Quote, Star, ChevronDown, Calendar, Clock, ArrowUpRight, MoveUpRight,
} from 'lucide-react'

// 3D scenes loaded client-only (no SSR)
const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false })
const JourneyCanvas = dynamic(() => import('@/components/three/JourneyCanvas'), { ssr: false })
const ContactScene = dynamic(() => import('@/components/three/ContactScene'), { ssr: false })
const ServiceIcon3D = dynamic(() => import('@/components/three/ServiceIcon3D'), { ssr: false })

/* ============================================================================
   SITE CONFIG — edit this block to update website content
   ============================================================================ */

const SITE = {
  company: 'Webfit Solutions Limited',
  shortName: 'Webfit Solutions',
  tagline: 'Software & Digital Solutions',
  logoUrl: 'https://customer-assets.emergentagent.com/job_9e1be266-7281-40e0-9ad8-d984708adecf/artifacts/gxak5mjz_webfit%20Solutions%20Limited%20New%20Logo.png',
  website: 'webfitt.co.nz',
  websiteUrl: 'https://webfitt.co.nz',
  address: 'Sandringham Road, Auckland, New Zealand',
  phone: '022 605 9422',
  phoneRaw: '0226059422',
  email: 'info@webfitt.co.nz',
  kiwiTag: '100% Kiwi software partner in Aotearoa',
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Industry Experience', href: '/industry-experience' },
  { label: 'Team', href: '#team' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Blog', href: '#blog' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const SERVICES = [
  { icon: Code2, shape: 'box', title: 'Custom Software', desc: 'Tailored web and business applications built around your exact workflow.', gradient: 'from-violet-500 to-fuchsia-500' },
  { icon: Smartphone, shape: 'sphere', title: 'Mobile Apps', desc: 'Beautiful iOS and Android apps that keep customers coming back.', gradient: 'from-pink-500 to-rose-500' },
  { icon: Layout, shape: 'torus', title: 'Web Design & Dev', desc: 'Conversion-focused websites that look sharp and rank well on Google.', gradient: 'from-blue-500 to-cyan-500' },
  { icon: Cloud, shape: 'cone', title: 'Cloud & SaaS', desc: 'Scalable cloud platforms on AWS, Azure and GCP — ship faster, scale safely.', gradient: 'from-indigo-500 to-purple-500' },
  { icon: ShoppingCart, shape: 'octa', title: 'E-commerce', desc: 'Shopify, WooCommerce and custom stores that convert around the clock.', gradient: 'from-amber-500 to-orange-500' },
  { icon: LineChart, shape: 'knot', title: 'Digital Strategy', desc: 'We turn business goals into a clear, costed technology roadmap.', gradient: 'from-emerald-500 to-teal-500' },
]

const TEAM = [
  {
    name: 'Sangita Gupta',
    role: 'Founder & Managing Director',
    image: '/team/sangita.jpeg',   // ✅ matches your file
    shortBio: "Founder and Managing Director. Based in Auckland, holds a Master's in Science and leads both strategy and operations.",
    fullBio: "Sangita Gupta, the Founder and Managing Director of Webfit Solutions Limited, brings a unique blend of professional expertise and personal insight to the company. Based in Auckland, she holds a Master's Degree in Science and is a mother of two. Sangita understands the connection between humans and technology and focuses on delivering solutions that improve accuracy and usability. She leads both strategy and operations, ensuring high-quality software delivery.",
  },
  {
    name: 'Sheetal Bhusari',
    role: 'Technology Leader',
    image: '/team/sheetal.jpg',   // ✅ local image
    shortBio: 'Over 20 years in software development across leading multinationals before becoming an entrepreneur.',
    fullBio: 'With over 20 years of experience in software development, Sheetal has worked with leading multinational corporations before becoming an entrepreneur. Her expertise and innovative approach have driven many successful projects. At Webfit Solutions, she focuses on delivering high-quality, practical technology solutions.',
  },
  {
    name: 'Aarti Jangid',
    role: 'Senior Software Engineer',
    image: '/team/aarti.jpg',   // ✅ local image
    shortBio: '10+ years in software development, specialising in Java and solving complex problems with modern tech.',
    fullBio: 'Aarti brings over 10 years of experience in software development. She specializes in Java technologies and has delivered high-quality solutions across multiple domains. She focuses on solving complex problems using modern technologies.',
  },
]

const TESTIMONIALS = [
  { quote: 'The Webfit team delivered exactly what we needed — on time and on budget. Their senior engineers felt like part of our own team from day one.', name: 'TaxiCService', role: 'P Singh', company: 'TaxcService Ltd', rating: 5 },
  { quote: 'We tried two other agencies before finding Webfit. The difference in quality, communication and outcomes was night and day.', name: 'Dharmesh Parikh', role: 'Founder & CEO Rhythm House Events & Films', company: 'NZSME ORG', rating: 5 },
  { quote: 'Proper Kiwi team, proper Kiwi results. Our new platform runs beautifully and our team loves it.', name: 'Sam M', role: 'Head of Digital', company: 'Apex Models', rating: 5 },
]

const CLIENTS = [
  
]

const BLOG_POSTS = [
  { slug: 'how-kiwi-businesses-choose-software-partner', title: 'How Kiwi businesses should choose a software partner in 2025', excerpt: 'Five practical questions every NZ business owner should ask before signing with a software vendor.', category: 'Insights', author: 'Webfit Team', date: 'Coming soon', readTime: '4 min read', image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200' },
  { slug: 'custom-software-vs-off-the-shelf', title: 'Custom software vs off-the-shelf: what makes sense for SMBs', excerpt: 'A no-jargon breakdown of when custom software pays back and when SaaS is the smarter call.', category: 'Guide', author: 'Webfit Team', date: 'Coming soon', readTime: '6 min read', image: 'https://images.unsplash.com/photo-1660144425546-b07680e711d1?w=1200' },
  { slug: 'case-study-retail-mobile-app', title: 'Case study: 3.2x repeat orders with a custom retail mobile app', excerpt: 'How we helped an Auckland retailer grow repeat revenue with a focused iOS + Android app.', category: 'Case Study', author: 'Webfit Team', date: 'Coming soon', readTime: '5 min read', image: 'https://images.unsplash.com/photo-1597075095400-fb3f0de70140?w=1200' },
]

const WHY_US = [
  { icon: Heart, title: 'Built in NZ for real needs', desc: 'We understand the Kiwi market, timezone and way of doing business.' },
  { icon: Shield, title: '100% Kiwi-owned', desc: 'Your project stays in Aotearoa — designed, built and supported locally.' },
  { icon: Users, title: 'Senior talent only', desc: 'You work directly with experienced engineers (20+ yrs), not junior managers.' },
  { icon: Zap, title: 'Fast, predictable', desc: 'Clear milestones, weekly demos, fixed-scope pricing options.' },
  { icon: Shield, title: 'Quality you trust', desc: 'Solid engineering practices, documented code, ongoing support.' },
  { icon: Handshake, title: 'True partnership', desc: 'We invest in understanding your business so our software moves the needle.' },
]

const PROCESS_STEPS = [
  { n: '01', icon: Lightbulb, title: 'Discover', desc: 'We listen carefully to your goals and turn them into a clear, costed plan.' },
  { n: '02', icon: Layout, title: 'Design', desc: 'Wireframes and prototypes so you see and feel the solution before a line of code.' },
  { n: '03', icon: Code2, title: 'Build', desc: 'Agile sprints, weekly demos and transparent progress — no black boxes.' },
  { n: '04', icon: Rocket, title: 'Launch', desc: 'Secure deployment, training and a smooth go-live — done the right way.' },
  { n: '05', icon: Sparkles, title: 'Grow', desc: 'Ongoing support, improvements and new features as your business evolves.' },
]

/* ============================================================================
   HELPERS
   ============================================================================ */

const Pill = ({ children, className = '' }) => (
  <span className={`inline-flex items-center gap-2 glass-pill rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-slate-800 ${className}`}>
    {children}
  </span>
)

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
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between rounded-full transition-all duration-300 ${scrolled ? 'glass-pill px-4 py-2' : 'px-2 py-2'}`}>
          <a href="#home" className="flex items-center gap-2.5">
            <div className="relative h-10 w-10 rounded-xl bg-white p-1 shadow-sm">
              <Image src={SITE.logoUrl} alt={`${SITE.shortName} Logo`} fill className="object-contain p-1" priority />
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="text-[15px] font-semibold text-slate-900 tracking-tight">{SITE.shortName}</div>
              <div className="text-[10.5px] text-slate-500 -mt-0.5">{SITE.tagline}</div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3.5 py-1.5 rounded-full hover:bg-white/60 transition-all">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hidden lg:flex items-center">
            <Button asChild className="btn-holo rounded-full h-10 px-5 font-medium">
              <a href="#contact">Book a call <ArrowRight className="ml-1.5 h-4 w-4" /></a>
            </Button>
          </div>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-white/60"><Menu className="h-6 w-6" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] sm:w-[400px] bg-white">
              <div className="flex flex-col gap-5 mt-10">
                {NAV_LINKS.map(l => (
                  <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-lg font-medium text-slate-800 hover:text-primary">
                    {l.label}
                  </a>
                ))}
                <Button asChild className="btn-holo rounded-full mt-3 h-11 font-medium" onClick={() => setMobileOpen(false)}>
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
  <section id="home" className="relative min-h-screen bg-mesh noise overflow-hidden pt-28 md:pt-32 pb-16">
    <div className="absolute inset-0 grid-overlay"></div>
    <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
        <div className="lg:col-span-6 relative z-10 fade-in-up">
          <Pill className="mb-6">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-500 dot-pulse"></span>
            <span>Available for new projects · Auckland 🇳🇿</span>
          </Pill>
          <h1 className="text-[44px] sm:text-6xl lg:text-[78px] leading-[0.95] font-semibold tracking-[-0.04em] text-slate-950">
            Software that feels like{' '}
            <span className="text-holo italic">magic,</span>{' '}
            <span className="block mt-2">built in Aotearoa.</span>
          </h1>
          <p className="mt-7 text-lg md:text-xl text-slate-700 max-w-xl leading-relaxed">
            A senior Kiwi team designing, building and supporting custom web, mobile and SaaS products — from first idea to scaling product.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="btn-holo rounded-full h-12 px-7 text-base font-medium">
              <a href="#contact">Book a free consultation <ArrowRight className="ml-2 h-5 w-5" /></a>
            </Button>
            <Button asChild variant="outline" size="lg" className="btn-ghost-glass h-12 px-7 text-base rounded-full hover:text-slate-900">
              <a href="#services">Explore services</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { v: '50+', l: 'Projects shipped' },
              { v: '20+', l: 'Years experience' },
              { v: '100%', l: 'Kiwi-owned' },
              { v: '1 day', l: 'Reply time' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-semibold text-slate-950 tracking-tight">{s.v}</div>
                <div className="text-xs md:text-sm text-slate-600 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Scene */}
        <div className="lg:col-span-6 relative h-[440px] md:h-[560px] lg:h-[640px]">
          <div className="absolute inset-0">
            <HeroScene />
          </div>

          {/* Floating info pills around the 3D scene */}
          <div className="hidden md:block absolute top-8 right-4 glass-pill rounded-2xl px-4 py-3 float-label" style={{ animationDelay: '0s' }}>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Senior team</div>
            <div className="text-sm font-semibold text-slate-900 mt-0.5">20+ years exp.</div>
          </div>
          <div className="hidden md:block absolute bottom-20 left-4 glass-pill rounded-2xl px-4 py-3 float-label" style={{ animationDelay: '2s' }}>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Fixed-price</div>
            <div className="text-sm font-semibold text-slate-900 mt-0.5">No surprises</div>
          </div>
          <div className="hidden md:block absolute top-1/2 -right-2 glass-pill rounded-2xl px-4 py-3 float-label" style={{ animationDelay: '4s' }}>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Based in</div>
            <div className="text-sm font-semibold text-slate-900 mt-0.5">Auckland, NZ 🇳🇿</div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const Services = () => (
  <section id="services" className="relative py-24 md:py-32 bg-mesh-soft overflow-hidden">
    <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
        <div className="max-w-2xl">
          <Pill className="mb-5">Services</Pill>
          <h2 className="text-4xl md:text-6xl font-semibold text-slate-950 tracking-[-0.035em] leading-[1.02]">
            Everything you need,{' '}
            <span className="text-holo italic">end-to-end.</span>
          </h2>
        </div>
        <p className="text-lg text-slate-600 max-w-md">One Kiwi team, honest pricing, senior engineers. No outsourcing, no surprises.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((s, i) => (
          <Reveal key={i} delay={i * 80}>
            <TiltCard className="rounded-3xl h-full" intensity={7}>
              <div className="group relative rounded-3xl glass-card holo-border p-7 h-full overflow-hidden">
                <div className="relative h-20 w-20 -ml-2 mb-4">
                  <ServiceIcon3D shape={s.shape} />
                  <div className={`absolute bottom-1 right-1 h-7 w-7 rounded-lg bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-lg ring-2 ring-white/80`}>
                    <s.icon className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-950 tracking-tight mb-2">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-slate-900">
                  Learn more <MoveUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

const TeamCard = ({ member }) => {
  const [open, setOpen] = useState(false)
  return (
    <TiltCard className="rounded-[28px]" intensity={6} glare={false}>
      <div className="group relative rounded-[28px] glass-card holo-border overflow-hidden">
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-[28px]">
          {member.image ? (
            <Image src={member.image} alt={member.name} fill className="object-cover group-hover:scale-[1.04] transition-transform duration-700" sizes="(max-width:768px) 100vw, 33vw" />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-violet-200 to-pink-200 flex items-center justify-center text-6xl font-semibold text-white/60">
              {member.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
          <div className="absolute top-4 left-4">
            <Pill>
              <span className="h-1.5 w-1.5 rounded-full bg-pink-500"></span> {member.role}
            </Pill>
          </div>
        </div>
        <div className="p-6 pt-2 relative">
          <h3 className="text-2xl font-semibold text-slate-950 tracking-tight mb-3">{member.name}</h3>
          <p className="text-slate-700 text-sm leading-relaxed">
            {open ? member.fullBio : member.shortBio}
          </p>
          <button onClick={() => setOpen(!open)} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-900 hover:text-pink-600 transition-colors">
            {open ? 'Show less' : 'Read full bio'}
            <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </TiltCard>
  )
}

const Team = () => (
  <section id="team" className="relative py-24 md:py-32 bg-mesh overflow-hidden">
    <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
        <div className="max-w-2xl">
          <Pill className="mb-5">Team</Pill>
          <h2 className="text-4xl md:text-6xl font-semibold text-slate-950 tracking-[-0.035em] leading-[1.02]">
            The people behind{' '}
            <span className="text-holo italic">your success.</span>
          </h2>
        </div>
        <p className="text-lg text-slate-600 max-w-md">Experienced, senior engineers and leaders — working directly with you from day one.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {TEAM.map((m, i) => (
          <Reveal key={m.name} delay={i * 120}>
            <TeamCard member={m} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

const Testimonials = () => (
  <section id="testimonials" className="relative py-24 md:py-32 bg-mesh-soft overflow-hidden">
    <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-16">
        <Pill className="mb-5">
          <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> Client love
        </Pill>
        <h2 className="text-4xl md:text-6xl font-semibold text-slate-950 tracking-[-0.035em] leading-[1.02]">
          Trusted by{' '}
          <span className="text-holo italic">Kiwi businesses.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-20">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={i} delay={i * 100}>
            <TiltCard className="rounded-3xl h-full" intensity={5}>
              <div className="relative rounded-3xl glass-card holo-border p-7 h-full">
                <Quote className="h-8 w-8 text-violet-400/40 mb-5" strokeWidth={2.5} />
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating || 5 }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-800 text-[15px] leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-5 border-t border-slate-200/60">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-950 text-sm">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}{t.company ? ` · ${t.company}` : ''}</div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <div>
        <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-500 font-medium mb-8"></p>
        <div className="marquee">
          <div className="marquee-track">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <div key={i} className="flex items-center justify-center h-14 min-w-[200px] rounded-2xl glass-pill text-slate-500 text-sm px-6">
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
  <section id="about" className="relative py-24 md:py-32 bg-mesh-dark noise overflow-hidden text-white">
    <div className="absolute inset-0 grid-overlay opacity-30"></div>
    <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-16">
        <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-slate-200 bg-white/5 backdrop-blur-md border border-white/10 mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-pink-400"></span> Why us
        </span>
        <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-[-0.035em] leading-[1.02]">
          Built in New Zealand for{' '}
          <span className="text-holo italic">real business needs.</span>
        </h2>
        <p className="mt-5 text-lg text-slate-300 max-w-2xl">You get a senior, proactive, Kiwi team that treats your business as if it were our own.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {WHY_US.map((w, i) => (
          <TiltCard key={i} className="rounded-2xl" intensity={4} glare={false}>
            <div className="glass-card-dark rounded-2xl p-6 h-full hover:bg-white/[0.08] transition-all">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center mb-5 shadow-lg shadow-violet-500/30">
                <w.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">{w.title}</h3>
              <p className="text-slate-300/80 text-sm leading-relaxed">{w.desc}</p>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  </section>
)

const Process = () => (
  <section className="relative py-24 md:py-32 bg-mesh-soft">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-16">
        <Pill className="mb-5">Process</Pill>
        <h2 className="text-4xl md:text-6xl font-semibold text-slate-950 tracking-[-0.035em] leading-[1.02]">
          How we deliver,{' '}
          <span className="text-holo italic">every time.</span>
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {PROCESS_STEPS.map((s, i) => (
          <TiltCard key={s.n} className="rounded-2xl" intensity={5}>
            <div className="relative rounded-2xl glass-card holo-border p-6 h-full">
              <div className="flex items-start justify-between mb-6">
                <span className="text-xs font-mono font-medium text-slate-400 tracking-wider">STEP {s.n}</span>
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center shadow-md">
                  <s.icon className="h-4 w-4 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-950 mb-2 tracking-tight">{s.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              {i < PROCESS_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                  <ArrowRight className="h-4 w-4 text-slate-300" />
                </div>
              )}
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  </section>
)

const Blog = () => {
  const [hero, ...rest] = BLOG_POSTS
  return (
    <section id="blog" className="relative py-24 md:py-32 bg-mesh overflow-hidden">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <Pill className="mb-5">Insights</Pill>
            <h2 className="text-4xl md:text-6xl font-semibold text-slate-950 tracking-[-0.035em] leading-[1.02]">
              Ideas that{' '}
              <span className="text-holo italic">help you decide better.</span>
            </h2>
          </div>
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-slate-900 hover:text-pink-600 group">
            View all articles <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <TiltCard className="lg:col-span-3 rounded-[28px]" intensity={4} glare={false}>
            <a href={`#blog-${hero.slug}`} className="group block rounded-[28px] glass-card holo-border overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-[28px]">
                <Image src={hero.image} alt={hero.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <Pill>{hero.category}</Pill>
                </div>
              </div>
              <div className="p-7">
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                  <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{hero.date}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{hero.readTime}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold text-slate-950 tracking-tight mb-3 group-hover:text-pink-600 transition-colors">{hero.title}</h3>
                <p className="text-slate-600 leading-relaxed">{hero.excerpt}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-slate-900">
                  Read article <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </a>
          </TiltCard>

          <div className="lg:col-span-2 flex flex-col gap-6">
            {rest.map((p) => (
              <TiltCard key={p.slug} className="rounded-[28px]" intensity={4} glare={false}>
                <a href={`#blog-${p.slug}`} className="group flex gap-4 rounded-[28px] glass-card holo-border p-4 items-stretch">
                  <div className="relative h-28 w-28 flex-shrink-0 rounded-2xl overflow-hidden">
                    <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="112px" />
                  </div>
                  <div className="flex-1 min-w-0 py-1">
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-1.5">
                      <span className="font-medium text-pink-600">{p.category}</span>
                      <span>·</span>
                      <span>{p.readTime}</span>
                    </div>
                    <h3 className="text-base font-semibold text-slate-950 tracking-tight leading-snug mb-1 group-hover:text-pink-600 transition-colors line-clamp-2">{p.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{p.excerpt}</p>
                  </div>
                </a>
              </TiltCard>
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
    <section id="contact" className="relative py-24 md:py-32 bg-mesh overflow-hidden">
      {/* Decorative 3D torus knot floating in background */}
      <div className="absolute inset-0 pointer-events-none opacity-70">
        <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 h-[600px] w-[600px]">
          <ContactScene />
        </div>
      </div>
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          <div>
            <Pill className="mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-500 dot-pulse"></span> Get in touch
            </Pill>
            <h2 className="text-4xl md:text-6xl font-semibold text-slate-950 tracking-[-0.035em] leading-[1.02]">
              Let&apos;s build something{' '}
              <span className="text-holo italic">worth building.</span>
            </h2>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-lg">
              Book a free 30-minute consultation. We&apos;ll listen to what you need, share ideas, and tell you honestly if we&apos;re the right fit.
            </p>
            <div className="mt-10 space-y-4">
              <a href={`tel:${SITE.phoneRaw}`} className="group flex items-center gap-4 text-slate-900 hover:text-pink-600 transition-colors">
                <div className="h-12 w-12 rounded-2xl glass-card flex items-center justify-center"><Phone className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs text-slate-500">Call us</div>
                  <div className="font-semibold text-lg">{SITE.phone}</div>
                </div>
              </a>
              <a href={`mailto:${SITE.email}`} className="group flex items-center gap-4 text-slate-900 hover:text-pink-600 transition-colors">
                <div className="h-12 w-12 rounded-2xl glass-card flex items-center justify-center"><Mail className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs text-slate-500">Email</div>
                  <div className="font-semibold text-lg">{SITE.email}</div>
                </div>
              </a>
              <div className="flex items-center gap-4 text-slate-900">
                <div className="h-12 w-12 rounded-2xl glass-card flex items-center justify-center"><MapPin className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs text-slate-500">Visit</div>
                  <div className="font-semibold text-lg">{SITE.address}</div>
                </div>
              </div>
            </div>
          </div>

          <TiltCard className="rounded-[28px]" intensity={3} glare={false}>
            <div className="glass-card holo-border rounded-[28px] p-7 md:p-9">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-slate-600 text-xs uppercase tracking-wider">Full name *</Label>
                    <Input id="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jane Smith" className="bg-white/60 border-slate-200 h-11 focus-visible:ring-violet-500" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-slate-600 text-xs uppercase tracking-wider">Email *</Label>
                    <Input id="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jane@company.co.nz" className="bg-white/60 border-slate-200 h-11 focus-visible:ring-violet-500" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-slate-600 text-xs uppercase tracking-wider">Phone</Label>
                    <Input id="phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="022 000 0000" className="bg-white/60 border-slate-200 h-11 focus-visible:ring-violet-500" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="company" className="text-slate-600 text-xs uppercase tracking-wider">Company</Label>
                    <Input id="company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Your Business Ltd" className="bg-white/60 border-slate-200 h-11 focus-visible:ring-violet-500" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-slate-600 text-xs uppercase tracking-wider">How can we help? *</Label>
                  <Textarea id="message" rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your project, timeline and goals..." className="bg-white/60 border-slate-200 focus-visible:ring-violet-500" />
                </div>
                <Button type="submit" disabled={loading} className="btn-holo rounded-full w-full h-12 text-base font-medium">
                  {loading ? 'Sending...' : <>Send enquiry <ArrowRight className="ml-2 h-5 w-5" /></>}
                </Button>
                <p className="text-xs text-center text-slate-500 pt-1">We typically respond within 1 business day.</p>
              </form>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  )
}

const Footer = () => (
  <footer className="bg-[#0a0a12] text-slate-400 border-t border-white/5">
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
          <div className="mt-5 inline-flex items-center gap-2 text-sm glass-card-dark rounded-full px-4 py-2">
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
            <li className="flex items-start gap-3"><Globe className="h-4 w-4 mt-0.5 flex-shrink-0 text-pink-400" /><a href={SITE.websiteUrl} className="hover:text-white">{SITE.website}</a></li>
            <li className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-pink-400" /><span>{SITE.address}</span></li>
            <li className="flex items-start gap-3"><Phone className="h-4 w-4 mt-0.5 flex-shrink-0 text-pink-400" /><a href={`tel:${SITE.phoneRaw}`} className="hover:text-white">{SITE.phone}</a></li>
            <li className="flex items-start gap-3"><Mail className="h-4 w-4 mt-0.5 flex-shrink-0 text-pink-400" /><a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a></li>
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
    <main className="relative bg-[#0a0a12] overflow-x-clip">
      <SmoothScroll />
      <ScrollProgress />
      <JourneyCanvas />
      <Toaster position="top-center" richColors />
      <Header />
      <div className="relative z-10">
        <Hero />
        <Portal index={1} label="Services" sublabel="Everything you need, end-to-end." accent="#f472b6" />
        <Services />
        <Portal index={2} label="The Team" sublabel="Senior Kiwi engineers, not junior managers." accent="#60a5fa" />
        <Team />
        <Portal index={3} label="Proof" sublabel="Trusted by real Kiwi businesses." accent="#fbbf24" />
        <Testimonials />
        <Portal index={4} label="Why Webfit" sublabel="Built in New Zealand for real business needs." accent="#34d399" />
        <WhyUs />
        <Process />
        <Portal index={5} label="Insights" sublabel="Ideas, guides and case studies." accent="#818cf8" />
        <Blog />
        <Portal index={6} label="Let's Talk" sublabel="Book a free 30-minute consultation." accent="#ec4899" />
        <ContactSection />
        <Footer />
      </div>
    </main>
  )
}

export default App
