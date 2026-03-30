'use client'

import { useState, useRef } from 'react'
import { useBookingStore } from '@/stores/booking-store'
import { FadeIn } from '@/components/animations/fade-in'
import { Button } from '@/components/ui/button'
import { Upload, Info, X, Camera } from 'lucide-react'
import Image from 'next/image'

export function StepPreferences() {
  const { instructions, setInstructions, nextStep } = useBookingStore()
  const [localNotes, setLocalNotes] = useState(instructions)
  const [previews, setPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newPreviews = Array.from(files).map(file => URL.createObjectURL(file))
      setPreviews(prev => [...prev, ...newPreviews])
    }
  }

  const removePhoto = (index: number) => {
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleContinue = () => {
    setInstructions(localNotes)
    nextStep()
  }

  return (
    <FadeIn>
      <div className="space-y-12">
        <div>
          <h2 className="text-4xl font-display text-white mb-8 border-l-4 border-gold pl-6 py-1">Service Detail Notes</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2 space-y-10">
              {/* Special Instructions */}
              <div className="space-y-3">
                <label className="text-xs font-medium text-text-secondary block uppercase tracking-[0.2em]">
                  Access & Special Requests
                </label>
                <textarea 
                  className="flex min-h-[220px] w-full border border-white/5 bg-obsidian px-6 py-6 text-sm text-white focus-visible:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all resize-none shadow-2xl"
                  placeholder="Tell us about gate codes, specific stains to focus on, or any hidden pet hair that needs extra care..."
                  value={localNotes}
                  onChange={(e) => setLocalNotes(e.target.value)}
                />
              </div>

              {/* Photo Upload Area */}
              <div className="space-y-4">
                <label className="text-xs font-medium text-text-secondary block uppercase tracking-[0.2em] flex items-center gap-2">
                  <Camera size={14} className="text-gold" /> Upload Vehicle Condition Photos 
                  <span className="text-text-tertiary normal-case tracking-normal ml-auto">(Up to 4)</span>
                </label>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {previews.map((src, idx) => (
                    <div key={idx} className="relative aspect-square bg-void border border-white/10 group overflow-hidden">
                      <Image 
                        src={src} 
                        alt={`Vehicle preview ${idx + 1}`} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      <button 
                        onClick={() => removePhoto(idx)}
                        className="absolute top-2 right-2 bg-black/60 text-white p-1.5 hover:bg-gold hover:text-void transition-colors backdrop-blur-md"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  
                  {previews.length < 4 && (
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-square border border-dashed border-white/10 flex flex-col items-center justify-center text-center bg-obsidian/50 hover:bg-gold/5 hover:border-gold/30 transition-all group"
                    >
                      <Upload className="w-6 h-6 text-text-tertiary mb-3 group-hover:text-gold transition-colors" />
                      <span className="text-[10px] text-text-tertiary uppercase tracking-wider font-mono px-2">Click to Upload</span>
                    </button>
                  )}
                </div>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Sidebar / Info Panel */}
            <div className="space-y-8">
              <div className="bg-obsidian border border-white/5 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full" />
                <Info className="w-8 h-8 text-gold mb-6" />
                <h4 className="text-white font-display text-xl mb-4">Concierge Logistics</h4>
                <div className="space-y-4">
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Our detailing rigs are completely self-sufficient. We carry over <span className="text-white font-medium">100 gallons of deionized water</span> and a separate power grid.
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    You only need to ensure we have access to the keys and sufficient clearance around the vehicle.
                  </p>
                </div>
                <div className="mt-8 pt-8 border-t border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-[10px] text-gold uppercase tracking-widest font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" /> Same-Day Support Available
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="flex justify-end pt-12 border-t border-white/10 mt-12 grid grid-cols-1 sm:flex sm:items-center sm:justify-between gap-6">
          <p className="text-xs text-text-tertiary font-mono uppercase tracking-widest italic opacity-60">
            Step 4 of 5 : Detailing Parameters
          </p>
          <Button 
            size="lg" 
            variant="premium" 
            onClick={handleContinue}
            className="px-12 group"
          >
            Review & Finalize <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Button>
        </div>
      </div>
    </FadeIn>
  )
}

