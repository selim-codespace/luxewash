import { db } from '@/lib/db'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { FadeIn } from '@/components/animations/fade-in'
import { formatPrice, cn } from '@/lib/utils'
import { Search, Filter, MoreHorizontal, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function AdminBookingsPage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return redirect('/login')
  }

  const allBookings = await db.booking.findMany({
    orderBy: { scheduledDate: 'desc' },
    include: { user: true, service: true }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10'
      case 'COMPLETED': return 'text-gold border-gold/30 bg-gold/10'
      case 'CANCELLED': return 'text-red-400 border-red-400/30 bg-red-400/10'
      default: return 'text-white border-white/30 bg-white/10'
    }
  }

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-display text-white mb-2">Bookings Registry</h1>
          <p className="text-text-secondary text-sm">Comprehensive view of all network service events.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
            <Download size={14} /> Export CSV
          </Button>
          <Button variant="premium" size="sm">
            Manual Booking
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-obsidian border border-white/5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input 
            type="text"
            placeholder="Search by customer name, email, or reference ID..."
            className="w-full bg-void border border-white/10 text-white pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-red-500/50 transition-colors"
          />
        </div>
        <Button variant="outline" className="shrink-0 bg-void gap-2">
          <Filter size={14} /> Filters
        </Button>
      </div>

      {/* Table */}
      <FadeIn className="flex-1">
        <div className="bg-obsidian border border-white/5 rounded-sm overflow-auto h-full max-h-[calc(100vh-280px)]">
          <table className="w-full text-left text-sm whitespace-nowrap min-w-[800px]">
            <thead className="sticky top-0 bg-void border-b border-white/10 shadow-md">
              <tr className="uppercase font-mono tracking-wider text-[10px] text-text-tertiary">
                <th className="px-6 py-4">Reference</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4 text-center">Date & Time</th>
                <th className="px-6 py-4">Package</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-obsidian text-text-secondary">
              {allBookings.map((b) => (
                <tr key={b.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 text-white font-mono text-xs">{b.id.slice(0, 8).toUpperCase()}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-white font-medium">{b.user.name || 'N/A'}</span>
                      <span className="text-xs text-text-tertiary">{b.user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col">
                      <span className="text-white">{b.scheduledDate.toLocaleDateString()}</span>
                      <span className="text-xs text-text-tertiary">{b.scheduledTime}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 truncate max-w-[150px]">{b.service?.name}</td>
                  <td className="px-6 py-4 text-right font-mono text-gold">{formatPrice(b.totalPrice)}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={cn("text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 border inline-block", getStatusColor(b.status))}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-text-tertiary hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {allBookings.length === 0 && (
            <div className="p-16 text-center">
              <CalendarCheck className="w-12 h-12 text-white/10 mx-auto mb-4" />
              <p className="text-text-secondary">No records found in the database.</p>
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  )
}
