'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Environment } from '@react-three/drei'
import { useRef, Suspense } from 'react'

const Knot = () => {
  const ref = useRef(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.25
    ref.current.rotation.y = state.clock.elapsedTime * 0.18
  })
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} scale={1.3}>
        <torusKnotGeometry args={[1, 0.32, 220, 32]} />
        <MeshDistortMaterial
          color="#c4b5fd"
          distort={0.22}
          speed={1.2}
          roughness={0.1}
          metalness={0.75}
          iridescence={1}
          iridescenceIOR={1.6}
          clearcoat={1}
          clearcoatRoughness={0.12}
        />
      </mesh>
    </Float>
  )
}

export default function ContactScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#a78bfa" />
        <pointLight position={[-5, -3, 3]} intensity={2} color="#f472b6" />
        <pointLight position={[0, 3, -3]} intensity={1.2} color="#60a5fa" />
        <Knot />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}
