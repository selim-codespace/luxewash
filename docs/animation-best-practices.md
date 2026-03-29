# 🎬 Animation Architecture — Best Practices

> How to build Awwwards-level animations without destroying performance or maintainability.

---

## Core Principle: The Animation Pyramid

```
            ╱ Three.js WebGL ╲           ← 1–2 hero moments only
           ╱                   ╲
          ╱   GSAP ScrollTrigger ╲        ← Section-level cinematics
         ╱                         ╲
        ╱    Framer Motion (React)   ╲    ← Component-level interactions
       ╱                               ╲
      ╱     CSS Transitions + Keyframes  ╲ ← Micro-interactions (hover, focus)
     ╱─────────────────────────────────────╲
```

**Rule:** Move down the pyramid wherever possible. Every level up adds bundle size, complexity, and performance cost.

---

## 1. GSAP vs Framer Motion — Clear Boundaries

| Use Case | Tool | Why |
|---|---|---|
| Scroll-triggered section reveals | **GSAP ScrollTrigger** | Superior scroll math, pinning, scrubbing |
| Horizontal scroll galleries | **GSAP ScrollTrigger** | Native horizontal scroll support |
| Counter animations | **GSAP** | Number tweening built-in |
| SVG path drawing | **GSAP** | DrawSVG / MotionPath plugins |
| Parallax depth layers | **GSAP** | Multi-layer speed control |
| Component mount/unmount | **Framer Motion** | `AnimatePresence` is unmatched |
| Layout animations | **Framer Motion** | `layoutId` prop for magic transitions |
| Hover/tap micro-interactions | **Framer Motion** | Spring physics, gesture handlers |
| Page transitions | **Framer Motion** | `AnimatePresence` + route change |
| Accordion/collapse | **Framer Motion** | Auto-animates height changes |
| Form field focus effects | **CSS only** | No JS needed for border gradients |
| Skeleton shimmer | **CSS only** | Pure CSS animation, zero JS |
| Grain overlay | **CSS only** | `steps()` animation, no JS |
| Button hover glow | **CSS only** | `box-shadow` transition |

> [!IMPORTANT]
> **Never** use both GSAP and Framer Motion on the same DOM element. They will fight over transform properties. Use GSAP for the *container* (scroll-driven), Framer Motion for *children* (interaction-driven).

---

## 2. GSAP Setup Pattern for Next.js 16

```tsx
// components/animations/gsap-provider.tsx
'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register once at module level
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Refresh ScrollTrigger after all images/fonts have loaded
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  return <>{children}</>
}
```

### GSAP Animation Hook Pattern

```tsx
// hooks/use-gsap-animation.ts
'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useRevealAnimation() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        yPercent: 30,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          once: true, // Only animate once
        },
      })
    })

    return () => ctx.revert() // Cleanup on unmount
  }, [])

  return ref
}
```

---

## 3. Three.js Performance Rules (Scope: Hero Car + Liquid Orb Only)

> **Decision:** Only two Three.js scenes are in scope:
> 1. **Hero Car Model** — rotating 3D car with cursor reactivity + water particle system
> 2. **Liquid Orb** — morphing metallic sphere on CTA sections
>
> **Cut:** Wash Tunnel fly-through (replaced with CSS clip-path + parallax images) and Particle Field page transitions (replaced with GSAP canvas 2D gold dust).

### Loading Strategy
```tsx
// components/3d/hero-car.tsx
'use client'

import dynamic from 'next/dynamic'

// Never SSR Three.js — it has no DOM
const CarScene = dynamic(() => import('./car-scene'), {
  ssr: false,
  loading: () => <div className="hero-car-skeleton" />,
})

export function HeroCar() {
  // Only render on capable devices
  const isCapable = useWebGLCapability()
  if (!isCapable) return <HeroCarFallback />
  return <CarScene />
}
```

### Performance Budget
| Metric | Target |
|---|---|
| Total .glb model size (compressed) | < 2MB |
| Draw calls per frame | < 50 |
| Triangle count | < 100K |
| Texture resolution (max) | 2048 × 2048 |
| Target FPS | 60fps desktop, 30fps mobile |
| Canvas resolution | `devicePixelRatio` capped at 2 |

### Mobile Fallback
- Detect via `navigator.hardwareConcurrency < 4` or failed WebGL2 context
- Replace 3D scene with a high-quality static image + CSS parallax
- Use `<picture>` with WebP + AVIF sources

---

## 4. Custom Cursor Implementation

```tsx
// hooks/use-cursor.ts
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function useCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window) return

    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 })
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 })
    }

    // Expand on interactive elements
    const onHover = () => gsap.to(follower, { scale: 2, duration: 0.3 })
    const onLeave = () => gsap.to(follower, { scale: 1, duration: 0.3 })

    document.addEventListener('mousemove', onMouseMove)

    const interactives = document.querySelectorAll('a, button, [role="button"]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onHover)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onHover)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return { cursorRef, followerRef }
}
```

> [!WARNING]
> Custom cursors must:
> 1. **Not hide the native cursor on iOS/iPadOS** (no cursor concept on touch)
> 2. **Fall back gracefully** if `requestAnimationFrame` is throttled
> 3. **Respect `prefers-reduced-motion`** — disable trail, reduce animations
> 4. **Not break focus indicator visibility** for keyboard navigation

---

## 5. Page Transition Pattern

```tsx
// components/animations/page-transition.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

> [!NOTE]
> Full-screen brand wipes (obsidian panel + gold logo) should use a **template** (`template.tsx`) in the route group, which re-renders on navigation — perfect for triggering entry animations.

---

## 6. Accessibility Checklist for Animations

- [ ] `prefers-reduced-motion: reduce` → disable or minimize all animations
- [ ] No content hidden behind scroll-triggered reveals at page load
- [ ] Parallax sections have `aria-hidden` decorative layers
- [ ] Auto-playing carousels have pause/stop controls
- [ ] Counter animations show final value in `aria-label`
- [ ] Custom cursor doesn't obscure interactive elements
- [ ] Page transitions complete within 500ms (don't block content)
- [ ] No flashing content > 3 flashes per second (photosensitive seizure risk)
