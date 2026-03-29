'use client'

import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/modal'
import { Check, Minus } from 'lucide-react'

// Dummy feature matrix for the MVP
const matrix = [
  { feature: 'Exterior Hand Wash', t1: true, t2: true, t3: true },
  { feature: 'Wheel & Tire Detail', t1: true, t2: true, t3: true },
  { feature: 'Spray Wax (1 month)', t1: true, t2: false, t3: false },
  { feature: 'Ceramic Sealant (3 month)', t1: false, t2: true, t3: false },
  { feature: '9H Ceramic Coating (5 year)', t1: false, t2: false, t3: true },
  { feature: 'Interior Deep Vacuum', t1: false, t2: true, t3: true },
  { feature: 'Leather Conditioning', t1: false, t2: true, t3: true },
  { feature: 'Paint Decontamination (Clay)', t1: false, t2: true, t3: true },
  { feature: 'Machine Polish (1-step)', t1: false, t2: false, t3: true },
]

export function CompareModal({ services }: { services: any[] }) {
  const [isOpen, setIsOpen] = useState(false)

  // Listen for the custom event dispatched from detail cards
  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    window.addEventListener('open-compare', handleOpen)
    return () => window.removeEventListener('open-compare', handleOpen)
  }, [])

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Compare Services" size="lg">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="p-4 border-b border-white/10 text-white font-medium w-1/3">Features</th>
              <th className="p-4 border-b border-white/10 text-center text-white font-medium">Signature</th>
              <th className="p-4 border-b border-white/10 text-center text-white font-medium">Luxe Detail</th>
              <th className="p-4 border-b border-white/10 text-center text-gold font-medium border-l border-r border-gold/20 bg-gold/5">Ceramic</th>
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors">
                <td className="p-4 border-b border-white/5 text-sm text-text-secondary">{row.feature}</td>
                <td className="p-4 border-b border-white/5 text-center">
                  {row.t1 ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <Minus className="w-4 h-4 text-text-tertiary mx-auto" />}
                </td>
                <td className="p-4 border-b border-white/5 text-center">
                  {row.t2 ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <Minus className="w-4 h-4 text-text-tertiary mx-auto" />}
                </td>
                <td className="p-4 border-b border-white/5 text-center border-l border-r border-gold/20 bg-gold/5">
                  {row.t3 ? <Check className="w-4 h-4 text-gold mx-auto" /> : <Minus className="w-4 h-4 text-text-tertiary mx-auto" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  )
}
