import { Marquee } from '@/components/animations/marquee'
import { Star } from 'lucide-react'

export function TrustBar() {
  const items = [
    { text: "4.9/5 Average Rating", icon: <Star className="fill-gold text-gold w-4 h-4" /> },
    { text: "12,000+ Cars Serviced" },
    { text: "Eco-Friendly Products" },
    { text: "Fully Insured & Vetted Professionals" },
    { text: "Same-Day Booking Available" },
    { text: "100% Satisfaction Guarantee" },
  ]

  return (
    <div className="w-full border-y border-white/5 bg-obsidian py-4 overflow-hidden">
      <Marquee speed="slow" pauseOnHover={false} className="items-center">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-8 text-sm font-medium text-text-secondary whitespace-nowrap">
            {item.icon && <span>{item.icon}</span>}
            <span className="uppercase tracking-wider">{item.text}</span>
            <span className="mx-8 text-white/20 text-xs">◆</span>
          </div>
        ))}
      </Marquee>
    </div>
  )
}
