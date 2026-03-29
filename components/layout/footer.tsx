import Link from 'next/link'

const links = {
  services: [
    { name: 'Signature Wash', href: '/services/signature-exterior' },
    { name: 'The Luxe Detail', href: '/services/luxe-detail' },
    { name: 'Ceramic Coating', href: '/services/ceramic' },
    { name: 'Fleet Services', href: '/services/fleet' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Locations', href: '/locations' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Refund Policy', href: '/refunds' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-obsidian pt-24 pb-12 overflow-hidden relative border-t border-smoke relative z-10">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-24">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-bold tracking-tighter text-white">
                LUXE<span className="text-gold">WASH</span>
              </span>
            </Link>
            <p className="text-text-secondary max-w-sm mb-8 leading-relaxed">
              The ultimate detailing experience delivered to your doorstep. Eco-friendly, meticulous, and breathtaking results.
            </p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-sm text-text-primary">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Accepting bookings for today
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Services</h3>
            <ul className="flex flex-col gap-4">
              {links.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-text-secondary hover:text-gold transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Company</h3>
            <ul className="flex flex-col gap-4">
              {links.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-text-secondary hover:text-gold transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Legal</h3>
            <ul className="flex flex-col gap-4">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-text-secondary hover:text-gold transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-smoke flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-tertiary text-sm">
            &copy; {new Date().getFullYear()} LuxeWash Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="https://instagram.com" className="text-text-tertiary hover:text-white transition-colors">
              IN
            </Link>
            <Link href="https://twitter.com" className="text-text-tertiary hover:text-white transition-colors">
              TW
            </Link>
            <Link href="https://linkedin.com" className="text-text-tertiary hover:text-white transition-colors">
              LI
            </Link>
          </div>
        </div>
      </div>
      
      {/* Giant Watermark Logo effect behind footer */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-display font-black text-white/[0.02] pointer-events-none select-none whitespace-nowrap z-0">
        LUXEWASH
      </div>
    </footer>
  )
}
