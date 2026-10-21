import { notFound } from 'next/navigation'
import { ClipboardList, PackageCheck, Truck } from 'lucide-react'
import { CATALOGUES, getCatalogue } from '@/lib/catalogues'
import CatalogueView from './CatalogueView'

// Only the catalogues in the registry exist; any other /c/... address is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(CATALOGUES).map((slug) => ({ slug }))
}

export function generateMetadata({ params }) {
  const c = getCatalogue(params.slug)
  if (!c) return {}
  return {
    title: c.metaTitle,
    description: c.intro,
    robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
    referrer: 'no-referrer',
  }
}

const steps = [
  { icon: ClipboardList, title: 'Choose products', body: 'Add the products and quantities you are interested in to your request list.' },
  { icon: PackageCheck, title: 'Send your request', body: 'Tell us about your business. No payment is taken and you are not committing to buy.' },
  { icon: Truck, title: 'We confirm details', body: 'We contact you with pricing, minimum quantities, lead times and availability.' },
]

export default function CataloguePage({ params }) {
  const c = getCatalogue(params.slug)
  if (!c) notFound()

  // Only this catalogue's data is passed to the browser.
  const data = {
    slug: c.slug,
    unit: c.unit,
    businessTypes: c.businessTypes,
    notesPlaceholder: c.notesPlaceholder,
    categories: c.categories,
    products: c.products,
  }

  return (
    <main className="min-h-screen bg-background text-slate-950">
      <section className="relative overflow-hidden bg-mesh px-4 pb-14 pt-20 sm:px-6 md:pt-24 lg:px-8">
        <div className="absolute inset-0 grid-overlay opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm font-semibold text-violet-700">Webfit Solutions Limited</p>
          <div className="mt-8 max-w-3xl">
            <span className="inline-flex items-center gap-2 glass-pill rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-slate-800 mb-5">
              {c.eyebrow}
            </span>
            <h1 className="text-[38px] leading-[1.04] sm:text-6xl font-semibold tracking-[-0.04em]">
              {c.heading[0]}
              <span className="text-holo italic">{c.heading[1]}</span>
              {c.heading[2]}
            </h1>
            <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-slate-700">{c.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#products" className="inline-flex items-center justify-center gap-2 btn-holo rounded-full h-12 px-7 text-base font-medium">
                Browse products
              </a>
              <a href="#request" className="inline-flex items-center justify-center rounded-full h-12 px-7 text-base font-medium border border-slate-200 bg-white/70 text-slate-900 shadow-sm hover:bg-white">
                Send a request
              </a>
            </div>
          </div>
          <ol className="mt-12 hidden gap-4 sm:grid sm:grid-cols-3">
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

      <CatalogueView catalogue={data} />

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white/60 p-6 text-sm leading-relaxed text-slate-600">
          <h2 className="font-semibold text-slate-900">Please note</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {c.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
