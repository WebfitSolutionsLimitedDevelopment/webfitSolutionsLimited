'use client'

import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const update = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      const p = max > 0 ? (h.scrollTop || window.scrollY) / max : 0
      setProgress(Math.min(1, Math.max(0, p)))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none">
      <div
        className="h-full origin-left transition-transform duration-100"
        style={{
          transform: `scaleX(${progress})`,
          background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 40%, #ec4899 80%, #f472b6 100%)',
          boxShadow: '0 0 12px rgba(168,85,247,0.5)',
        }}
      />
    </div>
  )
}
