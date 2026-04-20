'use client'

/*
  SharedScene: One WebGL canvas + many <View track={ref}> portals so we
  can put real 3D meshes in dozens of places across the page without
  exceeding the browser's WebGL context limit.
*/

import { Canvas, useFrame } from '@react-three/fiber'
import { View, Float, Environment, MeshDistortMaterial } from '@react-three/drei'
import { useRef, Suspense, useEffect, useState } from 'react'

/* ---------- Root canvas --------------------------------------------------- */

export function SharedCanvas() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return (
    <Canvas
      className="!fixed !inset-0 !pointer-events-none"
      style={{ zIndex: 5 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      eventSource={typeof document !== 'undefined' ? document.body : undefined}
      eventPrefix="client"
    >
      <Suspense fallback={null}>
        <View.Port />
      </Suspense>
    </Canvas>
  )
}

/* ---------- Shapes --------------------------------------------------------- */

const SHAPE_BUILDERS = {
  sphere: (color) => (
    <mesh>
      <sphereGeometry args={[0.75, 48, 48]} />
      <meshStandardMaterial color={color} roughness={0.1} metalness={0.9} />
    </mesh>
  ),
  box: (color) => (
    <mesh>
      <boxGeometry args={[1.05, 1.05, 1.05]} />
      <meshStandardMaterial color={color} roughness={0.15} metalness={0.8} />
    </mesh>
  ),
  torus: (color) => (
    <mesh>
      <torusGeometry args={[0.62, 0.24, 28, 80]} />
      <meshStandardMaterial color={color} roughness={0.1} metalness={0.9} />
    </mesh>
  ),
  cone: (color) => (
    <mesh>
      <coneGeometry args={[0.72, 1.3, 36]} />
      <meshStandardMaterial color={color} roughness={0.15} metalness={0.85} />
    </mesh>
  ),
  octa: (color) => (
    <mesh>
      <octahedronGeometry args={[0.85, 0]} />
      <meshStandardMaterial color={color} roughness={0.1} metalness={0.95} />
    </mesh>
  ),
  knot: (color) => (
    <mesh>
      <torusKnotGeometry args={[0.58, 0.2, 160, 28]} />
      <meshStandardMaterial color={color} roughness={0.1} metalness={0.9} />
    </mesh>
  ),
  icosa: (color) => (
    <mesh>
      <icosahedronGeometry args={[0.85, 0]} />
      <meshStandardMaterial color={color} roughness={0.12} metalness={0.9} />
    </mesh>
  ),
  dodeca: (color) => (
    <mesh>
      <dodecahedronGeometry args={[0.8, 0]} />
      <meshStandardMaterial color={color} roughness={0.15} metalness={0.85} />
    </mesh>
  ),
  tetra: (color) => (
    <mesh>
      <tetrahedronGeometry args={[0.95, 0]} />
      <meshStandardMaterial color={color} roughness={0.15} metalness={0.9} />
    </mesh>
  ),
  ring: (color) => (
    <mesh>
      <torusGeometry args={[0.78, 0.12, 20, 72]} />
      <meshStandardMaterial color={color} roughness={0.1} metalness={0.95} />
    </mesh>
  ),
  blob: (color) => (
    <mesh>
      <sphereGeometry args={[0.85, 64, 64]} />
      <MeshDistortMaterial
        color={color}
        distort={0.35}
        speed={1.6}
        roughness={0.12}
        metalness={0.7}
        iridescence={1}
        iridescenceIOR={1.5}
        clearcoat={1}
      />
    </mesh>
  ),
}

const Spinner = ({ shape, color, speed = 1 }) => {
  const ref = useRef(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.5 * speed
    ref.current.rotation.y = state.clock.elapsedTime * 0.35 * speed
  })
  const build = SHAPE_BUILDERS[shape] || SHAPE_BUILDERS.sphere
  return (
    <Float speed={2} rotationIntensity={0.35} floatIntensity={0.8}>
      <group ref={ref}>{build(color)}</group>
    </Float>
  )
}

/* ---------- Public component: <Shape3D /> -------------------------------- */

export function Shape3D({ shape = 'sphere', color = '#8b5cf6', className = '', speed = 1 }) {
  const ref = useRef(null)
  return (
    <div ref={ref} className={className}>
      <View track={ref}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} intensity={1.1} />
        <pointLight position={[-3, -2, 2]} intensity={1.6} color="#ec4899" />
        <pointLight position={[3, 2, -2]} intensity={1.2} color="#60a5fa" />
        <Spinner shape={shape} color={color} speed={speed} />
        <Environment preset="city" />
      </View>
    </div>
  )
}
