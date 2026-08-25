'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll() {
  useEffect(() => {
    // Skip on small devices / reduced motion for best UX
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })

    // Expose so other components can use it (for anchor smoothing)
    window.__lenis = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const id = requestAnimationFrame(raf)

    // Intercept anchor clicks for buttery smooth jumps
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const href = a.getAttribute('href')
      if (!href || href === '#') return
      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        lenis.scrollTo(target, { offset: -80, duration: 1.4 })
      }
    }
    document.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
      document.removeEventListener('click', onClick)
      delete window.__lenis
    }
  }, [])

  return null
}
