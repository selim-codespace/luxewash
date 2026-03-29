import Link from 'next/link'
import { MapPin, Mail, Phone } from 'lucide-react'
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa'

export function PublicFooter() {
  return (
    <footer className="bg-obsidian border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gold flex items-center justify-center text-void font-bold font-display">
                L
              </div>
              <span className="text-xl font-display font-semibold tracking-wide text-white">
                Luxe<span className="text-gold">Wash</span>
              </span>
            </Link>
            <p className="text-sm text-text-tertiary leading-relaxed">
              We deliver the pinnacle of automotive care directly to your location. Uncompromising quality, absolute convenience.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-void border border-white/5 flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold/50 transition-colors">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-void border border-white/5 flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold/50 transition-colors">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-void border border-white/5 flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold/50 transition-colors">
                <FaFacebook size={18} />
              </a>
            </div>
          </div>

          {/* Links Col */}
          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-xs">Services</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm text-text-secondary hover:text-white transition-colors">Standard Detail</Link></li>
              <li><Link href="#" className="text-sm text-text-secondary hover:text-white transition-colors">Premium Ceramic</Link></li>
              <li><Link href="#" className="text-sm text-text-secondary hover:text-white transition-colors">Signature Paint Correction</Link></li>
              <li><Link href="#" className="text-sm text-text-secondary hover:text-white transition-colors">Fleet Management</Link></li>
            </ul>
          </div>

          {/* Company Col */}
          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm text-text-secondary hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-sm text-text-secondary hover:text-white transition-colors">Membership</Link></li>
              <li><Link href="#" className="text-sm text-text-secondary hover:text-white transition-colors">Gift Cards</Link></li>
              <li><Link href="#" className="text-sm text-text-secondary hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-xs">Contact</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold mt-0.5" />
                <span className="text-sm text-text-secondary">Serving Los Angeles,<br />Beverly Hills, and Malibu</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gold" />
                <span className="text-sm text-text-secondary">+1 (800) LUXE-WASH</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold" />
                <span className="text-sm text-text-secondary">concierge@luxewash.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-tertiary">
            © {new Date().getFullYear()} LuxeWash Premium Auto Detailing. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-text-tertiary hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-text-tertiary hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="text-xs text-text-tertiary hover:text-white transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
