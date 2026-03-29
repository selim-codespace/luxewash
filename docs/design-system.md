# 🎨 Design System Specification

> Complete design token definitions, component contracts, and usage guidelines.

---

## 1. Color System

### Brand Palette

```css
:root {
  /* Core Backgrounds */
  --color-void:        #050507;      /* Deepest background — near-black with blue undertone */
  --color-obsidian:    #0D0D12;      /* Card surfaces, modals */
  --color-graphite:    #1A1A24;      /* Elevated surfaces, hover states */
  --color-smoke:       #2E2E3E;      /* Borders, dividers, subtle separators */

  /* Chrome Gold Accent */
  --color-gold:        #C9A84C;      /* Primary accent — CTAs, active states */
  --color-gold-muted:  #8A6E34;      /* Secondary accent — subtle emphasis */
  --color-gold-glow:   rgba(201, 168, 76, 0.15);  /* Background glow halos */
  --color-gold-text:   #D4B65C;      /* Gold for text (lighter for readability) */

  /* Text Hierarchy */
  --color-text-primary:    #F5F5F0;  /* Warm white — headings, primary content */
  --color-text-secondary:  #A0A0B0;  /* Silver — body text, descriptions */
  --color-text-tertiary:   #5A5A70;  /* Fog — placeholders, captions, disabled */
  --color-text-inverse:    #050507;  /* For text on gold backgrounds */

  /* Semantic Colors */
  --color-success:     #2ECC71;
  --color-success-bg:  rgba(46, 204, 113, 0.1);
  --color-warning:     #F39C12;
  --color-warning-bg:  rgba(243, 156, 18, 0.1);
  --color-error:       #E74C3C;
  --color-error-bg:    rgba(231, 76, 60, 0.1);
  --color-info:        #3498DB;
  --color-info-bg:     rgba(52, 152, 219, 0.1);
}
```

### Contrast Ratios (WCAG AA Compliance)

