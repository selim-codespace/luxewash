'use client'

import { useState, useEffect } from 'react'
import { useBookingStore } from '@/stores/booking-store'
import { FadeIn } from '@/components/animations/fade-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { MapPin, Calendar, Clock } from 'lucide-react'

// Dummy slots for the MVP client
const STUB_SLOTS = ['08:00', '09:00', '11:30', '13:00', '14:30', '16:00']

export function StepSchedule() {
  const { date, timeSlot, address, setSchedule, setLocation, nextStep } = useBookingStore()
  
  const [localAddress, setLocalAddress] = useState(address || '')
  const [localDate, setLocalDate] = useState<string>(date ? new Date(date).toISOString().split('T')[0] : '')
  const [localTime, setLocalTime] = useState(timeSlot || '')

  const isValid = localAddress && localDate && localTime

  const handleContinue = () => {
    if (isValid) {
      setLocation(localAddress)
      setSchedule(new Date(localDate), localTime)
      nextStep()
    }
  }

  return (
    <FadeIn>
      <div className="space-y-12">
        {/* Address */}
        <div>
          <h2 className="text-3xl font-display text-white mb-6 flex items-center gap-3">
            <MapPin className="text-gold" /> Service Location
          </h2>
          <div className="bg-obsidian border border-white/5 p-8">
            <Input 
              label="Full Service Address" 
              placeholder="Start typing your address..." 
              value={localAddress}
              onChange={(e) => setLocalAddress(e.target.value)}
              className="mb-2"
            />
            <p className="text-xs text-text-tertiary">Our vans require approximately 2 parking spaces of clearance.</p>
          </div>
        </div>

        {/* Date & Time */}
        {localAddress && (
          <FadeIn direction="up">
            <h2 className="text-3xl font-display text-white mb-6 flex items-center gap-3">
              <Calendar className="text-gold" /> Date & Time
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Date Picker (Native for now) */}
              <div className="bg-obsidian border border-white/5 p-8">
                <label className="text-xs font-medium text-text-secondary block mb-4 uppercase tracking-widest">Select Date</label>
                <input 
                  type="date" 
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-void border border-white/10 text-white p-4 focus:outline-none focus:border-gold"
                  value={localDate}
                  onChange={(e) => {
                    setLocalDate(e.target.value)
                    setLocalTime('') // reset time on new date
                  }}
                />
              </div>

              {/* Time Slots */}
              {localDate && (
                <div className="bg-obsidian border border-white/5 p-8">
                  <label className="text-xs font-medium text-text-secondary block mb-4 uppercase tracking-widest flex items-center gap-2">
                    <Clock size={14} /> Available Times
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {STUB_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setLocalTime(slot)}
                        className={cn(
                          "py-3 border text-sm font-mono transition-colors",
                          localTime === slot
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-white/10 text-text-secondary hover:border-white/30 hover:text-white"
                        )}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
            Continue to Details
          </Button>
        </div>
      </div>
    </FadeIn>
  )
}
