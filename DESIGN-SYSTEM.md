# BrandSlop Design System

Based on Apple's design language. This is the reference for all UI work.

---

## Colors

```css
:root {
  /* Light Mode */
  --color-primary: #000000;
  --color-primary-inverse: #FFFFFF;
  --color-interactive: #0071E3;
  --color-interactive-hover: #0077ED;
  
  --color-gray-1: #F5F5F7;
  --color-gray-2: #86868B;
  --color-gray-3: #1D1D1F;
  
  /* Dark Mode */
  --color-dark-bg: #000000;
  --color-dark-surface: #1C1C1E;
  --color-dark-secondary: #2C2C2E;
  --color-dark-tertiary: #3A3A3C;
  --color-dark-text-primary: #F5F5F7;
  --color-dark-text-secondary: #86868B;
}
```

**Rules:**
- Black/white foundation
- Blue (#0071E3) ONLY for interactive elements — never decorative
- Product images provide color — UI stays neutral
- Alternating light (#F5F5F7) and dark (#000) sections

---

## Typography

**Fonts:** SF Pro Display (headings), SF Pro Text (body)
**Fallback:** -apple-system, BlinkMacSystemFont, sans-serif

| Element | Size | Line Height | Tracking |
|---------|------|-------------|----------|
| Hero | 96px | 1.0 | −0.003em |
| H1 | 64px | 1.05 | −0.002em |
| H2 | 48px | 1.08 | −0.002em |
| H3 | 28px | 1.14 | — |
| Body | 17px | 1.47 | — |
| Caption | 12px | 1.33 | — |

---

## Spacing

- **Base unit:** 8px
- **Section padding:** 100px desktop, 60px mobile
- **Component gaps:** 16-24px
- **Content max-width:** 980px (text), full-bleed for product shots
- **Mobile margins:** 24px

When in doubt, add more whitespace.

---

## Components

### Buttons
- Shape: Pill (border-radius: 980px)
- Height: 44px minimum
- Padding: 16px horizontal
- Primary: Blue bg, white text
- Secondary: Transparent, blue text

### Cards
- Minimal borders
- Shadow: `0 2px 8px rgba(0,0,0,0.04)`
- Clean, no visual noise

### Navigation
- Horizontal nav
- Backdrop blur: `blur(20px) saturate(180%)`
- Background: `rgba(255,255,255,0.7)`
- No hamburger on desktop

---

## Elevation

| Level | Shadow | Use |
|-------|--------|-----|
| 0 | none | Flat content |
| 1 | `0 2px 8px rgba(0,0,0,0.04)` | Cards |
| 2 | `0 4px 16px rgba(0,0,0,0.08)` | Dropdowns, popovers |
| 3 | `0 12px 40px rgba(0,0,0,0.12)` | Modals |

---

## Motion

- **Easing:** `cubic-bezier(0.25, 0.1, 0.25, 1)`
- **Page transitions:** 300-500ms
- **Micro-interactions:** 200ms
- **Style:** Smooth and elegant, never bouncy
- Scroll-triggered reveals with subtle parallax

---

## Interactive States

| State | Treatment |
|-------|-----------|
| Hover | Subtle color shift (blue → darker blue), no scale |
| Focus | Blue ring (3px, offset 2px) |
| Active | Slight darken |
| Disabled | 50% opacity |
| Links | No underline default, underline on hover |

---

## Responsive Breakpoints

| Breakpoint | Width | Notes |
|------------|-------|-------|
| Large | >1440px | Full hero, 980px content centered |
| Desktop | 1024-1440px | Scaled proportionally, same layout |
| Tablet | 768-1024px | Stacked layouts, 60px padding |
| Mobile | <768px | Full-width, 24px margins, hamburger nav |

---

## Copy Voice

- Minimal, declarative
- No exclamation points
- Focus on benefit, not specs
- Product names are proper nouns

---

## Design Principles

1. Remove until you can't
2. Product is the hero, UI disappears
3. Precision in every pixel
4. Consistency across platforms
5. Accessibility non-negotiable

---

## Mood

Minimal • Premium • Clean • Sophisticated • Simple
