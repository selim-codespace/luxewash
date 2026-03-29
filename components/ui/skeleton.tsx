import { cn } from "@/lib/utils"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circle' | 'card' | 'image'
}

export function Skeleton({
  className,
  variant = 'text',
  ...props
}: SkeletonProps) {
  const variants = {
    text: 'h-4 w-full rounded-sm',
    circle: 'h-12 w-12 rounded-full',
    card: 'h-32 w-full rounded-none',
    image: 'h-64 w-full rounded-none',
  }

  return (
    <div
      className={cn(
        "animate-pulse bg-smoke/50 relative overflow-hidden",
        variants[variant],
        className
      )}
      {...props}
    >
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  )
}
