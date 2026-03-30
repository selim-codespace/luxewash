import { SmoothScroll } from '@/components/animations/smooth-scroll'
import { PublicNavbar } from '@/components/layout/public-navbar'
import { PublicFooter } from '@/components/layout/public-footer'
import { HeroSection } from '@/components/home/hero-section'
import { FeatureMarquee } from '@/components/home/feature-marquee'
import { ServicesSticky } from '@/components/home/services-sticky'
import { StatsSection } from '@/components/home/stats-section'
import { HowItWorks } from '@/components/home/how-it-works'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { PricingSection } from '@/components/home/pricing-section'
import { BeforeAfterGallery } from '@/components/home/before-after-gallery'
import { FAQSection } from '@/components/home/faq-section'
import { CTASection } from '@/components/home/cta-section'

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-void flex flex-col selection:bg-gold/30 selection:text-white">
        <PublicNavbar />
        
        <div className="flex-1">
          <HeroSection />
          <FeatureMarquee />
          <StatsSection />
          <HowItWorks />
          <ServicesSticky />
          <PricingSection />
          <BeforeAfterGallery />
          <TestimonialsSection />
          <FAQSection />
          <CTASection />
        </div>

        <PublicFooter />
      </main>
    </SmoothScroll>
  )
}