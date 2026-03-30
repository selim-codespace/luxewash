'use client'

import { useState } from 'react'
import { RevealText } from '@/components/animations/reveal-text'
import { FadeIn } from '@/components/animations/fade-in'
import { PricingPreview } from '@/components/sections/home/pricing-preview'
import { FaqSection } from '@/components/sections/home/faq-section'
import { cn } from '@/lib/utils'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')

  return (
    <div className="bg-void min-h-screen pt-32">
      <div className="container relative z-10 text-center max-w-3xl mx-auto mb-20">
        <FadeIn delay={0.1} direction="up">
          <span className="text-gold font-mono tracking-widest uppercase text-sm mb-4 block">
            Luxe Member Club
          </span>
        </FadeIn>
        
        <RevealText tag="h1" className="text-5xl md:text-7xl font-display text-white mb-6 whitespace-pre-line">
          {"Uncompromising Care,\nPredictable Pricing"}
        </RevealText>
        
        <FadeIn delay={0.8} direction="up">
          <p className="text-lg text-text-secondary leading-relaxed mb-10">
            Keep your vehicle in pristine condition year-round with our exclusive memberships. Enjoy priority booking, complimentary add-ons, and locked-in rates.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <span className={cn('text-sm font-medium transition-colors', billingCycle === 'monthly' ? 'text-white' : 'text-text-secondary')}>Monthly</span>
            <button 
              className="w-16 h-8 rounded-full bg-white/10 p-1 relative flex items-center transition-colors hover:bg-white/20"
              onClick={() => setBillingCycle(b => b === 'monthly' ? 'annual' : 'monthly')}
            >
              <div 
                className={cn('w-6 h-6 rounded-full bg-gold transition-transform duration-300', billingCycle === 'annual' ? 'translate-x-8' : 'translate-x-0')}
              />
            </button>
            <span className={cn('text-sm font-medium flex items-center gap-2 transition-colors', billingCycle === 'annual' ? 'text-white' : 'text-text-secondary')}>
              Annually <span className="bg-gold/20 text-gold text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-wider font-mono">Save 15%</span>
            </span>
          </div>
        </FadeIn>
      </div>

      <PricingPreview />

      {/* ROI / Savings Calculator Component */}
      <section className="py-32 bg-obsidian border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="container relative z-10 max-w-4xl mx-auto text-center">
          <RevealText tag="h3" className="text-3xl md:text-4xl font-display text-white mb-6">
            The Value of Membership
          </RevealText>
          <p className="text-text-secondary mb-12 max-w-2xl mx-auto">
            A Luxe Member scheduling 2 details per month saves an average of <strong className="text-gold">$400 annually</strong> compared to booking standalone washes, plus you get free ceramic boost sprays and 10% off paint corrections.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-void border border-white/5 p-6 border-b-2 border-b-gold">
              <h4 className="text-3xl font-mono text-white mb-2">$400</h4>
              <p className="text-sm text-text-tertiary uppercase tracking-widest">Avg. Annual Savings</p>
            </div>
            <div className="bg-void border border-white/5 p-6 border-b-2 border-b-emerald-500">
              <h4 className="text-3xl font-mono text-white mb-2">24hrs</h4>
              <p className="text-sm text-text-tertiary uppercase tracking-widest">Priority Scheduling</p>
            </div>
            <div className="bg-void border border-white/5 p-6 border-b-2 border-b-blue-500">
              <h4 className="text-3xl font-mono text-white mb-2">10% Off</h4>
              <p className="text-sm text-text-tertiary uppercase tracking-widest">All Premium Add-ons</p>
            </div>
          </div>
        </div>
      </section>

      <FaqSection />
    </div>
  )
}
