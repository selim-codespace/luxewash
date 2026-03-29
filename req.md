# 🚗 LUXEWASH — Awwwards-Level Premium Car Wash Platform
### Full Project Specification · Next.js 16 · Unified App Architecture

---

> **Vision**: A cinematic, animated, ultra-premium digital experience for a car washing & detailing service. Every scroll feels like a film scene. Every interaction earns a gasp. Every booking feels effortless.

---

## ⚡ Architecture Decisions (Finalized)

> The following decisions override the original spec below. See `/docs/architecture-analysis.md` for full rationale.

| # | Decision | Details |
|---|---|---|
| 1 | **No Express backend** | Killed. All API logic uses Next.js Route Handlers + Server Actions. Background workers (BullMQ + Socket.IO) run as a standalone Node process. |
| 2 | **Admin as route group** | No separate admin app. Admin panel lives at `app/(admin)/` with role-gated middleware. Single deployment. |
| 3 | **Premium Google Fonts** | **Playfair Display** (serif display), **DM Sans** (body), **JetBrains Mono** (monospace). Loaded via `next/font/google`. |
| 4 | **3D scope reduced** | Only **Hero Car Model** + **Liquid Orb**. Wash Tunnel → CSS clip-path + parallax. Particle transitions → GSAP canvas 2D. |

