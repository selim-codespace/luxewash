import { RevealText } from '@/components/animations/reveal-text'
import { FadeIn } from '@/components/animations/fade-in'
import { HowItWorks as SharedHowItWorks } from '@/components/sections/home/how-it-works'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'How LuxeWash Works | Mobile Detailing Process',
}

export default function HowItWorksPage() {
  return (
    <div className="bg-void min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Hero Section */}
      <div className="container relative z-10 text-center mb-24">
        <RevealText tag="h1" className="text-5xl md:text-7xl font-display text-white mb-6">
          The Process
        </RevealText>
        <FadeIn delay={0.2} direction="up">
          <p className="text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
            From the moment you book to the moment we hand back your keys, 
            every step is engineered for your convenience and your vehicle&apos;s perfection.
          </p>
        </FadeIn>
      </div>

      {/* Video Teaser (Static placeholder for MVP) */}
      <FadeIn delay={0.4} className="container mb-32 group cursor-pointer">
        <div className="w-full relative aspect-video bg-obsidian border border-white/10 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/process-video-thumb.jpg')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
          <div className="w-20 h-20 bg-gold/90 rounded-full flex items-center justify-center relative z-10 pl-1 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_40px_rgba(201,168,76,0.3)]">
            <Play className="w-8 h-8 text-void fill-void" />
          </div>
        </div>
      </FadeIn>

      {/* Shared Component */}
      <SharedHowItWorks />

      {/* Bottom CTA */}
      <div className="container mt-32 text-center pb-10 border-t border-white/10 pt-20">
        <RevealText tag="h2" className="text-3xl md:text-4xl font-display text-white mb-6">
          Ready to experience the difference?
        </RevealText>
        <FadeIn delay={0.2}>
          <Link href="/booking">
            <Button variant="premium" size="lg" className="uppercase tracking-widest text-sm font-semibold">
              Book Your Detail
            </Button>
          </Link>
        </FadeIn>
      </div>
    </div>
  )
}
