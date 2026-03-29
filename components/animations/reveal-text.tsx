'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

interface RevealTextProps {
  children: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  className?: string
  delay?: number
  stagger?: number
}

export function RevealText({
  children,
  tag: Tag = 'h2',
  className = '',
  delay = 0,
  stagger = 0.05,
}: RevealTextProps) {
  const containerRef = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      // Split words and wrap them in spans taking overflow-hidden
      const words = children.split(' ')
      containerRef.current.innerHTML = ''

      words.forEach((word) => {
        const wordWrapper = document.createElement('span')
        wordWrapper.style.display = 'inline-block'
        wordWrapper.style.overflow = 'hidden'
        wordWrapper.style.verticalAlign = 'top'
        wordWrapper.style.marginRight = '0.25em'

        const wordInner = document.createElement('span')
        wordInner.style.display = 'inline-block'
        wordInner.style.transform = 'translateY(100%)'
        wordInner.className = 'word-inner'
        wordInner.textContent = word

        wordWrapper.appendChild(wordInner)
        containerRef.current?.appendChild(wordWrapper)
      })

      gsap.to('.word-inner', {
        y: '0%',
        duration: 0.8,
        ease: 'power4.out',
        stagger: stagger,
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <Tag ref={containerRef} className={className}>
      {children}
    </Tag>
  )
}
