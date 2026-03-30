'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FadeIn } from '@/components/animations/fade-in'
import { Calendar, MapPin, Sparkles, CheckCircle2 } from 'lucide-react'

const steps = [
  {
    icon: Calendar,
    title: 'Book Online',
    description: 'Select your service, choose a time, and enter your location. Takes less than 2 minutes.',
    color: 'from-blue-500/20 to-blue-600/20',
    border: 'border-blue-500/30',
  },
  {
    icon: MapPin,
    title: 'We Arrive',
    description: 'Our certified detailers arrive at your doorstep in a fully equipped mobile unit.',
    color: 'from-amber-500/20 to-amber-600/20',
    border: 'border-amber-500/30',
  },
  {
    icon: Sparkles,
    title: 'We Detail',
    description: 'Sit back while we meticulously restore your vehicle using premium chemistry.',
    color: 'from-emerald-500/20 to-emerald-600/20',
    border: 'border-emerald-500/30',
  },
  {
    icon: CheckCircle2,
    title: 'You Shine',
    description: 'Inspect the results, rate your experience, and drive away in perfection.',
    color: 'from-purple-500/20 to-purple-600/20',
    border: 'border-purple-500/30',
  },
]

export function HowItWorks() {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const pathLength = useTransform(scrollYProgress, [0.1, 0.9], [0, 1])

  return (
    <section ref={containerRef} id="how-it-works" className="py-32 bg-obsidian relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <p className="text-primary uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-4">
              The Process
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-text-primary mb-6 headline tracking-tighter">
              How It <span className="text-primary italic">Works</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              Four simple steps to automotive perfection. No waiting rooms, no hassle.
            </p>
          </div>
        </FadeIn>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          
          <svg className="hidden lg:block absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 pointer-events-none" style={{ zIndex: 1 }}>
            <motion.path
              d="M 2 0 L 2 100%"
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
              style={{ pathLength }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" />
                <stop offset="100%" stopColor="rgb(168, 85, 247)" />
              </linearGradient>
            </defs>
          </svg>

          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 0
              
              return (
                <FadeIn key={step.title} delay={index * 0.15}>
                  <div className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                      <div className={`inline-flex items-center gap-2 mb-4 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                        <span className="text-6xl md:text-7xl font-display font-bold text-white/5">
                          0{index + 1}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-display text-text-primary mb-4">
                        {step.title}
                      </h3>
                      <p className="text-text-secondary text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                        {step.description}
                      </p>
                    </div>

                    <div className="relative z-10">
                      <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${step.color} border ${step.border} flex items-center justify-center backdrop-blur-sm`}>
                        <Icon className="w-8 h-8 md:w-10 md:h-10 text-text-primary" />
                      </div>
                      {index < steps.length - 1 && (
                        <div className="lg:hidden absolute left-1/2 top-full w-px h-12 -translate-x-1/2 bg-gradient-to-b from-white/20 to-transparent" />
                      )}
                    </div>

                    <div className="flex-1 hidden lg:block" />
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}