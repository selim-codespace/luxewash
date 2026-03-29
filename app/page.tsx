import { SmoothScroll } from '@/components/animations/smooth-scroll'
import { PublicNavbar } from '@/components/layout/public-navbar'
import { PublicFooter } from '@/components/layout/public-footer'
import { HeroSection } from '@/components/home/hero-section'
import { FeatureMarquee } from '@/components/home/feature-marquee'
import { ServicesSticky } from '@/components/home/services-sticky'
import { TestimonialsSection } from '@/components/home/testimonials-section'

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-void flex flex-col selection:bg-gold/30 selection:text-white">
        <PublicNavbar />
        
        {/* Parallax Content Areas */}
        <div className="flex-1">
          <HeroSection />
          <FeatureMarquee />
          <ServicesSticky />
          <TestimonialsSection />
        </div>

        <PublicFooter />
      </main>
    </SmoothScroll>
  )
}

