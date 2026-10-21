import Link from 'next/link'
import { PackageCheck, ClipboardList, Truck } from 'lucide-react'
import TradeCatalogue from './TradeCatalogue'

export const metadata = {
  title: 'Trade Catalogue: Indian Snacks | Webfit Solutions Limited',
  description:
    'Browse Indian snacks available to New Zealand retailers and food businesses, and send a no-obligation pre-order request to Webfit Solutions Limited.',
  alternates: { canonical: 'https://webfitt.com/catalogue' },
}

const steps = [
  { icon: ClipboardList, title: 'Choose products', body: 'Add the products and quantities you are interested in to your request list.' },
  { icon: PackageCheck, title: 'Send your request', body: 'Tell us about your business. No payment is taken and you are not committing to buy.' },
  { icon: Truck, title: 'We confirm details', body: 'We contact you with pricing, carton sizes, lead times and availability.' },
]

export default function CataloguePage() {
  return (
    <main className="min-h-screen bg-background text-slate-950">
      <section className="relative overflow-hidden bg-mesh px-4 pb-16 pt-24 sm:px-6 md:pt-28 lg:px-8">
        <div className="absolute inset-0 grid-overlay opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
          <Link href="/" className="text-sm font-semibold text-violet-700 hover:text-violet-900">
            ← Webfit Solutions Limited
          </Link>
          <div className="mt-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 glass-pill rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-slate-800 mb-5">
              Trade catalogue
            </span>
            <h1 className="text-[40px] leading-[1.02] sm:text-6xl font-semibold tracking-[-0.04em]">
              Indian snacks for <span className="text-holo italic">New Zealand</span> stores
            </h1>
            <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-slate-700">
              Browse a range of packaged Indian snacks and send us a pre-order request. We&apos;ll come back to you
              with pricing, carton sizes and availability.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#products" className="inline-flex items-center justify-center gap-2 btn-holo rounded-full h-12 px-7 text-base font-medium">
                Browse products
              </a>
              <a href="#request" className="inline-flex items-center justify-center rounded-full h-12 px-7 text-base font-medium border border-slate-200 bg-white/70 text-slate-900 shadow-sm hover:bg-white">
                Send a request
              </a>
            </div>
          </div>
          <ol className="mt-14 grid gap-4 sm:grid-cols-3">
            {steps.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className="rounded-3xl glass-card p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
                    <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-violet-700">Step {i + 1}</span>
                </div>
                <h2 className="mt-4 text-lg font-semibold tracking-tight">{title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <TradeCatalogue />

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white/60 p-6 text-sm leading-relaxed text-slate-600">
          <h2 className="font-semibold text-slate-900">Please note</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>A pre-order request is not a confirmed order. No payment is taken through this page.</li>
            <li>Prices, carton sizes, lead times and availability are confirmed when we contact you.</li>
            <li>All products are subject to supply, import clearance and applicable New Zealand requirements.</li>
            <li>
              Pack sizes and shelf life are indicative. Ingredient and allergen information is provided on request and
              on product labels. Some products contain or may contain peanuts, tree nuts, gluten or sesame.
            </li>
          </ul>
        </div>
      </section>
    </main>
  )
}
