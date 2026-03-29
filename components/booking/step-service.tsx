'use client'

import { useState } from 'react'
import { useBookingStore } from '@/stores/booking-store'
import { FadeIn } from '@/components/animations/fade-in'
import { Button } from '@/components/ui/button'
import { formatPrice, cn } from '@/lib/utils'
import { Check } from 'lucide-react'

// Dummy data
const services = [
  { id: 'sig-ext', name: 'Signature Exterior', price: 49, time: '45m' },
  { id: 'luxe-det', name: 'The Luxe Detail', price: 199, time: '2.5h' },
  { id: 'ceramic', name: 'Ceramic Coating', price: 799, time: '1 Day' },
]

const addOns = [
  { id: 'pet-hair', name: 'Pet Hair Removal', price: 45 },
  { id: 'odor', name: 'Odor Neutralizer', price: 30 },
  { id: 'engine', name: 'Engine Bay Detail', price: 60 },
]

export function StepService() {
  const { serviceId, setService, addons, toggleAddon, nextStep } = useBookingStore()
  const [localService, setLocalService] = useState<string | null>(serviceId)

  const handleServiceSelect = (id: string, price: number) => {
    setLocalService(id)
    setService(id, price)
  }

  return (
    <FadeIn>
      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-display text-white mb-6">Select a Package</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((svc) => (
              <div
                key={svc.id}
                onClick={() => handleServiceSelect(svc.id, svc.price)}
                className={cn(
                  "p-6 border cursor-pointer transition-all duration-300 relative",
                  localService === svc.id 
                    ? "border-gold bg-gold/5 shadow-[0_0_30px_rgba(201,168,76,0.1)]" 
                    : "border-white/10 bg-obsidian hover:border-white/30"
                )}
              >
                {localService === svc.id && (
                  <div className="absolute top-4 right-4 text-gold">
                    <Check size={20} />
                  </div>
                )}
                <h3 className="text-xl font-medium text-white mb-2">{svc.name}</h3>
                <div className="flex items-center gap-4 text-sm mt-4">
                  <span className="font-mono text-gold text-lg">{formatPrice(svc.price)}</span>
                  <span className="text-text-tertiary tracking-widest uppercase text-xs">• {svc.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {localService && (
          <FadeIn direction="up">
            <div>
              <h2 className="text-2xl font-display text-white mb-6">Enhance Your Detail</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {addOns.map((addon) => {
                  const isSelected = addons.some(a => a.id === addon.id)
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      className={cn(
                        "p-4 border cursor-pointer transition-all flex items-center justify-between",
                        isSelected
                          ? "border-gold bg-gold/5 text-gold"
                          : "border-white/5 bg-void text-text-secondary hover:border-white/20"
                      )}
                    >
                      <span className="text-sm font-medium">{addon.name}</span>
                      <span className="font-mono text-sm">+{formatPrice(addon.price)}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            
            <div className="mt-12 flex justify-end pt-8 border-t border-white/10">
              <Button size="lg" variant="premium" onClick={nextStep}>
                Continue to Vehicle
              </Button>
            </div>
          </FadeIn>
        )}
      </div>
    </FadeIn>
  )
}
