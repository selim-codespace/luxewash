'use client'

import { useBookingStore } from '@/stores/booking-store'
import { FadeIn } from '@/components/animations/fade-in'
import { Button } from '@/components/ui/button'
import { CheckCircle, CalendarDays, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function StepConfirmation() {
  const { date, timeSlot, address, reset } = useBookingStore()
  const [refId] = useState(() => 'LW-' + Math.random().toString(36).substring(2, 8).toUpperCase())
 
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Do not reset store immediately so they can see the confirmation details
    return () => reset()
  }, [reset])

  return (
    <FadeIn direction="up">
      <div className="max-w-2xl mx-auto text-center space-y-8 py-12">
        
        <div className="w-24 h-24 mx-auto bg-emerald-400/10 rounded-full flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 border border-emerald-400/30 rounded-full animate-ping opacity-20" />
          <CheckCircle className="w-12 h-12 text-emerald-400" />
        </div>

        <h1 className="text-5xl md:text-6xl font-display text-white">Booking Confirmed</h1>
        <p className="text-lg text-text-secondary">
          Your reservation is completely secured. A confirmation email has been sent to you along with the receipt.
        </p>

        <div className="bg-obsidian border border-white/5 p-8 text-left space-y-6 mx-auto rounded-sm mt-12">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <span className="text-text-secondary uppercase tracking-widest text-xs">Reference ID</span>
            <span className="text-gold font-mono">{refId}</span>
          </div>
          
          <div className="flex items-start gap-4">
            <CalendarDays className="w-5 h-5 text-text-tertiary mt-0.5" />
            <div>
              <p className="text-white font-medium mb-1">Scheduled Time</p>
              <p className="text-text-secondary">{date?.toLocaleDateString()} at {timeSlot}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-text-tertiary mt-0.5" />
            <div>
              <p className="text-white font-medium mb-1">Location</p>
              <p className="text-text-secondary">{address}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link href="/dashboard">
            <Button variant="premium" className="w-full sm:w-auto">
              Go to Dashboard
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </FadeIn>
  )
}
