import { RevealText } from '@/components/animations/reveal-text'
import { FadeIn } from '@/components/animations/fade-in'
import { MapPin, Clock, Phone } from 'lucide-react'

export const metadata = {
  title: 'Service Areas | LuxeWash',
}

const locations = [
  {
    city: 'Los Angeles',
    address: 'Beverly Hills, West Hollywood, Santa Monica',
    status: 'Active',
    coords: [34.0522, -118.2437],
  },
  {
    city: 'Orange County',
    address: 'Newport Beach, Irvine, Laguna Beach',
    status: 'Active',
    coords: [33.7175, -117.8311],
  },
  {
    city: 'San Diego',
    address: 'La Jolla, Del Mar, Downtown',
    status: 'Active',
    coords: [32.7157, -117.1611],
  },
  {
    city: 'Miami',
    address: 'South Beach, Brickell, Coral Gables',
    status: 'Coming Soon',
    coords: [25.7617, -80.1918],
  },
]

export default function LocationsPage() {
  return (
    <div className="bg-void min-h-screen pt-32 pb-20">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <RevealText tag="h1" className="text-5xl md:text-7xl font-display text-white mb-6">
            Service Areas
          </RevealText>
          <FadeIn delay={0.2} direction="up">
            <p className="text-lg text-text-secondary leading-relaxed">
              We operate a fleet of fully-equipped mobile detailing studios across Southern California. 
              If your zip code is within our coverage radius, we bring the shine to your doorstep.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* List Side */}
          <div className="flex flex-col gap-6">
            {locations.map((loc, i) => (
              <FadeIn key={loc.city} delay={i * 0.1} direction="up" className="bg-obsidian border border-white/5 p-8 hover:border-white/10 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-display text-white">{loc.city}</h3>
                  <span className={`text-xs font-mono uppercase tracking-widest px-3 py-1 border ${loc.status === 'Active' ? 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10' : 'text-gold border-gold/30 bg-gold/10'}`}>
                    {loc.status}
                  </span>
                </div>
                
                <div className="flex flex-col gap-3 text-sm text-text-secondary">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-text-tertiary shrink-0" />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-text-tertiary shrink-0" />
                    <span>Mon-Sun: 7am - 7pm</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-text-tertiary shrink-0" />
                    <span>(800) 555-LUXE</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Map Side placeholder (for MVP) */}
          <FadeIn delay={0.4} className="w-full h-[60vh] lg:h-auto bg-obsidian border border-white/5 relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/map-placeholder.jpg')] bg-cover bg-center opacity-20 grayscale" />
            <div className="absolute inset-0 bg-void/50 mix-blend-multiply" />
            <div className="relative z-10 text-center p-8">
              <MapPin className="w-12 h-12 text-gold mx-auto mb-4" />
              <p className="text-white font-medium uppercase tracking-widest text-sm mb-2">Interactive Map</p>
              <p className="text-text-secondary text-sm">Mapbox integration active in production</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
