'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
  const ctaY = useTransform(scrollYProgress, [0, 1], ['0%', '120%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const smoothY = useSpring(backgroundY, { stiffness: 50, damping: 20 })

  return (
    <section 
      ref={containerRef} 
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-void"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'center 80%'
          }}
        />
      </div>

      {/* Ambient Light Orbs */}
      <motion.div 
        style={{ y: smoothY, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </motion.div>

      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-6 lg:px-12 h-full flex flex-col justify-center">
        
        <motion.div style={{ y: textY, opacity }} className="max-w-6xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-gold/80 tracking-[0.25em] text-xs font-medium uppercase">
              The New Standard In Mobile Detailing
            </span>
          </motion.div>
          
          <h1 className="text-[11vw] sm:text-[9vw] md:text-[8vw] lg:text-[6.5vw] leading-[0.88] font-display font-light text-text-primary tracking-tight mb-10">
            <motion.span 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                Precision.
              </span>
            </motion.span>
            <motion.span 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="block ml-[5%]"
            >
              <span className="bg-gradient-to-r from-white/40 via-text-secondary to-text-secondary/60 bg-clip-text text-transparent">
                Delivered.
              </span>
            </motion.span>
          </h1>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-xl ml-auto mr-0 lg:mr-[8%]"
          >
            <p className="text-text-secondary/80 text-lg md:text-xl font-light leading-relaxed border-l-2 border-gold/30 pl-6">
              We engineer the ultimate aesthetic restoration for high-end vehicles, 
              directly to your doorstep. Uncompromising quality, absolute convenience.
            </p>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          style={{ y: ctaY, opacity }} 
          className="absolute bottom-16 left-6 lg:left-12 right-6 lg:right-12 flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <Link href="/booking">
            <Button 
              variant="premium" 
              size="lg" 
              className="h-16 px-10 text-lg group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Book Your Experience
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold/50 transition-colors cursor-pointer">
              <span className="text-text-primary text-lg font-light">▶</span>
            </div>
            <span className="text-sm uppercase tracking-widest text-text-tertiary">
              Watch Process
            </span>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-text-tertiary">Scroll</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-gold to-transparent"
          />
        </motion.div>

      </div>

      {/* Gradient Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent pointer-events-none" />
    </section>
  )
}