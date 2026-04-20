'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { toast, Toaster } from 'sonner'
import {
  Code2, Smartphone, Cloud, ShoppingCart, Layout, LineChart, ArrowRight, Phone, Mail, MapPin,
  CheckCircle2, Sparkles, Users, Clock, Shield, Rocket, Lightbulb, Handshake, Menu, X,
  ExternalLink, ChevronDown, Globe, Zap, Heart
} from 'lucide-react'

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_9e1be266-7281-40e0-9ad8-d984708adecf/artifacts/gxak5mjz_webfit%20Solutions%20Limited%20New%20Logo.png'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Team', href: '#team' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const SERVICES = [
  { icon: Code2, title: 'Custom Software Development', desc: 'Tailored web and business applications built to fit your exact workflow — no bloated templates, no compromises.' },
  { icon: Smartphone, title: 'Mobile App Development', desc: 'Beautiful, performant iOS and Android apps that keep your customers engaged and your team productive.' },
  { icon: Layout, title: 'Web Design & Development', desc: 'Conversion-focused websites that look sharp on every device and rank well on Google.' },
  { icon: Cloud, title: 'Cloud & SaaS Solutions', desc: 'Scalable cloud platforms on AWS, Azure and GCP — ship faster, scale safely, pay only for what you use.' },
  { icon: ShoppingCart, title: 'E-commerce Solutions', desc: 'Shopify, WooCommerce and custom stores that turn visitors into paying customers around the clock.' },
  { icon: LineChart, title: 'Digital Strategy & Consulting', desc: 'We translate business goals into a clear technology roadmap — so every dollar you invest works harder.' },
]

