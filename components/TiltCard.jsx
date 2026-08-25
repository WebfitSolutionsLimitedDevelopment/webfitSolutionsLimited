'use client'

import { useRef, useState } from 'react'

export default function TiltCard({ children, className = '', intensity = 10, glare = true }) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})
  const [glareStyle, setGlareStyle] = useState({})

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rx = (y - 0.5) * -intensity
    const ry = (x - 0.5) * intensity
    setStyle({
      transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`,
      transition: 'transform .08s ease-out',
    })
    if (glare) {
      setGlareStyle({
        background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.5), transparent 50%)`,
        opacity: 1,
      })
    }
  }

  const onLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform .5s cubic-bezier(0.22, 1, 0.36, 1)',
    })
    setGlareStyle({ opacity: 0 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={style}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 mix-blend-overlay"
          style={glareStyle}
        />
      )}
    </div>
  )
}
