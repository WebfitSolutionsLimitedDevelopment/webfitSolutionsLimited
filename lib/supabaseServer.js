function getConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceRoleKey) throw new Error('Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.')
  return { url: url.replace(/\/$/, ''), serviceRoleKey }
}

function headers(serviceRoleKey, prefer) {
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    'Content-Type': 'application/json',
    ...(prefer ? { Prefer: prefer } : {}),
  }
}

async function rest(path, options = {}) {
  const { url, serviceRoleKey } = getConfig()
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: { ...headers(serviceRoleKey, options.prefer), ...(options.headers || {}) },
    cache: 'no-store',
  })
  const text = await response.text()
  if (!response.ok) throw new Error(`Supabase request failed: ${response.status} ${text}`)
  if (!text) return null
  return JSON.parse(text)
}

export async function getIndustryExperienceTrackById(id) {
  const params = new URLSearchParams({ id: `eq.${id}`, select: '*' })
  const rows = await rest(`industry_experience_tracks?${params}`)
  return rows?.[0] || null
}

export async function getIndustryExperienceTrackBySlug(slug) {
  const params = new URLSearchParams({ slug: `eq.${slug}`, is_active: 'eq.true', select: '*' })
  const rows = await rest(`industry_experience_tracks?${params}`)
  return rows?.[0] || null
}

export async function getIndustryExperiencePackageBySlug(slug) {
  const params = new URLSearchParams({ slug: `eq.${slug}`, is_active: 'eq.true', select: '*' })
  const rows = await rest(`industry_experience_packages?${params}`)
  return rows?.[0] || null
}

export async function getIndustryExperiencePackageById(id) {
  const params = new URLSearchParams({ id: `eq.${id}`, select: '*' })
  const rows = await rest(`industry_experience_packages?${params}`)
  return rows?.[0] || null
}

export async function insertIndustryExperienceApplication(record) {
  const rows = await rest('industry_experience_applications', {
    method: 'POST', prefer: 'return=representation', body: JSON.stringify(record),
  })
  return rows?.[0] || null
}

export async function insertIndustryExperienceAgreement(record) {
  const rows = await rest('industry_experience_agreements', {
    method: 'POST', prefer: 'return=representation', body: JSON.stringify(record),
  })
  return rows?.[0] || null
}

export async function insertIndustryExperienceStatusHistory(record) {
  const rows = await rest('industry_experience_status_history', {
    method: 'POST', prefer: 'return=representation', body: JSON.stringify(record),
  })
  return rows?.[0] || null
}

export async function getIndustryExperienceApplication(reference) {
  const params = new URLSearchParams({ reference_code: `eq.${reference}`, select: '*' })
  const rows = await rest(`industry_experience_applications?${params}`)
  return rows?.[0] || null
}

export async function updateIndustryExperienceApplication(reference, patch) {
  const params = new URLSearchParams({ reference_code: `eq.${reference}` })
  await rest(`industry_experience_applications?${params}`, {
    method: 'PATCH', prefer: 'return=minimal', body: JSON.stringify(patch),
  })
}

export async function insertIndustryExperiencePayment(record) {
  const rows = await rest('industry_experience_payments', {
    method: 'POST', prefer: 'return=representation', body: JSON.stringify(record),
  })
  return rows?.[0] || null
}

export async function getIndustryExperiencePaymentBySession(sessionId) {
  const params = new URLSearchParams({ stripe_checkout_session_id: `eq.${sessionId}`, select: '*' })
  const rows = await rest(`industry_experience_payments?${params}`)
  return rows?.[0] || null
}

export async function updateIndustryExperiencePaymentBySession(sessionId, patch) {
  const params = new URLSearchParams({ stripe_checkout_session_id: `eq.${sessionId}` })
  await rest(`industry_experience_payments?${params}`, {
    method: 'PATCH', prefer: 'return=minimal', body: JSON.stringify(patch),
  })
}
