'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TextReveal } from '@/components/animations/text-reveal'
import { Button } from '@/components/ui/button'
import { CalendarClock, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Multi-layer parallax scroll transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
  const ctaY = useTransform(scrollYProgress, [0, 1], ['0%', '120%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen flex items-center justify-center overflow-hidden bg-void"
    >
      {/* Slow Parallax Background */}
      <motion.div 
        style={{ y: backgroundY, opacity }} 
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="aurora opacity-60 w-full h-full" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.08)_0%,rgba(5,5,7,1)_70%)]" />
      </motion.div>

      {/* Main Parallax Content */}
      <div className="container relative z-10 mx-auto px-6 lg:px-12 h-full flex flex-col justify-center">
        
        <motion.div style={{ y: textY, opacity }} className="max-w-7xl">
          <div className="overflow-hidden mb-6">
            <motion.p 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-gold tracking-[0.3em] text-xs md:text-sm font-bold uppercase mb-4"
            >
              The New Standard In Mobile Detailing
            </motion.p>
          </div>
          
          <h1 className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] leading-[0.9] font-display font-medium text-white tracking-tighter mix-blend-difference mb-8">
            <TextReveal delay={0.2}>
              Precision.
            </TextReveal>
            <br />
            <TextReveal delay={0.4} className="text-text-secondary ml-[10%]">
              Delivered.
            </TextReveal>
          </h1>
          
          <div className="max-w-xl ml-auto mr-0 md:mr-[10%] text-right">
            <TextReveal delay={0.6} className="text-text-tertiary text-lg md:text-xl font-light leading-relaxed">
              We engineer the ultimate aesthetic restoration for high-end vehicles, directly to your doorstep. Uncompromising quality, absolute convenience.
            </TextReveal>
          </div>
        </motion.div>

        {/* Fast Parallax Buttons */}
        <motion.div 
          style={{ y: ctaY, opacity }} 
          className="absolute bottom-20 left-6 lg:left-12 flex flex-col sm:flex-row items-start gap-6"
        >
          <Link href="/booking">
            <Button variant="premium" size="lg" className="h-16 px-10 text-lg rounded-none group overflow-hidden relative">
              <span className="relative z-10 flex items-center">
                Book Your Experience
                <CalendarClock className="ml-3 group-hover:rotate-12 transition-transform" size={20} />
              </span>
            </Button>
          </Link>
          <Link href="#services" className="group flex items-center gap-4 h-16 opacity-70 hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold transition-colors">
              <ChevronRight size={18} className="text-white group-hover:text-gold group-hover:translate-x-1 transition-all" />
            </div>
            <span className="text-sm uppercase tracking-widest text-white font-medium group-hover:text-gold transition-colors">
              Explore Packages
            </span>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
