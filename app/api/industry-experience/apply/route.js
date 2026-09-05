import { NextResponse } from 'next/server'
import {
  getIndustryExperiencePackageBySlug,
  getIndustryExperienceTrackBySlug,
  insertIndustryExperienceAgreement,
  insertIndustryExperienceApplication,
  insertIndustryExperienceStatusHistory,
} from '@/lib/supabaseServer'
import { getPackage, getTrack } from '@/lib/industryExperience'

const PACKAGE_DB_SLUG = {
  'foundation-1m': 'foundation-1-month',
  'professional-3m': 'professional-3-month',
  'advanced-6m': 'advanced-6-month',
}

function required(value){ return typeof value === 'string' ? value.trim() : value }

export async function POST(request) {
  try {
    const body = await request.json()
    const track = getTrack(body.track)
    const pkg = getPackage(body.packageCode)
    if (!required(body.firstName) || !required(body.lastName) || !required(body.email) || !required(body.mobile) || !required(body.city) || !required(body.visaType) || !required(body.visaWorkEligibility) || !required(body.targetRole) || !track || !pkg) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 })
    }
    if (!body.ndaAccepted || !body.termsAccepted || !body.privacyAccepted || !body.visaDeclarationAccepted) {
      return NextResponse.json({ error: 'All required declarations must be accepted.' }, { status: 400 })
    }

    const dbTrack = await getIndustryExperienceTrackBySlug(track.slug)
    const dbPackage = await getIndustryExperiencePackageBySlug(PACKAGE_DB_SLUG[pkg.code])
    if (!dbTrack || !dbPackage) throw new Error('Configured track or package was not found in Supabase.')

    const reference = `WFS-EXP-${new Date().getFullYear()}-${crypto.randomUUID().slice(0,8).toUpperCase()}`
    const application = await insertIndustryExperienceApplication({
      reference_code: reference,
      first_name: required(body.firstName),
      last_name: required(body.lastName),
      email: required(body.email).toLowerCase(),
      mobile: required(body.mobile),
      current_city: required(body.city) || null,
      linkedin_url: required(body.linkedin) || null,
      institution_name: required(body.institution) || null,
      qualification: required(body.qualification) || null,
      area_of_study: required(body.studyArea) || null,
      graduation_date: body.graduationDate || null,
      target_role: required(body.targetRole) || null,
      immigration_status: required(body.visaType),
      visa_expiry_date: body.visaExpiry || null,
      visa_work_eligibility: required(body.visaWorkEligibility) || null,
      availability_type: required(body.availability) || null,
      available_hours_per_week: body.hoursPerWeek ? Number(body.hoursPerWeek) : null,
      track_id: dbTrack.id,
      package_id: dbPackage.id,
      application_status: 'submitted',
      payment_status: 'not_requested',
      internal_notes: required(body.notes) ? `Applicant note: ${required(body.notes)}` : null,
    })
    if (!application?.id) throw new Error('Application was inserted without an ID.')

    const now = new Date().toISOString()
    const forwardedFor = request.headers.get('x-forwarded-for')
    await insertIndustryExperienceAgreement({
      application_id: application.id,
      nda_accepted: true,
      nda_accepted_at: now,
      terms_accepted: true,
      terms_accepted_at: now,
      no_refund_policy_accepted: true,
      no_refund_policy_accepted_at: now,
      visa_declaration_accepted: true,
      visa_declaration_accepted_at: now,
      privacy_accepted: true,
      privacy_accepted_at: now,
      ip_address: forwardedFor ? forwardedFor.split(',')[0].trim() : null,
      user_agent: request.headers.get('user-agent') || null,
    })

    await insertIndustryExperienceStatusHistory({
      application_id: application.id,
      previous_status: null,
      new_status: 'submitted',
      changed_by: 'website',
      note: 'Application submitted online',
    })

    await sendApplicationPendingEmails({
      application,
      track: dbTrack,
      pkg: dbPackage,
    }).catch(error => {
      console.error('[industry-experience] application email:', error)
    })

    return NextResponse.json({ success: true, reference })
  } catch (error) {
    console.error('[industry-experience] apply:', error)
    return NextResponse.json({ error: 'Application could not be submitted. Please contact info@webfitt.co.nz.' }, { status: 500 })
  }
}


async function sendApplicationPendingEmails({ application, track, pkg }) {
  const apiKey = process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY
  if (!apiKey) return

  const from = process.env.INDUSTRY_EMAIL_FROM || process.env.EMAIL_FROM || 'Webfit Solution Limited <noreply@webfitt.co.nz>'
  const adminTo = process.env.INDUSTRY_EMAIL_TO || process.env.EMAIL_ADMIN || 'info@webfitt.co.nz'
  const fullName = `${application.first_name || ''} ${application.last_name || ''}`.trim()
  const trackName = track?.name || 'Selected track'
  const programme = pkg?.name || 'Industry Experience Programme'
  const duration = pkg?.duration_months ? `${pkg.duration_months} month${pkg.duration_months > 1 ? 's' : ''}` : ''
  const amount = pkg?.price_nzd ?? ''

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
      subject: `Application received · Payment pending · ${application.reference_code}`,
      html: `<p>Hi ${esc(application.first_name)},</p><p>We have received your application for the Webfit Industry Experience Programme.</p><p><strong>Application reference:</strong> ${esc(application.reference_code)}<br/><strong>Track:</strong> ${esc(trackName)}<br/><strong>Programme:</strong> ${esc(programme)}${duration ? ` (${esc(duration)})` : ''}<br/><strong>Programme fee:</strong> NZ$${esc(amount)}</p><p><strong>Payment status: Pending.</strong></p><p>Your application will move to <strong>under review only after successful payment confirmation</strong>. If you did not complete payment, please return to the payment page to continue.</p><p>Webfit Solution Limited<br/>info@webfitt.co.nz<br/>022 605 9422</p>`,
    }),
    send({
      from,
      to: [adminTo],
      reply_to: application.email,
      subject: `New Industry Experience application · Payment pending · ${application.reference_code}`,
      html: `<h2>New application received</h2><p><strong>${esc(fullName)}</strong><br/>${esc(application.email)} · ${esc(application.mobile)}</p><p><strong>Reference:</strong> ${esc(application.reference_code)}<br/><strong>Track:</strong> ${esc(trackName)}<br/><strong>Programme:</strong> ${esc(programme)}${duration ? ` (${esc(duration)})` : ''}<br/><strong>Programme fee:</strong> NZ$${esc(amount)}</p><p><strong>Payment status: Pending.</strong></p><p>Do not treat this application as paid or under review until Stripe payment confirmation is received.</p>`,
    }),
  ])
}

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
  }[char]))
}
