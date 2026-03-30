'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export function SvgDraw({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const svgRef = useRef<HTMLDivElement>(null)
 
  useGSAP(
    () => {
      if (!svgRef.current) return
      
      const paths = svgRef.current.querySelectorAll('path')
      
      paths.forEach((path) => {
        const length = path.getTotalLength()
        
        // Setup initial state
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })
        
        // Animate on scroll
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: svgRef.current,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: true,
          },
        })
      })
    },
    { scope: svgRef }
  )
 
  return (
    <div className={className}>
      {/* Assuming children is an <svg> element */}
      <div ref={svgRef}>{children}</div>
    </div>
  )
}
