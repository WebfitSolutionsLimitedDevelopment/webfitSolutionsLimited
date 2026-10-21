'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Minus, Plus, Trash2, CheckCircle2, AlertCircle, Loader2, ArrowRight, ShoppingBasket } from 'lucide-react'

const MAX_QTY = 9999

const inputCls =
  'flex w-full rounded-md border border-slate-200 bg-white/60 px-3 h-11 text-base md:text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-500'
const labelCls = 'font-medium text-slate-600 text-xs uppercase tracking-wider'

const plural = (n, unit) => `${n} ${n === 1 ? unit.one : unit.many}`

function QtyControl({ value, onChange, label }) {
  const set = (n) => onChange(Math.max(0, Math.min(MAX_QTY, Number.isFinite(n) ? Math.floor(n) : 0)))
  return (
    <div className="flex items-center rounded-full border border-slate-200 bg-white">
      <button type="button" onClick={() => set(value - 1)} aria-label={`Decrease ${label}`} className="flex h-9 w-9 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100">
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        max={MAX_QTY}
        value={value}
        onChange={(e) => set(parseInt(e.target.value, 10))}
        aria-label={`Quantity of ${label}`}
        className="h-9 w-12 bg-transparent text-center text-sm font-semibold focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button type="button" onClick={() => set(value + 1)} aria-label={`Increase ${label}`} className="flex h-9 w-9 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100">
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}

function ProductImages({ slug, product, priority }) {
  const [i, setI] = useState(0)
  const imgs = product.images
  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white">
        <Image
          src={`/catalogues/${slug}/${imgs[i]}`}
          alt={product.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-3"
        />
      </div>
      {imgs.length > 1 && (
        <div className="mt-2 flex gap-2 px-1">
          {imgs.map((src, k) => (
            <button
              key={src}
              type="button"
              onClick={() => setI(k)}
              aria-label={`Show photo ${k + 1} of ${product.name}`}
              className={`relative h-12 w-12 overflow-hidden rounded-lg border bg-white ${k === i ? 'border-violet-500 ring-1 ring-violet-500' : 'border-slate-200'}`}
            >
              <Image src={`/catalogues/${slug}/${src}`} alt="" fill sizes="48px" className="object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function CatalogueView({ catalogue }) {
  const { slug, unit, businessTypes, notesPlaceholder, categories, products } = catalogue
  const byId = useMemo(() => Object.fromEntries(products.map((p) => [p.id, p])), [products])

  const [qty, setQty] = useState({})
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const setItem = (id, n) =>
    setQty((q) => {
      const next = { ...q }
      if (n > 0) next[id] = n
      else delete next[id]
      return next
    })

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase()
    return products.filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        (!term || p.name.toLowerCase().includes(term) || (p.code || '').toLowerCase().includes(term))
    )
  }, [products, category, query])

  const selected = Object.entries(qty).map(([id, n]) => ({ ...byId[id], qty: n }))
  const total = selected.reduce((s, x) => s + x.qty, 0)

  async function submit(e) {
    e.preventDefault()
    if (selected.length === 0) {
      setStatus('error')
      setError('Please add at least one product to your request list.')
      return
    }
    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      catalogue: slug,
      businessName: String(fd.get('businessName') || ''),
      contactName: String(fd.get('contactName') || ''),
      email: String(fd.get('email') || ''),
      phone: String(fd.get('phone') || ''),
      businessType: String(fd.get('businessType') || ''),
      city: String(fd.get('city') || ''),
      notes: String(fd.get('notes') || ''),
      consent: fd.get('consent') === 'on',
      companyFax: String(fd.get('companyFax') || ''),
      items: selected.map((x) => ({ id: x.id, qty: x.qty })),
    }
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/trade-order-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.success === true) {
        setStatus('done')
        setQty({})
        form.reset()
      } else {
        setStatus('error')
        setError(data.error || 'Sorry, we couldn’t send your request. Please try again, or email info@webfitt.co.nz.')
      }
    } catch {
      setStatus('error')
      setError('Sorry, we couldn’t send your request. Please try again, or email info@webfitt.co.nz.')
    }
  }

  let shown = 0

  return (
    <>
      <section id="products" className="scroll-mt-20 px-4 py-14 md:py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.035em]">Products</h2>
              <p className="mt-2 text-slate-600">
                {products.length} products · quantities are in {unit.many}
              </p>
            </div>
            <label className="relative block md:w-72">
              <span className="sr-only">Search products</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name or code" className={`${inputCls} pl-9`} />
            </label>
          </div>

          <div className="sticky top-0 z-30 -mx-4 mt-6 bg-background/90 px-4 py-2 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filter by category">
              {[{ id: 'all', name: 'All products' }, ...categories].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={category === c.id}
                  onClick={() => setCategory(c.id)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${category === c.id ? 'btn-holo' : 'border border-slate-200 bg-white/70 text-slate-700 hover:bg-white'}`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {categories
            .filter((c) => visible.some((p) => p.category === c.id))
            .map((c) => (
              <div key={c.id} className="mt-10">
                <h3 className="text-xl font-semibold tracking-tight">{c.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{c.blurb}</p>
                <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {visible
                    .filter((p) => p.category === c.id)
                    .map((p) => {
                      const n = qty[p.id] || 0
                      const priority = shown++ < 3
                      return (
                        <li key={p.id} className={`flex flex-col justify-between gap-4 rounded-3xl glass-card p-3 pb-5 ${n > 0 ? 'ring-2 ring-violet-400' : ''}`}>
                          <ProductImages slug={slug} product={p} priority={priority} />
                          <div className="px-2">
                            <h4 className="text-base font-semibold text-slate-950">{p.name}</h4>
                            <dl className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                              {p.details.map(([k, v]) => (
                                <div key={k}>
                                  <dt className="inline text-slate-400">{k} </dt>
                                  <dd className="inline font-medium">{v}</dd>
                                </div>
                              ))}
                            </dl>
                          </div>
                          <div className="flex items-center justify-between px-2">
                            {n === 0 ? (
                              <button type="button" onClick={() => setItem(p.id, 1)} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50">
                                <Plus className="h-4 w-4" aria-hidden="true" /> Add to request
                              </button>
                            ) : (
                              <QtyControl value={n} onChange={(v) => setItem(p.id, v)} label={p.name} />
                            )}
                          </div>
                        </li>
                      )
                    })}
                </ul>
              </div>
            ))}
          {visible.length === 0 && <p className="mt-10 text-slate-600">No products match your search.</p>}
        </div>
      </section>

      <section id="request" className="scroll-mt-20 bg-mesh-soft px-4 py-16 md:py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-5">
            <div className="rounded-3xl glass-card p-6 lg:sticky lg:top-24">
              <div className="flex items-center gap-2">
                <ShoppingBasket className="h-5 w-5 text-violet-700" aria-hidden="true" />
                <h2 className="text-lg font-semibold tracking-tight">Your request list</h2>
              </div>
              {selected.length === 0 ? (
                <p className="mt-4 text-sm text-slate-600">
                  No products added yet.{' '}
                  <a href="#products" className="font-medium text-violet-700 underline underline-offset-2">
                    Browse products
                  </a>
                </p>
              ) : (
                <>
                  <ul className="mt-4 divide-y divide-slate-200/70">
                    {selected.map((x) => (
                      <li key={x.id} className="flex items-center justify-between gap-3 py-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white">
                          <Image src={`/catalogues/${slug}/${x.images[0]}`} alt="" fill sizes="48px" className="object-contain p-1" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{x.name}</p>
                          <p className="text-xs text-slate-500">{x.code || x.details?.[0]?.[1]}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <QtyControl value={x.qty} onChange={(v) => setItem(x.id, v)} label={x.name} />
                          <button type="button" onClick={() => setItem(x.id, 0)} aria-label={`Remove ${x.name}`} className="rounded-full p-2 text-slate-400 hover:bg-white hover:text-red-600">
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 border-t border-slate-200/70 pt-3 text-sm text-slate-700">
                    {selected.length} product{selected.length === 1 ? '' : 's'} · {plural(total, unit)}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <div className="rounded-3xl glass-card p-6 sm:p-8">
              {status === 'done' ? (
                <div role="status" className="flex flex-col items-start gap-4 py-4">
                  <CheckCircle2 className="h-10 w-10 text-violet-600" aria-hidden="true" />
                  <p className="text-lg leading-relaxed text-slate-800">
                    Thank you. We&apos;ve received your pre-order request and will contact you to confirm pricing,
                    availability and lead times. This is not a confirmed order and no payment has been taken.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <h2 className="text-2xl font-semibold tracking-tight">Send your pre-order request</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="businessName" className={labelCls}>Business name *</label>
                      <input id="businessName" name="businessName" required maxLength={160} autoComplete="organization" className={inputCls} />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="contactName" className={labelCls}>Contact name *</label>
                      <input id="contactName" name="contactName" required maxLength={120} autoComplete="name" className={inputCls} />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email" className={labelCls}>Email *</label>
                      <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" className={inputCls} />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className={labelCls}>Phone *</label>
                      <input id="phone" name="phone" type="tel" required maxLength={40} autoComplete="tel" className={inputCls} />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="businessType" className={labelCls}>Business type *</label>
                      <select id="businessType" name="businessType" required defaultValue="" className={inputCls}>
                        <option value="" disabled>Select</option>
                        {businessTypes.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="city" className={labelCls}>Town / city *</label>
                      <input id="city" name="city" required maxLength={80} autoComplete="address-level2" placeholder="e.g. Auckland" className={inputCls} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="notes" className={labelCls}>
                      Notes <span className="normal-case tracking-normal text-slate-400">(optional)</span>
                    </label>
                    <textarea id="notes" name="notes" rows={3} maxLength={2000} placeholder={notesPlaceholder} className={`${inputCls} h-auto min-h-[88px] py-2`} />
                  </div>
                  <div aria-hidden="true" className="hidden">
                    <input name="companyFax" tabIndex={-1} autoComplete="off" />
                  </div>
                  <label className="flex items-start gap-3 text-sm text-slate-700">
                    <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 accent-violet-600" />
                    <span>
                      I agree to be contacted about this request and have read the{' '}
                      <Link href="/privacy-policy" target="_blank" className="font-medium text-violet-700 underline underline-offset-2">
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                  {status === 'error' && error && (
                    <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{error}</span>
                    </div>
                  )}
                  <button type="submit" disabled={status === 'sending'} className="inline-flex w-full items-center justify-center gap-2 btn-holo rounded-full h-12 text-base font-medium disabled:opacity-60">
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending…
                      </>
                    ) : (
                      <>
                        Send Pre-Order Request <ArrowRight className="h-5 w-5" aria-hidden="true" />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-slate-500">No payment is taken. We&apos;ll confirm pricing and availability before anything is ordered.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {selected.length > 0 && status !== 'done' && (
        <a href="#request" className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-between rounded-full btn-holo px-5 py-3 text-sm font-medium shadow-lg lg:hidden">
          <span>
            {selected.length} product{selected.length === 1 ? '' : 's'} · {plural(total, unit)}
          </span>
          <span className="inline-flex items-center gap-1">
            Review request <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </a>
      )}
    </>
  )
}
