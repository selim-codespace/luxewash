'use client'

import { useState } from 'react'
import { useBookingStore } from '@/stores/booking-store'
import { FadeIn } from '@/components/animations/fade-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatPrice } from '@/lib/utils'
import { ShieldCheck, CreditCard } from 'lucide-react'

// Dummy dictionary to get string names from IDs for summary
const sMap: Record<string, string> = {
  'sig-ext': 'Signature Exterior',
  'luxe-det': 'The Luxe Detail',
  'ceramic': 'Ceramic Coating',
}

export function StepPayment() {
  const { 
    serviceId, addons, carSize, date, timeSlot, address, 
    totalPrice, promoDiscount, applyPromo, nextStep 
  } = useBookingStore()

  const [promoInput, setPromoInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleApplyPromo = () => {
    if (promoInput.toUpperCase() === 'LUXE10') {
      applyPromo('LUXE10', 10) // Fixed $10 discount test
      setPromoInput('')
    }
  }

  const handleCheckout = async () => {
    setIsProcessing(true)
    
    // Simulate server action creating payment intent & Stripe Elements submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    nextStep() // Goto confirmation
  }

  const baseServicePrice = serviceId 
    ? (serviceId === 'sig-ext' ? 49 : serviceId === 'luxe-det' ? 199 : 799)
    : 0

  return (
    <FadeIn>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Summary */}
        <div className="lg:col-span-7 space-y-12">
          <div>
            <h2 className="text-3xl font-display text-white mb-6">Order Summary</h2>
            <div className="bg-obsidian border border-white/5 p-8 space-y-6">
              
              <div className="flex justify-between items-start pb-6 border-b border-white/10">
                <div>
                  <h4 className="text-lg text-white font-medium mb-1">
                    {serviceId ? sMap[serviceId] : 'Selected Service'}
                  </h4>
                  <p className="text-text-secondary text-sm">
                    {date?.toLocaleDateString()} at {timeSlot} <br/>
                    {address}
                  </p>
                </div>
                <div className="text-gold font-mono">{formatPrice(baseServicePrice)}</div>
              </div>

              {addons.length > 0 && (
                <div className="space-y-3 pb-6 border-b border-white/10">
                  <h5 className="text-xs text-text-secondary uppercase tracking-widest">Enhancements</h5>
                  {addons.map(a => (
                    <div key={a.id} className="flex justify-between text-sm">
                      <span className="text-white">{a.name}</span>
                      <span className="text-text-tertiary font-mono">{formatPrice(a.price)}</span>
                    </div>
                  ))}
                </div>
              )}

              {(carSize === 'SUV' || carSize === 'TRUCK') && (
                <div className="flex justify-between text-sm pb-6 border-b border-white/10">
                  <span className="text-white">Oversize Vehicle Surcharge ({carSize})</span>
                  <span className="text-text-tertiary font-mono">
                    +{carSize === 'SUV' ? '20%' : '30%'}
                  </span>
                </div>
              )}

              {promoDiscount > 0 && (
                <div className="flex justify-between text-sm text-emerald-400 pb-6 border-b border-white/10">
                  <span>Promo Code Applied</span>
                  <span className="font-mono">-{formatPrice(promoDiscount)}</span>
                </div>
              )}

              <div className="pt-2 flex justify-between items-center">
                <span className="text-xl text-white font-medium">Total Details</span>
                <span className="text-3xl font-mono text-gold">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Payment Mockup */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h2 className="text-3xl font-display text-white mb-6 flex items-center gap-3">
              <ShieldCheck className="text-gold" /> Secure Checkout
            </h2>
            <div className="bg-void border border-white/10 p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <CreditCard size={120} />
              </div>
              
              {/* Promo input */}
              <div className="flex gap-2">
                <Input 
                  placeholder="Promo Code" 
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="bg-obsidian"
                />
                <Button variant="outline" onClick={handleApplyPromo}>Apply</Button>
              </div>

              <div className="h-px w-full bg-white/10" />

              {/* Fake Card Form (Stripe Elements placeholder) */}
              <div className="space-y-4">
                <Input label="Cardholder Name" placeholder="John Doe" className="bg-obsidian" />
                <Input label="Card Number" placeholder="**** **** **** ****" className="bg-obsidian font-mono" />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Expiry Date" placeholder="MM/YY" className="bg-obsidian font-mono" />
                  <Input label="CVC" placeholder="123" type="password" className="bg-obsidian font-mono" />
                </div>
              </div>

              <Button 
                size="lg" 
                variant="premium" 
                className="w-full mt-6" 
                onClick={handleCheckout}
                isLoading={isProcessing}
              >
                Pay {formatPrice(totalPrice)}
              </Button>
              <p className="text-center text-xs text-text-tertiary mt-4">
                Payments are securely processed by Stripe. We do not store your full card details.
              </p>
            </div>
          </div>
        </div>

      </div>
    </FadeIn>
  )
}
