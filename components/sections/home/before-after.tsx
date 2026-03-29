'use client'

import { useState, useRef, useEffect } from 'react'
import { RevealText } from '@/components/animations/reveal-text'
import { FadeIn } from '@/components/animations/fade-in'
import { GripVertical } from 'lucide-react'

export function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setSliderPosition((x / rect.width) * 100)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  return (
    <section className="bg-obsidian py-32 border-b border-white/5 overflow-hidden">
      <div className="container">
        <div className="text-center mb-16">
          <RevealText tag="h2" className="text-4xl md:text-5xl font-display text-white mb-4">
            The Transformation
          </RevealText>
          <FadeIn delay={0.2} direction="up">
            <p className="text-text-secondary">Drag the slider to see the LuxeWash difference.</p>
          </FadeIn>
        </div>

        <FadeIn delay={0.4}>
          <div 
            ref={containerRef}
            className="relative w-full max-w-5xl mx-auto aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden select-none touch-none bg-void cursor-drag"
            onPointerMove={handlePointerMove}
            onPointerUp={() => setIsDragging(false)}
            onPointerLeave={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
          >
            {/* After Image (Background) */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/car-after.jpg)' }}
            />
            <div className="absolute top-4 right-4 bg-void/80 backdrop-blur-md px-3 py-1 text-xs font-mono text-gold border border-gold/30 uppercase tracking-widest">
              After
            </div>

            {/* Before Image (Clipped Foreground) */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: 'url(/images/car-before.jpg)',
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
              }}
            />
            <div className="absolute top-4 left-4 bg-void/80 backdrop-blur-md px-3 py-1 text-xs font-mono text-white border border-white/30 uppercase tracking-widest">
              Before
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center hover:bg-gold transition-colors"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              onPointerDown={() => setIsDragging(true)}
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] transform transition-transform hover:scale-110 text-void">
                <GripVertical size={20} />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
