'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
}

export function TextReveal({ children, className = '', delay = 0 }: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })

  const words = children.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * 0.3 },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: 'spring' as const,
        damping: 24,
        stiffness: 100,
        duration: 0.8,
      },
    },
    hidden: {
      opacity: 0,
      y: '50%',
      rotate: 2,
    },
  }

  return (
    <motion.div
      ref={ref}
      style={{ overflow: 'hidden', display: 'inline-flex', flexWrap: 'wrap' }}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {words.map((word, index) => (
        <span key={index} style={{ overflow: 'hidden', paddingBottom: '4px', marginRight: '0.25em' }}>
          <motion.span style={{ display: 'inline-block' }} variants={child}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  )
}
