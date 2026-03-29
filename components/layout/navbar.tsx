'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-void/90 py-4 backdrop-blur-md border-b var(--border-subtle)'
            : 'bg-transparent py-6'
        )}
      >
        <div className="container flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tighter text-white">
              LUXE<span className="text-gold">WASH</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'relative text-sm font-medium transition-colors hover:text-white',
                    isActive ? 'text-white' : 'text-text-secondary'
                  )}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gold" />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-text-secondary hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/booking"
              className="px-6 py-2.5 bg-white text-void font-semibold text-sm hover:bg-gold transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-void pt-24 px-6 md:hidden">
          <nav className="flex flex-col gap-6 text-2xl font-display">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'transition-colors',
                  pathname === link.href ? 'text-gold' : 'text-white'
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-smoke my-4 w-full" />
            <Link href="/login" className="text-text-secondary">
              Sign In
            </Link>
            <Link href="/booking" className="text-gold mt-2">
              Book Now &rarr;
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
