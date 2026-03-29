'use client'

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect, useState } from 'react'

const HeroCarScene = dynamic(
  () => import('./hero-car-scene').then((mod) => mod.HeroCarScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-void">
        <Skeleton variant="image" className="w-[80%] h-[60%] opacity-20" />
      </div>
    ),
  }
)

export function HeroCar() {
  const [isWebGLSupported, setIsWebGLSupported] = useState(true)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) setIsWebGLSupported(false)
    } catch (e) {
      setIsWebGLSupported(false)
    }
  }, [])

  if (!isWebGLSupported) {
    return (
      <div className="w-full h-full relative">
        <img
          src="/images/hero-car-fallback.jpg"
          alt="Premium Car Details"
          className="object-cover w-full h-full opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void mix-blend-multiply" />
      </div>
    )
  }

  return (
    <div className="w-full h-full relative">
      <HeroCarScene />
    </div>
  )
}
