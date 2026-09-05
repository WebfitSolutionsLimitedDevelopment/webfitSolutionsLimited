import { NextResponse } from 'next/server'
import {
  getIndustryExperienceApplication,
  getIndustryExperiencePackageById,
  insertIndustryExperiencePayment,
  updateIndustryExperienceApplication,
} from '@/lib/supabaseServer'

const PRICE_ENV = {
  'foundation-1-month': 'STRIPE_PRICE_FOUNDATION_1M',
  'professional-3-month': 'STRIPE_PRICE_PROFESSIONAL_3M',
  'advanced-6-month': 'STRIPE_PRICE_ADVANCED_6M',
}

export async function POST(request) {
  try {
    const { reference } = await request.json()
    if (!reference) return NextResponse.json({ error: 'Application reference is required.' }, { status: 400 })

    const application = await getIndustryExperienceApplication(String(reference).trim())
    if (!application) return NextResponse.json({ error: 'Application not found.' }, { status: 404 })
    if (['rejected', 'withdrawn', 'cancelled', 'completed'].includes(application.application_status)) return NextResponse.json({ error: 'Payment is not available for this application.' }, { status: 409 })
    if (application.payment_status === 'paid') return NextResponse.json({ error: 'This application is already paid.' }, { status: 409 })

    const pkg = await getIndustryExperiencePackageById(application.package_id)
    if (!pkg) throw new Error('Application package was not found.')

    const secretKey = process.env.STRIPE_SECRET_KEY
    const priceId = process.env[PRICE_ENV[pkg.slug]]
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://webfitt.co.nz').replace(/\/$/, '')
    if (!secretKey || !priceId) return NextResponse.json({ error: 'Stripe payment is not configured yet.' }, { status: 503 })

    const form = new URLSearchParams()
    form.set('mode', 'payment')
    form.set('line_items[0][price]', priceId)
    form.set('line_items[0][quantity]', '1')
    form.set('customer_email', application.email)
    form.set('success_url', `${siteUrl}/industry-experience/payment/success?session_id={CHECKOUT_SESSION_ID}`)
    form.set('cancel_url', `${siteUrl}/industry-experience/payment?reference=${encodeURIComponent(application.reference_code)}`)
    form.set('metadata[application_reference]', application.reference_code)
    form.set('metadata[application_id]', application.id)
    form.set('metadata[package_slug]', pkg.slug)

    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${secretKey}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form.toString(),
    })
    const session = await stripeResponse.json()
    if (!stripeResponse.ok) throw new Error(session?.error?.message || 'Stripe checkout creation failed.')

    await insertIndustryExperiencePayment({
      application_id: application.id,
      provider: 'stripe',
      stripe_checkout_session_id: session.id,
      amount_nzd: pkg.price_nzd,
      currency: 'NZD',
      status: 'pending',
    })
    await updateIndustryExperienceApplication(application.reference_code, { payment_status: 'pending' })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('[industry-experience] checkout:', error)
    return NextResponse.json({ error: 'Unable to start payment. Please contact info@webfitt.co.nz.' }, { status: 500 })
  }
}
