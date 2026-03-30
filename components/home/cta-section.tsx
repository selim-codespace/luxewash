'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FadeIn } from '@/components/animations/fade-in'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'
import Link from 'next/link'

export function CTASection() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      <motion.div
        style={{ scale, opacity }}
        className="container mx-auto px-6 lg:px-12 relative"
      >
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 via-obsidian to-void border border-white/10">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative z-10 py-20 px-8 md:px-16 lg:px-24 text-center">
            <FadeIn>
              <p className="text-primary uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-6">
                Ready to Shine?
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-text-primary mb-6 headline tracking-tighter max-w-3xl mx-auto">
                Your Vehicle Deserves <span className="text-primary italic">the Best</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-text-secondary text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                Join thousands of discerning car owners who trust LuxeWash for their automotive care. Book your first appointment today and experience the difference.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/booking">
                  <Button size="lg" className="h-14 px-10 text-lg">
                    Book Your Experience
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>

                <button className="flex items-center gap-3 text-text-secondary hover:text-white transition-colors group">
                  <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-colors">
                    <Play className="w-5 h-5 ml-0.5" />
                  </span>
                  <span className="text-sm uppercase tracking-wider">Watch Our Process</span>
                </button>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-text-tertiary text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>No commitment required</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>100% satisfaction guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
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