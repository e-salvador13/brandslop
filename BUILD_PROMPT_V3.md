# BrandRef V3 — Complete Rebuild Spec

## The Product

BrandRef provides AI-ready brand design systems. Users pick a brand → get a deeply researched, structured package (colors, typography, spacing, tone, components, anti-patterns, prompt blocks) → drop it into any AI tool → get on-brand output instantly.

**Value prop:** "Skip the 15-20 hours of research. Here's the cheat code for making AI output look like it came from Brand X's design team."

**Strategy:** The 65 curated brands are the demo/proof. The future paid product is custom brand system generation. For now, build the demo layer perfectly.

## CRITICAL: Rename Everything

- Project name: **BrandRef** (not BrandSlop)
- Update package.json name field
- Update all UI text, page titles, meta tags
- Update layout.tsx title/description

## Design System for BrandRef Itself

BrandRef should practice what it preaches — the site itself should be beautifully designed.

- Background: #000000 (true black, like Apple Pro pages)
- Surface: #0A0A0A cards, #111111 elevated
- Text primary: #F5F5F7
- Text secondary: #86868B
- Text tertiary: #6E6E73
- Accent: #0071E3 (Apple blue — we're demoing Apple as flagship)
- Font: Inter via next/font/google (400, 500, 600 weights)
- Border radius: 20px cards, 980px buttons (pill), 12px inputs
- Shadows: minimal, 0 4px 16px rgba(0,0,0,0.3) for cards
- Max width: 1080px content, 720px text blocks
- Section spacing: 120px between major sections
- Animation: fade-up on scroll (opacity 0→1, translateY 20px→0, 600ms ease-out)

## Pages to Build

### 1. Landing Page (`app/page.tsx`) — client component

