'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Shield, Sparkles, Droplets, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const packages = [
  {
    title: 'Standard Detail',
    price: '$149',
    description: 'Comprehensive exterior hand wash and interior revitalization for a refreshed look.',
    icon: Droplets,
    color: 'from-slate-500/20 to-slate-600/20',
    border: 'border-white/10',
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
    color: 'from-amber-500/20 to-amber-600/20',
    border: 'border-amber-500/30',
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
    color: 'from-purple-500/20 to-purple-600/20',
    border: 'border-purple-500/30',
    features: [
      'Everything in Premium',
      '2-stage paint correction',
      '3-year professional ceramic coating',
      'Engine bay detail',
    ],
  },
]

export function ServicesSticky() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0])

  return (
    <section ref={containerRef} id="services" className="relative py-32 bg-void" style={{ minHeight: '250vh' }}>
      <motion.div style={{ opacity, y }} className="sticky top-32 z-10 text-center max-w-4xl mx-auto mb-20 px-6">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-gold tracking-[0.3em] text-xs md:text-sm font-bold uppercase mb-4"
        >
          Our Packages
        </motion.span>
        <h2 className="text-5xl md:text-7xl font-display text-text-primary mb-6 headline tracking-tighter">
          Uncompromising <span className="text-gold italic">Packages</span>
        </h2>
        <p className="text-xl text-text-secondary font-light">
          Certified techniques. Microscopic precision. Scroll to explore our tiers.
        </p>
      </motion.div>

      <div className="relative w-full max-w-5xl mx-auto px-6 pb-32">
        {packages.map((pkg, index) => {
          const Icon = pkg.icon
          const stickyTop = `calc(28vh + ${index * 50}px)`
          
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="sticky pt-12 w-full"
              style={{ top: stickyTop }}
            >
              <div 
                className={`relative overflow-hidden w-full rounded-3xl border ${pkg.border} bg-gradient-to-br ${pkg.color} p-8 md:p-12 backdrop-blur-xl shadow-2xl origin-top transition-all duration-500`}
                style={{ 
                  boxShadow: '0 -20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
              >
                {/* Glow Effect */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
                
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-gold to-amber-500 text-void px-6 py-2.5 rounded-bl-3xl font-bold uppercase tracking-widest text-xs z-10 shadow-lg">
                    Most Popular
                  </div>
                )}
                
                {/* Large Background Watermark Icon */}
                <Icon className="absolute -bottom-16 -right-16 w-[300px] h-[300px] text-white/[0.02] pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-gold">
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
                      <Button 
                        variant={pkg.popular ? "premium" : "outline"} 
                        size="lg" 
                        className="w-full sm:w-auto h-14 px-8 text-base group"
                      >
                        Select {pkg.title}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="flex flex-col justify-center space-y-5">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-text-primary/40 mb-2">Includes</h4>
                    {pkg.features.map((feature, fIdx) => (
                      <motion.div 
                        key={fIdx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: fIdx * 0.1 }}
                        className="flex items-start gap-4"
                      >
                        <CheckCircle2 size={22} className="text-gold shrink-0 bg-gold/10 rounded-full p-0.5" />
                        <span className="text-lg text-text-primary font-light">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}