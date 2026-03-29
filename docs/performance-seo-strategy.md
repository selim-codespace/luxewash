# ⚡ Performance & SEO Strategy

> Targets, budgets, and implementation patterns to hit Lighthouse 95+ and LCP < 2s.

---

## 1. Performance Budgets

| Metric | Target | Alarm Threshold |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.0s | > 2.5s |
| FID / INP (Interaction to Next Paint) | < 100ms | > 200ms |
| CLS (Cumulative Layout Shift) | < 0.05 | > 0.1 |
| TTFB (Time to First Byte) | < 200ms | > 400ms |
| Lighthouse Performance | ≥ 95 | < 90 |
| Lighthouse Accessibility | ≥ 95 | < 90 |
| Lighthouse SEO | ≥ 95 | < 90 |

### Bundle Size Budgets

| Bundle | Max Size (gzipped) |
|---|---|
| Total JS per page (initial) | 150KB |
| Total CSS per page | 50KB |
| Largest JS chunk | 80KB |
| Three.js + scene (lazy) | 200KB |
| GSAP + plugins | 40KB |
| Framer Motion | 35KB |
| Hero image (WebP) | 150KB |
| Hero video (MP4) | 2MB |
| 3D model (.glb, Draco) | 2MB |

---

## 2. Image Optimization Strategy

### Format Priority
1. **AVIF** — 50% smaller than WebP, supported in Chrome/Firefox
2. **WebP** — universal modern format, fallback for Safari < 16
3. **JPEG** — legacy fallback only

### Implementation
```tsx
// Use next/image everywhere — it handles format negotiation
import Image from 'next/image'

<Image
  src="/hero-car.jpg"
  alt="Luxury car freshly detailed"
  width={1920}
  height={1080}
  priority                      // Hero images only
  placeholder="blur"            // Prevent CLS
  blurDataURL={blurDataUrl}     // Generated at build time
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
/>
```

### Image Processing Pipeline
- Upload → **Sharp** resize to 4 breakpoints (640, 1024, 1440, 1920)
- Generate blur placeholder (10×10 base64)
- Convert to WebP + AVIF
- Store originals + variants on Cloudflare R2
- Serve via Cloudflare CDN with `Cache-Control: public, max-age=31536000, immutable`

---

## 3. Font Loading Strategy

```tsx
// app/layout.tsx — using next/font/google for zero layout shift
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['monospace'],
})
```

> [!IMPORTANT]
> **Never** load fonts via `@font-face` in CSS for this project. `next/font/google` handles:
> - Preloading with correct `crossorigin`
> - Size-adjust to prevent CLS
> - Self-hosting at build time (no runtime Google Fonts external requests)
> - Automatic subsetting for smaller file sizes

---

## 4. Code Splitting Strategy

### Route-Level (automatic)
- Next.js automatically code-splits per route. No action needed.

### Component-Level (manual)
```tsx
// Heavy components must be lazy-loaded
import dynamic from 'next/dynamic'

// Three.js — never in initial bundle
const HeroCar = dynamic(() => import('@/components/3d/hero-car'), {
  ssr: false,
  loading: () => <HeroCarSkeleton />,
})

// Mapbox — only on locations page
const LocationMap = dynamic(() => import('@/components/location-map'), {
  ssr: false,
  loading: () => <MapSkeleton />,
})

// Stripe Elements — only at checkout
const PaymentForm = dynamic(() => import('@/components/booking/payment-form'), {
  ssr: false,
  loading: () => <PaymentSkeleton />,
})

// Recharts — only in admin
const RevenueChart = dynamic(() => import('@/components/admin/revenue-chart'), {
  ssr: false,
  loading: () => <ChartSkeleton />,
})
```

### Library-Level
- `gsap` — import only used plugins: `gsap/ScrollTrigger`, NOT `gsap/all`
- `framer-motion` — use `{ LazyMotion, domAnimation }` instead of full `motion`
- `date-fns` — import individual functions: `import { format } from 'date-fns/format'`
- `lucide-react` — tree-shakes automatically, but verify with bundle analyzer

---

## 5. Caching Strategy (Next.js 16)

### Static Pages (Marketing)
```tsx
// app/(marketing)/services/page.tsx
import { cacheLife, cacheTag } from 'next/cache'

export default async function ServicesPage() {
  'use cache'
  cacheLife('hours') // Revalidate every hour
  cacheTag('services')

  const services = await db.service.findMany({ where: { isActive: true } })
  // ...
}
```

### Dynamic Pages (Customer Portal)
```tsx
// app/(customer)/portal/page.tsx
import { Suspense } from 'react'
import { cookies } from 'next/headers'

export default function PortalPage() {
  return (
    <>
      {/* Static shell — cached */}
      <PortalHeader />

      {/* Dynamic — streamed at request time */}
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </>
  )
}

async function DashboardContent() {
  const session = (await cookies()).get('session')?.value
  // Fetch user-specific data...
}
```

### API Data
```tsx
// lib/data.ts
import { cacheLife, cacheTag } from 'next/cache'

export async function getServices() {
  'use cache'
  cacheLife('hours')
  cacheTag('services')
  return db.service.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } })
}

export async function getAvailableSlots(date: string, serviceId: string) {
  // NO cache — real-time availability
  return db.booking.findMany(/* ... */)
}
```

---

## 6. SEO Implementation

### Metadata Pattern
```tsx
// app/(marketing)/services/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Premium Car Wash & Detailing Services | LuxeWash',
  description: 'From express washes to full ceramic coating. Choose the perfect service for your vehicle. Same-day booking available.',
  openGraph: {
    title: 'Premium Car Wash Services',
    description: 'From express washes to full ceramic coating.',
    images: ['/og/services.jpg'],
    type: 'website',
  },
  alternates: {
    canonical: 'https://luxewash.com/services',
  },
}
```

### Structured Data (JSON-LD)
```tsx
// app/(marketing)/layout.tsx
export default function MarketingLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'LuxeWash',
    description: 'Premium car washing & detailing services',
    url: 'https://luxewash.com',
    telephone: '+1-XXX-XXX-XXXX',
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '12000',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
```

### Auto-Generated Files
```tsx
// app/sitemap.ts
export default async function sitemap() {
  const services = await getServices()
  return [
    { url: 'https://luxewash.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://luxewash.com/services', lastModified: new Date(), priority: 0.9 },
    ...services.map((s) => ({
      url: `https://luxewash.com/services/${s.slug}`,
      lastModified: s.updatedAt,
      priority: 0.8,
    })),
  ]
}

// app/robots.ts
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/portal/', '/api/'] },
    sitemap: 'https://luxewash.com/sitemap.xml',
  }
}
```

---

## 7. Monitoring & Alerting

| Tool | Purpose | Integration |
|---|---|---|
| **Sentry** | Error tracking (FE + workers) | `@sentry/nextjs` |
| **Vercel Analytics** | Core Web Vitals monitoring | Built-in |
| **Vercel Speed Insights** | Real-user performance data | Built-in |
| **PostHog** | Product analytics, feature flags | `posthog-js` |

### Performance Regression Alert
- Set up Vercel deployment checks to fail if:
  - LCP > 3.0s on any page
  - CLS > 0.1
  - Bundle size increases > 10% from previous build
