import { db } from '@/lib/db'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { FadeIn } from '@/components/animations/fade-in'
import { formatPrice, cn } from '@/lib/utils'
import { CalendarCheck, Search } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function BookingsPage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return redirect('/login')
  }

  const bookings = await db.booking.findMany({
    where: { userId: session.user.id },
    include: { services: { include: { service: true } } },
    orderBy: { scheduledAt: 'desc' }
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
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display text-white mb-2">My Bookings</h1>
          <p className="text-text-secondary">Manage upcoming services and review past details.</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input 
            type="text"
            placeholder="Search reference..."
            className="w-full bg-obsidian border border-white/10 text-white pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-gold transition-colors"
          />
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-obsidian border border-white/5 p-12 text-center rounded-sm">
          <CalendarCheck className="w-12 h-12 text-text-tertiary mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No Service History</h3>
          <p className="text-text-secondary mb-6">You haven't booked any mobile details yet.</p>
          <Link href="/booking" className="inline-block bg-white text-void font-semibold py-2 px-6 hover:bg-gold transition-colors">
            Book Now
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking, i) => (
            <FadeIn key={booking.id} delay={i * 0.1}>
              <div className="bg-obsidian border border-white/5 p-6 hover:border-white/20 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-medium text-white truncate max-w-[200px] sm:max-w-xs block">
                      {booking.services[0]?.service.name || 'LuxeWash Package'}
                    </h3>
                    <span className={cn("text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border", getStatusColor(booking.status))}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm">
                    {booking.scheduledAt.toLocaleDateString()} • {booking.scheduledAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                  <p className="text-text-tertiary text-xs font-mono uppercase tracking-widest">
                    REF: {booking.id.slice(0,8).toUpperCase()}
                  </p>
                </div>

                <div className="flex items-center gap-8 md:ml-auto w-full md:w-auto justify-between md:justify-end">
                  <div className="text-left md:text-right">
                    <div className="text-lg font-mono text-gold leading-tight">
                      {formatPrice(booking.totalPrice.toNumber())}
                    </div>
                    {booking.status === 'COMPLETED' && (
                      <a href="#" className="text-xs text-text-secondary hover:text-white underline underline-offset-4">View Receipt</a>
                    )}
                  </div>
                  
                  {booking.status === 'CONFIRMED' && (
                    <Link href={`/portal/bookings/${booking.id}`}>
                      <Button variant="outline" size="sm" className="shrink-0 group-hover:bg-white/10 group-hover:text-white transition-colors">
                        Manage
                      </Button>
                    </Link>
                  )}
                </div>

              </div>
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  )
}
