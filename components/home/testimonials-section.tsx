'use client'

import { FadeIn } from '@/components/animations/fade-in'
import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    quote: "I’ve tried every premium detailer in the city. LuxeWash is entirely in a league of their own. My GT3 RS looks better than the day it left the showroom, and they did it right in my driveway.",
    author: "Jonathan P.",
    role: "CEO, TechVentures",
  },
  {
    quote: "The convenience is unmatched. I booked a session while at the office, handed over my keys, and came out to an immaculate G-Wagon. The meticulous attention to detail is actually stunning.",
    author: "Sarah L.",
    role: "Director of Operations",
  },
  {
    quote: "Their ceramic coating package is worth every penny. Water just slides off the paint, and the depth of the finish is incredible. Highly professional team who clearly respect high-end vehicles.",
    author: "Michael R.",
    role: "Automotive Enthusiast",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-void relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-display text-white mb-6 headline">
              Trusted by <span className="text-gold">Perfectionists</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-text-secondary text-lg">
              Don't just take our word for it. Read what our exclusive clientele has to say about the LuxeWash experience.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={testimonial.author} delay={0.2 + (index * 0.1)}>
              <div className="bg-obsidian border border-white/5 p-10 rounded-xl h-full flex flex-col relative group hover:border-gold/20 transition-all duration-300 hover:-translate-y-2">
                <Quote size={40} className="absolute top-6 right-8 text-white/[0.03] group-hover:text-gold/10 transition-colors duration-500" />
                
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-gold fill-gold" />
                  ))}
                </div>
                
                <p className="text-text-primary text-base leading-relaxed mb-8 flex-grow">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-graphite flex items-center justify-center font-display text-gold uppercase font-bold tracking-wider">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{testimonial.author}</p>
                    <p className="text-text-tertiary text-xs uppercase tracking-widest mt-0.5">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      
      {/* Decorative large logo watermark */}
      <div className="absolute -bottom-20 -right-20 text-[300px] font-display font-bold text-white/[0.01] pointer-events-none select-none leading-none">
        L
      </div>
    </section>
  )
}
