import { db } from '@/lib/db'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { FadeIn } from '@/components/animations/fade-in'
import { Button } from '@/components/ui/button'
import { CalendarClock, Award, ChevronRight, Activity, Clock, ShieldCheck, MapPin } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

export const dynamic = 'force-dynamic'

export default async function PortalDashboard() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return redirect('/login')
  }

  // Fetch real data from Prisma
  const upcomingBooking = await db.booking.findFirst({
    where: { userId: session.user.id, status: 'CONFIRMED' },
    orderBy: { scheduledAt: 'asc' },
    include: { services: { include: { service: true } } }
  })

  const pastBookings = await db.booking.findMany({
    where: { userId: session.user.id, status: 'COMPLETED' },
    orderBy: { scheduledAt: 'desc' },
    take: 3,
    include: { services: { include: { service: true } } }
  })

  // Dummy loyalty calculations (usually from a loyaltyService)
  const points = 1600
  const nextTierPoints = 2000
  const progress = (points / nextTierPoints) * 100
  const strokeDasharray = 2 * Math.PI * 45 // Circle radius 45

  return (
    <div className="space-y-16 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <span className="h-px w-8 bg-gold" />
             <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-mono">Customer Intelligence</span>
          </div>
          <h1 className="text-5xl font-display text-white tracking-tight">
            Welcome back, <span className="text-gold italic">{session.user.name?.split(' ')[0] || 'Guest'}</span>
          </h1>
          <p className="text-text-secondary mt-3 max-w-md leading-relaxed">
            Your vehicle fleet is currently optimized. We have ${upcomingBooking ? 'one upcoming' : 'no scheduled'} details synchronized.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-obsidian border border-white/5 p-4 rounded-sm">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Systems Online</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* Left Col: Upcoming & Stats (8/12) */}
        <div className="xl:col-span-8 space-y-10">
          
          {/* Featured Booking Card */}
          <FadeIn>
            <div className="group relative bg-[#0A0A0F] border border-white/5 p-10 overflow-hidden min-h-[400px] flex flex-col justify-between">
              {/* Background Accents */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/[0.03] blur-[120px] rounded-full -mr-48 -mt-48 transition-all duration-1000 group-hover:bg-gold/[0.07]" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center">
                      <CalendarClock className="w-4 h-4 text-gold" />
                    </div>
                    <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-text-tertiary">Next Scheduled Detail</h3>
                  </div>
                  {upcomingBooking && (
                    <div className="text-[10px] font-mono text-gold px-3 py-1 border border-gold/30 uppercase tracking-widest">
                      Confirmed
                    </div>
                  )}
                </div>

                {upcomingBooking ? (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-6xl font-display text-white mb-4 leading-none">
                        {upcomingBooking.services[0]?.service.name || 'LuxeWash Package'}
                      </h2>
                      <div className="flex flex-wrap items-center gap-8 text-sm text-text-secondary">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gold/50" />
                          <span>{format(upcomingBooking.scheduledAt, 'PPPP')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gold/50" />
                          <span>{upcomingBooking.address.split(',')[0]}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Link href={`/portal/bookings/${upcomingBooking.id}`}>
                        <Button variant="premium" className="px-10 h-14">Manage Booking</Button>
                      </Link>
                      <Button variant="outline" className="h-14 border-white/10 hover:border-white/30">View Technician</Button>
                    </div>
                  </div>
                ) : (
                  <div className="py-12">
                     <h2 className="text-4xl font-display text-text-tertiary mb-6 opacity-30">No Active Service Sequence</h2>
                     <Link href="/booking">
                       <Button variant="premium" className="px-12 h-14">
                         Initiate Booking &rarr;
                       </Button>
                     </Link>
                  </div>
                )}
              </div>

              {/* Status Meter */}
              {upcomingBooking && (
                <div className="relative pt-12">
                   <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                      <div className="h-full w-1/4 bg-gold shadow-[0_0_15px_rgba(201,168,76,0.5)]" />
                   </div>
                   <div className="flex justify-between mt-3">
                      <span className="text-[10px] uppercase font-mono text-gold">Validated</span>
                      <span className="text-[10px] uppercase font-mono text-text-tertiary">Preparing Logistics</span>
                   </div>
                </div>
              )}
            </div>
          </FadeIn>

          {/* Activity Feed / Past History */}
          <div className="space-y-6">
            <h3 className="text-xs font-mono tracking-[0.3em] uppercase text-text-secondary flex items-center gap-3">
              <span className="h-px w-4 bg-white/20" /> Recent Activity
            </h3>
            <div className="space-y-1">
              {pastBookings.length > 0 ? pastBookings.map((b, i) => (
                <FadeIn key={b.id} delay={i * 0.1}>
                  <Link href={`/portal/bookings/${b.id}`} className="group block">
                    <div className="bg-obsidian/50 border border-white/5 p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-text-tertiary group-hover:border-gold/30 group-hover:text-gold transition-all">
                          <ShieldCheck size={20} />
                        </div>
                        <div>
                          <p className="text-white font-medium">{b.services[0]?.service.name}</p>
                          <p className="text-xs text-text-tertiary font-mono uppercase tracking-widest mt-1">
                            Completed {format(b.scheduledAt, 'MMM dd, yyyy')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-6">
                        <span className="text-sm font-mono text-white">${Number(b.totalPrice)}</span>
                        <ChevronRight className="w-4 h-4 text-text-tertiary group-hover:translate-x-1 group-hover:text-gold transition-all" />
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              )) : (
                <p className="py-12 text-center text-text-tertiary italic text-sm border border-dashed border-white/10">
                  Your detailing history will appear here once services are completed.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Loyalty & Quick Access (4/12) */}
        <div className="xl:col-span-4 space-y-10">
          
          {/* Loyalty Circle */}
          <FadeIn delay={0.2}>
            <div className="bg-[#0D0D12] border border-white/5 p-10 h-full flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gold/[0.02] to-transparent pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-10 w-full">
                <Award className="w-4 h-4 text-gold" />
                <h3 className="text-[10px] font-mono tracking-widest uppercase text-text-tertiary">Loyalty Passport</h3>
              </div>

              {/* Progress Ring */}
              <div className="relative w-48 h-48 mb-10">
                 <svg className="w-full h-full transform -rotate-90">
                    <circle cx="96" cy="96" r="45" className="stroke-white/5 fill-transparent" strokeWidth="2" />
                    <circle 
                      cx="96" 
                      cy="96" 
                      r="45" 
                      className="stroke-gold fill-transparent transition-all duration-1000 ease-out" 
                      strokeWidth="2"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDasharray - (progress / 100) * strokeDasharray}
                      strokeLinecap="round"
                    />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-display text-white">{points}</span>
                    <span className="text-[10px] font-mono text-text-tertiary uppercase letter tracking-widest mt-1">Total XP</span>
                 </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-2xl font-display text-white uppercase tracking-tighter">
                  {session.user.loyaltyTier || 'BRONZE'} <span className="text-gold italic">Member</span>
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed px-4">
                  Advance to <span className="text-white">SILVER</span> level to unlock complimentary engine bay hydro-cleaning and priority scheduling.
                </p>
                <div className="pt-6">
                  <Link href="/portal/loyalty">
                    <Button variant="outline" size="sm" className="w-full border-white/10 hover:border-gold/50 group">
                      View Rewards Catalog <ChevronRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Quick Links Group */}
          <div className="grid grid-cols-1 gap-4">
            <Link href="/portal/garage" className="group p-6 bg-obsidian border border-white/5 hover:border-gold/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/[0.03] flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                      <Activity size={18} className="text-text-secondary group-hover:text-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Digital Garage</p>
                      <p className="text-[10px] text-text-tertiary uppercase font-mono mt-0.5">Edit Vehicles</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-text-tertiary group-hover:text-gold" />
                </div>
            </Link>
            
            <Link href="/portal/settings" className="group p-6 bg-obsidian border border-white/5 hover:border-gold/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/[0.03] flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                      <ShieldCheck size={18} className="text-text-secondary group-hover:text-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Security & Keys</p>
                      <p className="text-[10px] text-text-tertiary uppercase font-mono mt-0.5">Manage Access</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-text-tertiary group-hover:text-gold" />
                </div>
            </Link>
          </div>

        </div>

      </div>
    </div>
  )
}

