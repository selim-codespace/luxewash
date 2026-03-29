'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Shield, Sparkles, Droplets } from 'lucide-react'
import Link from 'next/link'

const packages = [
  {
    title: 'Standard Detail',
    price: '$149',
    description: 'Comprehensive exterior hand wash and interior revitalization for a refreshed look.',
    icon: Droplets,
    color: 'bg-obsidian',
    border: 'border-white/5',
    features: [
      'Two-bucket hand wash',
      'Wheel & tire cleaning',
      'Interior vacuum & wipe down',
      'Streak-free window cleaning',
    ],
  },
  {
    title: 'Premium Ceramic',
    price: '$299',
    description: 'Advanced protection with our signature ceramic sealant and deep interior shampoo.',
    icon: Shield,
    color: 'bg-graphite',
    border: 'border-primary/30',
    popular: true,
    features: [
      'Everything in Standard',
      'Iron decontamination & clay bar',
      '6-month ceramic sealant applied',
      'Deep carpet & seat extraction',
    ],
  },
  {
    title: 'Signature Correction',
    price: '$599',
    description: 'The ultimate restoration. Multi-stage paint correction and multi-year ceramic coating.',
    icon: Sparkles,
    color: 'bg-void',
    border: 'border-white/10',
    features: [
      'Everything in Premium',
      '2-stage paint correction',
      '3-year professional ceramic coating',
      'Engine bay detail',
    ],
  },
]

export function ServicesSticky() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Fade in the section title
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0])

  return (
    <section ref={containerRef} id="services" className="relative py-32 bg-void" style={{ minHeight: '200vh' }}>
      <motion.div style={{ opacity, y }} className="sticky top-32 z-10 text-center max-w-4xl mx-auto mb-20 px-6">
        <h2 className="text-5xl md:text-7xl font-display text-text-primary mb-6 headline tracking-tighter">
          Uncompromising <span className="text-primary italic">Packages</span>
        </h2>
        <p className="text-xl text-text-secondary font-light">
          Certified techniques. Microscopic precision. Scroll to explore our tiers.
        </p>
      </motion.div>

      <div className="relative w-full max-w-5xl mx-auto px-6 pb-32">
        {packages.map((pkg, index) => {
          const Icon = pkg.icon
          // Calculate dynamic sticky top based on index to create stack
          const stickyTop = `calc(25vh + ${index * 40}px)`
          
          return (
            <div 
              key={index}
              className="sticky pt-8 w-full"
              style={{ top: stickyTop }}
            >
              <div 
                className={`relative overflow-hidden w-full rounded-3xl border ${pkg.border} ${pkg.color} p-8 md:p-12 shadow-2xl origin-top transition-all duration-500`}
                style={{ 
                  boxShadow: '0 -20px 40px rgba(0,0,0,0.5)',
                }}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-void px-6 py-2 rounded-bl-3xl font-bold uppercase tracking-widest text-xs z-10">
                    Most Popular
                  </div>
                )}
                
                {/* Large Background Watermark Icon */}
                <Icon className="absolute -bottom-10 -right-10 w-96 h-96 text-text-primary/[0.02] pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-text-primary/5 border border-text-primary/10 flex items-center justify-center mb-8 text-primary">
                      <Icon size={32} />
                    </div>
                    <h3 className="text-4xl font-display text-text-primary mb-4">{pkg.title}</h3>
                    <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                      {pkg.description}
                    </p>
                    <div className="flex items-end gap-2 mb-8">
                      <span className="text-5xl font-mono text-text-primary tracking-tighter">{pkg.price}</span>
                      <span className="text-text-tertiary uppercase tracking-widest text-sm mb-2">/ vehicle</span>
                    </div>
                    <Link href={`/booking?package=${pkg.title}`}>
                      <Button variant={pkg.popular ? "premium" : "outline"} size="lg" className="w-full sm:w-auto h-14 px-8 text-base">
                        Select {pkg.title}
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="flex flex-col justify-center space-y-6">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-text-primary/50 mb-2">Includes</h4>
                    {pkg.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-4">
                        <CheckCircle2 size={24} className="text-primary shrink-0 bg-primary/10 rounded-full p-1" />
                        <span className="text-lg text-text-primary font-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
