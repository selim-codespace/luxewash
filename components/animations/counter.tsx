'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'

interface CounterProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export function Counter({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  className = '',
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: value,
        duration: duration,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 90%',
        },
        onUpdate: () => {
          if (ref.current) {
            // Using Intl.NumberFormat to add commas
            ref.current.innerText = Math.floor(obj.val).toLocaleString()
          }
        },
      })
    },
    { scope: ref }
  )

  return (
    <div className={cn('inline-flex items-baseline font-mono font-medium', className)}>
      {prefix && <span>{prefix}</span>}
      <span ref={ref}>0</span>
      {suffix && <span>{suffix}</span>}
    </div>
  )
}
