'use client'

import { RevealText } from '@/components/animations/reveal-text'
import { FadeIn } from '@/components/animations/fade-in'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Standard Wash',
    price: 49,
    popular: false,
    features: ['Exterior Hand Wash', 'Wheel Cleaning', 'Tire Dressing', 'Interior Vacuum'],
  },
  {
    name: 'Luxe Member',
    price: 149,
    period: '/mo',
    popular: true,
    features: ['2 Full Details per month', 'Priority Scheduling', 'Ceramic Spray Wax', '10% Off Addons'],
  },
  {
    name: 'Showroom Detail',
    price: 299,
    popular: false,
    features: ['Paint Correction', '1-Year Ceramic Coating', 'Deep Leather Clean', 'Engine Bay Detail'],
  },
]

export function PricingPreview() {
  return (
    <section className="bg-graphite py-32 border-b border-white/5">
      <div className="container">
        <div className="text-center mb-16">
          <RevealText tag="h2" className="text-4xl md:text-5xl font-display text-white mb-4">
            Transparent Pricing
          </RevealText>
          <FadeIn delay={0.2} direction="up">
            <p className="text-text-secondary">No hidden fees. Just exceptional value.</p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.15} direction="up" className="flex h-full">
              <div className={cn(
                "w-full bg-void border p-8 flex flex-col transition-transform hover:-translate-y-2 relative overflow-hidden",
                plan.popular ? "border-gold shadow-[0_0_30px_rgba(201,168,76,0.1)]" : "border-white/10"
              )}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gold text-void text-xs font-bold tracking-widest uppercase px-4 py-1">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-xl text-white font-medium mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-mono text-gold">${plan.price}</span>
                  {plan.period && <span className="text-text-tertiary">{plan.period}</span>}
                </div>

                <ul className="flex flex-col gap-4 mb-8 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <span className="text-text-secondary text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant={plan.popular ? 'premium' : 'outline'} className="w-full">
                  Choose Plan
                </Button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
