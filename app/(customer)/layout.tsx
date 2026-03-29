'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { PortalSidebar } from '@/components/layout/portal-sidebar'

export default function CustomerLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  
  // Do not show the sidebar on the booking wizard itself to preserve a focused checkout flow
  const isBookingWizard = pathname === '/booking'

  if (isBookingWizard) {
    return <main className="bg-void min-h-screen">{children}</main>
  }

  return (
    <div className="flex bg-void min-h-screen pt-20">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 pt-20 bg-obsidian border-r border-white/5 z-40">
        <PortalSidebar />
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 md:pl-64 flex flex-col min-h-screen">
        <div className="flex-1 p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  )
}
