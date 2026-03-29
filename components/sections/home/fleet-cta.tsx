import { RevealText } from '@/components/animations/reveal-text'
import { FadeIn } from '@/components/animations/fade-in'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function FleetCta() {
  return (
    <section className="relative py-32 overflow-hidden bg-void">
      <div className="absolute inset-0 bg-[url('/images/fleet-bg.jpg')] bg-cover bg-center opacity-30 mix-blend-luminosity grayscale" />
      <div className="absolute inset-0 bg-gradient-to-r from-void via-void/80 to-transparent" />
      
      <div className="container relative z-10 w-full flex justify-between items-center flex-wrap gap-12">
        <div className="max-w-2xl">
          <RevealText tag="h2" className="text-4xl md:text-5xl font-display text-white mb-6">
            Corporate & Fleet Services
          </RevealText>
          <FadeIn delay={0.2} direction="up">
            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              Maintain your company’s professional image with our dedicated fleet detailing programs. 
              Volume pricing, dedicated account managers, and priority on-site scheduling for 5 to 500 vehicles.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.4} direction="left" className="w-full md:w-auto">
          <Link href="/contact?subject=fleet">
            <Button variant="outline" size="lg" className="border-gold text-gold hover:bg-gold hover:text-void uppercase tracking-widest text-sm w-full md:w-auto">
              Inquire for Business
            </Button>
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