| Foreground | Background | Ratio | Pass? |
|---|---|---|---|
| `--color-text-primary` (#F5F5F0) | `--color-void` (#050507) | 18.7:1 | ✅ AAA |
| `--color-text-secondary` (#A0A0B0) | `--color-void` (#050507) | 8.2:1 | ✅ AAA |
| `--color-text-tertiary` (#5A5A70) | `--color-void` (#050507) | 3.6:1 | ⚠️ AA Large |
| `--color-gold` (#C9A84C) | `--color-void` (#050507) | 7.8:1 | ✅ AA |
| `--color-gold` (#C9A84C) | `--color-obsidian` (#0D0D12) | 7.2:1 | ✅ AA |
| `--color-text-primary` | `--color-gold` (button text) | 2.4:1 | ❌ Fail |

> [!CAUTION]
> **Gold buttons with white text fail contrast.** Use `--color-text-inverse` (#050507, dark text) on gold backgrounds instead.

---

## 2. Typography Scale

### Font Stack
```css
:root {
  --font-display:  'Playfair Display', Georgia, 'Times New Roman', serif;
  --font-body:     'DM Sans', system-ui, -apple-system, sans-serif;
  --font-mono:     'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
}
```

### Type Scale (Fluid, clamp-based)

| Token | Size | Line Height | Weight | Font | Use |
|---|---|---|---|---|---|
| `--text-hero` | `clamp(3rem, 8vw, 7rem)` | 0.95 | 300 | Display | Home hero headline |
| `--text-h1` | `clamp(2.5rem, 5vw, 4.5rem)` | 1.05 | 300 | Display | Page titles |
| `--text-h2` | `clamp(2rem, 3.5vw, 3rem)` | 1.1 | 300 | Display | Section headings |
| `--text-h3` | `clamp(1.5rem, 2.5vw, 2rem)` | 1.2 | 400 | Body | Subsection headings |
| `--text-h4` | `1.25rem` | 1.3 | 500 | Body | Card titles |
| `--text-body-lg` | `1.125rem` | 1.6 | 400 | Body | Feature text |
| `--text-body` | `1rem` | 1.6 | 400 | Body | Default body text |
| `--text-body-sm` | `0.875rem` | 1.5 | 400 | Body | Secondary info |
| `--text-caption` | `0.75rem` | 1.4 | 400 | Body | Captions, labels |
| `--text-overline` | `0.75rem` | 1.2 | 600 | Body | Eyebrow text (uppercase, tracked) |
| `--text-stat` | `clamp(2.5rem, 5vw, 4rem)` | 1.0 | 400 | Mono | Stats, counters |

### Letter Spacing
```css
.overline   { letter-spacing: 0.2em; text-transform: uppercase; }
.headline   { letter-spacing: -0.02em; }
.body       { letter-spacing: 0; }
.stat       { letter-spacing: -0.03em; }
```

---

## 3. Spacing Scale

Based on an **8px base unit** with a geometric progression:

```css
:root {
  --space-1:   0.25rem;   /*  4px  — Hairline gaps */
  --space-2:   0.5rem;    /*  8px  — Icon gaps, inline spacing */
  --space-3:   0.75rem;   /* 12px  — Tight component padding */
  --space-4:   1rem;      /* 16px  — Default padding */
  --space-5:   1.5rem;    /* 24px  — Card padding */
  --space-6:   2rem;      /* 32px  — Section sub-spacing */
  --space-7:   3rem;      /* 48px  — Component separation */
  --space-8:   4rem;      /* 64px  — Section margins */
  --space-9:   6rem;      /* 96px  — Large section gaps */
  --space-10:  8rem;      /* 128px — Hero spacing */
  --space-11:  12rem;     /* 192px — Mega spacing */
}
```

---

## 4. Elevation & Surfaces

```css
:root {
  /* Surface Layers */
  --surface-0:   var(--color-void);        /* Page background */
  --surface-1:   var(--color-obsidian);    /* Cards, modals */
  --surface-2:   var(--color-graphite);    /* Elevated cards, hover */
  --surface-3:   var(--color-smoke);       /* Inputs, dropdowns */

  /* Borders */
  --border-subtle:   1px solid rgba(255, 255, 255, 0.06);
  --border-default:  1px solid rgba(255, 255, 255, 0.1);
  --border-strong:   1px solid rgba(255, 255, 255, 0.15);
  --border-gold:     1px solid rgba(201, 168, 76, 0.3);
  --border-focus:    2px solid var(--color-gold);

  /* Shadows (for elevated elements) */
  --shadow-sm:   0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-md:   0 8px 24px rgba(0, 0, 0, 0.4);
  --shadow-lg:   0 16px 48px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 40px rgba(201, 168, 76, 0.2);

  /* Radius */
  --radius-sm:   6px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --radius-full: 9999px;
}
```

---

## 5. Motion Tokens

```css
:root {
  /* Durations */
  --duration-instant:   100ms;
  --duration-fast:      200ms;
  --duration-normal:    300ms;
  --duration-slow:      500ms;
  --duration-cinematic: 1000ms;

  /* Easing */
  --ease-default:    cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-in:         cubic-bezier(0.55, 0.055, 0.675, 0.19);
  --ease-out:        cubic-bezier(0.215, 0.61, 0.355, 1);
  --ease-in-out:     cubic-bezier(0.645, 0.045, 0.355, 1);
  --ease-snappy:     cubic-bezier(0.77, 0, 0.175, 1);
  --ease-cinematic:  cubic-bezier(0.16, 1, 0.3, 1);  /* Signature ease */
  --ease-bounce:     cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Reduced motion override */
@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-instant:   0ms;
    --duration-fast:      0ms;
    --duration-normal:    0ms;
    --duration-slow:      0ms;
    --duration-cinematic: 0ms;
  }
}
```

---

## 6. Breakpoints

```css
/* Mobile-first breakpoints */
--bp-sm:  640px;    /* Large phones (landscape) */
--bp-md:  768px;    /* Tablets */
--bp-lg:  1024px;   /* Small desktops */
--bp-xl:  1280px;   /* Standard desktops */
--bp-2xl: 1536px;   /* Wide screens */
--bp-3xl: 1920px;   /* Ultra-wide / showroom displays */
```

### Container Widths
```css
.container      { max-width: 1200px; margin-inline: auto; padding-inline: var(--space-5); }
.container-sm   { max-width: 720px; }
.container-lg   { max-width: 1440px; }
.container-full { max-width: 100%; }
```

---

## 7. Component Contracts

### Button Variants

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| `primary` | `--color-gold` | `--color-text-inverse` | none | Main CTAs |
| `secondary` | transparent | `--color-gold` | `--border-gold` | Secondary actions |
| `ghost` | transparent | `--color-text-primary` | none | Tertiary actions |
| `danger` | `--color-error` | `#fff` | none | Destructive actions |

### Button Sizes

| Size | Height | Padding | Font Size |
|---|---|---|---|
| `sm` | 36px | 12px 16px | 0.8125rem |
| `md` | 44px | 12px 24px | 0.875rem |
| `lg` | 52px | 16px 32px | 1rem |
| `xl` | 60px | 16px 40px | 1.125rem |

### Input States

| State | Border | Background | Label Color |
|---|---|---|---|
| Default | `--border-default` | `--surface-3` | `--color-text-tertiary` |
| Focus | `--border-focus` | `--surface-3` | `--color-gold` |
| Error | `1px solid var(--color-error)` | `--color-error-bg` | `--color-error` |
| Disabled | `--border-subtle` | `--surface-1` | `--color-text-tertiary` (0.5 opacity) |

---

## 8. Z-Index Scale

```css
:root {
  --z-base:         0;
  --z-dropdown:     100;
  --z-sticky:       200;
  --z-modal-backdrop: 300;
  --z-modal:        400;
  --z-toast:        500;
  --z-cursor:       600;
  --z-page-transition: 700;
  --z-grain:        9999;
}
```

---

## 9. Icon System

- Use **Lucide React** icons — consistent, tree-shakeable, MIT licensed
- Icon sizes: `16px`, `20px`, `24px`, `32px`
- Default stroke width: `1.5px`
- Color: inherit from parent `color` property
- Custom icons (car types, loyalty badges): SVG sprites, exported as React components
