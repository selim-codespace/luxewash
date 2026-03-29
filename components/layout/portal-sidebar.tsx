'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { signOut, useSession } from 'next-auth/react'
import { 
  LayoutDashboard, 
  CalendarCheck, 
  CarFront, 
  Award, 
  LogOut,
  Settings
} from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/portal', icon: LayoutDashboard },
  { name: 'My Bookings', href: '/portal/bookings', icon: CalendarCheck },
  { name: 'My Garage', href: '/portal/garage', icon: CarFront },
  { name: 'Loyalty Rewards', href: '/portal/loyalty', icon: Award },
  { name: 'Settings', href: '/portal/settings', icon: Settings },
]

export function PortalSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <div className="flex flex-col h-full justify-between p-6">
      <div className="space-y-8">
        {/* User Card */}
        <div className="flex items-center gap-4 bg-void border border-white/5 p-4 rounded-sm">
          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-display text-xl uppercase">
            {session?.user?.name?.charAt(0) || 'U'}
          </div>
          <div className="overflow-hidden">
            <h3 className="text-sm font-medium text-white truncate">{session?.user?.name || 'Customer'}</h3>
            <p className="text-xs text-gold uppercase tracking-widest font-mono truncate">{session?.user?.loyaltyTier || 'BRONZE'} MEMBER</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-gold text-void" 
                    : "text-text-secondary hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div>
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors w-full text-left"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
