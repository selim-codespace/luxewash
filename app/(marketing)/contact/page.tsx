'use client'

import { useState } from 'react'
import { RevealText } from '@/components/animations/reveal-text'
import { FadeIn } from '@/components/animations/fade-in'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', interest: '', message: '' })
  const { addToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate Server Action call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    addToast({
      title: 'Message Received',
      description: 'Our concierge team will contact you within 24 hours.',
      type: 'success',
    })
    setFormData({ name: '', email: '', phone: '', interest: '', message: '' })
  }

  return (
    <div className="bg-void min-h-screen pt-32 pb-20 overflow-hidden">
      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Left: Contact Info */}
        <div className="flex flex-col">
          <RevealText tag="h1" className="text-5xl md:text-7xl font-display text-white mb-6">
            Get In Touch
          </RevealText>
          <FadeIn delay={0.2} direction="right">
            <p className="text-lg text-text-secondary leading-relaxed mb-12 max-w-md">
              Whether you have a question about our services, want to inquire about fleet pricing, or need dedicated event support, we are here to assist.
            </p>
          </FadeIn>

          <div className="flex flex-col gap-8 mb-16">
            <FadeIn delay={0.3} direction="right" className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-obsidian shrink-0">
                <Phone className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1 relative uppercase tracking-wider text-sm font-mono">Concierge Line</h3>
                <p className="text-text-secondary">1-800-LUXE-WASH</p>
                <p className="text-text-tertiary text-xs mt-1">Mon-Sun: 8am - 8pm PST</p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.4} direction="right" className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-obsidian shrink-0">
                <Mail className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1 relative uppercase tracking-wider text-sm font-mono">Email</h3>
                <p className="text-text-secondary">concierge@luxewash.com</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.5} direction="right" className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-obsidian shrink-0">
                <MapPin className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1 relative uppercase tracking-wider text-sm font-mono">Headquarters</h3>
                <p className="text-text-secondary leading-relaxed">
                  1000 Century Park East<br />
                  Los Angeles, CA 90067
                </p>
              </div>
            </FadeIn>
          </div>
          
          <FadeIn delay={0.6} direction="right">
            <Button variant="outline" className="w-full md:w-auto text-white border-white/20 hover:border-white hover:bg-white/5 uppercase tracking-widest text-xs">
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat on WhatsApp
            </Button>
          </FadeIn>
        </div>

        {/* Right: Form */}
        <FadeIn delay={0.4} direction="up" className="bg-obsidian border border-white/5 p-8 md:p-12 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-void via-gold to-void" />
          
          <h2 className="text-2xl font-display text-white mb-8">Send a Message</h2>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Full Name" 
                placeholder="John Doe" 
                required 
                value={formData.name}
                onChange={(e) => setFormData(p => ({...p, name: e.target.value}))}
              />
              <Input 
                label="Phone Number" 
                placeholder="(555) 000-0000" 
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(p => ({...p, phone: e.target.value}))}
              />
            </div>
            
            <Input 
              label="Email Address" 
              placeholder="john@example.com" 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData(p => ({...p, email: e.target.value}))}
            />
            
            <div className="space-y-1.5 w-full">
              <label className="text-xs font-medium text-text-secondary block">
                Service Interest
              </label>
              <select 
                className="flex h-12 w-full rounded-none border border-white/10 bg-void px-4 py-2 text-sm text-white focus-visible:outline-none focus-visible:border-gold transition-colors appearance-none"
                value={formData.interest}
                onChange={(e) => setFormData(p => ({...p, interest: e.target.value}))}
              >
                <option value="" disabled>Select an option</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Ceramic Coating">Ceramic Coating</option>
                <option value="Corporate Fleet">Corporate Fleet Services</option>
                <option value="Event Sponsoring">Event Sponsoring/Support</option>
              </select>
            </div>

            <div className="space-y-1.5 w-full">
              <label className="text-xs font-medium text-text-secondary block">
                Message
              </label>
              <div className="relative">
                <textarea 
                  className="flex min-h-[120px] w-full rounded-none border border-white/10 bg-void px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:border-gold transition-colors resize-none peer"
                  placeholder="How can we help you?"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData(p => ({...p, message: e.target.value}))}
                />
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gold transition-all duration-300 peer-focus:w-full" />
              </div>
            </div>

            <Button type="submit" variant="premium" className="w-full" isLoading={isSubmitting}>
              Submit Inquiry
            </Button>
            <p className="text-center text-xs text-text-tertiary mt-4">
              By submitting this form, you agree to our Privacy Policy.
            </p>
          </form>
        </FadeIn>

      </div>
    </div>
  )
}
