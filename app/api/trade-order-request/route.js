import { NextResponse } from 'next/server'
import { PRODUCT_BY_ID, CATEGORY_BY_ID } from '@/lib/trade-catalogue'

// Emails trade pre-order requests from /catalogue to info@webfitt.co.nz via Resend,
// using the same settings as the site's other forms. Reply-To is the requester.
// Returns { success: true } only when the email provider accepts the message.

export const runtime = 'nodejs'

const DEFAULT_TO = 'info@webfitt.co.nz'
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/
const BUSINESS_TYPES = ['Retail store / supermarket', 'Wholesaler / distributor', 'Restaurant / caterer', 'Online store', 'Other']

const clean = (v, max) => (typeof v === 'string' ? v.replace(/\r/g, '').trim().slice(0, max) : '')
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
const fail = (error, status = 400) => NextResponse.json({ success: false, error }, { status })

export async function POST(req) {
  const apiKey = process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY
  if (!apiKey) {
    console.error('[trade-order-request] Email delivery is not configured.')
    return fail('Our request form is temporarily unavailable. Please email info@webfitt.co.nz.', 503)
  }

  let body
  try {
    body = await req.json()
  } catch {
    return fail('Invalid request.')
  }

  if (typeof body.companyFax === 'string' && body.companyFax.trim() !== '') {
    return NextResponse.json({ success: true })
  }

  const d = {
    businessName: clean(body.businessName, 160),
    contactName: clean(body.contactName, 120),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    businessType: clean(body.businessType, 60),
    city: clean(body.city, 80),
    notes: clean(body.notes, 2000),
  }
  if (!d.businessName || !d.contactName || !d.email || !d.phone || !d.city || !BUSINESS_TYPES.includes(d.businessType)) {
    return fail('Please complete all required fields.')
  }
  if (!EMAIL_RE.test(d.email)) return fail('Please enter a valid email address.')
  if (body.consent !== true) return fail('Please confirm you agree to be contacted and have read the Privacy Policy.')

  const items = (Array.isArray(body.items) ? body.items : [])
    .slice(0, 100)
    .map((x) => ({ product: PRODUCT_BY_ID[x && x.id], qty: Math.floor(Number(x && x.qty)) }))
    .filter((x) => x.product && Number.isFinite(x.qty) && x.qty > 0 && x.qty <= 9999)
  if (items.length === 0) return fail('Please add at least one product to your request list.')

  const totalPacks = items.reduce((s, x) => s + x.qty, 0)
  const submitted = new Date().toLocaleString('en-NZ', { timeZone: 'Pacific/Auckland' }) + ' NZT'

  const itemRows = items
    .map((x) => `<tr><td style="padding:6px;border-bottom:1px solid #eee">${esc(x.product.name)}</td><td style="padding:6px;border-bottom:1px solid #eee">${esc(CATEGORY_BY_ID[x.product.category]?.name || '')}</td><td style="padding:6px;border-bottom:1px solid #eee">${esc(x.product.packSize)}</td><td style="padding:6px;border-bottom:1px solid #eee;text-align:right"><b>${x.qty}</b></td></tr>`)
    .join('')
  const details = [
    ['Business', d.businessName], ['Contact', d.contactName], ['Email', d.email], ['Phone', d.phone],
    ['Business type', d.businessType], ['Town / city', d.city], ['Notes', d.notes || '—'], ['Submitted', submitted],
  ]
  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px">
      <h2>Trade pre-order request</h2>
      <table cellpadding="4" style="border-collapse:collapse">${details.map(([k, v]) => `<tr><td style="font-weight:bold;vertical-align:top">${esc(k)}</td><td style="white-space:pre-wrap">${esc(v)}</td></tr>`).join('')}</table>
      <h3>Products (${items.length} products, ${totalPacks} packs)</h3>
      <table style="border-collapse:collapse"><tr><th align="left" style="padding:6px">Product</th><th align="left" style="padding:6px">Category</th><th align="left" style="padding:6px">Pack</th><th align="right" style="padding:6px">Qty (packs)</th></tr>${itemRows}</table>
      <p style="color:#666">Not a confirmed order. No payment taken.</p>
    </div>`
  const text = [
    'Trade pre-order request', '',
    ...details.map(([k, v]) => `${k}: ${v}`), '',
    `Products (${items.length} products, ${totalPacks} packs):`,
    ...items.map((x) => `- ${x.product.name} (${x.product.packSize}) x ${x.qty}`),
  ].join('\n')

  const subject = `Trade pre-order request: ${d.businessName} (${d.city})`.replace(/[\r\n]+/g, ' ').slice(0, 200)

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.TRADE_ORDER_FROM || process.env.EMAIL_FROM || process.env.INDUSTRY_EMAIL_FROM || 'Webfit Solutions Limited <noreply@webfitt.co.nz>',
        to: [process.env.TRADE_ORDER_TO || DEFAULT_TO],
        reply_to: d.email,
        subject,
        html,
        text,
      }),
    })
    if (!res.ok) throw new Error(`Resend responded ${res.status}: ${(await res.text().catch(() => '')).slice(0, 300)}`)
  } catch (err) {
    console.error('[trade-order-request] Delivery failed:', err)
    return fail('Sorry, we couldn’t send your request. Please try again, or email info@webfitt.co.nz.', 502)
  }

  return NextResponse.json({ success: true })
}
