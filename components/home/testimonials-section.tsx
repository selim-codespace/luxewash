'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FadeIn } from '@/components/animations/fade-in'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const testimonials = [
  {
    quote: "I've tried every premium detailer in the city. LuxeWash is entirely in a league of their own. My GT3 RS looks better than the day it left the showroom, and they did it right in my driveway.",
    author: "Jonathan P.",
    role: "CEO, TechVentures",
    rating: 5,
  },
  {
    quote: "The convenience is unmatched. I booked a session while at the office, handed over my keys, and came out to an immaculate G-Wagon. The meticulous attention to detail is actually stunning.",
    author: "Sarah L.",
    role: "Director of Operations",
    rating: 5,
  },
  {
    quote: "Their ceramic coating package is worth every penny. Water just slides off the paint, and the depth of the finish is incredible. Highly professional team who clearly respect high-end vehicles.",
    author: "Michael R.",
    role: "Automotive Enthusiast",
    rating: 5,
  },
  {
    quote: "I've never seen my car this clean. The interior leather conditioning brought my Bentley back to life. Worth every penny for the premium service they provide.",
    author: "David K.",
    role: "Investment Banker",
    rating: 5,
  },
  {
    quote: "As someone who works on cars professionally, I'm extremely picky. LuxeWash exceeded all expectations. The paint correction results are showroom quality.",
    author: "Alex T.",
    role: "Professional Racer",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section id="testimonials" className="py-32 bg-obsidian relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <motion.div style={{ opacity }} className="container mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeIn>
            <span className="text-gold uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-4 block">
              Testimonials
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-text-primary mb-6 headline">
              Trusted by <span className="text-gold">Perfectionists</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-text-secondary text-lg leading-relaxed">
              Don't just take our word for it. Read what our exclusive clientele has to say about the LuxeWash experience.
            </p>
          </FadeIn>
        </div>

        {/* Featured Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Navigation */}
            <button 
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 rounded-full border border-white/10 bg-void/80 backdrop-blur flex items-center justify-center text-text-secondary hover:text-white hover:border-gold/50 transition-all z-10"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 rounded-full border border-white/10 bg-void/80 backdrop-blur flex items-center justify-center text-text-secondary hover:text-white hover:border-gold/50 transition-all z-10"
            >
              <ChevronRight size={20} />
            </button>

            {/* Testimonial Card */}
            <div className="bg-gradient-to-br from-graphite/50 to-void border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Quote className="w-12 h-12 text-gold/30 mb-6" />
                
                <p className="text-xl md:text-2xl text-text-primary leading-relaxed mb-8 font-light italic">
                  "{testimonials[activeIndex].quote}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium text-lg">{testimonials[activeIndex].author}</p>
                    <p className="text-text-tertiary text-sm uppercase tracking-wider mt-1">{testimonials[activeIndex].role}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <Star key={i} size={18} className="text-gold fill-gold" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeIndex === index ? 'w-8 bg-gold' : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <FadeIn delay={0.5} className="mt-20">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            <div>
              <p className="text-4xl font-mono font-bold text-gold">4.9</p>
              <p className="text-text-tertiary text-sm mt-1">Average Rating</p>
            </div>
            <div>
              <p className="text-4xl font-mono font-bold text-gold">12K+</p>
              <p className="text-text-tertiary text-sm mt-1">Cars Washed</p>
            </div>
            <div>
              <p className="text-4xl font-mono font-bold text-gold">98%</p>
              <p className="text-text-tertiary text-sm mt-1">Return Rate</p>
            </div>
          </div>
        </FadeIn>
      </motion.div>
      
      {/* Large decorative watermark */}
      <div className="absolute -bottom-20 -right-20 text-[400px] font-display font-bold text-white/[0.015] pointer-events-none select-none leading-none">
        L
      </div>
    </section>
  )
}