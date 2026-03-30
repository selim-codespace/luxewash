'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FadeIn } from '@/components/animations/fade-in'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const galleries = [
  {
    id: 1,
    before: '/images/before-after/bmw-before.jpg',
    after: '/images/before-after/bmw-after.jpg',
    title: 'BMW M4 Competition',
    service: 'Signature Correction',
  },
  {
    id: 2,
    before: '/images/before-after/tesla-before.jpg',
    after: '/images/before-after/tesla-after.jpg',
    title: 'Tesla Model S',
    service: 'Premium Ceramic',
  },
  {
    id: 3,
    before: '/images/before-after/porsche-before.jpg',
    after: '/images/before-after/porsche-after.jpg',
    title: 'Porsche 911 GT3',
    service: 'Ultimate Detail',
  },
  {
    id: 4,
    before: '/images/before-action/ranger-before.jpg',
    after: '/images/before-after/ranger-after.jpg',
    title: 'Ford Ranger Raptor',
    service: 'Full Interior',
  },
]

function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isDragging.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-ew-resize select-none"
      onMouseDown={() => (isDragging.current = true)}
      onMouseUp={() => (isDragging.current = false)}
      onMouseLeave={() => (isDragging.current = false)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchStart={() => (isDragging.current = true)}
      onTouchEnd={() => (isDragging.current = false)}
      onTouchMove={handleTouchMove}
    >
      <div className="absolute inset-0 bg-graphite">
        <div className="absolute inset-0 flex items-center justify-center text-text-tertiary">
          <span className="text-sm">Before image</span>
        </div>
      </div>
      
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${(100 - sliderPosition)}% 0 0)` }}
      >
        <div className="absolute inset-0 bg-obsidian">
          <div className="absolute inset-0 flex items-center justify-center text-text-primary">
            <span className="text-sm">After image</span>
          </div>
        </div>
      </div>

      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-void -mr-1" />
          <ChevronRight className="w-4 h-4 text-void -ml-1" />
        </div>
      </div>

      <div className="absolute bottom-4 left-4 px-2 py-1 bg-void/80 backdrop-blur-sm rounded text-xs text-text-primary uppercase tracking-widest">
        Before
      </div>
      <div className="absolute bottom-4 right-4 px-2 py-1 bg-primary/80 backdrop-blur-sm rounded text-xs text-white uppercase tracking-widest">
        After
      </div>
    </div>
  )
}

export function BeforeAfterGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const x = useTransform(scrollYProgress, [0, 0.5], [100, 0])

  return (
    <section ref={containerRef} id="gallery" className="py-32 bg-obsidian relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div style={{ opacity }} className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <p className="text-primary uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-4">
              Transformations
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-text-primary mb-6 headline tracking-tighter">
              Before & <span className="text-primary italic">After</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-text-secondary text-lg leading-relaxed">
              Drag the slider to reveal the transformation. Real results from real vehicles.
            </p>
          </FadeIn>
        </motion.div>

        <motion.div style={{ x, opacity }} className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {galleries.slice(0, 2).map((gallery, index) => (
              <FadeIn key={gallery.id} delay={index * 0.1}>
                <div className="space-y-4">
                  <BeforeAfterSlider before={gallery.before} after={gallery.after} />
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-display text-lg text-text-primary">{gallery.title}</h4>
                      <p className="text-text-tertiary text-sm">{gallery.service}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </motion.div>

        <FadeIn delay={0.5}>
          <div className="mt-8 flex justify-center gap-2">
            {galleries.slice(0, 2).map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeIndex === index ? 'w-8 bg-primary' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </FadeIn>
      </div>

      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}