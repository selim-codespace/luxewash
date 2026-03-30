import { RevealText } from '@/components/animations/reveal-text'
import { FadeIn } from '@/components/animations/fade-in'
import { Metadata } from 'next'
import Image from 'next/image'
import { Award, Shield, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Story | LuxeWash',
  description: 'The story behind LuxeWash. How we are revolutionizing the mobile car detailing industry.',
}

export default function AboutPage() {
  return (
    <div className="bg-void min-h-screen pt-32 pb-20">
      <div className="container relative z-10">
        
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <FadeIn delay={0.1} direction="up">
            <span className="text-gold font-mono tracking-widest uppercase text-sm mb-4 block">
              The LuxeWash Story
            </span>
          </FadeIn>
          <RevealText tag="h1" className="text-5xl md:text-7xl lg:text-8xl font-display text-white mb-8 whitespace-pre-line">
            {"Driven By Obsession.\nDefined By Detail."}
          </RevealText>
          <FadeIn delay={0.8} direction="up">
            <p className="text-xl text-text-secondary leading-relaxed">
              We started LuxeWash because we were tired of the &quot;good enough&quot; culture in car care. We believe your vehicle deserves the meticulously curated experience of a high-end studio, but on your terms, at your location.
            </p>
          </FadeIn>
        </div>

        {/* Editorial Image Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <FadeIn direction="right" className="relative aspect-[4/5] w-full">
            <Image 
              src="/images/about-founder.jpg" 
              alt="Master detailer analyzing paint" 
              fill 
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
            />
            <div className="absolute inset-0 border border-white/10 m-4 pointer-events-none" />
          </FadeIn>
          
          <div className="flex flex-col justify-center">
            <RevealText tag="h2" className="text-3xl md:text-5xl font-display text-white mb-6">
              The Artisan Approach
            </RevealText>
            <FadeIn delay={0.2}>
              <p className="text-text-secondary leading-relaxed mb-6">
                Car washing is a commodity. Auto detailing is a craft. At LuxeWash, we treat every vehicle like a bespoke project. We don&apos;t use harsh generic acids or abrasive brushes. We use pH-neutral foams, multi-bucket safe wash methods, and boutique European sealants.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                Our technicians endure a rigorous 6-week masterclass. They understand clearcoat hardness, the nuances of Merino leathers, and the chemistry behind ceramic bonding. When we touch your car, we are preserving a piece of engineering art.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
                <div>
                  <h4 className="text-3xl font-mono text-gold mb-2">50+</h4>
                  <p className="text-sm text-text-tertiary">Hours of training per detailer</p>
                </div>
                <div>
                  <h4 className="text-3xl font-mono text-gold mb-2">100%</h4>
                  <p className="text-sm text-text-tertiary">Eco-friendly water reclamation</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-32">
          <RevealText tag="h3" className="text-4xl text-center font-display text-white mb-16">
            Our Foundation
          </RevealText>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0} className="bg-obsidian border border-white/5 p-8 hover:border-gold/30 transition-colors">
              <Sparkles className="w-8 h-8 text-gold mb-6" />
              <h4 className="text-xl font-medium text-white mb-3">Immaculate Precision</h4>
              <p className="text-text-secondary text-sm leading-relaxed">We pursue perfection. From the door jambs to the exhaust tips, no detail is too small to be completely restored to its factory brilliance.</p>
            </FadeIn>
            <FadeIn delay={0.2} className="bg-obsidian border border-white/5 p-8 hover:border-gold/30 transition-colors">
              <Shield className="w-8 h-8 text-gold mb-6" />
              <h4 className="text-xl font-medium text-white mb-3">Total Protection</h4>
              <p className="text-text-secondary text-sm leading-relaxed">We don&apos;t just clean; we protect. Our ceramic technologies ensure your investment is shielded from UV rays, harsh chemicals, and road debris.</p>
            </FadeIn>
            <FadeIn delay={0.4} className="bg-obsidian border border-white/5 p-8 hover:border-gold/30 transition-colors">
              <Award className="w-8 h-8 text-gold mb-6" />
              <h4 className="text-xl font-medium text-white mb-3">White Glove Service</h4>
              <p className="text-text-secondary text-sm leading-relaxed">Your time is your most valuable asset. Our mobile operations are designed to be entirely frictionless, discrete, and professional.</p>
            </FadeIn>
          </div>
        </div>

      </div>
    </div>
  )
}
