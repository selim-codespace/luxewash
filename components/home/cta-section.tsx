'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FadeIn } from '@/components/animations/fade-in'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Check } from 'lucide-react'
import Link from 'next/link'

export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section ref={containerRef} className="py-40 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-void via-obsidian to-void" />
        <motion.div
          style={{ scale, opacity }}
          className="absolute inset-0"
        >
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-gold/10 to-transparent rounded-full blur-[100px]" />
        </motion.div>
        
        {/* Animated Lines */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>
      </div>

      <motion.div
        style={{ scale, opacity }}
        className="container mx-auto px-6 lg:px-12 relative"
      >
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-obsidian via-graphite/30 to-obsidian border border-white/10 p-12 md:p-16 lg:p-24 text-center">
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-gold/30 rounded-tl-[2.5rem]" />
          <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-gold/30 rounded-tr-[2.5rem]" />
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-gold/30 rounded-bl-[2.5rem]" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-gold/30 rounded-br-[2.5rem]" />

          {/* Content */}
          <div className="relative z-10">
            <FadeIn>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block text-gold uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-8"
              >
                Ready to Shine?
              </motion.span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-text-primary mb-8 headline tracking-tighter max-w-4xl mx-auto">
                Your Vehicle Deserves <span className="text-gold italic">the Best</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-text-secondary text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                Join thousands of discerning car owners who trust LuxeWash for their automotive care. 
                Book your first appointment today and experience the difference.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
                <Link href="/booking">
                  <Button size="lg" className="h-16 px-12 text-lg group relative overflow-hidden bg-gradient-to-r from-primary to-primary/90">
                    <span className="relative z-10 flex items-center">
                      Book Your Experience
                      <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </Link>

                <button className="flex items-center gap-4 text-text-secondary hover:text-white transition-colors group">
                  <span className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold/50 group-hover:bg-gold/10 transition-all">
                    <Play className="w-5 h-5 ml-0.5" />
                  </span>
                  <span className="text-sm uppercase tracking-wider font-medium">Watch Our Process</span>
                </button>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-sm">
                <div className="flex items-center gap-3 text-text-secondary">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-500" />
                  </div>
                  <span>No commitment required</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-500" />
                  </div>
                  <span>100% satisfaction guaranteed</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-500" />
                  </div>
                  <span>Cancel anytime</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </motion.div>
    </section>
  )
}