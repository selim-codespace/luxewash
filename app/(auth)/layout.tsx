import { ReactNode } from 'react'
import Link from 'next/link'
import { Droplet } from 'lucide-react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-void flex flex-col md:flex-row">
      {/* Left branding panel */}
      <div className="hidden md:flex flex-col flex-1 relative bg-obsidian border-r border-white/5 overflow-hidden p-12 justify-between">
        <div className="absolute inset-0 bg-[url('/images/auth-bg.jpg')] bg-cover bg-center opacity-20 grayscale mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void opacity-80" />
        
        <Link href="/" className="relative z-10 flex items-center gap-2 group w-fit">
          <Droplet className="w-8 h-8 text-gold group-hover:scale-110 transition-transform duration-500" />
          <span className="text-2xl font-display text-white tracking-widest uppercase">LuxeWash</span>
        </Link>
        
        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-display text-white mb-4 leading-tight">
            The Pinnacle of <br/> Automotive Care
          </h2>
          <p className="text-text-secondary">
            Manage your fleet, book master detailers on demand, and access exclusive member privileges.
          </p>
        </div>
      </div>

      {/* Right Content Panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative">
        <div className="absolute top-6 left-6 md:hidden">
          <Link href="/" className="flex items-center gap-2 group">
            <Droplet className="w-6 h-6 text-gold" />
            <span className="text-lg font-display text-white tracking-widest uppercase">LuxeWash</span>
          </Link>
        </div>
        
        <div className="w-full max-w-md bg-obsidian md:bg-transparent p-8 border border-white/5 md:border-none shadow-2xl md:shadow-none">
          {children}
        </div>
      </div>
    </div>
  )
}
