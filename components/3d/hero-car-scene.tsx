'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, EnvironmentProps, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

function CarModel() {
  // In a real scenario, useGLTF('/models/luxury_car.glb')
  // Using a metallic reflective sphere placeholder to demonstrate material and environment interaction
  const ref = useRef<THREE.Mesh>(null)

  // Floating rotating effect
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.1
    }
  })

  return (
    <Float floatIntensity={2} speed={1.5} rotationIntensity={0.2}>
      <mesh ref={ref} scale={2}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#111"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  )
}

function CursorFollower() {
  const { viewport, mouse, camera } = useFrame((state) => state)
  const rigRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (rigRef.current) {
      // Smoothly look at cursor
      const targetX = (state.mouse.x * viewport.width) / 4
      const targetY = (state.mouse.y * viewport.height) / 4
      rigRef.current.position.x = THREE.MathUtils.lerp(rigRef.current.position.x, targetX, 0.05)
      rigRef.current.position.y = THREE.MathUtils.lerp(rigRef.current.position.y, targetY, 0.05)
      rigRef.current.rotation.y = THREE.MathUtils.lerp(rigRef.current.rotation.y, state.mouse.x * 0.2, 0.05)
      rigRef.current.rotation.x = THREE.MathUtils.lerp(rigRef.current.rotation.x, -state.mouse.y * 0.2, 0.05)
    }
  })

  return (
    <group ref={rigRef}>
      <CarModel />
    </group>
  )
}

export function HeroCarScene() {
  const [dpr, setDpr] = useState(1.5)

  useEffect(() => {
    // Limit pixel ratio for performance
    setDpr(Math.min(window.devicePixelRatio, 2))
  }, [])

  return (
    <Canvas
      dpr={dpr}
      frameloop="demand" // Only render when args change or manually requested
      camera={{ position: [0, 0, 10], fov: 45 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <spotLight position={[-10, 10, 5]} intensity={1} color="#C9A84C" />
        
        <CursorFollower />
        
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  )
}
