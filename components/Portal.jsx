'use client'

import Reveal from '@/components/Reveal'

/* ============================================================================
   PORTAL
   A transparent, full-viewport-ish divider between page sections. It has no
   background of its own, so the fixed <JourneyCanvas /> 3D scene shows
   straight through it — this is the "moment you scroll and it takes you
   somewhere new" beat between each chapter of the site.
   ============================================================================ */
   // comments updated

export default function Portal({ index, label, sublabel, accent = '#f472b6' }) {
  return (
    <section
      aria-hidden="true"
      className="relative min-h-[62vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden pointer-events-none select-none"
    >
      <div className="relative z-10 text-center px-6">
        <Reveal>
          <div
            className="text-xs font-medium tracking-[0.35em] uppercase mb-4"
            style={{ color: accent, textShadow: `0 0 24px ${accent}66` }}
          >
            {String(index).padStart(2, '0')} — Next up
          </div>
          <h3
            className="text-5xl md:text-8xl font-semibold tracking-[-0.035em] leading-[0.95] text-white"
            style={{ textShadow: '0 4px 60px rgba(0,0,0,0.55)' }}
          >
            {label}
          </h3>
          {sublabel && (
            <p className="mt-5 text-slate-300/90 text-sm md:text-base max-w-md mx-auto">{sublabel}</p>
          )}
        </Reveal>
        <div className="mt-10 flex justify-center">
          <div
            className="h-10 w-6 rounded-full border-2 flex items-start justify-center p-1.5"
            style={{ borderColor: `${accent}88` }}
          >
            <div
              className="h-1.5 w-1.5 rounded-full animate-bounce"
              style={{ background: accent }}
            />
          </div>
        </div>
      </div>

      {/* soft vignette so the label stays legible over the busy 3D backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 50%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%)',
        }}
      />
    </section>
  )
}
