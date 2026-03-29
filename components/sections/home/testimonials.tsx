'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { RevealText } from '@/components/animations/reveal-text'
import { FadeIn } from '@/components/animations/fade-in'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'James L.',
    car: 'Porsche 911 GT3',
    text: 'The easiest detailing experience I’ve ever had. They showed up at my office, took my keys, and two hours later my car looked better than when it left the dealership.',
  },
  {
    name: 'Sarah M.',
    car: 'Tesla Model Y',
    text: 'I used to waste my Saturday mornings at the car wash. LuxeWash is a game changer. The membership pays for itself in time saved alone.',
  },
  {
    name: 'David K.',
    car: 'Range Rover SV',
    text: 'Their ceramic coating applied in my own driveway was flawless. Exceptional professionalism and the results are simply undeniable.',
  },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="bg-void py-32 overflow-hidden">
      <div className="container">
        <div className="mb-16">
          <RevealText tag="h2" className="text-4xl md:text-5xl font-display text-white">
            Client Voices
          </RevealText>
        </div>

        <div className="relative">
          {/* Main Testimonial Display */}
          <div className="min-h-[250px] relative">
            <FadeIn direction="none">
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>
              
              <p className="text-2xl md:text-4xl font-display text-white leading-relaxed mb-8 max-w-4xl">
                "{testimonials[activeIndex].text}"
              </p>
              
              <div>
                <p className="text-gold font-medium">{testimonials[activeIndex].name}</p>
                <p className="text-text-tertiary text-sm font-mono mt-1">{testimonials[activeIndex].car}</p>
              </div>
            </FadeIn>
          </div>

          {/* Navigation Dots/Line */}
          <div className="flex items-center gap-4 mt-12 border-t border-white/10 pt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="group py-2 px-1 focus:outline-none"
              >
                <div className={`h-1 transition-all duration-300 ${i === activeIndex ? 'w-16 bg-gold' : 'w-8 bg-white/20 group-hover:bg-white/40'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
