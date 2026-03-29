import { Counter } from '@/components/animations/counter'

export function StatsRow() {
  const stats = [
    { value: 12400, suffix: '+', label: 'Happy Customers' },
    { value: 99, suffix: '%', label: 'Satisfaction Rate' },
    { value: 3, label: 'Years of Excellence' },
    { value: 48, label: 'Cities Covered' },
  ]

  return (
    <section className="bg-graphite py-24 border-y border-white/5">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center border-r last:border-r-0 border-white/5">
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                duration={2.5}
                className="text-4xl md:text-5xl text-white mb-2"
              />
              <span className="text-sm uppercase tracking-widest text-text-tertiary">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
