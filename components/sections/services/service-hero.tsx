'use client'

import { RevealText } from '@/components/animations/reveal-text'
import { FadeIn } from '@/components/animations/fade-in'

export function ServiceHero() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden bg-obsidian">
      {/* Background Graphic */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen scale-105"
        style={{ backgroundImage: 'url(/images/services-hero-bg.jpg)' }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
      
      <div className="container relative z-10 text-center max-w-3xl mt-20">
        <FadeIn delay={0.1} direction="up">
          <span className="text-gold font-mono tracking-widest uppercase text-sm mb-4 block">
            The LuxeWash Collection
          </span>
        </FadeIn>
        
        <RevealText tag="h1" className="text-5xl md:text-7xl font-display text-white mb-6 whitespace-pre-line">
          {"Unrivaled Care For\nYour Vehicle"}
        </RevealText>
        
        <FadeIn delay={0.8} direction="up">
          <p className="text-lg text-text-secondary leading-relaxed">
            From essential maintenance to comprehensive restorations and ceramic coatings. Every service is executed with master craftsmanship.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
