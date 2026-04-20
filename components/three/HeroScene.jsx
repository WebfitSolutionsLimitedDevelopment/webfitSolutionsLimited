'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Environment, Sphere } from '@react-three/drei'
import { useRef, Suspense } from 'react'

const Blob = ({ position, scale, color, speed, distort }) => {
  const ref = useRef(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.15
      ref.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })
  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={1.2}>
      <Sphere ref={ref} args={[1, 96, 96]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={1.6}
          roughness={0.15}
          metalness={0.55}
          iridescence={1}
          iridescenceIOR={1.6}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>
    </Float>
  )
}

const SmallOrb = ({ position, color, scale = 0.3 }) => (
  <Float speed={2} rotationIntensity={0.4} floatIntensity={2}>
    <Sphere args={[scale, 48, 48]} position={position}>
      <meshStandardMaterial color={color} roughness={0.1} metalness={0.9} />
    </Sphere>
  </Float>
)

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-5, -3, -5]} intensity={2} color="#ec4899" />
      <pointLight position={[5, -3, 3]} intensity={2} color="#8b5cf6" />
      <pointLight position={[0, 5, 0]} intensity={1.2} color="#60a5fa" />

      <Blob position={[0, 0, 0]} scale={1.8} color="#c4b5fd" speed={1.2} distort={0.42} />
      <SmallOrb position={[-2.6, 1.5, -1]} color="#ec4899" scale={0.22} />
      <SmallOrb position={[2.4, -1.6, -0.5]} color="#60a5fa" scale={0.28} />
      <SmallOrb position={[2.7, 1.8, -2]} color="#34d399" scale={0.18} />
      <SmallOrb position={[-2.2, -1.8, -1.5]} color="#fbbf24" scale={0.2} />

      <Environment preset="city" />
    </>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
