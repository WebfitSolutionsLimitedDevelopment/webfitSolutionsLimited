'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import { useRef, Suspense } from 'react'

/*
  Tiny 3D icons for the services section.
  Each service gets a different geometry for a bit of variety,
  controlled by the `shape` prop.
*/

const SHAPES = {
  box: (props) => (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#8b5cf6" roughness={0.15} metalness={0.8} />
    </mesh>
  ),
  sphere: (props) => (
    <mesh {...props}>
      <sphereGeometry args={[0.7, 48, 48]} />
      <meshStandardMaterial color="#ec4899" roughness={0.1} metalness={0.9} />
    </mesh>
  ),
  torus: (props) => (
    <mesh {...props}>
      <torusGeometry args={[0.6, 0.25, 24, 64]} />
      <meshStandardMaterial color="#3b82f6" roughness={0.15} metalness={0.85} />
    </mesh>
  ),
  cone: (props) => (
    <mesh {...props}>
      <coneGeometry args={[0.7, 1.2, 32]} />
      <meshStandardMaterial color="#6366f1" roughness={0.15} metalness={0.85} />
    </mesh>
  ),
  octa: (props) => (
    <mesh {...props}>
      <octahedronGeometry args={[0.85, 0]} />
      <meshStandardMaterial color="#f59e0b" roughness={0.1} metalness={0.95} />
    </mesh>
  ),
  knot: (props) => (
    <mesh {...props}>
      <torusKnotGeometry args={[0.55, 0.19, 128, 24]} />
      <meshStandardMaterial color="#10b981" roughness={0.1} metalness={0.9} />
    </mesh>
  ),
}

const Spinner = ({ shape }) => {
  const ref = useRef(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.55
    ref.current.rotation.y = state.clock.elapsedTime * 0.35
  })
  const Shape = SHAPES[shape] || SHAPES.box
  return (
    <Float speed={2} rotationIntensity={0.35} floatIntensity={0.8}>
      <group ref={ref}>
        <Shape />
      </group>
    </Float>
  )
}

export default function ServiceIcon3D({ shape = 'box' }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} intensity={1.2} />
        <pointLight position={[-3, -2, 2]} intensity={1.6} color="#ec4899" />
        <pointLight position={[3, 2, -2]} intensity={1.2} color="#60a5fa" />
        <Spinner shape={shape} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}
