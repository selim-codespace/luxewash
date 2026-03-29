import { Metadata } from 'next'
import { HeroSection } from '@/components/sections/home/hero-section'
import { TrustBar } from '@/components/sections/home/trust-bar'
import { ServicesShowcase } from '@/components/sections/home/services-showcase'
import { HowItWorks } from '@/components/sections/home/how-it-works'
import { StatsRow } from '@/components/sections/home/stats-row'
import { AiTeaser } from '@/components/sections/home/ai-teaser'
import { Testimonials } from '@/components/sections/home/testimonials'
import { PricingPreview } from '@/components/sections/home/pricing-preview'
import { BeforeAfter } from '@/components/sections/home/before-after'
import { FleetCta } from '@/components/sections/home/fleet-cta'
import { FaqSection } from '@/components/sections/home/faq-section'

export const metadata: Metadata = {
  title: 'Premium Mobile Car Wash & Detailing | LuxeWash',
  description: 'The ultimate detailing experience delivered to your doorstep. Master detailers, premium products, spectacular results.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesShowcase />
      <HowItWorks />
      <BeforeAfter />
      <StatsRow />
      <AiTeaser />
      <PricingPreview />
      <Testimonials />
      <FleetCta />
      <FaqSection />
    </>
  )
}
