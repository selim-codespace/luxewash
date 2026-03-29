'use client'

import { useBookingStore } from '@/stores/booking-store'
import { StepService } from '@/components/booking/step-service'
import { StepVehicle } from '@/components/booking/step-vehicle'
import { StepSchedule } from '@/components/booking/step-schedule'
import { StepPreferences } from '@/components/booking/step-preferences'
import { StepPayment } from '@/components/booking/step-payment'
import { StepConfirmation } from '@/components/booking/step-confirmation'
import { FadeIn } from '@/components/animations/fade-in'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'

const steps = [
  'Service',
  'Vehicle',
  'Schedule',
  'Preferences',
  'Payment',
  'Confirmed'
]

export default function BookingPage() {
  const currentStep = useBookingStore(s => s.currentStep)
  const prevStep = useBookingStore(s => s.prevStep)

  return (
    <div className="min-h-screen bg-void pt-24 pb-20">
      <div className="container max-w-5xl">
        
        {/* Progress header - Hide on final confirmation step */}
        {currentStep < 6 && (
          <FadeIn direction="down" className="mb-12">
            <div className="flex items-center justify-between mb-8">
              {currentStep > 1 && currentStep < 5 ? (
                <button 
                  onClick={prevStep}
                  className="text-text-secondary hover:text-white flex items-center gap-2 transition-colors text-sm font-medium"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
              ) : (
                <div /> // Placeholder for flex alignment
              )}
              
              <div className="text-right">
                <span className="text-gold font-mono text-sm tracking-widest uppercase">
                  Step {currentStep} of 5
                </span>
              </div>
            </div>

            {/* Progress Track */}
            <div className="w-full bg-obsidian border border-white/5 h-1.5 rounded-full overflow-hidden flex">
              <div 
                className="bg-gold h-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>
            
            {/* Step Labels */}
            <div className="hidden md:flex justify-between mt-4">
              {steps.slice(0, 5).map((label, idx) => (
                <div 
                  key={label}
                  className={cn(
                    "text-xs font-mono tracking-wider uppercase transition-colors duration-300",
                    currentStep > idx ? "text-white" : "text-text-tertiary",
                    currentStep === idx + 1 && "text-gold"
                  )}
                >
                  {label}
                </div>
              ))}
            </div>
          </FadeIn>
        )}

        {/* Step Views */}
        <div className="relative">
          {currentStep === 1 && <StepService />}
          {currentStep === 2 && <StepVehicle />}
          {currentStep === 3 && <StepSchedule />}
          {currentStep === 4 && <StepPreferences />}
          {currentStep === 5 && <StepPayment />}
          {currentStep === 6 && <StepConfirmation />}
        </div>
        
      </div>
    </div>
  )
}
