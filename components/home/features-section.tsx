'use client'

import { FadeIn } from '@/components/animations/fade-in'
import { ShieldCheck, MapPin, Award, Timer } from 'lucide-react'

const features = [
  {
    icon: MapPin,
    title: 'We Come To You',
    description: 'Your home, your office, or anywhere in between. We bring our fully equipped mobile detailing unit directly to your location.',
  },
  {
    icon: Award,
    title: 'Master Detailers',
    description: 'Our technicians are rigorously trained, insured, and certified to handle exotic, luxury, and daily driven vehicles with supreme care.',
  },
  {
    icon: ShieldCheck,
    title: 'Premium Products',
    description: 'We exclusively use PH-neutral soaps, ceramic-infused sealants, and microscopic-grade microfiber towels to protect your clear coat.',
  },
  {
    icon: Timer,
    title: 'Zero Waiting Rooms',
    description: 'Your time is your most valuable asset. Keep working or relaxing while we meticulously restore your vehicle outside.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-graphite relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-obsidian to-transparent opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-gold/5 to-transparent pointer-events-none" />

      <div className="container relative mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8 max-w-xl">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-display text-white mb-6 headline">
                Redefining the <br /> <span className="text-gold">Detailing Experience</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-text-secondary text-lg leading-relaxed">
                We&apos;ve eliminated the friction of the traditional car wash. No more waiting lines, harsh spinning brushes, or subpar service. LuxeWash is a concierge-level detailing experience engineered for those who demand perfection.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.2} className="pt-4 grid grid-cols-2 gap-8">
              <div>
                <p className="text-4xl font-display text-white mb-2 stat">5k+</p>
                <p className="text-sm font-medium text-gold uppercase tracking-widest">Vehicles Detailed</p>
              </div>
              <div>
                <p className="text-4xl font-display text-white mb-2 stat">4.9</p>
                <p className="text-sm font-medium text-gold uppercase tracking-widest">Average Review</p>
              </div>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <FadeIn key={feature.title} delay={0.3 + (index * 0.1)} className="bg-obsidian border border-white/5 p-8 rounded-xl hover:border-gold/30 transition-colors duration-300">
                  <div className="w-12 h-12 bg-void border border-white/10 rounded-lg flex items-center justify-center mb-6 text-gold shadow-md">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-display text-white mb-3">{feature.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </FadeIn>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
