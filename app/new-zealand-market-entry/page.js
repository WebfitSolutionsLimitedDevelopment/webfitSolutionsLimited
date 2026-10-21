import Link from "next/link";
import { ArrowRight, Search, PhoneCall, Store, ShoppingCart, Megaphone, MessagesSquare, Truck, Mail, Phone, ShieldCheck } from "lucide-react";
import PartnershipEnquiryForm from "./PartnershipEnquiryForm";
const PAGE_URL = "https://webfitt.com/new-zealand-market-entry";
export const metadata = {
  title: "New Zealand Market Entry & Sales Support | Webfit Solutions Limited",
  description: "Explore the New Zealand market with Webfit Solutions Limited. Local representation, buyer outreach, ecommerce and sales support for overseas suppliers.",
  alternates: {
    canonical: PAGE_URL
  },
  openGraph: {
    title: "New Zealand Market Entry & Sales Support | Webfit Solutions Limited",
    description: "Explore the New Zealand market with Webfit Solutions Limited. Local representation, buyer outreach, ecommerce and sales support for overseas suppliers.",
    url: PAGE_URL,
    siteName: "Webfit Solutions Limited",
    locale: "en_NZ",
    type: "website"
  }
};
const services = [{
  icon: Search,
  title: "Market research and opportunity assessment",
  body: "An initial look at demand, competing products, likely price points and the requirements that may apply to your category."
}, {
  icon: PhoneCall,
  title: "Local business contact and enquiry coordination",
  body: "A New Zealand point of contact to receive and coordinate enquiries during agreed business hours."
}, {
  icon: Store,
  title: "Buyer, retailer and distributor outreach",
  body: "Researching and approaching potential buyers, retailers and distributors that may suit your products."
}, {
  icon: ShoppingCart,
  title: "Website and ecommerce setup",
  body: "A New Zealand–focused website or online store, built and configured to the agreed scope."
}, {
  icon: Megaphone,
  title: "Digital marketing and promotional campaigns",
  body: "Search, social and email campaigns run within an agreed budget, with regular reporting."
}, {
  icon: MessagesSquare,
  title: "Sales development and customer communication",
  body: "Following up leads, preparing quotes for your approval and keeping customer conversations moving."
}, {
  icon: Truck,
  title: "Coordination with freight, customs and logistics providers",
  body: "Liaising with the independent freight forwarders, customs brokers and logistics providers appointed for your shipments."
}];
const steps = [{
  title: "Share your products",
  body: "Submit your company details, catalogue, indicative pricing and export experience."
}, {
  title: "Assess the opportunity",
  body: "We discuss target customers, product suitability, costs and applicable requirements."
}, {
  title: "Agree the scope",
  body: "Both parties agree on responsibilities, funding, fees, commissions and the initial launch plan."
}, {
  title: "Start with a focused pilot",
  body: "Test a defined product range and review results before expanding."
}];
const btnPrimary = "inline-flex items-center justify-center gap-2 whitespace-nowrap btn-holo rounded-full h-12 px-7 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2";
const btnSecondary = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full h-12 px-7 text-base font-medium border border-slate-200 bg-white/70 text-slate-900 shadow-sm hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2";
function Eyebrow({
  children
}) {
  return <span className="inline-flex items-center gap-2 glass-pill rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-slate-800 mb-5">
      {children}
    </span>;
}
export default function NewZealandMarketEntryPage() {
  return <main className="min-h-screen bg-background text-slate-950">
      {/* ---------- 1. HERO ---------- */}
      <section className="relative overflow-hidden bg-mesh px-4 pb-20 pt-24 sm:px-6 md:pt-28 lg:px-8">
        <div className="absolute inset-0 grid-overlay opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
          <Link href="/" className="text-sm font-semibold text-violet-700 hover:text-violet-900">
            ← Webfit Solutions Limited
          </Link>
          <div className="mt-10 max-w-3xl">
            <Eyebrow>New Zealand Market Entry</Eyebrow>
            <h1 className="text-[40px] leading-[1.02] sm:text-6xl font-semibold tracking-[-0.04em] text-slate-950">
              Bring Your Products to <span className="text-holo italic">New Zealand</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-slate-700">
              Webfit Solutions Limited helps overseas manufacturers, suppliers and brands explore the
              New Zealand market through local representation, digital marketing and sales support.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#partnership-enquiry" className={btnPrimary}>
                Discuss a Partnership <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#how-it-works" className={btnSecondary}>
                How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 2. WHO WE WORK WITH ---------- */}
      <section className="px-4 py-20 md:py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
            <Eyebrow>Who we work with</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.035em] leading-[1.05]">
              A practical route into New Zealand
            </h2>
          </div>
          <div className="md:col-span-7 space-y-5 text-lg leading-relaxed text-slate-700">
            <p>
              We welcome enquiries from manufacturers, exporters, wholesalers and established brands
              in India and other international markets seeking a practical route into New Zealand.
            </p>
            <p>
              Every partnership is assessed individually. Before we propose any work, we look at
              product suitability for New Zealand customers, how ready your business is to supply
              and support an overseas market, and whether there is realistic market potential.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- 3. HOW WE CAN HELP ---------- */}
      <section className="relative overflow-hidden bg-mesh-soft px-4 py-20 md:py-28 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>How we can help</Eyebrow>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.035em] leading-[1.05]">
                Local services, <span className="text-holo italic">by agreement.</span>
              </h2>
            </div>
            <p className="max-w-md text-lg text-slate-600">
              Choose the services that fit your plan. Each is provided under an agreed scope — they
              are services we deliver, not guaranteed sales or outcomes.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({
            icon: Icon,
            title,
            body
          }) => <div key={title} className="rounded-3xl glass-card p-7 h-full">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-md">
                  <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-slate-950 mb-2">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{body}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ---------- 4. HOW THE PARTNERSHIP WORKS ---------- */}
      <section id="how-it-works" className="scroll-mt-20 px-4 py-20 md:py-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl mb-12">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.035em] leading-[1.05]">
              How the partnership works
            </h2>
          </div>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => <li key={step.title} className="relative rounded-3xl glass-card p-7">
                <div className="text-sm font-semibold text-violet-700">Step {i + 1}</div>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.body}</p>
              </li>)}
          </ol>
        </div>
      </section>

      {/* ---------- 5 & 6. COMMERCIAL ARRANGEMENTS + BEFORE WE BEGIN ---------- */}
      <section className="bg-mesh-dark px-4 py-20 md:py-24 sm:px-6 lg:px-8 text-slate-300">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <div className="rounded-3xl glass-card-dark p-8">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
              Commercial arrangements
            </h2>
            <p className="mt-4 leading-relaxed">
              Each partnership is tailored to the work involved. Arrangements may include an initial
              assessment or setup fee, ongoing service fees and commission on sales collected.
              Product supply, freight, storage, marketing budgets, returns and unsold stock
              responsibilities are agreed in writing before launch.
            </p>
          </div>
          <div className="rounded-3xl glass-card-dark p-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-pink-400" aria-hidden="true" />
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                Before we begin
              </h2>
            </div>
            <p className="mt-4 leading-relaxed">
              All partnerships are subject to supplier checks, product suitability and applicable
              New Zealand requirements. Any role involving importing, selling, distribution or
              regulatory responsibilities must be expressly agreed in writing. Market access and
              sales are not guaranteed.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- 7. ENQUIRY FORM + CONTACT US ---------- */}
      <section id="partnership-enquiry" className="scroll-mt-20 relative overflow-hidden bg-mesh-soft px-4 py-20 md:py-28 sm:px-6 lg:px-8">
        <div className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4 space-y-6">
            <div>
              <Eyebrow>Partnership enquiry</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.035em] leading-[1.05]">
                Tell us about your products
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Share as much as you can. We&apos;ll review your information and let you know whether
                there may be a suitable opportunity to discuss.
              </p>
            </div>

            <aside aria-labelledby="contact-us-heading" className="rounded-3xl glass-card p-7">
              <h3 id="contact-us-heading" className="text-lg font-semibold tracking-tight text-slate-950">
                Contact Us
              </h3>
              <p className="mt-1 text-sm text-slate-600">Webfit Solutions Limited</p>
              <ul className="mt-5 space-y-4">
                <li>
                  <a href="tel:+64221299323" className="group flex items-center gap-3 text-slate-900 hover:text-pink-600 transition-colors">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                      <Phone className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs text-slate-500">Mobile</span>
                      <span className="font-semibold">+64 22 129 9323</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@webfitt.co.nz" className="group flex items-center gap-3 text-slate-900 hover:text-pink-600 transition-colors">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                      <Mail className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs text-slate-500">Email</span>
                      <span className="font-semibold break-all">info@webfitt.co.nz</span>
                    </span>
                  </a>
                </li>
              </ul>
            </aside>
          </div>

          <div className="lg:col-span-8">
            <div className="rounded-3xl glass-card p-6 sm:p-8">
              <PartnershipEnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </main>;
}