**Hero Section:**
- Eyebrow: "AI-READY BRAND DESIGN SYSTEMS" (12px, uppercase, 0.2em tracking, #6E6E73)
- Headline: "Make AI output\nlook on-brand." (64-80px, Semibold, tight tracking)
- Subheadline: "Deeply researched design systems you can drop into Claude, GPT, or any AI tool. Typography, colors, spacing, voice, anti-patterns — everything your AI needs to nail the brand." (18px, #86868B, max-w 640px)
- Two CTAs: "Explore Apple system →" (primary, white bg, black text, pill) and "View all brands" (secondary, border only)

**Before/After Section:**
This is THE key selling point. Show two AI outputs side by side:

LEFT panel — "Without BrandRef":
- A generated landing page section that looks generic
- Arial font, generic blue (#0066cc), boxy layout, cluttered
- Headline: "We're Excited to Introduce Our Revolutionary New Product!"
- Body: Long paragraph, corporate speak, exclamation marks
- Button: "Sign Up Now! Don't Miss Out!"
- Generic stock photo placeholder
- Label: "Generic AI output"

RIGHT panel — "With BrandRef (Apple)":
- The SAME content but transformed with Apple's system
- SF Pro fallback font, #0071E3 blue, generous whitespace, Apple layout
- Headline: "Designed to be different."
- Body: Short fragments. One sentence paragraphs. Confident. Minimal.
- Button: pill shape "Learn more" in Apple blue
- Clean product image placeholder
- Label: "BrandRef-powered output"

Use the draggable slider (vertical line with drag handle, clip-path based).
Both panels should be STATIC HTML mockups, not AI-generated.
Make the contrast dramatic — the left should look like every bad AI landing page, the right should look like apple.com

**How It Works (3 steps):**
1. "Choose a brand" — Pick from 65+ curated design systems
2. "Copy the prompt" — Get a token-optimized AI prompt block
3. "Get on-brand output" — Your AI produces polished, consistent results

**What's Inside Each System (feature grid):**
Show 6 cards in a 2x3 or 3x2 grid:
- Voice & Copy Rules — "Quantitative analysis: avg headline 4.2 words, sentence length targets, vocabulary lists"
- Typography Scale — "Exact sizes, weights, tracking, line-heights for every element"
- Color Architecture — "Not just hex codes — HOW the brand uses color, dark/light logic, the one-color rule"
- Spacing & Layout — "Whitespace ratios, section spacing, grid systems, image-to-text relationships"
- Anti-Pattern Library — "What NOT to do. Common AI mistakes with corrections."
- AI Prompt Blocks — "Copy-paste prompts at 5 token tiers: 200, 800, 2500, 600, 400"

Each card: dark bg (#0A0A0A), subtle border (#1A1A1A), icon/emoji top, headline, 1-2 line description.

**Flagship Demo Section:**
Preview of the Apple brand system. Show a condensed version:
- "Apple Design System — Flagship Edition"
- Show 3-4 stats: "13 sections · 5,000+ words · 15-20 hours of research"
- Show a preview snippet of the Voice & Copy section (the quantitative analysis table)
- CTA: "Explore the full Apple system →" linking to /brands/apple

**Social Proof / Trust (placeholder):**
- "Used by designers and developers to make AI output indistinguishable from real brand work."
- Three placeholder testimonial cards (can be filled later)

**CTA Footer:**
- "Start building on-brand."
- "Explore Apple system" (primary) and "View all 65+ brands" (secondary)

**Footer:**
- Minimal. Links: Home, Brands, About (placeholder)
- "© 2026 BrandRef" 
- Small text: "Brand names and trademarks belong to their respective owners. BrandRef provides design system analysis, not affiliated with or endorsed by any listed brand."

### 2. Brand Explorer — Apple Flagship (`app/brands/[id]/page.tsx`)

This page renders the full 13-section brand system for any brand. But the APPLE brand should be the showcase.

**Hero:**
- Full-width, black background
- Brand name large (Apple: 72px)
- Subtitle: "Complete AI-Ready Design System"
- Stats row: "13 sections · 5,000+ words · Updated March 2026"
- Confidence badge: "High confidence — sourced from HIG, product pages, marketing analysis"

**Sidebar navigation (sticky on desktop):**
List all 13 sections as a scrollspy nav on the left (desktop) or a horizontal scroll nav (mobile):
1. Brand DNA Summary
2. Voice & Copy System
3. Typography System
4. Color Architecture
5. Spacing & Layout
6. Photography & Image Direction
7. Motion & Animation
8. Component Patterns
9. Information Architecture
10. Brand Don'ts
11. Context Variations
12. AI Prompt Blocks
13. Scoring Rubric

**Content area:**
Each section renders with:
- Section number + title
- Content rendered as formatted text, tables, code blocks
- Tables should use clean styling (no vertical borders, alternating rows)
- Code blocks with syntax highlighting (dark bg, monospace)
- Color swatches rendered as actual colored divs with hex labels

**Free vs Paid indicators:**
- Sections 1-3: fully visible (free tier demo)
- Sections 4-13: show first 3-4 lines, then blur/fade with "Unlock full system — $9/mo" overlay
- Add a `DEV_MODE = true` flag that bypasses the paywall for development

**Copy buttons:**
- "Copy as AI Prompt" button for each prompt block in Section 12
- "Copy Full System" button at the top (copies entire brand JSON)
- "Download PDF" button (placeholder, disabled, "Coming soon")

**DATA SOURCE:** Create a new file `data/apple-flagship.ts` that exports the full Apple brand system as a structured TypeScript object with all 13 sections. Use the content from the user's message (the entire Part 2). Structure it as:

```typescript
export const appleFlagship = {
  id: 'apple',
  name: 'Apple',
  version: '1.0',
  edition: 'Flagship',
  lastResearched: 'March 2026',
  confidenceLevel: 'High',
  estimatedResearchTime: '15-20 hours',
  sections: [
    {
      id: 'brand-dna',
      number: 1,
      title: 'Brand DNA Summary',
      content: '...', // markdown content
      isFree: true,
    },
    // ... all 13 sections
  ]
};
```

The `content` field for each section should contain the FULL markdown text from the user's dump above (Part 2 sections 1-13). Copy it verbatim — this is the product.

### 3. All Brands Catalog (`app/catalog/page.tsx`)

Keep the existing catalog (moved from original page.tsx). Update styling to match new dark theme. Add:
- Back link to home
- Search + category filter (keep existing)
- Each brand card shows: name, category, primary color swatch, number of colors
- Click → goes to /brands/[id]
- For non-Apple brands, the brand explorer shows data from brands.json (less detailed than Apple flagship)

### 4. Layout (`app/layout.tsx`)

- Update title: "BrandRef — AI-Ready Brand Design Systems"
- Update description: "Deeply researched brand design systems for AI. Drop into Claude, GPT, or any tool for instant on-brand output."
- Add Inter font via next/font/google
- Minimal nav bar at top: "BrandRef" logo text (left), "Brands" + "About" links (right)
- Nav: fixed, backdrop-blur, 48px height, max-w 1080px centered

### 5. Remove Transform Page (for now)

The transform/upload flow is a future feature. Remove `app/transform/` entirely. The current product is the brand systems themselves — the value is in the research and prompt blocks, not in an AI transformation tool.

Remove also: `app/api/transform/route.ts`, `app/api/ollama/route.ts`

The user copies the prompt blocks and uses them in their own AI tool.

## File Structure

```
app/
  page.tsx              ← Landing page (new)
  layout.tsx            ← Updated layout with nav
  globals.css           ← Updated styles
  brands/
    [id]/
      page.tsx          ← Brand explorer (13 sections for Apple, basic for others)
  catalog/
    page.tsx            ← All brands catalog (existing, restyled)
data/
  brands.json           ← Keep existing (65 brands)
  apple-flagship.ts     ← NEW: Full 13-section Apple system
```

## Key Technical Notes

- This is a Next.js 14 app with TypeScript and Tailwind
- Use `'use client'` for interactive components (slider, scrollspy, copy buttons)
- Server components where possible (catalog can be server-rendered)
- No new npm dependencies needed
- The before/after slider needs client-side mouse/touch event handlers
- Scrollspy for brand explorer sidebar: use IntersectionObserver
- Copy to clipboard: navigator.clipboard.writeText()
- Code blocks: use a simple `<pre><code>` with Tailwind styling, no syntax highlighting library needed

## What NOT to Build

- No transform/upload feature (removed for now)
- No payment/Stripe integration
- No user accounts
- No Ollama integration (removed)
- No PDF export (placeholder button only)
- No "About" page content (just the nav link, can be a placeholder)

## Content for apple-flagship.ts

The ENTIRE Part 2 from the user's message should be stored in this file. Every section, every table, every code block, every anti-pattern. This IS the product. Do not truncate or summarize.

Here is the exact content for each section (copy from the user's message above — sections 1 through 13 of the Apple Brand Design System). Store each section's content as a markdown string.

When finished, the app should:
1. Load at / with a polished landing page
2. The before/after slider should be dramatic and convincing  
3. Clicking "Explore Apple system" goes to /brands/apple which shows all 13 sections
4. The catalog at /catalog shows all 65 brands
5. Non-Apple brands show basic info from brands.json
6. Everything looks premium, dark, Apple-level polish
