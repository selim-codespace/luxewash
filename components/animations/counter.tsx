'use client'

import { useRef, useEffect, useState } from 'react'
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
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.9 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted || !ref.current) return

    let startTime: number | null = null
    const startValue = 0

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = startValue + (value - startValue) * easeOut
      
      ref.current!.innerText = Math.floor(current).toLocaleString()

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [hasStarted, value, duration])

  return (
    <div className={cn('inline-flex items-baseline font-mono font-medium', className)}>
      {prefix && <span>{prefix}</span>}
      <span ref={ref}>0</span>
      {suffix && <span>{suffix}</span>}
    </div>
  )
}