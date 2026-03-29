'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function PublicNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-void/80 border-b border-white/5 transition-all">
      <div className="container mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded bg-gold flex items-center justify-center text-void font-bold font-display shadow-glow transition-transform group-hover:scale-105">
            L
          </div>
          <span className="text-xl font-display font-semibold tracking-wide text-white">
            Luxe<span className="text-gold">Wash</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#services" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">
            Services
          </Link>
          <Link href="#features" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">
            Experience
          </Link>
          <Link href="#testimonials" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">
            Testimonials
          </Link>
          <Link href="/login" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">
            Sign In
          </Link>
          <Link href="/booking">
            <Button variant="premium" size="sm" className="ml-2">
              Book Now
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-text-secondary hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-obsidian border-b border-white/5 shadow-2xl backdrop-blur-lg flex flex-col px-6 py-6 space-y-4">
          <Link href="#services" className="text-base font-medium text-text-secondary hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            Services
          </Link>
          <Link href="#features" className="text-base font-medium text-text-secondary hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            Experience
          </Link>
          <Link href="#testimonials" className="text-base font-medium text-text-secondary hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            Testimonials
          </Link>
          <div className="h-px w-full bg-white/10 my-2" />
          <Link href="/login" className="text-base font-medium text-text-secondary hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            Sign In
          </Link>
          <Link href="/booking" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant="premium" className="w-full mt-2">
              Book Now
            </Button>
          </Link>
        </div>
      )}
    </nav>
  )
}
