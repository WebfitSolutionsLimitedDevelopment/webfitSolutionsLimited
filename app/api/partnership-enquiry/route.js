import { NextResponse } from "next/server";

/**
 * Partnership enquiry endpoint for /new-zealand-market-entry.
 *
 * Delivers each enquiry by email via Resend's HTTP API (no npm dependency).
 * Returns { success: true } ONLY when Resend accepts the message. If anything is
 * missing or fails, it returns an error and the form shows an error, never a
 * false "thank you".
 *
 * Required environment variables (Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY              – API key from resend.com
 *   PARTNERSHIP_ENQUIRY_FROM    – a sender on a domain verified in Resend,
 *                                 e.g. "Webfit Website <website@webfitt.co.nz>"
 * Optional:
 *   PARTNERSHIP_ENQUIRY_TO      – defaults to info@webfitt.co.nz
 *
 * If the site already sends email another way (e.g. the industry-experience
 * apply route uses SMTP/nodemailer or another provider), swap sendEmail() for that
 * transport and keep the rest of this file as is.
 */

export const runtime = "nodejs";
const DEFAULT_TO = "info@webfitt.co.nz";
const LIMITS = {
  contactName: 120,
  companyName: 160,
  country: 80,
  email: 200,
  phone: 40,
  website: 300,
  productCategory: 80,
  productDescription: 2000,
  exportMarkets: 300,
  wholesalePricing: 300,
  launchBudgetNzd: 60,
  additionalInfo: 3000
};
const REQUIRED = ["contactName", "companyName", "country", "email", "productCategory", "productDescription"];
const LABELS = {
  contactName: "Contact name",
  companyName: "Company name",
  country: "Country",
  email: "Business email",
  phone: "Phone / WhatsApp",
  website: "Website or catalogue",
  productCategory: "Product category",
  productDescription: "Product description",
  exportMarkets: "Existing export markets",
  wholesalePricing: "Indicative wholesale pricing",
  launchBudgetNzd: "Proposed launch budget (NZD)",
  supportNeeded: "Support needed",
  additionalInfo: "Additional information"
};
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
function clean(v, max) {
  return typeof v === "string" ? v.replace(/\r/g, "").trim().slice(0, max) : "";
}
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
async function sendEmail(opts) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: opts.from,
      to: [opts.to],
      reply_to: opts.replyTo,
      subject: opts.subject,
      html: opts.html,
      text: opts.text
    })
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend responded ${res.status}: ${detail.slice(0, 300)}`);
  }
}
export async function POST(req) {
  if (!(process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY)) {
    console.error("[partnership-enquiry] Email delivery is not configured (RESEND_API_KEY / PARTNERSHIP_ENQUIRY_FROM).");
    return NextResponse.json({
      success: false,
      error: "Our enquiry form is temporarily unavailable. Please email info@webfitt.co.nz."
    }, {
      status: 503
    });
  }
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({
      success: false,
      error: "Invalid request."
    }, {
      status: 400
    });
  }

  // Honeypot: pretend success to bots but send nothing.
  if (typeof body.companyFax === "string" && body.companyFax.trim() !== "") {
    return NextResponse.json({
      success: true
    });
  }
  const data = {};
  for (const [key, max] of Object.entries(LIMITS)) data[key] = clean(body[key], max);
  const supportNeeded = Array.isArray(body.supportNeeded) ? body.supportNeeded.filter(s => typeof s === "string").map(s => s.slice(0, 120)).slice(0, 10) : [];
  const missing = REQUIRED.filter(k => !data[k]);
  if (missing.length || supportNeeded.length === 0) {
    return NextResponse.json({
      success: false,
      error: "Please complete all required fields."
    }, {
      status: 400
    });
  }
  if (!EMAIL_RE.test(data.email)) {
    return NextResponse.json({
      success: false,
      error: "Please enter a valid business email."
    }, {
      status: 400
    });
  }
  if (body.consent !== true) {
    return NextResponse.json({
      success: false,
      error: "Please confirm you agree to be contacted and have read the Privacy Policy."
    }, {
      status: 400
    });
  }
  const rows = [...Object.keys(LIMITS).filter(k => k !== "additionalInfo").map(k => [LABELS[k], data[k]]), [LABELS.supportNeeded, supportNeeded.join(", ")], [LABELS.additionalInfo, data.additionalInfo], ["Consent", "Agreed to be contacted and has read the Privacy Policy"], ["Submitted", new Date().toLocaleString("en-NZ", {
    timeZone: "Pacific/Auckland"
  }) + " NZT"]];
  const html = `
    <h2 style="font-family:Arial,sans-serif">New partnership enquiry — NZ Market Entry</h2>
    <table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
      ${rows.map(([k, v]) => `<tr><td style="vertical-align:top;font-weight:bold;border-bottom:1px solid #eee">${escapeHtml(k)}</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${escapeHtml(v || "—")}</td></tr>`).join("")}
    </table>`;
  const text = rows.map(([k, v]) => `${k}: ${v || "—"}`).join("\n");

  // Strip CR/LF from anything used in headers.
  const subject = `Partnership enquiry: ${data.companyName} (${data.country})`.replace(/[\r\n]+/g, " ").slice(0, 200);
  try {
    await sendEmail({
      from: process.env.PARTNERSHIP_ENQUIRY_FROM || process.env.EMAIL_FROM || process.env.INDUSTRY_EMAIL_FROM || 'Webfit Solutions Limited <noreply@webfitt.co.nz>',
      to: process.env.PARTNERSHIP_ENQUIRY_TO || DEFAULT_TO,
      replyTo: data.email,
      subject,
      html,
      text
    });
  } catch (err) {
    console.error("[partnership-enquiry] Delivery failed:", err);
    return NextResponse.json({
      success: false,
      error: "Sorry, we couldn’t send your enquiry. Please try again, or email info@webfitt.co.nz."
    }, {
      status: 502
    });
  }
  return NextResponse.json({
    success: true
  });
}
