'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHoveringLink, setIsHoveringLink] = useState(false)
  const [hoverLabel, setHoverLabel] = useState<string | null>(null)

  useGSAP(
    () => {
      // Don't run on touch devices
      if (typeof window !== 'undefined' && 'ontouchstart' in window) return

      let mouseX = 0
      let mouseY = 0
      let circleX = 0
      let circleY = 0

      // Hide cursor by default, show on first mousemove
      gsap.set([dotRef.current, circleRef.current], { autoAlpha: 0 })

      const onMouseMove = (e: MouseEvent) => {
        if (!isVisible) {
          setIsVisible(true)
          gsap.to([dotRef.current, circleRef.current], { autoAlpha: 1, duration: 0.3 })
        }
        
        mouseX = e.clientX
        mouseY = e.clientY

        // Move dot instantly
        gsap.set(dotRef.current, { x: mouseX, y: mouseY })
      }

      // Smooth follow for the circle
      const followLoop = () => {
        circleX += (mouseX - circleX) * 0.15
        circleY += (mouseY - circleY) * 0.15
        
        gsap.set(circleRef.current, { x: circleX, y: circleY })
        requestAnimationFrame(followLoop)
      }
      
      requestAnimationFrame(followLoop)

      const onMouseLeave = () => gsap.to([dotRef.current, circleRef.current], { autoAlpha: 0, duration: 0.3 })
      const onMouseEnter = () => gsap.to([dotRef.current, circleRef.current], { autoAlpha: 1, duration: 0.3 })

      window.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseleave', onMouseLeave)
      document.addEventListener('mouseenter', onMouseEnter)

      // Hover states for links and buttons
      const handleLinkHover = () => {
        setIsHoveringLink(true)
        gsap.to(circleRef.current, { scale: 1.5, backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'transparent', duration: 0.3 })
        gsap.to(dotRef.current, { scale: 0, duration: 0.3 })
      }

      const handleLinkLeave = () => {
        setIsHoveringLink(false)
        setHoverLabel(null)
        gsap.to(circleRef.current, { scale: 1, backgroundColor: 'transparent', borderColor: 'rgba(201, 168, 76, 0.5)', duration: 0.3 })
        gsap.to(dotRef.current, { scale: 1, duration: 0.3 })
      }

      // Interactive areas (DRAG, VIEW)
      const handleDragHover = () => {
        handleLinkHover()
        setHoverLabel('DRAG')
      }

      const ElementsToHook = document.querySelectorAll('a, button, input, [role="button"]')
      const DragElements = document.querySelectorAll('.cursor-drag')

      ElementsToHook.forEach(el => {
        el.addEventListener('mouseenter', handleLinkHover)
        el.addEventListener('mouseleave', handleLinkLeave)
      })

      DragElements.forEach(el => {
        el.addEventListener('mouseenter', handleDragHover)
        el.addEventListener('mouseleave', handleLinkLeave)
      })

      return () => {
        window.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseleave', onMouseLeave)
        document.removeEventListener('mouseenter', onMouseEnter)
        ElementsToHook.forEach(el => {
          el.removeEventListener('mouseenter', handleLinkHover)
          el.removeEventListener('mouseleave', handleLinkLeave)
        })
        DragElements.forEach(el => {
          el.removeEventListener('mouseenter', handleDragHover)
          el.removeEventListener('mouseleave', handleLinkLeave)
        })
      }
    },
    { dependencies: [] } // Run once
  )

  // Disable native cursor via global class
  useEffect(() => {
    if (typeof window !== 'undefined' && !('ontouchstart' in window)) {
      document.body.classList.add('cursor-none')
      return () => document.body.classList.remove('cursor-none')
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold pointer-events-none z-[100] mix-blend-difference"
      />
      <div
        ref={circleRef}
        className="fixed top-0 left-0 w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/50 flex items-center justify-center pointer-events-none z-[100] mix-blend-difference"
      >
        {hoverLabel && (
          <span ref={labelRef} className="text-[8px] font-mono tracking-widest text-white mt-0.5">
            {hoverLabel}
          </span>
        )}
      </div>
    </>
  )
}
