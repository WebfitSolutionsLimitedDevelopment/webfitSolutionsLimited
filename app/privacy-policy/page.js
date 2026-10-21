import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | Webfit Solutions Limited',
  description:
    'How Webfit Solutions Limited collects, uses, stores and protects personal information under the New Zealand Privacy Act 2020.',
  alternates: { canonical: 'https://webfitt.com/privacy-policy' },
}

const LAST_UPDATED = '21 October 2026'

const sections = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    body: (
      <>
        <p>
          This policy explains how Webfit Solutions Limited (&ldquo;Webfit&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
          handles personal information collected through webfitt.com and in the course of our business. We are based
          in Auckland, New Zealand, and we handle personal information in line with the Privacy Act 2020.
        </p>
      </>
    ),
  },
  {
    id: 'what-we-collect',
    title: 'What we collect',
    body: (
      <>
        <p>We only collect information that you give us, or that we need for a purpose described below. Depending on how you deal with us, this may include:</p>
        <ul>
          <li>
            <strong>Enquiries and consultations</strong>: your name, email, phone number, company and the details of
            your enquiry.
          </li>
          <li>
            <strong>Partnership enquiries (New Zealand Market Entry)</strong>: contact name, company name, country,
            business email, phone or WhatsApp number, website or catalogue link, product details, export markets,
            indicative pricing, proposed budget, the support you need and any other information you choose to share.
          </li>
          <li>
            <strong>Industry Experience Programme applications</strong>: name, email, mobile number, city, LinkedIn
            profile, study and qualification details, the role you are targeting, immigration status and visa expiry
            date, availability, programme selection and the declarations and consents you give.
          </li>
          <li>
            <strong>Payments</strong>: payment status and transaction references. Card details are entered directly
            with our payment provider, Stripe, and are not received or stored by us.
          </li>
          <li>
            <strong>Electronic agreements</strong>: when you sign an agreement such as our NDA, your full legal name,
            email, organisation, the engagement type, the time of signing, and your acceptance of the agreement and
            this Privacy Policy. A signed copy is emailed to you and to us as the record of the agreement.
          </li>
          <li>
            <strong>Correspondence</strong>: emails, messages and call notes when you contact us.
          </li>
        </ul>
        <p>
          Please only give us information about other people, such as colleagues, if they know you are sharing it
          with us.
        </p>
      </>
    ),
  },
  {
    id: 'how-we-use',
    title: 'How we use it',
    body: (
      <>
        <p>We use personal information to:</p>
        <ul>
          <li>respond to your enquiry and contact you about it;</li>
          <li>assess potential partnerships, projects and programme applications;</li>
          <li>prepare and administer agreements, services, programmes and payments;</li>
          <li>send you documents you have asked for, such as a signed copy of an agreement;</li>
          <li>keep business, financial and legal records; and</li>
          <li>protect the security of our website and systems.</li>
        </ul>
        <p>
          We do not sell personal information, and we do not use it for unrelated marketing without your agreement.
        </p>
      </>
    ),
  },
  {
    id: 'sharing',
    title: 'Who we share it with',
    body: (
      <>
        <p>We use trusted service providers to run our website and business. They handle information on our behalf and only for that purpose:</p>
        <ul>
          <li><strong>Vercel</strong>: website hosting;</li>
          <li><strong>Supabase</strong>: database storage for programme applications (hosted in Australia);</li>
          <li><strong>Resend</strong>: sending website emails, such as enquiry notifications, confirmations and signed agreements;</li>
          <li><strong>Stripe</strong>: processing programme payments; and</li>
          <li>our email and office software providers.</li>
        </ul>
        <p>
          Some of these providers store or process information outside New Zealand, including in Australia and the
          United States. We choose providers that protect information to a standard comparable to New Zealand law.
        </p>
        <p>
          We will only share your information with anyone else, such as a potential buyer, partner or freight
          provider, if you have agreed to it, if it is part of the purpose you gave it to us for, or if the law
          requires or permits it.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies and analytics',
    body: (
      <p>
        Our website does not use advertising or tracking cookies. Our hosting provider may keep standard technical
        logs, such as IP addresses and browser types, to keep the site secure and working. If we add analytics or
        cookies in future, we will update this policy.
      </p>
    ),
  },
  {
    id: 'security-retention',
    title: 'Security and how long we keep it',
    body: (
      <>
        <p>
          We take reasonable steps to protect personal information from loss, misuse and unauthorised access,
          including access controls and encrypted connections. If a privacy breach is likely to cause serious harm,
          we will notify the Office of the Privacy Commissioner and the people affected, as the law requires.
        </p>
        <p>
          We keep personal information only for as long as we need it for the purpose it was collected, or as long
          as the law requires. For example, business and financial records are generally kept for seven years. When we
          no longer need information, we delete or anonymise it.
        </p>
      </>
    ),
  },
  {
    id: 'your-rights',
    title: 'Accessing and correcting your information',
    body: (
      <>
        <p>
          You can ask to see the personal information we hold about you and ask us to correct it. Email{' '}
          <a href="mailto:info@webfitt.co.nz">info@webfitt.co.nz</a> with &ldquo;Privacy request&rdquo; in the subject
          line. We may need to confirm your identity first. We will respond as soon as we can, and within 20 working
          days.
        </p>
        <p>
          If you are not satisfied with how we have handled a privacy matter, please contact us first so we can try to
          resolve it. You can also complain to the Office of the Privacy Commissioner at{' '}
          <a href="https://www.privacy.org.nz" target="_blank" rel="noopener noreferrer">privacy.org.nz</a>.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: (
      <p>
        Privacy Officer, Webfit Solutions Limited
        <br />
        Sandringham Road, Auckland, New Zealand
        <br />
        Email: <a href="mailto:info@webfitt.co.nz">info@webfitt.co.nz</a>
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        We may update this policy from time to time. The latest version will always be on this page, with the date it
        was last updated.
      </p>
    ),
  },
]

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-mesh-soft text-slate-950">
      <section className="px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="text-sm font-semibold text-violet-700 hover:text-violet-900">
            ← Webfit Solutions Limited
          </Link>
          <div className="mt-10">
            <span className="inline-flex items-center gap-2 glass-pill rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-slate-800 mb-5">
              Last updated {LAST_UPDATED}
            </span>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.04em] leading-[1.05]">Privacy Policy</h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-700">
              We respect your privacy. This page explains what personal information we collect, why we collect it, and
              how you can access or correct it.
            </p>
          </div>

          <nav aria-label="On this page" className="mt-10 rounded-3xl glass-card p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">On this page</p>
            <ol className="mt-3 grid gap-1.5 sm:grid-cols-2 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-slate-700 hover:text-violet-700">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-12 space-y-12">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-2xl font-semibold tracking-tight">{s.title}</h2>
                <div className="mt-4 space-y-4 leading-relaxed text-slate-700 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_a]:font-medium [&_a]:text-violet-700 [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-slate-900">
                  {s.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
