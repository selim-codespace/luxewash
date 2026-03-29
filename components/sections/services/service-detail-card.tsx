'use client'

import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Clock, Check } from 'lucide-react'
import Link from 'next/link'

interface Service {
  id: string
  name: string
  price: number
  duration: string
  image: string
  description: string
  features: string[]
}

export function ServiceDetailCard({ service }: { service: Service }) {
  return (
    <div className="bg-obsidian border border-white/5 overflow-hidden flex flex-col md:flex-row shadow-2xl">
      {/* Image Side */}
      <div 
        className="w-full md:w-2/5 aspect-[4/3] md:aspect-auto bg-cover bg-center"
        style={{ backgroundImage: `url(${service.image})` }}
      />
      
      {/* Content Side */}
      <div className="p-8 md:p-12 flex flex-col flex-1">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-display text-white mb-2">{service.name}</h2>
            <div className="flex items-center gap-3 text-text-tertiary text-sm font-mono">
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {service.duration}
              </span>
            </div>
          </div>
          <div className="text-3xl font-mono text-gold whitespace-nowrap">
            {formatPrice(service.price)}
          </div>
        </div>

        <p className="text-text-secondary leading-relaxed mb-8">
          {service.description}
        </p>

        <div className="h-px border-t border-white/5 mb-8" />

        <div className="mb-10 flex-1">
          <h4 className="text-sm font-medium text-white mb-4 uppercase tracking-widest">What's Included</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span className="text-text-secondary text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
          <Link href={`/booking?service=${service.id}`} className="flex-1">
            <Button variant="premium" className="w-full">
              Book {service.name}
            </Button>
          </Link>
          <Button variant="outline" className="sm:w-auto" onClick={() => window.dispatchEvent(new CustomEvent('open-compare'))}>
            Compare
          </Button>
        </div>
      </div>
    </div>
  )
}
