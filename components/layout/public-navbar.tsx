'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { cn } from '@/lib/utils'

export function PublicNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      isScrolled 
        ? "backdrop-blur-xl bg-void/90 border-b border-white/5 shadow-lg shadow-black/20" 
        : "bg-transparent border-transparent"
    )}>
      <div className="container mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center font-bold font-display transition-all duration-300 group-hover:scale-110",
            isScrolled ? "bg-primary text-void shadow-glow" : "bg-primary text-void"
          )}>
            L
          </div>
          <span className={cn(
            "text-xl font-display font-semibold tracking-wide transition-colors",
            isScrolled ? "text-text-primary" : "text-white"
          )}>
            Luxe<span className="text-primary">Wash</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#services" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors relative group">
            Services
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors relative group">
            How It Works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
          </Link>
          <Link href="#features" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors relative group">
            Experience
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors relative group">
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
          </Link>
          <Link href="#testimonials" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors relative group">
            Testimonials
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
          </Link>
          <Link href="/login" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
            Sign In
          </Link>
          <ThemeToggle />
          <Link href="/booking">
            <Button variant="premium" size="sm" className="ml-2 shadow-lg shadow-primary/20">
              Book Now
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden gap-4">
          <ThemeToggle />
          <button 
            className={cn(
              "transition-colors",
              isScrolled ? "text-text-primary" : "text-white"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-obsidian border-b border-white/5 shadow-2xl backdrop-blur-lg flex flex-col px-6 py-6 space-y-4">
          <Link href="#services" className="text-base font-medium text-text-secondary hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            Services
          </Link>
          <Link href="#how-it-works" className="text-base font-medium text-text-secondary hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            How It Works
          </Link>
          <Link href="#features" className="text-base font-medium text-text-secondary hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            Experience
          </Link>
          <Link href="#pricing" className="text-base font-medium text-text-secondary hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            Pricing
          </Link>
          <Link href="#testimonials" className="text-base font-medium text-text-secondary hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            Testimonials
          </Link>
          <div className="h-px w-full bg-white/10 my-2" />
          <Link href="/login" className="text-base font-medium text-text-secondary hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
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