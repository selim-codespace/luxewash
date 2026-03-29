'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealText } from '@/components/animations/reveal-text'
import { FadeIn } from '@/components/animations/fade-in'
import { Plus, Minus, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const initialFaqs = [
  {
    qs: 'Do you need access to water or power?',
    ans: 'No. Our vans are fully equipped with spot-free deionized water tanks and whisper-quiet generators. We can perform the service anywhere, even in a parking garage without hookups.',
  },
  {
    qs: 'How long does a service typically take?',
    ans: 'The Standard Wash takes 45-60 minutes. The Luxe Detail takes 2-3 hours depending on the vehicle condition. Paint correction and ceramic coatings require a half to full day.',
  },
  {
    qs: 'What forms of payment do you accept?',
    ans: 'We accept all major credit cards, Apple Pay, and Google Pay via our secure Stripe checkout when you book online. We do not accept cash on site.',
  },
  {
    qs: 'Are you insured if my car is damaged?',
    ans: 'Absolutely. We carry a $2M garage keepers liability insurance policy to ensure you are fully protected in the unlikely event of an accident.',
  },
  {
    qs: 'Can I reschedule my appointment?',
    ans: 'Yes, you can reschedule up to 12 hours before your appointment without any penalty via your client dashboard.',
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [search, setSearch] = useState('')

  const filteredFaqs = initialFaqs.filter(
    (faq) =>
      faq.qs.toLowerCase().includes(search.toLowerCase()) ||
      faq.ans.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section className="bg-graphite py-32 border-b border-white/5">
      <div className="container max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <RevealText tag="h2" className="text-4xl md:text-5xl font-display text-white mb-4">
              Common Questions
            </RevealText>
            <FadeIn delay={0.2} direction="up">
              <p className="text-text-secondary">Everything you need to know about LuxeWash.</p>
            </FadeIn>
          </div>
          
          <FadeIn delay={0.4} className="w-full md:w-72">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
              <Input
                placeholder="Search FAQs..."
                className="pl-10 pb-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </FadeIn>
        </div>

        <div className="flex flex-col gap-4">
          {filteredFaqs.length === 0 && (
            <p className="text-text-secondary text-center py-12">No questions found matching your search.</p>
          )}
          
          {filteredFaqs.map((faq, i) => {
            const isOpen = openIndex === i
            
            return (
              <FadeIn key={i} delay={i * 0.1} direction="up">
                <div 
                  className={cn(
                    "border transition-colors duration-300 overflow-hidden",
                    isOpen ? "border-gold/50 bg-void" : "border-white/10 hover:border-white/30 bg-obsidian"
                  )}
                >
                  <button
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                  >
                    <h3 className={cn("font-medium transition-colors", isOpen ? "text-gold" : "text-white")}>
                      {faq.qs}
                    </h3>
                    <div className={cn("shrink-0 ml-4 transition-transform duration-300", isOpen ? "rotate-180 text-gold" : "text-text-secondary")}>
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-6 pb-6 pt-0 text-text-secondary text-sm leading-relaxed max-w-3xl">
                          {faq.ans}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
