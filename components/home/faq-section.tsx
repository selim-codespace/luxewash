'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from '@/components/animations/fade-in'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'How does mobile detailing work?',
    answer: 'Our certified detailers arrive at your location in a fully-equipped mobile unit. We bring everything needed—water, power, premium products, and tools. You just need to provide access to your vehicle. The service is performed in your driveway, office parking lot, or any location with adequate space.',
  },
  {
    question: 'How long does a full detail take?',
    answer: 'Depending on the package, our services range from 90 minutes (Express) to 4+ hours (Ultimate). We\'ll provide an accurate time estimate when you book. You can track our arrival in real-time through your customer portal.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, Apple Pay, Google Pay, and bank transfers. Payment is processed securely through Stripe. For memberships, your card will be charged automatically each billing cycle.',
  },
  {
    question: 'Do you offer any guarantees?',
    answer: 'Absolutely. We stand behind our work with a 100% satisfaction guarantee. If you\'re not completely happy with the results, contact us within 48 hours and we\'ll return to address any issues at no additional cost.',
  },
  {
    question: 'What if I need to cancel or reschedule?',
    answer: 'You can cancel or reschedule up to 24 hours before your appointment at no charge. Cancellations within 24 hours may incur a fee of 20% of the service cost. Members get free cancellation with 2 hours notice.',
  },
  {
    question: 'Do you service all vehicle types?',
    answer: 'Yes! We service everything from compact cars to luxury SUVs, trucks, and exotic vehicles. Pricing adjusts based on vehicle size (Compact, Sedan, SUV, Truck/Van). We have experience with high-end brands like Ferrari, Lamborghini, McLaren, and Porsche.',
  },
  {
    question: 'What\'s included in ceramic coating?',
    answer: 'Our ceramic coating packages include thorough paint preparation (clay bar decontamination, polish if needed), application of professional-grade ceramic coating, and curing time. The coating provides 2-5 years of protection against UV damage, chemical stains, and light scratches while making your vehicle easier to clean.',
  },
  {
    question: 'Can I book recurring appointments?',
    answer: 'Yes! Our membership plans offer automatic recurring bookings at your preferred interval. Members also get priority booking, discounts on additional services, and exclusive perks like free tire shine and interior vacuums between appointments.',
  },
]

function FAQItem({ question, answer, isOpen, onToggle }: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      layout
      className="border border-white/5 rounded-xl overflow-hidden bg-void/50"
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      >
        <span className="font-medium text-text-primary">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-text-tertiary" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-5 text-text-secondary leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-32 bg-void relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeIn>
            <div className="lg:sticky lg:top-32">
              <p className="text-primary uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-4">
                Support
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-text-primary mb-6 headline tracking-tighter">
                Frequently Asked <span className="text-primary italic">Questions</span>
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-8">
                Everything you need to know about our services. Can&apos;t find an answer? Reach out to our concierge team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:concierge@luxewash.com" className="text-primary hover:underline text-sm">
                  concierge@luxewash.com
                </a>
                <span className="text-text-tertiary">•</span>
                <span className="text-text-secondary text-sm">+1 (800) LUXE-WASH</span>
              </div>
            </div>
          </FadeIn>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FadeIn key={faq.question} delay={index * 0.05}>
                <FAQItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}