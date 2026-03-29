'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { cn } from '@/lib/utils'

interface ScrollGalleryProps {
  children: React.ReactNode
  className?: string
}

export function ScrollGallery({ children, className = '' }: ScrollGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const panels = gsap.utils.toArray('.gallery-panel')

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          // end: () => `+=${containerRef.current?.offsetWidth}`,
          end: '+=3000', // 3000px of scroll distance to view the whole gallery
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className={cn('overflow-hidden h-screen', className)}>
      <div
        ref={containerRef}
        className="flex w-[300vw] h-full" // Adjust w-[] or let GSAP handle flex wrapping
      >
        {children}
      </div>
    </section>
  )
}
