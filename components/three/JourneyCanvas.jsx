'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Stars, MeshDistortMaterial } from '@react-three/drei'
import { useEffect, useMemo, useRef, Suspense } from 'react'
import * as THREE from 'three'

/* ============================================================================
   JOURNEY CANVAS
   A single fixed, full-viewport 3D scene that sits behind the entire site.
   As the user scrolls, the camera flies along a curved path through space —
   passing a distinct glowing "set piece" for every chapter of the page.
   Most of the time it's hidden behind opaque section content; it becomes
   fully visible inside the transparent <Portal> dividers between sections,
   which is what creates the "scroll takes you somewhere new" sensation.
   ============================================================================ */

// One chapter per major transition on the page (7 total: Home + 6 handoffs)
const CHAPTERS = [
  { id: 'home', color: '#c4b5fd', fog: '#0d0b16', shape: 'sphere' },
  { id: 'services', color: '#f472b6', fog: '#160f1c', shape: 'knot' },
  { id: 'team', color: '#60a5fa', fog: '#0c121f', shape: 'torus' },
  { id: 'testimonials', color: '#fbbf24', fog: '#1a150b', shape: 'octa' },
  { id: 'about', color: '#34d399', fog: '#0a1a16', shape: 'box' },
  { id: 'blog', color: '#818cf8', fog: '#100e20', shape: 'cone' },
  { id: 'contact', color: '#ec4899', fog: '#190c17', shape: 'knot' },
]

// A gentle wandering path the camera dollies along, one waypoint per chapter
const WAYPOINTS = CHAPTERS.map(
  (c, i) => new THREE.Vector3(Math.sin(i * 1.35) * 3.4, Math.cos(i * 0.95) * 1.7, -i * 7)
)
const CURVE = new THREE.CatmullRomCurve3(WAYPOINTS, false, 'catmullrom', 0.45)

const GEOMETRY = {
  sphere: <sphereGeometry args={[1.15, 96, 96]} />,
  torus: <torusGeometry args={[1, 0.34, 32, 128]} />,
  octa: <octahedronGeometry args={[1.25, 0]} />,
  box: <boxGeometry args={[1.5, 1.5, 1.5]} />,
  cone: <coneGeometry args={[1, 1.8, 48]} />,
  knot: <torusKnotGeometry args={[0.85, 0.26, 160, 20]} />,
}

const SetPiece = ({ position, color, shape }) => (
  <Float speed={1.1} rotationIntensity={0.55} floatIntensity={1.3}>
    <mesh position={position}>
      {GEOMETRY[shape] || GEOMETRY.sphere}
      <MeshDistortMaterial
        color={color}
        distort={0.32}
        speed={1.3}
        roughness={0.18}
        metalness={0.6}
        iridescence={0.8}
        iridescenceIOR={1.5}
      />
    </mesh>
    {/* small orbiting satellites for sparkle */}
    <mesh position={[position.x + 1.8, position.y + 0.6, position.z + 0.8]}>
      <sphereGeometry args={[0.13, 24, 24]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.2} metalness={0.8} />
    </mesh>
    <mesh position={[position.x - 1.6, position.y - 0.8, position.z - 0.6]}>
      <sphereGeometry args={[0.09, 24, 24]} />
      <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} roughness={0.3} metalness={0.7} />
    </mesh>
  </Float>
)

function CameraRig({ progressRef, mouseRef }) {
  const { camera, scene } = useThree()
  const smoothed = useRef(progressRef.current)
  const lookTarget = useMemo(() => new THREE.Vector3(), [])
  const fogColors = useMemo(() => CHAPTERS.map((c) => new THREE.Color(c.fog)), [])
  const scratch = useMemo(() => new THREE.Color(), [])

  useEffect(() => {
    scene.fog = new THREE.FogExp2(CHAPTERS[0].fog, 0.06)
    return () => {
      scene.fog = null
    }
  }, [scene])

  useFrame((state, delta) => {
    // critically-damped smoothing toward the real scroll progress
    smoothed.current += (progressRef.current - smoothed.current) * Math.min(1, delta * 2.4)
    const t = Math.min(0.998, Math.max(0.002, smoothed.current))

    const pos = CURVE.getPointAt(t)
    const ahead = CURVE.getPointAt(Math.min(1, t + 0.035))

    const mx = mouseRef.current.x * 0.55
    const my = mouseRef.current.y * 0.32
    const bob = Math.sin(state.clock.elapsedTime * 0.35) * 0.1

    camera.position.set(pos.x + mx, pos.y + my + bob, pos.z)
    lookTarget.set(ahead.x, ahead.y, ahead.z)
    camera.lookAt(lookTarget)

    // lerp fog colour smoothly between the two nearest chapters
    const span = t * (CHAPTERS.length - 1)
    const idx = Math.min(CHAPTERS.length - 2, Math.floor(span))
    const frac = span - idx
    scratch.copy(fogColors[idx]).lerp(fogColors[idx + 1], frac)
    if (scene.fog) scene.fog.color.copy(scratch)
  })

  return null
}

export default function JourneyCanvas() {
  const progressRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const reducedMotion = useRef(false)

  useEffect(() => {
    reducedMotion.current =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    let raf
    const update = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      progressRef.current = max > 0 ? Math.min(1, Math.max(0, (doc.scrollTop || window.scrollY) / max)) : 0
      raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (reducedMotion.current) return
    const onMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.45} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
          <pointLight position={[-6, 4, -4]} intensity={1.6} color="#a855f7" />
          <pointLight position={[6, -3, -10]} intensity={1.5} color="#ec4899" />
          <pointLight position={[0, -4, -20]} intensity={1.2} color="#60a5fa" />

          <Stars radius={90} depth={60} count={2600} factor={3.4} saturation={0} fade speed={0.6} />

          {CHAPTERS.map((c, i) => (
            <SetPiece key={c.id} position={WAYPOINTS[i]} color={c.color} shape={c.shape} />
          ))}

          <CameraRig progressRef={progressRef} mouseRef={mouseRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}
