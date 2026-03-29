'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, ShieldCheck, Timer, Award } from 'lucide-react'

// Array of words for the infinite marquee
const marqueeWords = [
  "Precision", "Luxury", "Detailing", "Mastery", "Perfection", "Ceramic", "Correction", "Concierge"
]

const features = [
  {
    icon: MapPin,
    title: 'We Come To You',
    description: 'Your home or office. Our fully equipped mobile unit arrives ready.',
  },
  {
    icon: Award,
    title: 'Master Detailers',
    description: 'Certified, insured experts handling exotic and daily drivers with supreme care.',
  },
  {
    icon: ShieldCheck,
    title: 'Premium Chemistry',
    description: 'PH-neutral soaps and ceramic-infused sealants to protect your clear coat.',
  },
  {
    icon: Timer,
    title: 'Zero Waiting Rooms',
    description: 'Keep working or relaxing while we meticulously restore your vehicle outside.',
  },
]

export function FeatureMarquee() {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Marquee moves left to right based on scroll
  const x1 = useTransform(scrollYProgress, [0, 1], ['-20%', '0%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])

  return (
    <section ref={containerRef} id="features" className="py-32 bg-obsidian overflow-hidden border-y border-white/5">
      
      {/* Infinite Scroll Typography */}
      <div className="flex flex-col gap-4 mb-32 opacity-20 pointer-events-none selct-none">
        <motion.div style={{ x: x1 }} className="flex whitespace-nowrap gap-8 items-center">
          {[...marqueeWords, ...marqueeWords].map((word, i) => (
            <span key={`1-${i}`} className="text-8xl md:text-[10vw] font-display font-bold uppercase text-transparent stroke-text" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)', color: 'transparent' }}>
              {word} <span className="text-gold mx-4">•</span>
            </span>
          ))}
        </motion.div>
        
        <motion.div style={{ x: x2 }} className="flex whitespace-nowrap gap-8 items-center -ml-40">
          {[...marqueeWords].reverse().concat([...marqueeWords].reverse()).map((word, i) => (
            <span key={`2-${i}`} className="text-8xl md:text-[10vw] font-display font-light uppercase text-white/40">
              {word} <span className="text-white/10 mx-4">/</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bento Grid Features */}
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div 
                key={i} 
                className="group bg-void border border-white/5 p-8 rounded-3xl hover:bg-graphite transition-colors duration-500"
              >
                <div className="w-14 h-14 bg-obsidian rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:border-gold/30 group-hover:scale-110 transition-all duration-500">
                  <Icon className="text-gold" size={24} />
                </div>
                <h3 className="text-xl font-display text-white mb-4 group-hover:text-gold transition-colors">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>

    </section>
  )
}
