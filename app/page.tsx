import { PublicNavbar } from '@/components/layout/public-navbar'
import { PublicFooter } from '@/components/layout/public-footer'
import { HeroSection } from '@/components/home/hero-section'
import { ServicesSection } from '@/components/home/services-section'
import { FeaturesSection } from '@/components/home/features-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'

export default function Home() {
  return (
    <main className="min-h-screen bg-void flex flex-col selection:bg-gold/30 selection:text-white">
      <PublicNavbar />
      
      {/* Main Content Areas */}
      <div className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <ServicesSection />
        <TestimonialsSection />
      </div>

      <PublicFooter />
    </main>
  )
}
