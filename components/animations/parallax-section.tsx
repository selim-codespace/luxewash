'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { cn } from '@/lib/utils'

export function ParallaxSection({
  children,
  speed = 1,
  className,
}: {
  children: React.ReactNode
  speed?: number
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to(bgRef.current, {
        yPercent: 30 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden w-full h-[60vh] md:h-[80vh] flex items-center justify-center', className)}
    >
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[130%] -top-[15%] pointer-events-none"
      >
        {children}
      </div>
    </div>
  )
}
