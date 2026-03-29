# 🧪 Testing Strategy

> What to test, how to test it, and quality gates before any merge.

---

## Test Pyramid

```
          ╱  E2E  (Playwright)  ╲       ← Critical user flows only (5–10 tests)
         ╱                       ╲
        ╱  Integration (Vitest)   ╲     ← API routes, server actions, DB queries
       ╱                           ╲
      ╱  Component (Vitest + RTL)   ╲   ← Interactive components, forms
     ╱                               ╲
    ╱   Unit (Vitest)                  ╲ ← Pure functions, utils, validators
   ╱─────────────────────────────────────╲
```

---

## 1. Unit Tests (Vitest)

**What:** Pure functions, Zod schemas, formatters, price calculators, auth helpers.

```bash
pnpm vitest run --coverage
```

**Targets:**
- `lib/validations.ts` — all Zod schemas
- `lib/utils.ts` — formatters, price calculation
- `lib/ai.ts` — prompt builders (mock OpenAI)
- Zustand stores — state transitions
- Coverage target: **≥ 80%** for `lib/` directory

---

## 2. Component Tests (Vitest + React Testing Library)

**What:** Interactive UI components in isolation.

**Key components to test:**
- Booking wizard step transitions
- Form validation error states
- Modal open/close behavior
- Toast notification appearance
- Pricing toggle (one-time vs subscription)
- Before/after slider interaction

> [!NOTE]
> Do NOT test GSAP/Framer animations in component tests. They require a browser. Test the *logic* around animations (did the component render, did state change).

---

## 3. Integration Tests (Vitest)

**What:** Next.js Route Handlers + Server Actions + Prisma queries.

**Key flows to test:**
- `POST /api/bookings` — creates booking, locks slot in Redis, creates payment intent
- `POST /api/ai/recommend` — returns valid service recommendation
- Server Action: `createBooking()` — validates input, charges Stripe, sends confirmation
- Server Action: `cancelBooking()` — respects cancellation policy window

Use **Prisma test client** with a test database (`DATABASE_URL_TEST`).

---

## 4. E2E Tests (Playwright)

**What:** Critical user journeys in a real browser.

```bash
pnpm playwright test
```

**Critical flows (must-have):**
1. **Home page loads** — hero renders, scroll animations trigger, no console errors
2. **Complete booking flow** — select service → add car → pick slot → pay → confirmation
3. **Auth flow** — register → login → access portal → logout
4. **Admin dashboard** — login as admin → see metrics → manage a booking
5. **Mobile responsive** — home page + booking flow at 375px width

**Nice-to-have flows:**
6. Customer applies promo code at checkout
7. Customer adds car to garage
8. Admin creates a manual booking

---

## 5. Visual Regression (Playwright Screenshots)

For an Awwwards-level site, **pixel consistency matters**.

```ts
// tests/visual/home.spec.ts
test('home hero matches snapshot', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await expect(page).toHaveScreenshot('home-hero.png', {
    maxDiffPixelRatio: 0.01,
  })
})
```

**Pages to snapshot:** Home hero, services cards, pricing section, booking wizard step 1, customer dashboard, admin dashboard.

---

## 6. Performance Tests

Run on every PR:
```bash
# Lighthouse CI
pnpm dlx @lhci/cli autorun --config=lighthouserc.json
```

Fail thresholds: LCP > 3.0s, CLS > 0.1, Performance < 85.

---

## 7. CI Pipeline

```yaml
# On every PR:
1. pnpm lint          # ESLint + Prettier
2. pnpm typecheck     # tsc --noEmit
3. pnpm test          # Vitest (unit + component + integration)
4. pnpm test:e2e      # Playwright (smoke suite)
5. pnpm build         # Verify production build succeeds

# On merge to main:
6. Visual regression comparison
7. Lighthouse CI audit
8. Deploy to preview
```
