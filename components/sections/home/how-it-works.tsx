import { RevealText } from '@/components/animations/reveal-text'
import { FadeIn } from '@/components/animations/fade-in'
import { SvgDraw } from '@/components/animations/svg-draw'

const steps = [
  {
    num: '01',
    title: 'Reserve',
    desc: 'Select your service, choose your time, and tell us where the car is parked.',
  },
  {
    num: '02',
    title: 'Dispatch',
    desc: 'Our master technician arrives in a fully-equipped, eco-friendly detailing van.',
  },
  {
    num: '03',
    title: 'Shine',
    desc: 'We perform meticulous detailing using premium products and our spotless water system.',
  },
  {
    num: '04',
    title: 'Drive',
    desc: 'Unlock your flawless, showroom-ready vehicle and turn heads on the road.',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-void py-32 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center mb-20">
          <RevealText tag="h2" className="text-4xl md:text-5xl font-display text-white mb-6 justify-center flex gap-3">
            Effortless <span className="text-gold italic">Brilliance</span>
          </RevealText>
          <FadeIn direction="up" delay={0.2}>
            <p className="text-text-secondary mx-auto max-w-xl">
              We bring the luxury detailing studio directly to your driveway, office, or private garage.
            </p>
          </FadeIn>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Animated SVG Path connecting the steps */}
          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 hidden md:block z-0 opacity-20">
            <SvgDraw>
              <svg width="100%" height="100" viewBox="0 0 1000 100" preserveAspectRatio="none">
                <path
                  d="M0 50 Q 250 100 500 50 T 1000 50"
                  fill="none"
                  stroke="#c9a84c"
                  strokeWidth="2"
                  strokeDasharray="10 10"
                />
              </svg>
            </SvgDraw>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {steps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.2} direction="up" className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border border-gold/30 bg-void flex items-center justify-center mb-6 shadow-glow relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gold/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="font-mono text-gold text-lg relative z-10">{step.num}</span>
                </div>
                <h3 className="text-xl text-white font-medium mb-3">{step.title}</h3>
                <p className="text-sm text-text-tertiary">{step.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
