'use client'

import { ReactNode } from 'react'
import { AdminSidebar } from '@/components/layout/admin-sidebar'

export default function AdminLayout({ children }: { children: ReactNode }) {
  // Authentication & Authorization check happens in Middleware or Server Components
  
  return (
    <div className="flex bg-void min-h-screen">
      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 bg-obsidian border-r border-white/5 z-40">
        <AdminSidebar />
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <div className="flex-1 p-6 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  )
}
