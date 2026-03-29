'use client'

import { useState } from 'react'
import { useBookingStore } from '@/stores/booking-store'
import { FadeIn } from '@/components/animations/fade-in'
import { Button } from '@/components/ui/button'
import { Upload, Info } from 'lucide-react'

export function StepPreferences() {
  const { instructions, setInstructions, nextStep } = useBookingStore()
  const [localNotes, setLocalNotes] = useState(instructions)

  const handleContinue = () => {
    setInstructions(localNotes)
    nextStep()
  }

  return (
    <FadeIn>
      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-display text-white mb-6">Service Preferences</h2>
          <div className="bg-obsidian border border-white/5 p-8 space-y-8">
            
            {/* Notes */}
            <div className="space-y-3 w-full">
              <label className="text-xs font-medium text-text-secondary block uppercase tracking-widest">
                Access Instructions & Special Requests
              </label>
              <textarea 
                className="flex min-h-[160px] w-full rounded-none border border-white/10 bg-void px-4 py-4 text-sm text-white focus-visible:outline-none focus-visible:border-gold transition-colors resize-none"
                placeholder="Gate codes, parking instructions, specific stains to focus on, etc."
                value={localNotes}
                onChange={(e) => setLocalNotes(e.target.value)}
              />
            </div>

            {/* Photo Upload (Visual MVP) */}
            <div className="space-y-3">
              <label className="text-xs font-medium text-text-secondary block uppercase tracking-widest flex items-center gap-2">
                Upload Condition Photos <span className="text-text-tertiary normal-case tracking-normal">(Optional)</span>
              </label>
              <div className="border border-dashed border-white/20 p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-gold/50 hover:bg-gold/5 transition-colors">
                <Upload className="w-8 h-8 text-gold mb-4" />
                <p className="text-white text-sm mb-1">Click to upload or drag and drop</p>
                <p className="text-text-tertiary text-xs">SVG, PNG, JPG (max 5MB)</p>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-void border border-white/5 p-4 flex gap-4 text-sm text-text-secondary">
              <Info className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <p>
                Our concierge operates a completely self-sufficient rig. We bring our own deionized water and power. You only need to provide access to the vehicle.
              </p>
            </div>

          </div>
        </div>

        <div className="flex justify-end pt-8 border-t border-white/10 mt-12">
          <Button 
            size="lg" 
            variant="premium" 
            onClick={handleContinue}
          >
            Review & Pay
          </Button>
        </div>
      </div>
    </FadeIn>
  )
}
