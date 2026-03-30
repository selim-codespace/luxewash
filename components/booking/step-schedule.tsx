'use client'

import { useState, useEffect } from 'react'
import { useBookingStore } from '@/stores/booking-store'
import { FadeIn } from '@/components/animations/fade-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { MapPin, Calendar as CalendarIcon, Clock, Loader2 } from 'lucide-react'
import { format } from 'date-fns'

export function StepSchedule() {
  const { date, timeSlot, address, setSchedule, setLocation, nextStep } = useBookingStore()
  
  const [localAddress, setLocalAddress] = useState(address || '')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date ? new Date(date) : undefined)
  const [localTime, setLocalTime] = useState(timeSlot || '')
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)

  const isValid = localAddress && selectedDate && localTime

  // Fetch real slots when date changes
  useEffect(() => {
    if (selectedDate) {
      const fetchSlots = async () => {
        setIsLoadingSlots(true)
        try {
          const dateStr = format(selectedDate, 'yyyy-MM-dd')
          const res = await fetch(`/api/bookings/slots?date=${dateStr}`)
          if (res.ok) {
            const data = await res.json()
            setAvailableSlots(data.slots || [])
          }
        } catch (err) {
          console.error("Failed to fetch slots", err)
        } finally {
          setIsLoadingSlots(false)
        }
      }
      fetchSlots()
    }
  }, [selectedDate])

  const handleContinue = () => {
    if (localAddress && selectedDate && localTime) {
      setLocation(localAddress)
      setSchedule(selectedDate, localTime)
      nextStep()
    }
  }

  return (
    <FadeIn>
      <div className="space-y-12">
        {/* Address Section */}
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

        {/* Date & Time Section */}
        {localAddress && (
          <FadeIn direction="up">
            <h2 className="text-3xl font-display text-white mb-6 flex items-center gap-3">
              <CalendarIcon className="text-gold" /> Date & Time
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Premium Calendar */}
              <div className="bg-obsidian border border-white/5 p-4 flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date)
                    setLocalTime('') // Reset time when date changes
                  }}
                  disabled={{ before: new Date() }}
                  className="rounded-none w-full"
                />
              </div>

              {/* Time Slot Selection */}
              <div className="bg-obsidian border border-white/5 p-8 min-h-[400px]">
                <label className="text-xs font-medium text-text-secondary block mb-6 uppercase tracking-widest flex items-center gap-2">
                  <Clock size={14} /> Available Slots {selectedDate && `for ${format(selectedDate, 'MMM do')}`}
                </label>
                
                {isLoadingSlots ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <Loader2 className="w-8 h-8 text-gold animate-spin" />
                    <p className="text-xs text-text-tertiary uppercase tracking-widest font-mono">Syncing availability...</p>
                  </div>
                ) : selectedDate ? (
                  availableSlots.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setLocalTime(slot)}
                          className={cn(
                            "py-4 border text-sm font-mono transition-all duration-300",
                            localTime === slot
                              ? "border-gold bg-gold/10 text-gold shadow-[0_0_15px_rgba(201,168,76,0.1)]"
                              : "border-white/5 bg-void/50 text-text-secondary hover:border-white/20 hover:text-white"
                          )}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border border-white/5 bg-void/20">
                      <p className="text-text-tertiary text-sm italic">All slots are booked for this day.</p>
                      <p className="text-xs text-gold flex items-center justify-center gap-1 mt-2">Try another date for availability</p>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 border border-white/5 bg-void/20 text-center px-4">
                    <CalendarIcon className="w-8 h-8 text-text-tertiary mb-3 opacity-20" />
                    <p className="text-text-tertiary text-sm">Please select a date to see available time slots.</p>
                  </div>
                )}
              </div>
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
            Review Details
          </Button>
        </div>
      </div>
    </FadeIn>
  )
}

