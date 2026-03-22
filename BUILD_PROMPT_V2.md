# BrandSlop V2 — Product Build Spec

## Philosophy
Steve Jobs: less is more. The landing page should explain the product in 10 seconds. The upload flow should feel inevitable. No clutter.

## Overview
BrandSlop transforms any uploaded content into a brand-perfect version. Upload a file → pick a brand → AI generates a branded version using the brand's complete design system.

## Current State
The app is a Next.js 14 brand catalog browser at `app/page.tsx`. Brand data lives in `data/brands.json` (65+ brands with colors, typography, design principles, spacing, etc). Keep the existing catalog as-is but move it to `/catalog` route.

## New Pages

### 1. Landing Page (`app/page.tsx` — replace current home)

A clean, Jobs-style landing page. Dark background (#0A0A0A). Minimal.

**Structure:**

```
[Hero Section]
  Headline: "Your brand. Every pixel."
  Subheadline: "Upload anything. Pick a brand. Get a perfectly branded version in seconds."
  CTA Button: "Try it free →" (links to /transform)

[Before/After Section]
  Side-by-side comparison:
  Left: A generic, unstyled landing page mockup (gray, Arial, ugly)
  Right: The same content transformed with Apple's brand system (SF Pro, Apple blue, clean spacing)
  Label: "Without BrandSlop" vs "With BrandSlop (Apple)"

[How It Works — 3 Steps]
  1. Upload your content (PDF, PPTX, text, image)
  2. Choose a brand design system
  3. Get a perfectly branded version

[Featured Brands Row]
  Show 6 brand cards in a horizontal row: Apple, Fidelity, Cloudflare, OpenAI, X, PetScreening
  Each card: brand name + primary color swatch + category
  Clicking a card goes to /brands/[id] (brand explorer)

[CTA Footer]
  "Start transforming" button → /transform
  "Explore all 65+ brands" → /catalog
```

**Design:**
- Background: #0A0A0A
- Text: #F5F5F5 (primary), #888 (secondary)
- Accent: gradient from #6366F1 to #EC4899 (indigo to pink) for CTAs
- Font: Inter 400/600 (already available via Next.js)
- Max width: 1200px centered
- Generous whitespace (120px+ between sections)
- No navigation bar on landing. Just the content.
- Mobile responsive

### 2. Transform Page (`app/transform/page.tsx`)

The core product page. Three-step flow.

**Step 1: Upload**
- Large drag-and-drop zone (dashed border, centered icon)
- Accepts: PDF, PPTX, TXT, PNG, JPG, MD
- On drop/select: show file name, size, preview thumbnail if image
- "Or paste text" — expandable textarea alternative
- Below: "Supported formats: PDF, PowerPoint, Text, Images, Markdown"

**Step 2: Pick a Brand**
- Grid of 6 featured brand cards: Apple, Fidelity, Cloudflare, OpenAI, X, PetScreening
- Each card shows: brand name, primary color, 3 color swatches, font name
- Selected card has a glowing border matching the brand's primary color
- "Browse all brands →" link to /catalog

**Step 3: Transform**
- "Transform" button (gradient CTA, full width)
- On click: loading animation ("Applying [Brand] design system...")
- When done: shows the result panel

**Result Panel:**
- Side-by-side: Original (left) vs Branded (right)
- The branded version is a rendered HTML preview showing the uploaded content restyled with the brand's colors, typography, spacing, and principles
- "Copy HTML" button
- "Download" button (placeholder/disabled with "Coming soon" tooltip)
- "Try another brand" button to go back to step 2

**AI Integration:**
- Use Ollama at `/ollama/api/chat` (proxied through Next.js API route to avoid CORS)
- Model: `llama3`
- The prompt sends: the uploaded text content + the full brand JSON (colors, typography, spacing, principles, voice) and asks to generate an HTML page/section using that brand's design system
- For images: just display them with a branded frame/card
- For text/markdown: full HTML generation with brand styling

**Create a Next.js API route at `app/api/transform/route.ts`:**
- POST handler
- Receives: `{ content: string, brandId: string }`
- Loads brand data from `data/brands.json`
- Calls Ollama with brand context + content
- Returns: `{ html: string, brandName: string }`

**Paywall Placeholder:**
- After showing the preview, overlay a subtle blur with text: "Unlock full access — $9/mo" and a disabled "Subscribe" button
- This is just a placeholder — the preview IS visible during development (add a `DEV_MODE = true` constant that skips the blur)

### 3. Brand Explorer (`app/brands/[id]/page.tsx`)

Deep-dive into a single brand's design system. This is the "behind the scenes" view.

**Layout:**
- Full-width hero with brand's primary color as background
- Brand name (large, white text on color)
- Category badge

**Sections (scrollable):**

1. **Color Palette** — All colors with hex, name, usage notes. Show as large swatches. Click to copy.
2. **Typography** — Font names, weights, scale (if available). Show sample text rendered in the brand's fonts where possible.
3. **Design Principles** — Listed as cards with icon + description
4. **Spacing & Layout** — Grid system, spacing scale, radius values (if in data)
5. **Voice & Tone** — How the brand writes (if in data)
6. **Copy as AI Prompt** — A "Copy Full Design System" button that copies the entire brand JSON formatted as an AI-ready prompt (same as existing catalog feature)

**Navigation:**
- Back to landing: "← Home"
- "Transform with this brand →" button that pre-selects this brand on /transform

### 4. Catalog Page (`app/catalog/page.tsx`)

Move the existing `app/page.tsx` content here. Same search, filter, catalog grid. Add a link back to home.

### 5. API Route for Ollama Proxy (`app/api/ollama/route.ts`)

```ts
// Proxy to Ollama to avoid CORS issues
export async function POST(req: Request) {
  const body = await req.json();
  const res = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return Response.json(data);
}
```

## File Structure (new/modified files only)

```
app/
  page.tsx              ← NEW: Landing page (replace current)
  layout.tsx            ← MODIFY: Add Inter font, update metadata
  globals.css           ← MODIFY: Add new styles
  transform/
    page.tsx            ← NEW: Upload + brand select + transform flow
  brands/
    [id]/
      page.tsx          ← NEW: Brand explorer detail page
  catalog/
    page.tsx            ← MOVE: Current app/page.tsx moves here
  api/
    ollama/
      route.ts          ← NEW: Ollama proxy
    transform/
      route.ts          ← NEW: Transform endpoint
```

## Design System

- Background: #0A0A0A (landing, transform), white for brand explorer
- Text: #F5F5F5 primary, #888 secondary on dark; #111 primary, #666 secondary on light
- Cards: #141414 on dark, white on light
- Border: #2A2A2A on dark, #E5E5E5 on light
- CTA gradient: linear-gradient(135deg, #6366F1, #EC4899)
- Font: Inter (via next/font/google)
- Radius: 16px cards, 12px buttons, 999px pills
- Transitions: 200ms ease

## Key Constraints

- Keep all existing brand data files untouched
- The before/after on the landing page should be STATIC HTML mockups (not AI generated) — just two hardcoded divs showing ugly vs branded
- The transform feature uses Ollama (llama3) via the API proxy route
- Mobile responsive throughout
- TypeScript throughout (existing project uses TS)
- No new npm dependencies needed (Next.js + Tailwind already installed)

## Featured Brands (for landing + transform)

Extract these 6 from brands.json by id:
- `apple`
- `fidelity-investments`
- `cloudflare`
- `openai`
- `x-twitter`
- `petscreening`

## What NOT to Build
- No real payment/Stripe integration
- No user accounts
- No file storage/upload to cloud (files are processed client-side or in-memory)
- No real PPTX/PDF parsing (for MVP: extract text content if possible, otherwise ask user to paste text)

When finished, run:
openclaw system event --text "Done: BrandSlop V2 — Landing page, Transform flow, Brand Explorer" --mode now
