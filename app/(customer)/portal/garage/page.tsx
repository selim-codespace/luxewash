import { db } from '@/lib/db'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { FadeIn } from '@/components/animations/fade-in'
import { Button } from '@/components/ui/button'
import { CarFront, Truck, Plus, Route, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function GaragePage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return redirect('/login')
  }

  const userWithCars = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      cars: true
    }
  })

  const cars = userWithCars?.cars || []

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display text-white mb-2">My Garage</h1>
          <p className="text-text-secondary">Manage your vehicles and view individual service histories.</p>
        </div>
        
        <Button variant="premium" className="w-full sm:w-auto shrink-0 flex items-center gap-2">
          <Plus size={18} /> Add Vehicle
        </Button>
      </div>

      {cars.length === 0 ? (
        <div className="bg-obsidian border border-white/5 p-16 text-center rounded-sm">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <CarFront className="w-8 h-8 text-text-tertiary" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">Your Garage is Empty</h3>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            Adding vehicles to your garage speeds up future booking flows and lets you track comprehensive service histories per car.
          </p>
          <Button variant="outline" className="text-white hover:bg-white hover:text-void transition-colors">
            Add First Vehicle
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cars.map((car, i) => (
            <FadeIn key={car.id} delay={i * 0.1}>
              <div className="bg-void border border-white/10 relative overflow-hidden group hover:border-gold/50 transition-colors cursor-pointer flex flex-col h-[320px]">
                
                {/* Visual Header */}
                <div className="h-32 bg-obsidian relative border-b border-white/5 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-void to-transparent z-10" />
                  {car.size === 'TRUCK' || car.size === 'SUV' || car.size === 'VAN' ? (
                    <Truck className="w-32 h-32 text-white/5 absolute -bottom-4 group-hover:text-gold/10 transition-colors duration-500" />
                  ) : (
                    <CarFront className="w-32 h-32 text-white/5 absolute -bottom-4 group-hover:text-gold/10 transition-colors duration-500" />
                  )}
                  <div className="relative z-20 text-center">
                    <h3 className="text-2xl font-display text-white">{car.make}</h3>
                    <p className="text-sm text-gold font-mono tracking-widest uppercase">{car.model}</p>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] uppercase font-mono tracking-widest text-text-tertiary mb-1">Year</p>
                      <p className="text-white font-medium">{car.year}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-mono tracking-widest text-text-tertiary mb-1">Size Class</p>
                      <p className="text-white font-medium">{car.size}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-mono tracking-widest text-text-tertiary mb-1">Color</p>
                      <p className="text-white font-medium">{car.color}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-mono tracking-widest text-text-tertiary mb-1">License Plate</p>
                      <p className="text-white font-mono bg-white/10 px-2 py-0.5 rounded-sm inline-block">{car.licensePlate || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                    <span className="text-xs text-text-tertiary flex items-center gap-1.5 hover:text-white transition-colors">
                      <Route size={14} /> Service History
                    </span>
                    <Link href={`/booking?carId=${car.id}`}>
                      <span className="text-xs text-gold uppercase tracking-widest font-mono flex items-center gap-1.5 hover:text-white transition-colors">
                        <ShieldCheck size={14} /> Book Detail
                      </span>
                    </Link>
                  </div>
                </div>

              </div>
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  )
}
