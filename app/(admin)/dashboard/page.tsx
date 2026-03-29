import { db } from '@/lib/db'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { FadeIn } from '@/components/animations/fade-in'
import { formatPrice } from '@/lib/utils'
import { Activity, DollarSign, CalendarCheck, Users, ArrowUpRight } from 'lucide-react'

export default async function AdminDashboardPage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return redirect('/login')
  }

  // Analytics queries (Mock aggregation for MVP speed, using raw ORM counts)
  const [totalBookings, totalUsers, recentBookings] = await Promise.all([
    db.booking.count(),
    db.user.count(),
    db.booking.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: true, service: true }
    })
  ])

  // Fake revenue calculation since we don't have historical data seeded extensively
  const totalRevenue = recentBookings.reduce((acc, curr) => acc + curr.totalPrice, 0) * 12

  const stats = [
    { label: 'Total Revenue', value: formatPrice(totalRevenue), icon: DollarSign, trend: '+14.5%' },
    { label: 'Total Scars Detailed', value: totalBookings.toString(), icon: CalendarCheck, trend: '+5.2%' },
    { label: 'Active Members', value: totalUsers.toString(), icon: Users, trend: '+12.1%' },
    { label: 'Active Techs', value: '4', icon: Activity, trend: 'Online' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display text-white mb-2">Command Center</h1>
        <p className="text-text-secondary text-sm">Real-time system overview and business metrics.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.1}>
            <div className="bg-obsidian border border-white/5 p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 blur-[40px] rounded-full pointer-events-none group-hover:bg-red-500/10 transition-colors" />
              
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 border border-white/10 bg-void rounded-sm">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  {stat.trend} <ArrowUpRight size={12} />
                </span>
              </div>
              
              <h3 className="text-3xl font-display text-white mb-1">{stat.value}</h3>
              <p className="text-xs text-text-secondary uppercase tracking-widest font-mono">{stat.label}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 h-full">
        {/* Recent Activity Feed */}
        <div className="xl:col-span-2 space-y-4">
          <h2 className="text-xl font-display text-white">Latest Transactions</h2>
          <div className="bg-obsidian border border-white/5 rounded-sm overflow-hidden">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-void border-b border-white/10 uppercase font-mono tracking-wider text-[10px] text-text-tertiary">
                <tr>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-obsidian text-text-secondary">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3 text-white">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 text-red-500 flex flex-shrink-0 items-center justify-center text-[10px] font-bold">
                        {b.user.name?.charAt(0) || '?'}
                      </div>
                      {b.user.name || b.user.email}
                    </td>
                    <td className="px-6 py-4">{b.service?.name}</td>
                    <td className="px-6 py-4">{b.createdAt.toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right font-mono text-gold">{formatPrice(b.totalPrice)}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 border border-emerald-400/30 text-emerald-400 bg-emerald-400/10 inline-block">
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {recentBookings.length === 0 && (
              <div className="p-8 text-center text-text-tertiary">No recent transactions found.</div>
            )}
          </div>
        </div>

        {/* System Heatmap Dummy */}
        <div className="space-y-4">
          <h2 className="text-xl font-display text-white">System Health</h2>
          <div className="bg-obsidian border border-white/5 p-6 rounded-sm space-y-6">
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary uppercase tracking-widest font-mono">Server Load</span>
                <span className="text-emerald-400 font-mono">12%</span>
              </div>
              <div className="w-full h-1.5 bg-void border border-white/10 overflow-hidden">
                <div className="h-full bg-emerald-400 w-[12%]" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary uppercase tracking-widest font-mono">Storage Capacity</span>
                <span className="text-gold font-mono">45%</span>
              </div>
              <div className="w-full h-1.5 bg-void border border-white/10 overflow-hidden">
                <div className="h-full bg-gold w-[45%]" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary uppercase tracking-widest font-mono">Stripe Webhooks</span>
                <span className="text-emerald-400 font-mono">Stable</span>
              </div>
              <div className="w-full h-1.5 bg-void border border-white/10 overflow-hidden">
                <div className="h-full bg-emerald-400 w-[100%]" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
