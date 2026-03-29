import { db } from '@/lib/db'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { FadeIn } from '@/components/animations/fade-in'
import { Button } from '@/components/ui/button'
import { CalendarClock, Award, ChevronRight, Activity } from 'lucide-react'
import Link from 'next/link'

export default async function PortalDashboard() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return redirect('/login')
  }

  // Fetch data
  const upcomingBooking = await db.booking.findFirst({
    where: { userId: session.user.id, status: 'CONFIRMED' },
    orderBy: { scheduledAt: 'asc' },
    include: { services: { include: { service: true } } }
  })

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-display text-white mb-2">
          Welcome back, {session.user.name?.split(' ')[0] || 'Guest'}
        </h1>
        <p className="text-text-secondary">Here's the current status of your fleet.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Next Appointment Card (Takes up 2 cols on lg) */}
        <div className="lg:col-span-2">
          <FadeIn>
            <div className="bg-obsidian border border-white/5 p-8 relative overflow-hidden h-full flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[80px] rounded-full pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6">
                <CalendarClock className="w-5 h-5 text-gold" />
                <h3 className="text-sm font-mono tracking-widest uppercase text-white">Next Appointment</h3>
              </div>

              {upcomingBooking ? (
                <div>
                  <h2 className="text-3xl font-display text-white mb-2">
                    {upcomingBooking.services[0]?.service.name || 'LuxeWash Details'}
                  </h2>
                  <p className="text-text-secondary mb-8">
                    {upcomingBooking.scheduledAt.toLocaleDateString()} at {upcomingBooking.scheduledAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                  <Link href={`/portal/bookings/${upcomingBooking.id}`}>
                    <Button variant="premium">Manage Booking</Button>
                  </Link>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-display text-text-tertiary mb-4">No upcoming Details</h2>
                  <Link href="/booking">
                    <Button variant="outline" className="text-gold border-gold/30 hover:bg-gold/10">
                      Book a Service
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </FadeIn>
        </div>

        {/* Loyalty Quick View */}
        <div>
          <FadeIn delay={0.2}>
            <div className="bg-obsidian border border-white/5 p-8 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-5 h-5 text-gold" />
                <h3 className="text-sm font-mono tracking-widest uppercase text-white">Loyalty Status</h3>
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-5xl font-mono text-gold mb-2">
                  {session.user.loyaltyTier || 'BRONZE'}
                </div>
                <p className="text-text-secondary text-sm mb-6">
                  You are 400 points away from Silver. Upgrade your tier to unlock free ceramic boosters.
                </p>
                <Link href="/portal/loyalty" className="flex items-center text-sm text-white hover:text-gold transition-colors font-medium">
                  View Rewards <ChevronRight className="w-4 h-4 ml-1 mt-0.5" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Quick Actions */}
      <FadeIn delay={0.4}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link href="/portal/garage" className="group block">
            <div className="bg-void border border-white/10 p-6 flex items-center justify-between hover:border-gold/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                  <Activity className="w-5 h-5 text-white group-hover:text-gold" />
                </div>
                <div>
                  <h4 className="text-white font-medium">My Garage</h4>
                  <p className="text-sm text-text-secondary">Manage saved vehicles</p>
                </div>
              </div>
              <ChevronRight className="text-text-tertiary group-hover:text-gold transition-colors" />
            </div>
          </Link>
          
          <Link href="/portal/bookings" className="group block">
            <div className="bg-void border border-white/10 p-6 flex items-center justify-between hover:border-gold/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                  <CalendarClock className="w-5 h-5 text-white group-hover:text-gold" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Service History</h4>
                  <p className="text-sm text-text-secondary">View past details & receipts</p>
                </div>
              </div>
              <ChevronRight className="text-text-tertiary group-hover:text-gold transition-colors" />
            </div>
          </Link>
        </div>
      </FadeIn>
    </div>
  )
}
