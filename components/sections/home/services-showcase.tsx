import { ScrollGallery } from '@/components/animations/scroll-gallery'
import { RevealText } from '@/components/animations/reveal-text'
import { FadeIn } from '@/components/animations/fade-in'
import { MagneticButton } from '@/components/animations/magnetic-button'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

const services = [
  {
    title: 'Signature Exterior',
    price: 49,
    image: '/images/signature-wash.jpg',
    description: 'Precision hand wash, foam cannon pre-soak, and wheel detailing.',
    href: '/services/signature-exterior'
  },
  {
    title: 'The Luxe Detail',
    price: 199,
    image: '/images/luxe-detail.jpg',
    description: 'Complete interior restoration and exterior gloss enhancement.',
    href: '/services/luxe-detail'
  },
  {
    title: 'Ceramic Coating',
    price: 799,
    image: '/images/ceramic.jpg',
    description: '5-year 9H nano-ceramic protection for ultimate shine and defense.',
    href: '/services/ceramic'
  },
]

export function ServicesShowcase() {
  return (
    <div className="bg-obsidian w-full -mt-px relative z-10">
      <div className="container pt-32 pb-16">
        <RevealText tag="h2" className="text-4xl md:text-6xl font-display text-white mb-6 whitespace-pre-line">
          {"Uncompromising\nQuality"}
        </RevealText>
        <p className="text-text-secondary max-w-xl text-lg mb-12">
          Select from our curated packages or customize your own. Every service is performed with meticulous attention to detail at your location.
        </p>
      </div>

      <ScrollGallery className="h-[80vh]">
        {services.map((service, i) => (
          <div key={i} className="gallery-panel w-[85vw] md:w-[60vw] lg:w-[45vw] h-full shrink-0 flex items-center justify-center px-4 md:px-8 cursor-drag">
            <div className="relative group w-full h-[80%] overflow-hidden rounded-sm">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url(${service.image})`, backgroundColor: '#1a1a24' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                <div className="flex flex-col gap-4">
                  <div className="flex items-end justify-between">
                    <h3 className="text-3xl md:text-4xl font-display text-white">{service.title}</h3>
                    <p className="font-mono text-gold text-xl md:text-2xl">{formatPrice(service.price)}</p>
                  </div>
                  
                  <div className="h-px w-full bg-white/20 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                  
                  <p className="text-text-secondary line-clamp-2 md:line-clamp-none">
                    {service.description}
                  </p>
                  
                  <div className="mt-4 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                    <Link href={service.href}>
                      <MagneticButton intensity={0.1} className="px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-void transition-colors uppercase tracking-widest text-xs font-semibold">
                        View Details
                      </MagneticButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ScrollGallery>
    </div>
  )
}
