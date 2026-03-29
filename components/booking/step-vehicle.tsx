'use client'

import { useState } from 'react'
import { useBookingStore } from '@/stores/booking-store'
import { FadeIn } from '@/components/animations/fade-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CarFront, Truck, Combine } from 'lucide-react' // 'Combine' is just an icon alias for SUV
import { cn } from '@/lib/utils'

export function StepVehicle() {
  const { carSize, carDetails, setVehicle, nextStep } = useBookingStore()
  const [size, setSize] = useState<'SEDAN' | 'SUV' | 'TRUCK' | null>(carSize)
  const [details, setDetails] = useState(carDetails || { make: '', model: '', year: '', plate: '' })

  const isValid = size && details.make && details.model && details.year

  const handleContinue = () => {
    if (isValid) {
      setVehicle(size, details)
      nextStep()
    }
  }

  return (
    <FadeIn>
      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-display text-white mb-6">Vehicle Type</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <button
              onClick={() => setSize('SEDAN')}
              className={cn(
                "p-8 border flex flex-col items-center justify-center gap-4 transition-all duration-300",
                size === 'SEDAN' 
                  ? "border-gold bg-gold/5 text-gold" 
                  : "border-white/10 bg-obsidian text-text-secondary hover:border-white/30"
              )}
            >
              <CarFront size={40} className="mb-2" />
              <div className="font-medium text-lg">Coupe / Sedan</div>
              <div className="text-xs font-mono opacity-80 uppercase tracking-widest">Base Price</div>
            </button>

            <button
              onClick={() => setSize('SUV')}
              className={cn(
                "p-8 border flex flex-col items-center justify-center gap-4 transition-all duration-300",
                size === 'SUV' 
                  ? "border-gold bg-gold/5 text-gold" 
                  : "border-white/10 bg-obsidian text-text-secondary hover:border-white/30"
              )}
            >
              <Combine size={40} className="mb-2" />
              <div className="font-medium text-lg">SUV / Crossover</div>
              <div className="text-xs font-mono opacity-80 uppercase tracking-widest">+20% Size Charge</div>
            </button>

            <button
              onClick={() => setSize('TRUCK')}
              className={cn(
                "p-8 border flex flex-col items-center justify-center gap-4 transition-all duration-300",
                size === 'TRUCK' 
                  ? "border-gold bg-gold/5 text-gold" 
                  : "border-white/10 bg-obsidian text-text-secondary hover:border-white/30"
              )}
            >
              <Truck size={40} className="mb-2" />
              <div className="font-medium text-lg">Truck / Van</div>
              <div className="text-xs font-mono opacity-80 uppercase tracking-widest">+30% Size Charge</div>
            </button>

          </div>
        </div>

        {size && (
          <FadeIn direction="up">
            <h2 className="text-2xl font-display text-white mb-6">Vehicle Details</h2>
            <div className="bg-obsidian border border-white/5 p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Make" 
                placeholder="e.g. Porsche" 
                value={details.make}
                onChange={(e) => setDetails({ ...details, make: e.target.value })}
              />
              <Input 
                label="Model" 
                placeholder="e.g. 911 GT3" 
                value={details.model}
                onChange={(e) => setDetails({ ...details, model: e.target.value })}
              />
              <Input 
                label="Year" 
                placeholder="2024" 
                type="number"
                value={details.year}
                onChange={(e) => setDetails({ ...details, year: e.target.value })}
              />
              <Input 
                label="License Plate (Optional)" 
                placeholder="For parking access" 
                value={details.plate}
                onChange={(e) => setDetails({ ...details, plate: e.target.value })}
              />
            </div>
          </FadeIn>
        )}

        <div className="flex justify-end pt-8 border-t border-white/10 mt-12">
          <Button 
            size="lg" 
            variant="premium" 
            onClick={handleContinue}
            disabled={!isValid}
          >
            Continue to Schedule
          </Button>
        </div>
      </div>
    </FadeIn>
  )
}
