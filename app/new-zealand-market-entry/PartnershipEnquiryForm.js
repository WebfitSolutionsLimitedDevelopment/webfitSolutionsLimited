"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
const SUPPORT_OPTIONS = ["Market research and opportunity assessment", "Local business contact and enquiry coordination", "Buyer, retailer and distributor outreach", "Website and ecommerce setup", "Digital marketing and promotional campaigns", "Sales development and customer communication", "Coordination with freight, customs and logistics providers", "Not sure yet"];
const PRODUCT_CATEGORIES = ["Food and beverage", "Health, beauty and personal care", "Home, kitchen and living", "Apparel, textiles and footwear", "Handicrafts, gifts and décor", "Furniture", "Building, hardware and industrial", "Electronics and accessories", "Agriculture and horticulture", "Other"];
const SUCCESS_MESSAGE = "Thank you for your enquiry. We’ll review your information and contact you to discuss whether there is a suitable opportunity.";
const inputCls = "flex w-full rounded-md border border-slate-200 bg-white/60 px-3 py-1 h-11 text-base md:text-sm shadow-sm transition-colors placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-500 disabled:opacity-50";
const textareaCls = "flex w-full min-h-[96px] rounded-md border border-slate-200 bg-white/60 px-3 py-2 text-base md:text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-500 disabled:opacity-50";
const labelCls = "font-medium text-slate-600 text-xs uppercase tracking-wider";
function Field({
  id,
  label,
  optional,
  children
}) {
  return <div className="space-y-1.5">
      <label htmlFor={id} className={labelCls}>
        {label}
        {optional ? <span className="ml-1 normal-case tracking-normal text-slate-400">(optional)</span> : <span aria-hidden="true"> *</span>}
      </label>
      {children}
    </div>;
}
export default function PartnershipEnquiryForm() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const supportNeeded = fd.getAll("supportNeeded").map(String);
    if (supportNeeded.length === 0) {
      setStatus("error");
      setError("Please select at least one type of support you need.");
      return;
    }
    const payload = {
      contactName: String(fd.get("contactName") ?? ""),
      companyName: String(fd.get("companyName") ?? ""),
      country: String(fd.get("country") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      website: String(fd.get("website") ?? ""),
      productCategory: String(fd.get("productCategory") ?? ""),
      productDescription: String(fd.get("productDescription") ?? ""),
      exportMarkets: String(fd.get("exportMarkets") ?? ""),
      wholesalePricing: String(fd.get("wholesalePricing") ?? ""),
      launchBudgetNzd: String(fd.get("launchBudgetNzd") ?? ""),
      supportNeeded,
      additionalInfo: String(fd.get("additionalInfo") ?? ""),
      consent: fd.get("consent") === "on",
      // Honeypot — real users never see or fill this.
      companyFax: String(fd.get("companyFax") ?? "")
    };
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/partnership-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      // Only show success when the server confirms the email was accepted for delivery.
      if (res.ok && data?.success === true) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError(data?.error || "Sorry, we couldn’t send your enquiry. Please try again, or email info@webfitt.co.nz.");
      }
    } catch {
      setStatus("error");
      setError("Sorry, we couldn’t send your enquiry. Please try again, or email info@webfitt.co.nz.");
    }
  }
  if (status === "success") {
    return <div role="status" aria-live="polite" className="flex flex-col items-start gap-4 py-6">
        <CheckCircle2 className="h-10 w-10 text-violet-600" aria-hidden="true" />
        <p className="text-lg leading-relaxed text-slate-800">{SUCCESS_MESSAGE}</p>
      </div>;
  }
  const submitting = status === "submitting";
  return <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="contactName" label="Contact name">
          <input id="contactName" name="contactName" required maxLength={120} autoComplete="name" className={inputCls} />
        </Field>
        <Field id="companyName" label="Company name">
          <input id="companyName" name="companyName" required maxLength={160} autoComplete="organization" className={inputCls} />
        </Field>
        <Field id="country" label="Country">
          <input id="country" name="country" required maxLength={80} autoComplete="country-name" placeholder="e.g. India" className={inputCls} />
        </Field>
        <Field id="email" label="Business email">
          <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" className={inputCls} />
        </Field>
        <Field id="phone" label="Phone or WhatsApp number" optional>
          <input id="phone" name="phone" type="tel" maxLength={40} autoComplete="tel" placeholder="Include country code" className={inputCls} />
        </Field>
        <Field id="website" label="Website or catalogue link" optional>
          <input id="website" name="website" type="url" maxLength={300} placeholder="https://" className={inputCls} />
        </Field>
        <Field id="productCategory" label="Product category">
          <select id="productCategory" name="productCategory" required defaultValue="" className={inputCls}>
            <option value="" disabled>
              Select a category
            </option>
            {PRODUCT_CATEGORIES.map(c => <option key={c} value={c}>
                {c}
              </option>)}
          </select>
        </Field>
        <Field id="exportMarkets" label="Existing export markets" optional>
          <input id="exportMarkets" name="exportMarkets" maxLength={300} placeholder="e.g. Australia, UK" className={inputCls} />
        </Field>
      </div>

      <Field id="productDescription" label="Brief product description">
        <textarea id="productDescription" name="productDescription" required maxLength={2000} rows={4} className={textareaCls} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="wholesalePricing" label="Indicative wholesale pricing and currency" optional>
          <input id="wholesalePricing" name="wholesalePricing" maxLength={300} placeholder="e.g. INR 450 per unit, MOQ 500" className={inputCls} />
        </Field>
        <Field id="launchBudgetNzd" label="Proposed launch budget (NZD)" optional>
          <input id="launchBudgetNzd" name="launchBudgetNzd" maxLength={60} inputMode="decimal" placeholder="e.g. 10,000" className={inputCls} />
        </Field>
      </div>

      <fieldset className="space-y-3">
        <legend className={labelCls}>
          What support do you need?<span aria-hidden="true"> *</span>
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {SUPPORT_OPTIONS.map(opt => <label key={opt} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white/60 px-3 py-2.5 text-sm text-slate-700 cursor-pointer hover:bg-white">
              <input type="checkbox" name="supportNeeded" value={opt} className="mt-0.5 h-4 w-4 accent-violet-600" />
              <span>{opt}</span>
            </label>)}
        </div>
      </fieldset>

      <Field id="additionalInfo" label="Additional information" optional>
        <textarea id="additionalInfo" name="additionalInfo" maxLength={3000} rows={4} className={textareaCls} />
      </Field>

      {/* Honeypot field, hidden from people and assistive tech */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="companyFax">Company fax</label>
        <input id="companyFax" name="companyFax" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-sm text-slate-700">
        <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 accent-violet-600" />
        <span>
          I agree to be contacted about this enquiry and have read the{" "}
          <Link href="/privacy-policy" className="font-medium text-violet-700 underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      {status === "error" && error && <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>}

      <button type="submit" disabled={submitting} className="inline-flex items-center justify-center gap-2 whitespace-nowrap btn-holo rounded-full w-full h-12 text-base font-medium disabled:opacity-60 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2">
        {submitting ? <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending…
          </> : <>
            Submit Partnership Enquiry <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </>}
      </button>
    </form>;
}
