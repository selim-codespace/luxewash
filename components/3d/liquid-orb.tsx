'use client'

import dynamic from 'next/dynamic'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, MeshTransmissionMaterial, Float } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'

function Orb() {
  const mesh = useRef<THREE.Mesh>(null)
  const [hovered, setHover] = useState(false)

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.2
      mesh.current.rotation.y += delta * 0.3
      
      const targetScale = hovered ? 1.1 : 1
      mesh.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <Float floatIntensity={5} speed={2}>
      <mesh
        ref={mesh}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <icosahedronGeometry args={[2, 4]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={1}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#C9A84C"
          resolution={512}
        />
      </mesh>
    </Float>
  )
}

function LiquidOrbScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#fff" />
      <Orb />
      <Environment preset="city" />
    </Canvas>
  )
}

// Export as dynamic component to prevent SSR
export const LiquidOrb = dynamic(() => Promise.resolve(LiquidOrbScene), {
  ssr: false,
})