const PROJECTS = [
  {
    title: 'Enterprise Analytics Dashboard',
    tag: 'SaaS Platform',
    desc: 'Built a real-time analytics platform that cut reporting time by 85% for a fast-growing NZ distributor.',
    image: 'https://images.unsplash.com/photo-1660144425546-b07680e711d1',
    stack: ['Next.js', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'Retail Mobile Commerce App',
    tag: 'Mobile App',
    desc: 'iOS & Android app that drove a 3.2x increase in repeat orders for an Auckland retail chain.',
    image: 'https://images.unsplash.com/photo-1597075095400-fb3f0de70140',
    stack: ['React Native', 'Stripe', 'Firebase'],
  },
  {
    title: 'Operations Management System',
    tag: 'Custom Software',
    desc: 'Replaced 6 disconnected spreadsheets with one system — saving 40+ team hours every week.',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f',
    stack: ['React', 'Java', 'AWS'],
  },
  {
    title: 'Booking & Scheduling Platform',
    tag: 'Web App',
    desc: 'End-to-end booking platform handling 10k+ monthly appointments with zero double-bookings.',
    image: 'https://images.unsplash.com/photo-1665211097563-163d6be45d67',
    stack: ['Next.js', 'MongoDB', 'Tailwind'],
  },
  {
    title: 'B2B SaaS Subscription Product',
    tag: 'SaaS',
    desc: 'Launched a subscription SaaS from concept to paying customers in under 14 weeks.',
    image: 'https://images.unsplash.com/photo-1648134859182-98df6e93ef58',
    stack: ['TypeScript', 'Stripe', 'GCP'],
  },
  {
    title: 'Field Service Mobile Solution',
    tag: 'Mobile App',
    desc: 'Offline-first app for field technicians — jobs completed 27% faster with instant sync.',
    image: 'https://images.unsplash.com/photo-1537267470831-2d781a5d2ae6',
    stack: ['Flutter', 'Node.js', 'Azure'],
  },
]

const TEAM = [
  {
    name: 'Sangita Gupta',
    role: 'Founder & Managing Director',
    shortBio: "Founder and Managing Director of Webfit Solutions Limited. Based in Auckland, holds a Master's in Science and leads both strategy and operations.",
    fullBio: "Sangita Gupta, the Founder and Managing Director of Webfit Solutions Limited, brings a unique blend of professional expertise and personal insight to the company. Based in Auckland, she holds a Master's Degree in Science and is a mother of two. Sangita understands the connection between humans and technology and focuses on delivering solutions that improve accuracy and usability. She leads both strategy and operations, ensuring high-quality software delivery.",
    initials: 'SG',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Sheetal Bhusari',
    role: 'Technology Leader',
    shortBio: 'Over 20 years of software development experience across leading multinational corporations before becoming an entrepreneur.',
    fullBio: 'With over 20 years of experience in software development, Sheetal has worked with leading multinational corporations before becoming an entrepreneur. Her expertise and innovative approach have driven many successful projects. At Webfit Solutions, she focuses on delivering high-quality, practical technology solutions.',
    initials: 'SB',
    gradient: 'from-sky-500 to-blue-600',
  },
  {
    name: 'Aarti Jangid',
    role: 'Senior Software Engineer',
    shortBio: '10+ years in software development, specialising in Java technologies and delivering solutions across multiple domains.',
    fullBio: 'Aarti brings over 10 years of experience in software development. She specializes in Java technologies and has delivered high-quality solutions across multiple domains. She focuses on solving complex problems using modern technologies.',
    initials: 'AJ',
    gradient: 'from-cyan-500 to-blue-500',
  },
]

const WHY_US = [
  { icon: Heart, title: 'Built in New Zealand for real business needs', desc: 'We understand the Kiwi market, timezone and way of doing business — no call centres, no outsourcing surprises.' },
  { icon: Shield, title: '100% Kiwi-owned & based in Auckland', desc: 'Your project stays in Aotearoa — designed, built and supported locally.' },
  { icon: Users, title: 'Senior talent on every project', desc: 'You work directly with experienced engineers (20+ years) — not junior account managers.' },
  { icon: Zap, title: 'Fast, predictable delivery', desc: 'Clear milestones, weekly demos and fixed-scope pricing options so you always know what you are getting.' },
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
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/85 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <div className="relative h-10 w-10 md:h-12 md:w-12">
              <Image src={LOGO_URL} alt="Webfit Solutions Logo" fill className="object-contain" priority />
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="text-base md:text-lg font-bold text-slate-900">Webfit Solutions</div>
              <div className="text-[10px] md:text-xs text-slate-500 -mt-0.5">Software &amp; Digital Solutions</div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-slate-700 hover:text-primary transition-colors relative group">
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-3">
            <Button asChild className="gradient-bg hover:opacity-90 text-white shadow-lg shadow-blue-500/20">
              <a href="#contact">Book a Consultation <ArrowRight className="ml-1 h-4 w-4" /></a>
            </Button>
          </div>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon"><Menu className="h-6 w-6" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-8">
                {NAV_LINKS.map(l => (
                  <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-lg font-medium text-slate-800 hover:text-primary">
                    {l.label}
                  </a>
                ))}
                <Button asChild className="gradient-bg text-white mt-4" onClick={() => setMobileOpen(false)}>
                  <a href="#contact">Book a Consultation</a>
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
  <section id="home" className="relative pt-28 md:pt-36 pb-16 md:pb-24 hero-bg overflow-hidden">
    <div className="absolute inset-0 grid-pattern opacity-60"></div>
    <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 fade-in-up">
          <Badge variant="outline" className="mb-6 bg-white border-blue-200 text-blue-700 py-1.5 px-3">
            <span className="mr-2">🇳🇿</span> 100% Kiwi-based software partner in New Zealand
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.05]">
            Software that <span className="gradient-text">grows your business</span>, built right here in Aotearoa.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            We design, build and support custom web, mobile and SaaS solutions for Kiwi businesses — from strategy to launch and beyond. No outsourcing. No jargon. Just software that works.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="gradient-bg hover:opacity-90 text-white h-12 px-8 text-base shadow-xl shadow-blue-500/25">
              <a href="#contact">Book a Free Consultation <ArrowRight className="ml-2 h-5 w-5" /></a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base border-2 border-slate-300 hover:border-primary hover:text-primary">
              <a href="#work">See Our Work</a>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-slate-600">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-600" /> Auckland-based team</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-600" /> Senior engineers (20+ yrs)</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-600" /> Fixed-price options</div>
          </div>
        </div>
        <div className="lg:col-span-5 relative fade-in-up">
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 gradient-bg rounded-[2.5rem] rotate-6 opacity-20 blur-2xl"></div>
            <div className="absolute inset-0 gradient-bg rounded-[2.5rem] rotate-3"></div>
            <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <Image src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" alt="Software development" fill className="object-cover" priority />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-slate-100">
              <div className="h-12 w-12 rounded-xl gradient-bg flex items-center justify-center"><Sparkles className="h-6 w-6 text-white" /></div>
              <div>
                <div className="text-2xl font-bold text-slate-900">50+</div>
                <div className="text-xs text-slate-500">Projects delivered</div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-slate-100">
              <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center"><Heart className="h-6 w-6 text-green-600" /></div>
              <div>
                <div className="text-2xl font-bold text-slate-900">100%</div>
                <div className="text-xs text-slate-500">Kiwi-owned</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const Services = () => (
  <section id="services" className="py-20 md:py-28 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge variant="outline" className="mb-4 text-primary border-blue-200 bg-blue-50">What We Do</Badge>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">Services built around your <span className="gradient-text">business outcomes</span></h2>
        <p className="mt-4 text-lg text-slate-600">From first idea to scaling product — one Kiwi team, end-to-end.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((s, i) => (
          <Card key={i} className="group relative overflow-hidden border-slate-200 hover:border-primary/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
            <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-br from-blue-50 to-transparent rounded-full -translate-y-20 translate-x-20 group-hover:scale-125 transition-transform duration-500"></div>
            <CardContent className="p-7 relative">
              <div className="h-14 w-14 rounded-xl gradient-bg flex items-center justify-center mb-5 shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform">
                <s.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-slate-600 leading-relaxed">{s.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
)

const Work = () => {
  const [selected, setSelected] = useState(null)
  return (
    <section id="work" className="py-20 md:py-28 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-blue-200 bg-blue-50">Recent Work</Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">Projects that <span className="gradient-text">move the needle</span></h2>
          <p className="mt-4 text-lg text-slate-600">A small selection of recent work delivered by our team — real outcomes, real customers.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <Card key={i} className="group overflow-hidden border-slate-200 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-white/90 text-slate-900 hover:bg-white backdrop-blur-sm">{p.tag}</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.stack.map(s => <span key={s} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-md">{s}</span>)}
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelected(p)} className="text-primary hover:text-primary hover:bg-blue-50 -ml-3">
                  View Details <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="sm:max-w-2xl">
          {selected && (
            <>
              <div className="relative aspect-video rounded-lg overflow-hidden -mt-2">
                <Image src={selected.image} alt={selected.title} fill className="object-cover" />
              </div>
              <DialogHeader>
                <Badge className="w-fit bg-blue-50 text-primary hover:bg-blue-50 mb-1">{selected.tag}</Badge>
                <DialogTitle className="text-2xl">{selected.title}</DialogTitle>
                <DialogDescription className="text-base text-slate-600 leading-relaxed">{selected.desc}</DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap gap-2">
                {selected.stack.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
              </div>
              <Button asChild className="gradient-bg text-white w-full">
                <a href="#contact">Start a Similar Project <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

const TeamCard = ({ member }) => {
  const [open, setOpen] = useState(false)
  return (
    <Card className="group text-center overflow-hidden border-slate-200 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
      <CardContent className="p-8">
        <div className="relative mx-auto mb-5">
          <div className={`h-28 w-28 mx-auto rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-lg ring-4 ring-white"`}>
            <span className="text-3xl font-bold text-white">{member.initials}</span>
          </div>
          <div className="absolute -bottom-1 right-1/2 translate-x-14 h-8 w-8 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
        <div className="text-sm text-primary font-medium mt-0.5 mb-3">{member.role}</div>
        <p className="text-slate-600 leading-relaxed text-sm">
          {open ? member.fullBio : member.shortBio}
        </p>
        <Button variant="ghost" size="sm" onClick={() => setOpen(!open)} className="mt-4 text-primary hover:text-primary hover:bg-blue-50">
          {open ? 'Show Less' : 'Show More'}
          <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </Button>
      </CardContent>
    </Card>
  )
}

const Team = () => (
  <section id="team" className="py-20 md:py-28 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge variant="outline" className="mb-4 text-primary border-blue-200 bg-blue-50">Meet The Team</Badge>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">The people behind <span className="gradient-text">your success</span></h2>
        <p className="mt-4 text-lg text-slate-600">Experienced, senior engineers and leaders — working directly with you.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {TEAM.map(m => <TeamCard key={m.name} member={m} />)}
      </div>
    </div>
  </section>
)

const WhyUs = () => (
  <section id="about" className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
    <div className="absolute inset-0 grid-pattern opacity-10"></div>
    <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge variant="outline" className="mb-4 border-white/20 bg-white/10 text-white backdrop-blur-sm">Why Choose Us</Badge>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Built in New Zealand for <span className="bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent">real business needs</span></h2>
        <p className="mt-4 text-lg text-slate-300">You get a senior, proactive, Kiwi team that treats your business as if it were our own.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WHY_US.map((w, i) => (
          <div key={i} className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center mb-4 shadow-lg">
              <w.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2">{w.title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{w.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

const Process = () => (
  <section className="py-20 md:py-28 bg-slate-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge variant="outline" className="mb-4 text-primary border-blue-200 bg-blue-50">Our Process</Badge>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">How we deliver, <span className="gradient-text">every time</span></h2>
        <p className="mt-4 text-lg text-slate-600">A proven 5-step process that keeps things simple, transparent and on-track.</p>
      </div>
      <div className="relative">
        <div className="hidden lg:block absolute top-20 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {PROCESS_STEPS.map((s, i) => (
            <div key={s.n} className="relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-primary/40 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
              <div className="text-5xl font-black text-blue-100 mb-3">{s.n}</div>
              <div className="h-10 w-10 rounded-lg gradient-bg flex items-center justify-center mb-3 -mt-8 ml-auto shadow-lg shadow-blue-500/25">
                <s.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1.5">{s.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

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
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl gradient-bg p-8 md:p-14 shadow-2xl shadow-blue-500/20">
          <div className="absolute inset-0 grid-pattern opacity-10"></div>
          <div className="absolute -top-24 -right-24 h-96 w-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 h-96 w-96 bg-sky-300/20 rounded-full blur-3xl"></div>
          <div className="relative grid lg:grid-cols-2 gap-10 items-start">
            <div className="text-white">
              <Badge variant="outline" className="mb-4 border-white/30 bg-white/10 text-white backdrop-blur-sm">Get In Touch</Badge>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Let's build something that actually moves your business forward.</h2>
              <p className="mt-4 text-white/90 text-lg leading-relaxed">Book a free 30-minute consultation. We'll listen to what you need, share a few ideas, and tell you honestly if we're the right fit.</p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0"><Phone className="h-5 w-5" /></div>
                  <div><div className="text-sm text-white/70">Call us</div><a href="tel:0226059422" className="font-semibold hover:underline">022 605 9422</a></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0"><Globe className="h-5 w-5" /></div>
                  <div><div className="text-sm text-white/70">Website</div><a href="https://webfitt.com" className="font-semibold hover:underline">webfitt.com</a></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0"><MapPin className="h-5 w-5" /></div>
                  <div><div className="text-sm text-white/70">Visit</div><div className="font-semibold">Sandringham Road, Auckland, NZ</div></div>
                </div>
              </div>
            </div>
            <Card className="border-0 shadow-xl">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Full name *</Label>
                      <Input id="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jane Smith" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jane@company.co.nz" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="022 000 0000" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Your Business Ltd" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="message">How can we help? *</Label>
                    <Textarea id="message" rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us a bit about your project, timeline and goals..." />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full gradient-bg text-white h-12 text-base shadow-lg shadow-blue-500/25">
                    {loading ? 'Sending...' : <>Send Enquiry <ArrowRight className="ml-2 h-5 w-5" /></>}
                  </Button>
                  <p className="text-xs text-center text-slate-500">We typically respond within 1 business day.</p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

const Footer = () => (
  <footer className="bg-slate-950 text-slate-300">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative h-12 w-12 bg-white rounded-lg p-1">
              <Image src={LOGO_URL} alt="Webfit Solutions" fill className="object-contain p-1" />
            </div>
            <div>
              <div className="text-white font-bold text-lg">Webfit Solutions Ltd.</div>
              <div className="text-xs text-slate-400">Software &amp; Digital Solutions</div>
            </div>
          </div>
          <p className="text-slate-400 leading-relaxed max-w-md">100% Kiwi software partner in Aotearoa. We build practical, high-quality software for New Zealand businesses.</p>
          <div className="mt-5 flex items-center gap-2 text-sm">
            <span className="text-lg">🇳🇿</span>
            <span className="text-slate-300">Proudly based in Auckland, New Zealand</span>
          </div>
        </div>
        <div className="md:col-span-3">
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2.5 text-sm">
            {NAV_LINKS.map(l => <li key={l.href}><a href={l.href} className="hover:text-white transition-colors">{l.label}</a></li>)}
          </ul>
        </div>
        <div className="md:col-span-4">
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3"><Globe className="h-4 w-4 mt-0.5 flex-shrink-0 text-sky-400" /><a href="https://webfitt.com" className="hover:text-white">webfitt.com</a></li>
            <li className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-sky-400" /><span>Sandringham Road, Auckland, New Zealand</span></li>
            <li className="flex items-start gap-3"><Phone className="h-4 w-4 mt-0.5 flex-shrink-0 text-sky-400" /><a href="tel:0226059422" className="hover:text-white">022 605 9422</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">© {new Date().getFullYear()} Webfit Solutions Limited. All rights reserved.</p>
        <p className="text-sm text-slate-500">Crafted with care in Auckland, Aotearoa.</p>
      </div>
    </div>
  </footer>
)

const App = () => {
  return (
    <main className="min-h-screen bg-background">
      <Toaster position="top-center" richColors />
      <Header />
      <Hero />
      <Services />
      <Work />
      <Team />
      <WhyUs />
      <Process />
      <ContactSection />
      <Footer />
    </main>
  )
}

export default App
