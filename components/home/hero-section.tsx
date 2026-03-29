'use client'

import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/animations/fade-in'
import Link from 'next/link'
import { Sparkles, CalendarClock, ChevronRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden isolate">
      {/* Background FX */}
      <div className="aurora opacity-70" />
      
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/90 to-void" />
        {/* Placeholder for dynamic car imagery or abstract luxury patterns */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      </div>

      <div className="container relative z-10 px-6 mx-auto flex flex-col items-center text-center">
        <FadeIn delay={0.1}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 mb-8">
            <Sparkles size={14} className="text-gold" />
            <span className="text-xs font-medium uppercase tracking-widest text-gold-text">On-Demand Master Detailing</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium text-white max-w-5xl leading-[1.1] mb-8 headline">
            The Pinnacle of <br className="hidden md:block" />
            <span className="glow-text">Automotive Care</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            We deliver uncompromising quality direct to your location. Experience the luxury of a pristine vehicle without ever leaving your home or office.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link href="/booking" className="w-full sm:w-auto">
              <Button variant="premium" size="lg" className="w-full sm:w-auto h-14 px-8 text-base">
                <CalendarClock className="mr-2" size={20} />
                Book Your Detail
              </Button>
            </Link>
            <Link href="#services" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base group">
                Explore Packages
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div className="mt-16 flex items-center justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Simulated Press/Trust Logos */}
            <div className="text-sm font-bold tracking-widest uppercase text-white">Forbes</div>
            <div className="text-sm font-bold tracking-widest uppercase text-white">GQ</div>
            <div className="text-sm font-bold tracking-widest uppercase text-white">MotorTrend</div>
            <div className="text-sm font-bold tracking-widest uppercase text-white hidden sm:block">Robb Report</div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
