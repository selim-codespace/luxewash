import { RevealText } from '@/components/animations/reveal-text'
import { FadeIn } from '@/components/animations/fade-in'
import { MagneticButton } from '@/components/animations/magnetic-button'
import { HeroCar } from '@/components/3d/hero-car'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden bg-void">
      <div className="aurora opacity-70" />
      
      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full pt-20">
        
        {/* Left: Editorial Text */}
        <div className="flex flex-col justify-center max-w-xl">
          <FadeIn delay={0.2} direction="up" className="mb-6">
            <span className="overline text-gold flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />
              Elevate Your Drive
            </span>
          </FadeIn>
          
          <RevealText tag="h1" className="text-6xl md:text-7xl lg:text-8xl font-display font-medium leading-[0.9] text-white tracking-tight mb-8">
            Perfection <br/> Delivered.
          </RevealText>
          
          <FadeIn delay={0.8} direction="up">
            <p className="text-lg md:text-xl text-text-secondary mb-10 leading-relaxed max-w-lg">
              The ultimate detailing experience, wherever you are. Master detailers, premium ceramic coatings, and uncompromising attention to detail.
            </p>
          </FadeIn>
          
          <FadeIn delay={1} direction="up" className="flex flex-wrap items-center gap-6">
            <Link href="/booking">
              <MagneticButton intensity={0.2} className="px-8 py-4 bg-white text-void font-semibold hover:bg-gold transition-colors text-sm uppercase tracking-wider group">
                Reserve Session
                <ArrowRight className="ml-2 w-4 h-4 inline-block group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
            </Link>
            
            <Link href="/services" className="text-text-secondary hover:text-white font-medium text-sm transition-colors border-b border-white/20 hover:border-white pb-1">
              Explore Services
            </Link>
          </FadeIn>
        </div>
        
        {/* Right: 3D Car Widget */}
        <div className="h-[60vh] lg:h-[80vh] w-full relative hidden md:block">
          <FadeIn delay={0.5} duration={1.5} className="w-full h-full">
            <HeroCar />
          </FadeIn>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce opacity-50">
        <span className="text-xs font-mono text-white tracking-widest uppercase">Scroll</span>
        <ChevronDown className="text-white w-4 h-4" />
      </div>
    </section>
  )
}
