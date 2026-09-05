import crypto from 'crypto'
import { NextResponse } from 'next/server'
import {
  getIndustryExperienceApplication,
  getIndustryExperiencePackageById,
  getIndustryExperiencePaymentBySession,
  getIndustryExperienceTrackById,
  insertIndustryExperienceStatusHistory,
  updateIndustryExperienceApplication,
  updateIndustryExperiencePaymentBySession,
} from '@/lib/supabaseServer'

export const runtime = 'nodejs'

function verifyStripeSignature(payload, header, secret) {
  if (!header || !secret) return false
  const values = header.split(',').map(part => part.split('='))
  const timestamp = values.find(([key]) => key === 't')?.[1]
  const signatures = values.filter(([key]) => key === 'v1').map(([, value]) => value)
  if (!timestamp || !signatures.length) return false
  const expected = crypto.createHmac('sha256', secret).update(`${timestamp}.${payload}`, 'utf8').digest('hex')
  const expectedBuffer = Buffer.from(expected, 'hex')
  return signatures.some(signature => {
    const actualBuffer = Buffer.from(signature, 'hex')
    return actualBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(actualBuffer, expectedBuffer)
  })
}

export async function POST(request) {
  const rawBody = await request.text()
  const signature = request.headers.get('stripe-signature')
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!verifyStripeSignature(rawBody, signature, secret)) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })

  const event = JSON.parse(rawBody)
  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const reference = session.metadata?.application_reference
      if (reference) {
        const payment = await getIndustryExperiencePaymentBySession(session.id)
        const application = await getIndustryExperienceApplication(reference)

        await updateIndustryExperiencePaymentBySession(session.id, {
          status: 'paid',
          stripe_payment_intent_id: session.payment_intent || null,
          stripe_customer_id: session.customer || null,
          paid_at: new Date().toISOString(),
        })
        await updateIndustryExperienceApplication(reference, { payment_status: 'paid', application_status: 'under_review' })

        if (payment?.application_id) {
          await insertIndustryExperienceStatusHistory({
            application_id: payment.application_id,
            previous_status: application?.application_status || 'submitted',
            new_status: 'under_review',
            changed_by: 'stripe_webhook',
            note: 'Payment completed; application moved to review',
          })
        }

        if (application) {
          const [track, pkg] = await Promise.all([
            application.track_id ? getIndustryExperienceTrackById(application.track_id) : null,
            application.package_id ? getIndustryExperiencePackageById(application.package_id) : null,
          ])
          await sendPaymentEmails({ application, track, pkg, session }).catch(error => {
            console.error('[industry-experience] payment email:', error)
          })
        }
      }
    }

    if (event.type === 'checkout.session.expired') {
      const session = event.data.object
      const reference = session.metadata?.application_reference
      if (reference) {
        await updateIndustryExperiencePaymentBySession(session.id, { status: 'expired' })
        await updateIndustryExperienceApplication(reference, { payment_status: 'expired' })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[industry-experience] webhook:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function sendPaymentEmails({ application, track, pkg, session }) {
  const apiKey = process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY
  if (!apiKey) return

  const from = process.env.INDUSTRY_EMAIL_FROM || process.env.EMAIL_FROM || 'Webfit Solutions <noreply@webfitt.co.nz>'
  const adminTo = process.env.INDUSTRY_EMAIL_TO || process.env.EMAIL_ADMIN || 'info@webfitt.co.nz'
  const amount = pkg?.price_nzd ?? (session.amount_total ? Number(session.amount_total) / 100 : '')
  const programme = pkg?.name || 'Industry Experience Programme'
  const duration = pkg?.duration_months ? `${pkg.duration_months} month${pkg.duration_months > 1 ? 's' : ''}` : ''
  const trackName = track?.name || 'Selected track'
  const fullName = `${application.first_name || ''} ${application.last_name || ''}`.trim()

  const send = async payload => {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) throw new Error(await response.text())
  }

  await Promise.all([
    send({
      from,
      to: [application.email],
      subject: `Payment received · Application ${application.reference_code}`,
      html: `<p>Hi ${esc(application.first_name)},</p><p>We have received your payment of <strong>NZ$${esc(amount)}</strong> for the Webfit Industry Experience Programme.</p><p><strong>Application reference:</strong> ${esc(application.reference_code)}<br/><strong>Track:</strong> ${esc(trackName)}<br/><strong>Programme:</strong> ${esc(programme)}${duration ? ` (${esc(duration)})` : ''}</p><p>Your application is now <strong>under review</strong>. We will contact you with the next step.</p><p>Webfit Solution Limited<br/>info@webfitt.co.nz<br/>022 605 9422</p>`,
    }),
    send({
      from,
      to: [adminTo],
      reply_to: application.email,
      subject: `Paid Industry Experience application · ${application.reference_code}`,
      html: `<h2>New paid application</h2><p><strong>${esc(fullName)}</strong><br/>${esc(application.email)} · ${esc(application.mobile)}</p><p><strong>Reference:</strong> ${esc(application.reference_code)}<br/><strong>Track:</strong> ${esc(trackName)}<br/><strong>Programme:</strong> ${esc(programme)}${duration ? ` (${esc(duration)})` : ''}<br/><strong>Amount paid:</strong> NZ$${esc(amount)}</p><p><strong>Target role:</strong> ${esc(application.target_role || '')}<br/><strong>Visa/status:</strong> ${esc(application.immigration_status || '')}<br/><strong>Eligibility response:</strong> ${esc(application.visa_work_eligibility || '')}</p><p>Status: <strong>Under review</strong></p>`,
    }),
  ])
}

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
  }[char]))
}
