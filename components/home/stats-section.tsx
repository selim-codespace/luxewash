'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Counter } from '@/components/animations/counter'
import { FadeIn } from '@/components/animations/fade-in'

const stats = [
  { value: 12400, suffix: '+', label: 'Happy Customers' },
  { value: 99.3, suffix: '%', label: 'Satisfaction Rate' },
  { value: 3, suffix: '', label: 'Years of Excellence' },
  { value: 48, suffix: '', label: 'Cities Served' },
]

export function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="py-24 bg-void border-y border-white/5 relative overflow-hidden">
      <motion.div style={{ opacity }} className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.1}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-text-primary mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-text-secondary text-sm uppercase tracking-widest font-medium">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>
    </section>
  )
}