import { Metadata } from 'next'
import { ServiceHero } from '@/components/sections/services/service-hero'
import { ServiceDetailCard } from '@/components/sections/services/service-detail-card'
import { CompareModal } from '@/components/sections/services/compare-modal'
import { FadeIn } from '@/components/animations/fade-in'

export const metadata: Metadata = {
  title: 'Our Detailing Services | LuxeWash',
  description: 'Explore our premium mobile car detailing packages. From signature hand washes to multi-year ceramic coatings.',
}

// In a real app, this would come from the database / prisma
const services = [
  {
    id: 'signature-exterior',
    name: 'Signature Exterior',
    price: 49,
    duration: '45-60 min',
    image: '/images/signature-wash.jpg',
    description: 'Precision hand wash, foam cannon pre-soak, wheel detailing, and professional tire dressing. The perfect maintenance wash.',
    features: [
      'Spot-free deionized water rinse',
      'Ph-neutral foam cannon pre-soak',
      'Two-bucket safe hand wash',
      'Deep wheel face and barrel cleaning',
      'High-gloss tire dressing',
      'Plush microfiber towel dry',
    ]
  },
  {
    id: 'luxe-detail',
    name: 'The Luxe Detail',
    price: 199,
    duration: '2-3 hours',
    image: '/images/luxe-detail.jpg',
    description: 'Complete interior restoration and exterior gloss enhancement. Brings your vehicle back to showroom condition.',
    features: [
      'Everything in Signature Exterior',
      'Interior deep vacuum (including trunk)',
      'Steam cleaning of all hard surfaces',
      'Leather cleaning and conditioning',
      'Streak-free interior/exterior glass',
      'Ceramic spray sealant (3 months protection)',
    ]
  },
  {
    id: 'ceramic',
    name: 'Ceramic Coating',
    price: 799,
    duration: 'Full Day',
    image: '/images/ceramic.jpg',
    description: '5-year 9H nano-ceramic protection. Unmatched gloss, hydrophobicity, and defense against the elements.',
    features: [
      'Everything in The Luxe Detail',
      'Chemical and mechanical decontamination (Clay bar)',
      'Single-stage machine polish (paint enhancement)',
      'Panel wipe prep',
      'Application of 9H Ceramic Coating to paint',
      'Application of ceramic to wheel faces',
    ]
  }
]

export default function ServicesPage() {
  return (
    <div className="bg-void min-h-screen">
      <ServiceHero />
      
      <section className="py-32 container relative z-10 -mt-20">
        <div className="flex flex-col gap-12 max-w-5xl mx-auto">
          {services.map((service, i) => (
            <FadeIn key={service.id} delay={i * 0.1} direction="up">
              <ServiceDetailCard service={service} />
            </FadeIn>
          ))}
        </div>
      </section>

      <CompareModal services={services} />
    </div>
  )
}
