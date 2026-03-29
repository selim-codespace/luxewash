'use client'

import { FadeIn } from '@/components/animations/fade-in'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Droplets, Shield, Sparkles } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    title: 'Standard Detail',
    price: '$149',
    description: 'Comprehensive exterior hand wash and interior revitalization for a refreshed look.',
    icon: Droplets,
    features: [
      'Two-bucket hand wash',
      'Wheel & tire cleaning',
      'Interior vacuum & wipe down',
      'Streak-free window cleaning',
      'Spray wax application',
    ],
    popular: false,
  },
  {
    title: 'Premium Ceramic',
    price: '$299',
    description: 'Advanced protection with our signature ceramic sealant and deep interior shampoo.',
    icon: Shield,
    features: [
      'Everything in Standard',
      'Iron decontamination & clay bar',
      '6-month ceramic sealant applied',
      'Deep carpet & seat extraction',
      'Leather conditioning trim restore',
    ],
    popular: true,
  },
  {
    title: 'Signature Paint Correction',
    price: '$599',
    description: 'The ultimate restoration. Multi-stage paint correction and multi-year ceramic coating.',
    icon: Sparkles,
    features: [
      'Everything in Premium',
      '2-stage paint correction (removes 80%+ swirls)',
      '3-year professional ceramic coating',
      'Engine bay detail',
      'Wheel face ceramic coating',
    ],
    popular: false,
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-void relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-display text-white mb-6 headline">
              Uncompromising <span className="text-gold">Packages</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-text-secondary text-lg">
              Select the level of care your vehicle deserves. Every package is executed by our certified Master Detailers using premium, industry-leading products.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <FadeIn key={service.title} delay={0.2 + index * 0.1}>
                <div 
                  className={`relative p-8 rounded-xl border transition-all duration-500 ease-out group ${
                    service.popular 
                      ? 'bg-obsidian border-gold/40 shadow-glow transform md:-translate-y-4' 
                      : 'bg-void border-white/5 hover:border-gold/30 hover:bg-obsidian/50'
                  }`}
                >
                  {service.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-void px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                      Most Popular
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-gold/30 transition-colors">
                      <Icon className={service.popular ? 'text-gold' : 'text-white'} size={24} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-display text-white mb-2">{service.title}</h3>
                  <div className="flex items-end gap-2 mb-6">
                    <span className="text-4xl font-display font-medium text-white stat">{service.price}</span>
                    <span className="text-text-tertiary text-sm mb-1 uppercase tracking-wide">/ service</span>
                  </div>

                  <p className="text-text-secondary text-sm mb-8 min-h-[60px]">
                    {service.description}
                  </p>

                  <div className="space-y-4 mb-10">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-gold mt-0.5 shrink-0" />
                        <span className="text-sm text-text-primary">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={`/booking?package=${service.title}`} className="block">
                    <Button 
                      variant={service.popular ? 'premium' : 'outline'} 
                      className={`w-full ${service.popular ? '' : 'bg-transparent hover:bg-white/5'}`}
                    >
                      Select Package
                    </Button>
                  </Link>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
