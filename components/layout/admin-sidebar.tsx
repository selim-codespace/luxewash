'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { signOut, useSession } from 'next-auth/react'
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  Briefcase, 
  Settings,
  ShieldAlert,
  Droplet
} from 'lucide-react'

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Bookings', href: '/bookings', icon: CalendarDays },
  { name: 'Customers', href: '/settings', icon: Users },
  { name: 'Services', href: '/settings', icon: Briefcase },
  { name: 'System Logs', href: '/settings', icon: ShieldAlert },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <div className="flex flex-col h-full justify-between p-6">
      <div className="space-y-10">
        
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group w-fit">
          <Droplet className="w-8 h-8 text-gold group-hover:scale-110 transition-transform duration-500" />
          <div className="flex flex-col">
            <span className="text-xl font-display text-white tracking-widest uppercase leading-none">LuxeWash</span>
            <span className="text-[10px] text-red-500 font-mono tracking-widest uppercase leading-none mt-1 shadow-red-500 drop-shadow-md">Command Center</span>
          </div>
        </Link>

        {/* User Badge */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-500 font-display text-sm uppercase">
            {session?.user?.name?.charAt(0) || 'A'}
          </div>
          <div className="overflow-hidden space-y-0.5">
            <h3 className="text-xs font-medium text-white truncate">{session?.user?.name || 'Administrator'}</h3>
            <p className="text-[10px] text-red-500 uppercase tracking-widest font-mono truncate">Super Admin</p>
          </div>
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href) && item.href !== '/settings'
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-sm text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-white/10 text-white" 
                    : "text-text-secondary hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="space-y-2 border-t border-white/10 pt-6">
        <Link 
          href="/settings"
          className="flex items-center gap-3 px-4 py-2.5 rounded-sm text-sm font-medium text-text-secondary hover:text-white hover:bg-white/5 transition-colors w-full"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-3 px-4 py-2.5 rounded-sm text-sm font-medium text-text-tertiary hover:text-white hover:bg-white/5 transition-colors w-full text-left"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
