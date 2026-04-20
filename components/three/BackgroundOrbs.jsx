'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere } from '@react-three/drei'
import { useMemo, useRef, Suspense } from 'react'

const COLORS = ['#a78bfa', '#f472b6', '#60a5fa', '#34d399', '#fbbf24', '#f87171']

const Orb = ({ position, color, scale, speed }) => {
  const ref = useRef(null)
  useFrame(({ clock, mouse }) => {
    if (!ref.current) return
    ref.current.position.x = position[0] + Math.sin(clock.elapsedTime * 0.2 * speed) * 0.3 + mouse.x * 0.15
    ref.current.position.y = position[1] + Math.cos(clock.elapsedTime * 0.18 * speed) * 0.3 + mouse.y * 0.15
  })
  return (
    <Float speed={speed * 2} rotationIntensity={0.3} floatIntensity={1.5}>
      <Sphere ref={ref} args={[scale, 32, 32]} position={position}>
        <meshStandardMaterial
          color={color}
          roughness={0.15}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </Sphere>
    </Float>
  )
}

const Scene = () => {
  const orbs = useMemo(() => {
    const arr = []
    const count = 14
    for (let i = 0; i < count; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 4 - 2,
        ],
        color: COLORS[i % COLORS.length],
        scale: 0.08 + Math.random() * 0.22,
        speed: 0.5 + Math.random() * 1.4,
      })
    }
    return arr
  }, [])

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <pointLight position={[-5, 5, -5]} intensity={1.5} color="#a78bfa" />
      <pointLight position={[5, -5, -5]} intensity={1.5} color="#f472b6" />
      {orbs.map((o, i) => <Orb key={i} {...o} />)}
    </>
  )
}

export default function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-50">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
