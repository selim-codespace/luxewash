'use client'

import { useState } from 'react'
import { RevealText } from '@/components/animations/reveal-text'
import { FadeIn } from '@/components/animations/fade-in'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export function AiTeaser() {
  const [step, setStep] = useState(1)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [recommendation, setRecommendation] = useState<{ name: string; rationale: string } | null>(null)

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    // Simulate AI API call
    setTimeout(() => {
      setIsAnalyzing(false)
      setRecommendation({
        name: 'The Luxe Detail',
        rationale: 'Based on heavy dirt level and SUV size, a full interior and exterior deep clean is recommended to restore showroom condition.',
      })
      setStep(3)
    }, 1500)
  }

  return (
    <section className="bg-void py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 pointer-events-none" />
      
      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <RevealText tag="h2" className="text-4xl md:text-5xl font-display text-white mb-6 whitespace-pre-line">
            {"Not sure what\nyou need?"}
          </RevealText>
          <FadeIn direction="up" delay={0.2}>
            <p className="text-text-secondary text-lg mb-8">
              Let our AI Concierge analyze your vehicle's condition and recommend the perfect detailing package.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.4} className="bg-obsidian border border-white/10 p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-void via-gold to-void" />
          
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-text-secondary mb-2 block">What do you drive?</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Sedan', 'SUV', 'Truck', 'Coupe'].map((type) => (
                    <button key={type} onClick={() => setStep(2)} className="border border-white/10 hover:border-gold py-3 text-white text-sm transition-colors text-center bg-void">
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-text-secondary mb-2 block">How dirty is it?</label>
                <div className="flex flex-col gap-3 mb-6">
                  {['Light Dust', 'Everyday Grime', 'Off-Road Mud', 'Pet Hair Everywhere'].map((level) => (
                    <button key={level} onClick={handleAnalyze} className="border border-white/10 hover:border-gold py-3 px-4 text-white text-sm text-left transition-colors bg-void flex justify-between items-center group">
                      {level}
                      <Sparkles className="w-4 h-4 text-white/0 group-hover:text-gold transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && recommendation && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 text-gold text-xs font-mono tracking-widest border border-gold/20 mb-4">
                <Sparkles className="w-3 h-3" /> AI RECOMMENDED
              </div>
              <h3 className="text-2xl font-display text-white">{recommendation.name}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{recommendation.rationale}</p>
              
              <div className="pt-4 flex gap-4">
                <Button variant="premium" className="w-full">Book This Package</Button>
                <Button variant="outline" onClick={() => setStep(1)} className="px-4">Reset</Button>
              </div>
            </div>
          )}

          {isAnalyzing && (
            <div className="absolute inset-0 bg-obsidian/90 backdrop-blur-sm flex flex-col items-center justify-center z-20">
              <Sparkles className="w-8 h-8 text-gold animate-pulse mb-4" />
              <p className="text-sm font-mono text-gold animate-pulse tracking-widest">ANALYZING CONDITION...</p>
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  )
}
