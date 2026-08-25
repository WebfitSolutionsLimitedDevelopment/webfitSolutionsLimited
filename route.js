import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

/* ============================================================================
   API ROUTES — Webfit Solutions
   Contact form saves to MongoDB and (optionally) sends an email notification.
   Email integration is placeholder / configurable via environment variables
   so you can turn it on later without touching code.
   ============================================================================

   To enable email notifications, set these in your .env (or Vercel env vars):

   EMAIL_PROVIDER   = "resend"  |  "sendgrid"   (leave empty to disable)
   EMAIL_API_KEY    = <your provider API key>
   EMAIL_TO         = hello@webfitt.com   (where enquiries are delivered)
   EMAIL_FROM       = "Webfit Website <noreply@webfitt.com>"

   The form will always work (enquiries stored in MongoDB) even if email
   is not configured.
   ============================================================================ */

const uri = process.env.MONGO_URL
const dbName = process.env.DB_NAME || 'webfit'

let cachedClient = null
async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(uri)
    await cachedClient.connect()
  }
  return cachedClient.db(dbName)
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function GET(request, { params }) {
  const path = (params?.path || []).join('/')
  try {
    if (path === '' || path === 'health') {
      return NextResponse.json(
        {
          status: 'ok',
          service: 'webfit-api',
          emailConfigured: Boolean(process.env.EMAIL_PROVIDER && process.env.EMAIL_API_KEY),
        },
        { headers: corsHeaders }
      )
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500, headers: corsHeaders })
  }
}

export async function POST(request, { params }) {
  const path = (params?.path || []).join('/')
  try {
    const body = await request.json()

    if (path === 'contact' || path === 'enquiry') {
      const doc = {
        id: uuidv4(),
        name: String(body.name || '').trim(),
        email: String(body.email || '').trim(),
        phone: String(body.phone || '').trim(),
        company: String(body.company || '').trim(),
        message: String(body.message || '').trim(),
        type: body.type || 'enquiry',
        createdAt: new Date().toISOString(),
      }

      if (!doc.name || !doc.email || !doc.message) {
        return NextResponse.json(
          { success: false, error: 'Name, email and message are required.' },
          { status: 400, headers: corsHeaders }
        )
      }

      // 1) Persist to MongoDB so nothing is ever lost, even if email fails
      let dbSaved = false
      try {
        const db = await getDb()
        await db.collection('enquiries').insertOne(doc)
        dbSaved = true
      } catch (dbErr) {
        console.error('[enquiry] DB save failed:', dbErr.message)
      }

      // 2) Email notification — awaited so we know if it actually went out
      let emailSent = false
      try {
        const result = await sendEnquiryEmail(doc)
        emailSent = Boolean(result && !result.skipped)
      } catch (err) {
        console.error('[enquiry] Email send failed:', err.message)
      }

      // IMPORTANT: only report success if the enquiry was actually captured
      // somewhere (database OR email). Otherwise the customer sees a green
      // "thanks, we'll be in touch" toast while the message goes nowhere.
      if (!dbSaved && !emailSent) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Sorry, we couldn't submit your enquiry right now. Please call us or email hello@webfitt.com directly and we'll get back to you.",
          },
          { status: 500, headers: corsHeaders }
        )
      }

      return NextResponse.json({ success: true, id: doc.id, dbSaved, emailSent }, { headers: corsHeaders })
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500, headers: corsHeaders })
  }
}

/* ------------------------------------------------------------------ */
/* Email delivery — multi-provider ready. No-op if not configured.     */
/* ------------------------------------------------------------------ */

async function sendEnquiryEmail(enquiry) {
  const provider = (process.env.EMAIL_PROVIDER || '').toLowerCase()
  const apiKey = process.env.EMAIL_API_KEY
  const to = process.env.EMAIL_TO || 'hello@webfitt.com'
  const from = process.env.EMAIL_FROM || 'Webfit Website <onboarding@resend.dev>'

  if (!provider || !apiKey || !to) {
    // Email not configured yet — that's fine, we already saved to DB.
    return { skipped: true, reason: 'email_not_configured' }
  }

  const subject = `New enquiry from ${enquiry.name}${enquiry.company ? ` (${enquiry.company})` : ''}`
  const html = buildEnquiryHtml(enquiry)
  const text = buildEnquiryText(enquiry)

  if (provider === 'resend') {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: Array.isArray(to) ? to : [to],
        reply_to: enquiry.email,
        subject,
        html,
        text,
      }),
    })
    if (!res.ok) throw new Error(`Resend error ${res.status}: ${await res.text()}`)
    return await res.json()
  }

  if (provider === 'sendgrid') {
    const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: parseFrom(from),
        reply_to: { email: enquiry.email, name: enquiry.name },
        subject,
        content: [
          { type: 'text/plain', value: text },
          { type: 'text/html', value: html },
        ],
      }),
    })
    if (!res.ok) throw new Error(`SendGrid error ${res.status}: ${await res.text()}`)
    return { ok: true }
  }

  return { skipped: true, reason: 'unsupported_provider' }
}

function parseFrom(fromString) {
  const m = fromString.match(/^(.*)<(.+)>$/)
  if (m) return { name: m[1].trim(), email: m[2].trim() }
  return { email: fromString.trim() }
}

function buildEnquiryText(e) {
  return [
    'New enquiry from the Webfit Solutions website',
    '',
    `Name:    ${e.name}`,
    `Email:   ${e.email}`,
    `Phone:   ${e.phone || '-'}`,
    `Company: ${e.company || '-'}`,
    `Type:    ${e.type}`,
    `When:    ${e.createdAt}`,
    '',
    'Message:',
    e.message,
  ].join('\n')
}

function buildEnquiryHtml(e) {
  const row = (k, v) =>
    `<tr><td style="padding:6px 12px;color:#64748b;font-size:13px;">${k}</td><td style="padding:6px 12px;color:#0f172a;font-size:14px;font-weight:500;">${escapeHtml(v || '-')}</td></tr>`
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f8fafc;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#0a66c2,#0ea5e9);padding:20px 24px;color:#fff;">
        <div style="font-size:13px;opacity:.8;">Webfit Solutions</div>
        <div style="font-size:20px;font-weight:700;margin-top:2px;">New enquiry received</div>
      </div>
      <div style="padding:8px 12px 20px;">
        <table style="width:100%;border-collapse:collapse;">
          ${row('Name', e.name)}
          ${row('Email', e.email)}
          ${row('Phone', e.phone)}
          ${row('Company', e.company)}
          ${row('Type', e.type)}
          ${row('When', e.createdAt)}
        </table>
        <div style="padding:12px;margin-top:8px;background:#f1f5f9;border-radius:8px;color:#0f172a;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(e.message)}</div>
      </div>
      <div style="padding:12px 24px;background:#f8fafc;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px;">
        Reply directly to this email to respond to ${escapeHtml(e.name)}.
      </div>
    </div>
  </body></html>`
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
