'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MarqueeProps {
  children: ReactNode
  className?: string
  pauseOnHover?: boolean
  speed?: 'slow' | 'normal' | 'fast'
  direction?: 'left' | 'right'
}

export function Marquee({
  children,
  className = '',
  pauseOnHover = true,
  speed = 'normal',
  direction = 'left',
}: MarqueeProps) {
  const speedClass = {
    slow: 'duration-[60s]',
    normal: 'duration-[30s]',
    fast: 'duration-[15s]',
  }

  return (
    <div
      className={cn(
        'group flex overflow-hidden w-full',
        pauseOnHover ? 'hover:[&>div]:pl-state-paused' : '',
        className
      )}
    >
      {/* 
        Tailwind doesn't have native infinite marquee out of the box without extended theme.
        We'll just use tailwind inline styles for the infinite scrolling animation.
      */}
      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll {
          animation-name: ${direction === 'left' ? 'scroll-left' : 'scroll-right'};
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          width: max-content;
        }
      `}</style>
      <div
        className={cn(
          'flex shrink-0 animate-scroll',
          speedClass[speed]
        )}
      >
        {children}
        {children} {/* Duplicate once for seamless looping */}
      </div>
    </div>
  )
}