### Supporting Documentation
- [`/docs/architecture-analysis.md`](docs/architecture-analysis.md) — Full critical review + revised project structure
- [`/docs/design-system.md`](docs/design-system.md) — Tokens, typography, component contracts
- [`/docs/animation-best-practices.md`](docs/animation-best-practices.md) — GSAP vs Framer boundaries, Three.js rules
- [`/docs/performance-seo-strategy.md`](docs/performance-seo-strategy.md) — Budgets, caching, SEO patterns
- [`/docs/database-schema.md`](docs/database-schema.md) — Corrected schema (7 missing models fixed)
- [`/docs/testing-strategy.md`](docs/testing-strategy.md) — Test pyramid, CI pipeline, quality gates

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Monorepo Structure](#3-monorepo-structure)
4. [Design System & Aesthetic Direction](#4-design-system--aesthetic-direction)
5. [Animation Architecture](#5-animation-architecture)
6. [Public Website — Pages & Features](#6-public-website--pages--features)
7. [Booking System](#7-booking-system)
8. [AI-Powered Smart Features](#8-ai-powered-smart-features)
9. [Admin Panel](#9-admin-panel)
10. [Backend — Express API](#10-backend--express-api)
11. [Database Schema](#11-database-schema)
12. [Authentication & Roles](#12-authentication--roles)
13. [Notifications & Communications](#13-notifications--communications)
14. [Payments Integration](#14-payments-integration)
15. [Performance & SEO](#15-performance--seo)
16. [Deployment Architecture](#16-deployment-architecture)
17. [Environment Variables](#17-environment-variables)
18. [Unique & Signature Features](#18-unique--signature-features)
19. [Development Phases & Milestones](#19-development-phases--milestones)
20. [Inspiration & References](#20-inspiration--references)

---

## 1. Project Overview

**Project Name:** LuxeWash  
**Type:** Full-stack SaaS web application  
**Primary Audience:** Car owners seeking premium washing & detailing experiences  
**Secondary Audience:** Service admins, technicians, and fleet managers  

### Business Goals
- Convert website visitors into recurring paying customers
- Streamline booking management for staff via an admin panel
- Build brand loyalty through an unforgettable digital experience
- Upsell premium services via AI recommendations
- Enable subscription/membership plans for recurring revenue

### Key Differentiators
- Cinematic scroll-driven animations that feel like watching a film
- AI concierge that recommends the right wash package based on car type, weather, and usage
- Real-time booking with live technician availability
- Loyalty gamification with a digital car passport
- Hyper-personalized customer dashboard

---

## 2. Tech Stack

### Frontend
| Category | Technology |
|---|---|
| Framework | **Next.js 16** (App Router, Server Components, Turbopack) |
| Language | TypeScript 5.x |
| Styling | Tailwind CSS 4 + CSS Modules for complex animations |
| Animation | **GSAP 3** (ScrollTrigger, SplitText, Flip) + **Framer Motion 12** |
| 3D / WebGL | **Three.js** + **@react-three/fiber** + **@react-three/drei** |
| Smooth Scroll | **Lenis** |
| State Management | Zustand + TanStack Query v5 |
| Forms | React Hook Form + Zod |
| UI Components | Custom-built (zero off-the-shelf component library — fully bespoke) |
| Date/Time | date-fns + react-day-picker |
| Maps | Mapbox GL JS |
| Charts (Admin) | Recharts + custom SVG charts |
| Payments UI | Stripe Elements |
| Auth Client | NextAuth.js v5 |

### Backend
| Category | Technology |
|---|---|
| Runtime | **Node.js 22 LTS** |
| Framework | **Express.js 5** |
| Language | TypeScript 5.x |
| ORM | **Prisma 6** |
| Database | **PostgreSQL 16** |
| Cache | **Redis 7** (ioredis) |
| File Storage | **AWS S3** + CloudFront CDN |
| Queue | **BullMQ** (Redis-backed job queue) |
| Email | **Resend** (React Email templates) |
| SMS | **Twilio** |
| Push Notifications | **web-push** + Firebase Cloud Messaging |
| AI | **OpenAI GPT-4o** + **OpenAI Vision API** |
| Weather | OpenWeatherMap API |
| Payments | **Stripe** (Charges, Subscriptions, Webhooks) |
| Auth Server | JWT (access + refresh token pattern) |
| Validation | Zod |
| Rate Limiting | express-rate-limit + Redis sliding window |
| Logging | Winston + Pino |
| API Docs | Swagger / OpenAPI 3.1 |
| WebSockets | Socket.IO |

### Infrastructure & DevOps
| Category | Technology |
|---|---|
| Containerization | Docker + Docker Compose |
| CI/CD | GitHub Actions |
| Frontend Hosting | **Vercel** |
| Backend Hosting | **Railway** or **Render** |
| DB Hosting | **Supabase** (managed PostgreSQL) |
| Monitoring | Sentry + Vercel Analytics + PostHog |
| Error Tracking | Sentry (frontend + backend) |

---

## 3. Monorepo Structure

```
luxewash/
├── apps/
│   ├── web/                          # Next.js 16 public website + customer portal
│   │   ├── app/
│   │   │   ├── (marketing)/          # Landing, about, services, contact
│   │   │   ├── (auth)/               # Login, register, forgot password
│   │   │   ├── (customer)/           # Dashboard, bookings, profile, loyalty
│   │   │   ├── api/                  # Next.js API routes (thin proxies only)
│   │   │   ├── globals.css
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── animations/           # Reusable GSAP + Framer components
│   │   │   ├── 3d/                   # Three.js scenes
│   │   │   ├── booking/              # Full booking flow components
│   │   │   ├── ui/                   # Buttons, inputs, modals, etc.
│   │   │   └── sections/             # Page section components
│   │   ├── lib/
│   │   │   ├── animations.ts         # GSAP presets & timeline builders
│   │   │   ├── api-client.ts
│   │   │   └── utils.ts
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── stores/                   # Zustand stores
│   │   └── public/
│   │       ├── fonts/                # Self-hosted premium fonts
│   │       ├── videos/               # Hero reel, process videos
│   │       └── models/               # .glb 3D car models
│   │
│   └── admin/                        # Next.js 16 Admin Panel (separate app)
│       ├── app/
│       │   ├── (auth)/
│       │   ├── dashboard/
│       │   ├── bookings/
│       │   ├── customers/
│       │   ├── services/
│       │   ├── staff/
│       │   ├── analytics/
│       │   ├── promotions/
│       │   ├── settings/
│       │   └── layout.tsx
│       └── components/
│
├── packages/
│   ├── api/                          # Express.js backend
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── middleware/
│   │   │   ├── jobs/                 # BullMQ workers
│   │   │   ├── sockets/              # Socket.IO handlers
│   │   │   └── app.ts
│   │   └── prisma/
│   │       ├── schema.prisma
│   │       └── seed.ts
│   │
│   ├── shared/                       # Shared types, schemas, constants
│   │   ├── types/
│   │   ├── schemas/                  # Zod schemas (reused on FE + BE)
│   │   └── constants/
│   │
│   └── emails/                       # React Email templates
│       ├── booking-confirmation.tsx
│       ├── booking-reminder.tsx
│       ├── loyalty-reward.tsx
│       └── welcome.tsx
│
├── docker-compose.yml
├── turbo.json                        # Turborepo config
├── package.json
└── README.md
```

---

## 4. Design System & Aesthetic Direction

### Aesthetic: **"Dark Luxury Automotive"**

Think Ferrari showroom meets high-fashion editorial. Deep obsidian backgrounds, razor-sharp typography, liquid chrome accents, microscopic detail. Every pixel earns its place.

### Color Palette

```css
:root {
  /* Core */
  --color-void:        #050507;      /* Deepest background — near-black with blue undertone */
  --color-obsidian:    #0D0D12;      /* Card backgrounds */
  --color-graphite:    #1A1A24;      /* Subtle surface elevation */
  --color-smoke:       #2E2E3E;      /* Borders, dividers */

  /* Accent — Chrome Gold */
  --color-gold-vivid:  #C9A84C;      /* Primary CTA, highlights */
  --color-gold-muted:  #8A6E34;      /* Secondary accent */
  --color-gold-glow:   rgba(201,168,76,0.15); /* Glow halos */

  /* Text */
  --color-white:       #F5F5F0;      /* Primary text — warm white */
  --color-silver:      #A0A0B0;      /* Secondary text */
  --color-fog:         #5A5A70;      /* Placeholder, disabled */

  /* Semantic */
  --color-success:     #2ECC71;
  --color-warning:     #F39C12;
  --color-error:       #E74C3C;
  --color-info:        #3498DB;
}
```

### Typography

```css
/* Display — Headlines */
@font-face {
  font-family: 'Canela';             /* Serif editorial — luxury feel */
  src: url('/fonts/Canela-Light.woff2');
}

/* UI — Body + Navigation */
@font-face {
  font-family: 'Neue Montreal';      /* Swiss grotesque — precision engineering feel */
  src: url('/fonts/NeueMontreal-Regular.woff2');
}

/* Monospace — Numbers, Codes, Stats */
@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/JetBrainsMono-Regular.woff2');
}

:root {
  --font-display: 'Canela', Georgia, serif;
  --font-body:    'Neue Montreal', Helvetica, sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
}
```

### Motion Tokens

```ts
export const motion = {
  ease: {
    smooth:    [0.25, 0.46, 0.45, 0.94],
    snappy:    [0.77, 0, 0.175, 1],
    spring:    { type: 'spring', stiffness: 200, damping: 25 },
    cinematic: [0.16, 1, 0.3, 1],   // Signature ease — slow start, explosive finish
  },
  duration: {
    instant:  0.15,
    fast:     0.3,
    medium:   0.6,
    slow:     1.0,
    cinematic:1.8,
  }
}
```

---

## 5. Animation Architecture

### Layer 1 — Scroll-Driven Cinematics (GSAP ScrollTrigger)

Every major section transition is a **cinematic reveal**:

```ts
// Signature reveal: text lines mask-clip from bottom
gsap.from('.headline-line', {
  yPercent: 110,
  duration: 1.2,
  ease: 'expo.out',
  stagger: 0.08,
  scrollTrigger: { trigger: '.section', start: 'top 80%' }
})
```

- **Horizontal scroll galleries** — services scroll like a film strip
- **Parallax depth layers** — 3-4 layers at different speeds per section
- **Clip-path reveals** — images expand from a sliver to full width
- **Counter animations** — stats count up when entering viewport
- **Magnetic buttons** — cursor warps toward interactive elements
- **Sticky progression** — pinned sections with internal animated state
- **SVG path draw** — decorative lines draw themselves on scroll

### Layer 2 — WebGL / Three.js Scenes

| Scene | Location | Description |
|---|---|---|
| **Hero Car Model** | Home hero | Rotating 3D luxury car. Reacts to cursor. Water droplets particle system rains over it |
| **Wash Tunnel** | Services section | First-person animated tunnel fly-through with foam, water, brushes |
| **Liquid Orb** | CTA sections | Morphing metallic liquid sphere that reacts to hover |
| **Particle Field** | Page transitions | Gold dust particles explode on route change |

### Layer 3 — Micro-interactions (Framer Motion)

- Accordion expansions with spring physics
- Button press: 3D press-down effect with shadow
- Form field focus: border gradient sweeps left-to-right
- Toast notifications: slide + blur in from edge
- Page transitions: full-screen wipe with brand color
- Booking step transitions: card flip + slide
- Skeleton loaders with shimmer effect

### Layer 4 — Ambient Effects (CSS Only)

```css
/* Grain texture overlay — adds film photography feel */
.grain::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url('/noise.svg');
  opacity: 0.04;
  pointer-events: none;
  z-index: 9999;
  animation: grain 0.5s steps(2) infinite;
}

/* Chrome glow on headings */
.glow-text {
  text-shadow: 0 0 80px rgba(201,168,76,0.4);
}

/* Aurora background for hero */
.aurora {
  background: radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.07) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 20%, rgba(52,152,219,0.05) 0%, transparent 60%);
}
```

### Custom Cursor

A fully custom cursor that:
- Transforms into a circle on links
- Shows "DRAG" label on horizontal scroll areas
- Shows "VIEW" on image hover
- Inverts colors based on background brightness
- Leaves a short trailing motion trail

---

## 6. Public Website — Pages & Features

### 6.1 Home Page (`/`)

**Hero Section**
- Full-viewport split: Left = editorial headline + CTA, Right = Three.js 3D car model
- Animated headline: words reveal word-by-word with clip mask
- Scroll indicator: animated bouncing arrow with "Scroll to Explore"
- Background: subtle aurora glow, film grain overlay
- Auto-playing ambient video loop (muted, 15% opacity) of water in slow motion

**Trust Bar**
- Horizontal marquee: `★ 4.9/5 · 12,000+ Cars Washed · Same-Day Booking · Eco-Certified`
- Infinite scroll, pauses on hover

**Services Showcase**
- Horizontal scroll section (pinned)
- 4–6 service cards as large format panels
- Each panel: full-bleed video background, service name, price, and "Book Now" CTA
- Cards have depth/parallax within the panel

**How It Works**
- Numbered step process: Book → Confirm → We Come to You → Shine
- Lottie animations or custom CSS illustrations per step
- SVG path connecting steps draws on scroll

**Stats Row**
- Animated counters: `12,400 Happy Customers`, `99.3% Satisfaction`, `3 Years of Excellence`, `48 Cities`
- Numbers count up dramatically on viewport entry

**AI Recommendation Teaser**
- "Tell us about your car → Get the perfect wash" — interactive mini-quiz in the homepage
- 3 questions: Car type, How dirty, When's the next rain? → AI recommends a package

**Testimonials Carousel**
- Full-bleed testimonials with customer photo, star rating, car type
- Auto-advancing, supports manual drag/swipe
- Background changes color per testimonial (subtle)

**Pricing Preview**
- 3-tier pricing cards with glass morphism styling
- Feature comparison with animated checkmarks
- "Most Popular" tier has gold border glow animation
- Toggle: One-time vs Subscription pricing

**Before & After Gallery**
- Drag slider to reveal before/after car images
- Grid of 6 vehicle transformations

**Fleet / Business Section**
- Target corporate clients: "Wash your entire fleet"
- Link to business inquiry form

**FAQ**
- Animated accordion — items expand with spring animation
- Search within FAQ

**Footer**
- Full-width dark footer with brand logo (large, watermark-style)
- Quick links, social icons, newsletter signup
- Live clock showing current business hours status

---

### 6.2 Services Page (`/services`)

- Full-screen hero per service (sticky-scroll pattern)
- Services: Express Wash · Signature Detail · Interior Deep Clean · Engine Bay · Ceramic Coating · Paint Correction · Fleet Packages
- Each service: price, duration, what's included, before/after images, booking CTA
- Add-on selector: checkboxes for optional extras (tire shine, fragrance, etc.)
- Compare services side-by-side modal

---

### 6.3 How It Works Page (`/how-it-works`)

- Linear storytelling scroll
- Animated timeline: Book → Driver dispatched (live map) → Service begins → Inspection photos sent → Done
- Embedded video explainer with custom player controls
- Real-time availability teaser widget

---

### 6.4 Pricing Page (`/pricing`)

- Toggle: Single service / Monthly Membership / Annual Pass
- Tier comparison table (animated reveal)
- Calculator widget: "Estimate your savings with a membership"
- FAQs specific to pricing
- Money-back guarantee badge

---

### 6.5 About Page (`/about`)

- Brand story with editorial scroll experience
- Team section: staff cards with hover reveals
- Timeline of company milestones
- Values section with icons and descriptions
- Press mentions / logos

---

### 6.6 Locations Page (`/locations`)

- Interactive Mapbox map with custom-styled markers
- Location cards: address, hours, phone, directions button
- Filter by city / service type
- "Coming soon" markers for new locations

---

### 6.7 Contact Page (`/contact`)

- Split-screen: form left, contact info + map right
- Form: name, email, phone, service interest, message
- Animated input labels (floating)
- Real-time form validation
- WhatsApp quick contact button

---

### 6.8 Customer Portal (`/portal`)

Authenticated area for logged-in customers:

**Dashboard**
- Greeting with customer name + current loyalty tier
- Upcoming booking card with countdown timer
- Recent services history
- Loyalty points balance + progress ring toward next tier
- Quick re-book button (one-click rebook last service)
- Notifications feed

**My Bookings**
- Calendar view + list view toggle
- Booking status: Pending, Confirmed, In Progress, Completed, Cancelled
- Booking detail modal: technician info, service details, photos
- Reschedule / Cancel options (with policy notice)

**Car Garage** _(unique feature)_
- User adds their cars: make, model, year, color, license plate
- Each car has a **Digital Car Passport**: full history of services done
- Recommended next service based on mileage + last wash date
- Car avatar: select from illustrated car icons

**Loyalty & Rewards**
- Points balance with animated gauge
- Tier progress: Bronze → Silver → Gold → Platinum
- Reward redemption catalog
- Referral program: unique referral link with copy button
- History of points earned/redeemed

**Subscriptions**
- Active membership details
- Manage billing (portal to Stripe Customer Portal)
- Upgrade/downgrade plan

**Profile Settings**
- Personal info, password, notification preferences
- Saved payment methods (Stripe)
- Saved addresses (home, office)

---

## 7. Booking System

### 7.1 Booking Flow (Multi-Step Wizard)

```
Step 1: Select Service
  └─ Browse packages, add extras/add-ons
  └─ Price updates dynamically as options are selected

Step 2: Select Vehicle
  └─ Choose from saved cars OR add new car
  └─ Car size affects pricing (sedan vs SUV vs truck)

Step 3: Choose Location & Date/Time
  └─ Enter service address (auto-complete via Google Places)
  └─ Mobile wash: we come to you OR choose a location
  └─ Calendar with available slots (real-time from API)
  └─ Preferred time range picker

Step 4: Preferences & Notes
  └─ Special instructions (pet hair, odor, scratches to avoid)
  └─ Photo upload (show current car condition)
  └─ Parking access info

Step 5: Review & Payment
  └─ Summary of everything
  └─ Apply promo code / loyalty points
  └─ Stripe payment form (card, Apple Pay, Google Pay)
  └─ Subscription option upsell

Step 6: Confirmation
  └─ Booking ID + reference number
  └─ Animated success screen (confetti or water droplet explosion)
  └─ Add to Google/Apple Calendar button
  └─ Share booking on WhatsApp
```

### 7.2 Booking Engine (Backend)

- **Real-time slot management** — slots locked for 10 minutes during checkout (Redis TTL)
- **Dynamic pricing engine** — price changes based on car size, selected services, time of day, demand
- **Conflict detection** — technician cannot be double-booked
- **Geo-routing** — assigns nearest available technician for mobile wash
- **Buffer time** — automatic 30-min buffer between bookings per technician
- **Cancellation policy** — configurable via admin (e.g. free cancel until 24h before)
- **Waitlist** — if slot is full, customer can join waitlist with auto-notification on opening

### 7.3 Booking Status Lifecycle

```
PENDING → CONFIRMED → TECHNICIAN_ASSIGNED → IN_PROGRESS → COMPLETED
                                                         └→ CANCELLED
                                                         └→ NO_SHOW
```

Real-time status updates pushed via **Socket.IO** to customer portal.

---

## 8. AI-Powered Smart Features

### 8.1 AI Wash Concierge (GPT-4o)

A chat widget accessible across the site that:
- Recommends the best wash package based on:
  - Car type and age
  - Current weather (from OpenWeatherMap API)
  - Last service date
  - Customer budget
  - Upcoming events ("I have a date tonight")
- Answers FAQs with RAG over company knowledge base
- Can initiate the booking flow directly from chat
- Multilingual support

```ts
// System prompt example
const systemPrompt = `
You are LuxeBot, the AI concierge for LuxeWash premium car care. 
Your goal is to help customers find the ideal service.
Current weather in customer's city: ${weather.description}, ${weather.temp}°C.
Customer's car: ${customer.cars[0].make} ${customer.cars[0].model} (${customer.cars[0].year}).
Last service: ${customer.lastService?.date ?? 'never'}.
Always be warm, expert, and subtly luxurious in tone.
When recommending a package, explain WHY it's perfect for their situation.
`;
```

### 8.2 Car Condition Analysis (Vision API)

- Customer uploads a photo of their car before booking
- GPT-4o Vision analyzes the image:
  - Detects dirt level (light / moderate / heavy)
  - Identifies specific problem areas (bird droppings, tar, swirl marks)
  - Recommends the appropriate service tier
  - Flags if paint correction or specialty services are needed
- Result shown inline with an annotated image highlights

### 8.3 Smart Scheduling Optimizer

- AI predicts best time slots based on:
  - Weather forecast (avoid rain for exterior washes)
  - Customer's calendar availability (if Google Calendar connected)
  - Historical traffic patterns around service address
- Proactively surfaces: "We recommend Saturday 10am — no rain forecast and light traffic"

### 8.4 Dynamic Pricing Intelligence

- Demand-based surge pricing (configurable max % in admin)
- Off-peak discount suggestions to fill slow slots
- Bundle recommendations: "Add interior clean for just $12 more"
- Membership ROI calculator: "You'd save $47/month on a Gold plan"

### 8.5 Customer Churn Prediction

- ML model (simple scoring) flags customers likely to churn:
  - No booking in 45+ days
  - Decreasing booking frequency
  - Last review was low rating
- Admin receives alert → automated win-back campaign triggers

### 8.6 Review Sentiment Analysis

- All customer reviews analyzed via GPT
- Tags extracted: `speed`, `quality`, `communication`, `value`
- Admin dashboard shows sentiment trends per tag over time
- Negative reviews trigger alert to manager

### 8.7 Predictive Maintenance Reminders

- Based on wash history + car type, AI generates personalized reminders:
  - "Your ceramic coating from 6 months ago may need a refresh"
  - "Salt season is here — your BMW's undercarriage is due for a wash"
- Sent via email/SMS/push

---

## 9. Admin Panel

Built as a separate Next.js 16 app at `/admin` subdomain. Protected by role-based auth.

### 9.1 Dashboard (Home)

**Key Metrics (Live)**
- Today's bookings (count + revenue)
- Active bookings right now (in-progress)
- Technicians on duty
- Average rating this week
- Pending reviews to respond to

**Charts & Analytics**
- Revenue chart: daily/weekly/monthly/yearly (bar + line)
- Booking volume heatmap (hour-of-day × day-of-week)
- Service popularity pie chart
- Conversion funnel: Visits → Booking started → Completed
- Retention cohort chart

**Live Activity Feed**
- Real-time stream: "New booking #1042 · John D. · Gold Detail · Tomorrow 2PM"
- Status changes: "Booking #1038 marked Complete"
- Alerts: "⚠️ Technician Mark is 20min late to booking #1039"

---

### 9.2 Bookings Management

**List View**
- Table with: ID, customer, service, date/time, technician, status, price, actions
- Filter by: status, date range, service type, technician, location
- Sort by any column
- Bulk actions: assign technician, cancel, export CSV

**Calendar View**
- Full calendar (month/week/day views)
- Color-coded by status
- Drag-and-drop to reschedule
- Technician columns in week view (resource calendar)

**Booking Detail Page**
- Full booking info
- Inline status update
- Assign/reassign technician
- Customer contact (call, WhatsApp, email buttons)
- Add internal notes
- View customer's uploaded car photos
- Upload completion photos
- Manual payment adjustment

**Create Manual Booking**
- Admin can book on behalf of customer (phone/walk-in)
- Search/select existing customer or create new
- Full booking form with all options

---

### 9.3 Customers Management

- Customer list with search + filters
- Customer profile:
  - Contact info, car garage
  - Full booking history
  - Loyalty tier + points
  - Total lifetime spend
  - AI churn risk score (Low / Medium / High)
  - Notes field for staff
  - Communication log (emails, SMS sent)
- Bulk email/SMS campaigns to customer segments
- Export customer list (CSV, for email tools)

---

### 9.4 Services Management

- CRUD for all service packages
- Fields: name, description, base price, duration, what's included
- Pricing rules by car size (sedan, SUV, truck, van)
- Add-on/extra services management
- Enable/disable services (e.g., seasonal offerings)
- Service images and video upload

---

### 9.5 Staff / Technicians

- Staff profiles: name, photo, contact, role
- Schedule manager: assign working hours per technician per day
- Time-off / leave management
- Performance dashboard per technician:
  - Bookings completed this month
  - Average customer rating
  - On-time arrival rate
  - Revenue generated
- GPS tracking integration (optional — shows last known location)

---

### 9.6 Pricing & Promotions

- **Dynamic Pricing Rules**: Set surge multipliers by time-of-day / day-of-week
- **Promo Codes**: Create codes with discount %, expiry, max uses, service restrictions
- **Flash Sales**: Schedule limited-time discount events
- **Referral Rewards**: Configure points awarded for referrals
- **Loyalty Tiers**: Edit tier names, thresholds, benefits
- **Membership Plans**: Create/edit subscription tiers, billing cycles, included services

---

### 9.7 Reviews & Reputation

- All reviews in one place (from platform + Google import)
- Filter by star rating, service, date
- Respond to reviews inline (response published to customer portal)
- AI-suggested responses (one-click) — generated by GPT
- Flag inappropriate reviews
- Review request automation: trigger after each completed booking

---

### 9.8 Analytics & Reports

**Revenue Reports**
- Revenue by service, by technician, by location, by period
- Refunds and cancellations breakdown
- Stripe payout reconciliation

**Booking Reports**
- Booking sources (direct, referral, campaign)
- Cancellation reasons breakdown
- No-show rate
- Rebooking rate (loyalty indicator)

**Customer Reports**
- New vs returning customer ratio
- Customer acquisition by source
- LTV (Lifetime Value) distribution
- Churn rate monthly

**Export**: All reports exportable as CSV or PDF

---

### 9.9 Notifications & Communications

- **Email Templates Editor**: Visual editor for all transactional emails
- **SMS Templates**: Edit SMS messages for reminders, confirmations
- **Broadcast Messages**: Send announcement to all or segmented customers
- **Automation Rules**:
  - 24h before booking → reminder email + SMS
  - 1h before → reminder SMS
  - After completion → review request after 2h
  - 30 days no booking → win-back offer
  - Loyalty tier upgrade → celebration email

---

### 9.10 Settings

- Business profile (name, logo, contact info)
- Operating hours (per day, with holiday overrides)
- Service area configuration (radius, zip codes)
- Booking settings (cancellation window, slot duration, buffer time)
- Payment settings (Stripe configuration, tax rate)
- Integrations (Google Calendar, Twilio, Mailchimp)
- Admin user management (invite staff, set roles)
- Audit log (who changed what and when)

---

## 10. Backend — Express API

### 10.1 API Structure

```
/api/v1/
├── auth/
│   ├── POST   /register
│   ├── POST   /login
│   ├── POST   /refresh
│   ├── POST   /logout
│   ├── POST   /forgot-password
│   └── POST   /reset-password
│
├── users/
│   ├── GET    /me
│   ├── PATCH  /me
│   └── DELETE /me
│
├── cars/
│   ├── GET    /                    # My cars
│   ├── POST   /                    # Add car
│   ├── PATCH  /:id
│   └── DELETE /:id
│
├── services/
│   ├── GET    /                    # All services (public)
│   └── GET    /:id
│
├── bookings/
│   ├── GET    /                    # Customer's bookings
│   ├── POST   /                    # Create booking
│   ├── GET    /:id
│   ├── PATCH  /:id/cancel
│   ├── PATCH  /:id/reschedule
│   └── GET    /slots               # Available time slots
│
├── payments/
│   ├── POST   /create-intent
│   ├── POST   /confirm
│   ├── POST   /webhook             # Stripe webhook
│   └── GET    /subscriptions
│
├── loyalty/
│   ├── GET    /balance
│   ├── GET    /history
│   └── POST   /redeem
│
├── reviews/
│   ├── POST   /                    # Submit review
│   └── GET    /                    # Public reviews
│
├── ai/
│   ├── POST   /recommend           # Package recommendation
│   ├── POST   /analyze-car         # Vision analysis
│   └── POST   /chat                # Concierge chat
│
├── notifications/
│   └── GET    /                    # User's notifications
│
└── admin/                          # All protected by admin middleware
    ├── dashboard/
    ├── bookings/
    ├── customers/
    ├── services/
    ├── staff/
    ├── promotions/
    ├── analytics/
    └── settings/
```

### 10.2 Middleware Stack

```ts
app.use(helmet())                    // Security headers
app.use(cors(corsOptions))           // CORS
app.use(compression())               // Gzip
app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())
app.use(requestLogger)               // Winston + request ID
app.use(rateLimiter)                 // Redis sliding window

// Route-specific
router.use('/admin', authenticate, requireRole('admin', 'manager'))
router.use('/api/v1', authenticate)
```

### 10.3 Background Jobs (BullMQ)

| Queue | Job | Trigger |
|---|---|---|
| `notifications` | Send booking reminder | 24h before, 1h before |
| `notifications` | Send review request | 2h after completion |
| `notifications` | Send win-back email | 30 days inactive |
| `notifications` | Loyalty tier upgrade notification | On tier change |
| `analytics` | Generate daily analytics snapshot | Daily 2AM cron |
| `ai` | Run churn prediction scoring | Weekly |
| `cleanup` | Expire abandoned booking holds | Every 5 minutes |
| `reports` | Generate scheduled reports | Custom admin schedule |

### 10.4 WebSocket Events (Socket.IO)

```ts
// Server emits:
'booking:status_updated'   // → customer portal
'booking:technician_assigned' // → customer portal
'dashboard:metrics_updated'   // → admin dashboard
'booking:new'                 // → admin live feed

// Client emits:
'subscribe:booking'        // Subscribe to booking updates
'subscribe:admin_dashboard' // Admin subscribes to live feed
```

---

## 11. Database Schema

### Core Models (Prisma)

```prisma
model User {
  id                String       @id @default(cuid())
  email             String       @unique
  phone             String?
  name              String
  passwordHash      String
  role              Role         @default(CUSTOMER)
  avatarUrl         String?
  loyaltyTier       LoyaltyTier  @default(BRONZE)
  loyaltyPoints     Int          @default(0)
  referralCode      String       @unique @default(cuid())
  referredById      String?
  stripeCustomerId  String?      @unique
  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt

  cars              Car[]
  bookings          Booking[]
  reviews           Review[]
  notifications     Notification[]
  loyaltyEvents     LoyaltyEvent[]
  subscriptions     Subscription[]
}

model Car {
  id          String   @id @default(cuid())
  userId      String
  make        String
  model       String
  year        Int
  color       String
  licensePlate String?
  size        CarSize  @default(SEDAN)
  avatarIcon  String?
  createdAt   DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id])
  bookings    Booking[]
}

model Service {
  id            String   @id @default(cuid())
  name          String
  slug          String   @unique
  description   String
  longDescription String?
  basePrice     Float
  duration      Int      // minutes
  isActive      Boolean  @default(true)
  sortOrder     Int      @default(0)
  imageUrl      String?
  videoUrl      String?
  features      String[] // Array of included features
  category      ServiceCategory

  pricingRules  ServicePricing[]
  addons        Addon[]
  bookings      BookingService[]
}

model ServicePricing {
  id        String  @id @default(cuid())
  serviceId String
  carSize   CarSize
  price     Float

  service   Service @relation(fields: [serviceId], references: [id])
}

model Booking {
  id                String        @id @default(cuid())
  userId            String
  carId             String
  status            BookingStatus @default(PENDING)
  scheduledAt       DateTime
  completedAt       DateTime?
  address           String
  lat               Float?
  lng               Float?
  notes             String?
  totalPrice        Float
  depositAmount     Float?
  isPaid            Boolean       @default(false)
  stripePaymentIntentId String?
  technicianId      String?
  promoCodeId       String?
  loyaltyPointsUsed Int           @default(0)
  cancellationReason String?
  internalNotes     String?
  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt

  user              User          @relation(fields: [userId], references: [id])
  car               Car           @relation(fields: [carId], references: [id])
  technician        Staff?        @relation(fields: [technicianId], references: [id])
  services          BookingService[]
  photos            BookingPhoto[]
  review            Review?
  promoCode         PromoCode?    @relation(fields: [promoCodeId], references: [id])
}

model Staff {
  id          String   @id @default(cuid())
  userId      String   @unique
  role        StaffRole
  bio         String?
  isActive    Boolean  @default(true)
  schedules   StaffSchedule[]
  bookings    Booking[]

  user        User     @relation(fields: [userId], references: [id])
}

model Review {
  id          String   @id @default(cuid())
  bookingId   String   @unique
  userId      String
  rating      Int      // 1-5
  comment     String?
  adminReply  String?
  sentimentScore Float?
  sentimentTags  String[]
  isPublic    Boolean  @default(true)
  createdAt   DateTime @default(now())

  booking     Booking  @relation(fields: [bookingId], references: [id])
  user        User     @relation(fields: [userId], references: [id])
}

model PromoCode {
  id          String   @id @default(cuid())
  code        String   @unique
  discount    Float
  discountType DiscountType // PERCENT | FIXED
  maxUses     Int?
  usedCount   Int      @default(0)
  expiresAt   DateTime?
  isActive    Boolean  @default(true)
  restrictions Json?   // service IDs, min order, etc.

  bookings    Booking[]
}

model Subscription {
  id              String   @id @default(cuid())
  userId          String
  planId          String
  status          SubscriptionStatus
  stripeSubId     String   @unique
  currentPeriodEnd DateTime
  createdAt       DateTime @default(now())

  user            User     @relation(fields: [userId], references: [id])
  plan            SubscriptionPlan @relation(fields: [planId], references: [id])
}

model LoyaltyEvent {
  id          String   @id @default(cuid())
  userId      String
  points      Int      // positive = earned, negative = redeemed
  reason      String
  bookingId   String?
  createdAt   DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id])
}

// Enums
enum Role         { CUSTOMER TECHNICIAN MANAGER ADMIN SUPER_ADMIN }
enum StaffRole    { TECHNICIAN SENIOR_TECHNICIAN MANAGER }
enum BookingStatus { PENDING CONFIRMED TECHNICIAN_ASSIGNED IN_PROGRESS COMPLETED CANCELLED NO_SHOW }
enum CarSize      { SEDAN HATCHBACK SUV TRUCK VAN MOTORCYCLE }
enum LoyaltyTier  { BRONZE SILVER GOLD PLATINUM }
enum DiscountType { PERCENT FIXED }
enum ServiceCategory { EXTERIOR INTERIOR FULL_DETAIL SPECIALTY FLEET }
enum SubscriptionStatus { ACTIVE PAST_DUE CANCELLED TRIALING }
```

---

## 12. Authentication & Roles

### Token Strategy

- **Access Token**: JWT, 15-minute expiry, in memory (not localStorage)
- **Refresh Token**: JWT, 30-day expiry, stored in **HttpOnly cookie**
- Refresh token rotation on every use
- Revocation via Redis blocklist

### OAuth Providers (NextAuth)

- Google OAuth
- Apple Sign In
- Facebook (optional)

### Role Matrix

| Feature | Customer | Technician | Manager | Admin | Super Admin |
|---|---|---|---|---|---|
| View own bookings | ✅ | ✅ | ✅ | ✅ | ✅ |
| Update booking status | ❌ | ✅ | ✅ | ✅ | ✅ |
| View all bookings | ❌ | ❌ | ✅ | ✅ | ✅ |
| Manage services | ❌ | ❌ | ❌ | ✅ | ✅ |
| View analytics | ❌ | ❌ | ✅ | ✅ | ✅ |
| Manage staff | ❌ | ❌ | ❌ | ✅ | ✅ |
| System settings | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 13. Notifications & Communications

### Email Flows (Resend + React Email)

| Template | Trigger |
|---|---|
| Welcome | After registration |
| Booking Confirmation | After booking paid |
| Booking Reminder | 24h before + 1h before |
| Booking Status Update | On each status change |
| Technician Assigned | When technician is assigned |
| Service Completed | On completion, with receipt |
| Review Request | 2h after completion |
| Loyalty Tier Upgrade | On tier change |
| Win-back Offer | 30+ days inactive |
| Password Reset | On forgot password |
| Subscription Renewal | 3 days before renewal |
| Refund Confirmation | On refund processed |

### SMS (Twilio)

- Booking confirmation with reference number
- Day-of reminder: "Your wash is today at 2PM"
- Technician en-route: "Your technician is 10 minutes away!"
- Service started + completed alerts

### Push Notifications (PWA)

- Enable in customer portal settings
- Mirrors SMS alerts but in-browser

### In-App Notification Center

- Bell icon in portal header with unread badge
- Notification feed with type icons
- Mark all as read
- Deep-link to relevant page from notification

---

## 14. Payments Integration

### Stripe Implementation

**One-time Payments**
- Stripe Payment Intents with 3D Secure support
- Apple Pay + Google Pay via Payment Request Button
- Save card for future bookings (Stripe payment method + customer)
- Partial deposit model: charge 20% at booking, remainder after service

**Subscriptions**
- Stripe Subscriptions with customer portal
- Plan tiers: Silver ($29/mo) · Gold ($49/mo) · Platinum ($89/mo)
- Prorated upgrades/downgrades
- Pause subscription (for travel, etc.)

**Stripe Webhooks**
- `payment_intent.succeeded` → mark booking as paid
- `payment_intent.payment_failed` → notify customer
- `invoice.payment_succeeded` → confirm subscription renewal
- `customer.subscription.deleted` → downgrade customer plan
- `charge.dispute.created` → alert admin

**Promo & Discount Flow**
1. Customer enters promo code at checkout
2. API validates code (active, not expired, not over limit, service restriction)
3. Discount applied to Stripe Payment Intent metadata
4. Code usage counter incremented on successful payment

---

## 15. Performance & SEO

### Core Web Vitals Targets

| Metric | Target |
|---|---|
| LCP (Largest Contentful Paint) | < 2.0s |
| FID / INP | < 100ms |
| CLS | < 0.05 |
| TTFB | < 200ms |
| Lighthouse Score | > 95 |

### Next.js Optimization

- `next/image` with priority on hero images, blur placeholders everywhere
- `next/font` for self-hosted fonts (zero layout shift)
- Streaming SSR for customer portal pages
- Aggressive `React.cache` + `unstable_cache` for service data
- Route prefetching on hover via custom hook
- Code splitting per route (no page bundle > 150kb)

### Image Strategy

- Hero images: WebP, served from CloudFront CDN
- Car photos: Compressed on upload via Sharp (Node.js)
- Responsive images: `srcset` with 4 breakpoints

### SEO

- `generateMetadata` per route with dynamic OG images
- Structured data (JSON-LD): LocalBusiness, Service, FAQPage, Review
- XML sitemap auto-generated
- `robots.txt` configured
- Canonical URLs enforced
- Blog/content section (optional) for local SEO

---

## 16. Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      CLOUDFLARE                          │
│         (DNS + DDoS protection + Edge Caching)           │
└─────────┬───────────────────────┬───────────────────────┘
          │                       │
          ▼                       ▼
┌─────────────────┐    ┌──────────────────────┐
│   VERCEL (web)  │    │   VERCEL (admin)      │
│  luxewash.com   │    │  admin.luxewash.com   │
│  Next.js 16     │    │  Next.js 16           │
└────────┬────────┘    └──────────┬────────────┘
         │                        │
         └────────────┬───────────┘
                      ▼
           ┌──────────────────────┐
           │  RAILWAY / RENDER    │
           │  Express.js API      │
           │  api.luxewash.com    │
           │  + BullMQ Workers    │
           │  + Socket.IO server  │
           └───┬──────────┬───────┘
               │          │
               ▼          ▼
    ┌──────────────┐  ┌───────────────┐
    │   SUPABASE   │  │  REDIS CLOUD  │
    │  PostgreSQL  │  │  (Upstash)    │
    └──────────────┘  └───────────────┘
               │
               ▼
    ┌──────────────────┐
    │    AWS S3 +      │
    │   CloudFront     │
    │  (Photos, Videos)│
    └──────────────────┘
```

### CI/CD Pipeline (GitHub Actions)

```yaml
On Pull Request:
  - Lint (ESLint + Prettier)
  - Type check (tsc --noEmit)
  - Unit tests (Vitest)
  - E2E tests (Playwright) — smoke suite only

On merge to main:
  - All above
  - Build web app → deploy to Vercel (preview)
  - Build admin app → deploy to Vercel (preview)
  - Build API → deploy to Railway staging

On release tag:
  - Deploy to production (all apps)
  - Run Prisma migrations
  - Notify team in Slack
```

---

## 17. Environment Variables

### Web App (`apps/web/.env`)

```env
# App
NEXT_PUBLIC_APP_URL=https://luxewash.com
NEXT_PUBLIC_API_URL=https://api.luxewash.com

# Auth
NEXTAUTH_URL=https://luxewash.com
NEXTAUTH_SECRET=

# OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Maps
NEXT_PUBLIC_MAPBOX_TOKEN=

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_SENTRY_DSN=
```

### API (`packages/api/.env`)

```env
# Database
DATABASE_URL=postgresql://...
REDIS_URL=redis://...

# JWT
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# AI
OPENAI_API_KEY=

# Communications
RESEND_API_KEY=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# Storage
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
AWS_CLOUDFRONT_URL=

# Weather
OPENWEATHER_API_KEY=

# App
API_PORT=3001
FRONTEND_URL=https://luxewash.com
```

---

## 18. Unique & Signature Features

These are the **unforgettable differentiators** that make this platform legendary:

### 🎬 Cinematic Page Transitions
Full-screen branded wipe (obsidian panel slides across, gold logo flashes, fades into new page) on every route change. Feels like a film cut.

### 🚗 3D Car Configurator Preview
When adding a car to the garage, a live 3D car model in the customer's chosen color renders on screen via Three.js. Not just a form — an experience.

### 🌧️ Weather-Aware Booking
If rain is forecast within 24h of the selected booking time, the system shows a soft warning: "Light rain expected — we recommend interior-only or rescheduling." Powered by OpenWeatherMap.

### 📸 Pre & Post Photo Proof
Technician uploads before + after photos via mobile app. Customer receives a photo gallery in their portal and email. Builds trust, reduces disputes.

### 🏆 Loyalty Passport
A beautifully designed "Car Passport" — like a real passport — that stamps each completed service. Visual, collectible, gamified. Customers share it.

### ⚡ One-Click Rebook
On the customer dashboard: a single "Rebook Last Service" button that prefills the entire booking form from the last appointment. Zero friction.

### 🤖 "Ask LuxeBot" Floating Chat
Persistent AI chat bubble that knows the customer's history, can recommend, book, reschedule, and answer any question. Available 24/7.

### 🎯 Live Booking Map (for Mobile Wash)
After booking, a live map shows the technician's location moving toward the customer in real-time (like Uber). Built with Mapbox + Socket.IO.

### 🌐 Multilingual AI Support
The AI concierge auto-detects the user's language and responds in kind. No language toggle needed.

### 🎉 Surprise & Delight
Every 10th completed booking triggers a special "You're a LuxeWash Legend" animation on the confirmation screen — confetti, badge unlock, and a free add-on coupon.

### 📊 Customer Carbon Score
Display an eco-metric: "Your 12 washes with us used 85% less water than a traditional hose wash. You've saved ~800 liters." Makes customers feel good.

### 🔔 Smart Push Notification Timing
Push notifications for reminders are sent at the time most likely to be seen, based on the customer's historical open times (learned over sessions).

---

## 19. Development Phases & Milestones

### Phase 1 — Foundation (Weeks 1–3)
- [ ] Monorepo setup (Turborepo + pnpm)
- [ ] Design system tokens + typography + color palette
- [ ] Express API skeleton + Prisma schema + migrations
- [ ] NextAuth authentication (web + admin)
- [ ] Basic CRUD: users, cars, services

### Phase 2 — Public Website Core (Weeks 4–6)
- [ ] Home page with hero, services, stats, testimonials
- [ ] Services page
- [ ] Pricing page
- [ ] About + Contact pages
- [ ] GSAP scroll animations + custom cursor
- [ ] Lenis smooth scroll integration

### Phase 3 — Booking System (Weeks 7–9)
- [ ] Multi-step booking wizard
- [ ] Slot availability engine (Redis-based)
- [ ] Stripe payment integration
- [ ] Booking confirmation emails
- [ ] Customer portal: dashboard + bookings

### Phase 4 — Admin Panel (Weeks 10–12)
- [ ] Admin dashboard with charts
- [ ] Booking management (list + calendar + detail)
- [ ] Customer management
- [ ] Service + pricing management
- [ ] Technician management

### Phase 5 — AI Features (Weeks 13–14)
- [ ] LuxeBot chat concierge
- [ ] Car photo analysis
- [ ] Smart scheduling suggestions
- [ ] Review sentiment analysis

### Phase 6 — Advanced Features (Weeks 15–16)
- [ ] Three.js hero car scene
- [ ] Real-time technician tracking map
- [ ] Loyalty gamification + passport
- [ ] Push notifications
- [ ] BullMQ background jobs

### Phase 7 — Polish & Launch (Weeks 17–18)
- [ ] Full animation pass (all pages)
- [ ] Performance audit + Core Web Vitals optimization
- [ ] E2E testing (Playwright)
- [ ] Security audit
- [ ] Production deployment
- [ ] Monitoring setup (Sentry, PostHog)

---

## 20. Inspiration & References

### Design Inspiration
- [Ferrari.com](https://ferrari.com) — dark luxury automotive aesthetic
- [Awwwards SOTD winners](https://awwwards.com) — scroll animation benchmark
- [Linear.app](https://linear.app) — precision dark UI
- [Stripe.com](https://stripe.com) — gradient + animation excellence
- [Vercel.com](https://vercel.com) — obsidian dark with precise typography

### Technical References
- [GSAP ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Lenis Smooth Scroll](https://lenis.darkroom.engineering/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Next.js 16 Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [BullMQ Docs](https://docs.bullmq.io)

---

## Quick Start

```bash
# Clone and setup
git clone https://github.com/your-org/luxewash
cd luxewash
pnpm install

# Environment setup
cp apps/web/.env.example apps/web/.env.local
cp packages/api/.env.example packages/api/.env

# Database
cd packages/api
pnpm prisma migrate dev
pnpm prisma db seed

# Development (all apps in parallel)
cd ../..
pnpm dev

# Web:   http://localhost:3000
# Admin: http://localhost:3001
# API:   http://localhost:4000
# API Docs: http://localhost:4000/docs
```

---

*Built to win Awwwards. Built to convert. Built to scale.*

**LuxeWash** — Where every car deserves a cinematic moment.