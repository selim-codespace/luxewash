'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from '@/components/animations/fade-in'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'
import Link from 'next/link'

const oneTimePricing = [
  {
    name: 'Express',
    price: 79,
    description: 'Quick exterior refresh for the busy professional.',
    features: [
      'Hand wash & dry',
      'Wheel cleaning',
      'Window cleaning',
      'Tire shine',
    ],
    notIncluded: [
      'Interior cleaning',
      'Clay bar treatment',
      'Wax/sealant',
    ],
    popular: false,
  },
  {
    name: 'Signature',
    price: 199,
    description: 'Our most popular package. Complete interior and exterior.',
    features: [
      'Everything in Express',
      'Full interior vacuum',
      'Dashboard & console wipe',
      'Leather conditioning',
      'Door jambs cleaned',
      'Air freshener',
    ],
    notIncluded: [
      'Paint correction',
      'Ceramic coating',
    ],
    popular: true,
  },
  {
    name: 'Ultimate',
    price: 449,
    description: 'The complete restoration. Paint correction and ceramic coating.',
    features: [
      'Everything in Signature',
      'Clay bar decontamination',
      '1-stage paint correction',
      '2-year ceramic coating',
      'Engine bay detail',
      'Headlight restoration',
    ],
    notIncluded: [],
    popular: false,
  },
]

const subscriptionPricing = [
  {
    name: 'Bronze',
    price: 79,
    period: 'month',
    description: 'Perfect for the occasional driver.',
    features: [
      '1 Signature wash per month',
      '10% off additional services',
      'Priority booking',
    ],
    popular: false,
  },
  {
    name: 'Silver',
    price: 149,
    period: 'month',
    description: 'For the daily commuter who values consistency.',
    features: [
      '2 Signature washes per month',
      '15% off additional services',
      'Priority booking',
      'Free tire shine add-on',
      'Loyalty points doubled',
    ],
    popular: true,
  },
  {
    name: 'Gold',
    price: 249,
    period: 'month',
    description: 'Unlimited care for the automotive enthusiast.',
    features: [
      'Unlimited Express washes',
      '2 Signature washes per month',
      '20% off additional services',
      'VIP priority booking',
      'Free interior vacuum anytime',
      'Seasonal ceramic touch-up',
    ],
    popular: false,
  },
]

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'one-time' | 'subscription'>('one-time')

  const pricing = billingCycle === 'one-time' ? oneTimePricing : subscriptionPricing

  return (
    <section id="pricing" className="py-32 bg-void relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-4">
              Investment
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-text-primary mb-6 headline tracking-tighter">
              Transparent <span className="text-primary italic">Pricing</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              No hidden fees. No surprises. Just premium service.
            </p>

            <div className="inline-flex items-center gap-2 p-1 bg-obsidian rounded-lg border border-white/5">
              <button
                onClick={() => setBillingCycle('one-time')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  billingCycle === 'one-time'
                    ? 'bg-primary text-white'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                One-Time
              </button>
              <button
                onClick={() => setBillingCycle('subscription')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  billingCycle === 'subscription'
                    ? 'bg-primary text-white'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                Membership
              </button>
            </div>
          </div>
        </FadeIn>

        <AnimatePresence mode="wait">
          <motion.div
            key={billingCycle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {pricing.map((plan, index) => (
              <FadeIn key={plan.name} delay={index * 0.1}>
                <div
                  className={`relative rounded-2xl border p-8 ${
                    plan.popular
                      ? 'bg-gradient-to-b from-primary/10 to-obsidian border-primary/30'
                      : 'bg-obsidian border-white/5'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full">
                      Most Popular
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-xl font-display text-text-primary mb-2">{plan.name}</h3>
                    <p className="text-text-tertiary text-sm mb-6">{plan.description}</p>
                    <div className="flex items-end justify-center gap-1">
                      <span className="text-4xl font-mono font-bold text-text-primary">
                        ${plan.price}
                      </span>
                      {billingCycle === 'subscription' && (
                        <span className="text-text-tertiary mb-1">/mo</span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-text-secondary text-sm">{feature}</span>
                      </li>
                    ))}
                    {'notIncluded' in plan && plan.notIncluded?.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 opacity-50">
                        <X className="w-5 h-5 text-text-tertiary shrink-0 mt-0.5" />
                        <span className="text-text-tertiary text-sm line-through">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={`/booking?plan=${plan.name.toLowerCase()}`}>
                    <Button
                      variant={plan.popular ? 'default' : 'outline'}
                      className="w-full"
                    >
                      {billingCycle === 'subscription' ? 'Subscribe' : 'Book Now'}
                    </Button>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </motion.div>
        </AnimatePresence>

        <FadeIn delay={0.4}>
          <p className="text-center text-text-tertiary text-sm mt-12">
            All prices vary based on vehicle size. <Link href="#" className="text-primary hover:underline">View size pricing</Link>
          </p>
        </FadeIn>
      </div>
    </section>
  )
}