# BrandSlop — Product Spec (from competitor analysis)

## Date: 2026-03-22

## Competitors Analyzed
- **LookA** — iOS app, logo maker + AI tools suite
- **Logo Maker** (unnamed) — iOS App Store, guided logo creation

## Key Patterns That Convert

### 1. Guided Multi-Step Intake (NOT just a text box)
- Who are you making logos for? (Myself / Other people)
- What do you need? (Design new / Update current / Make tons / Other)
- Describe your logo (text prompt)
- Choose style: Monogram | Abstract | Mascot | Minimalist | No Style
- Choose color scheme (with real brand palette references: Slack, Monday, Visme)
- THEN generate

### 2. Multiple Outputs
- Generate 4-6 logo variations per request
- User picks favorites
- Grid layout for comparison
- "Explore" section with example outputs

### 3. Editor After Generation
- Layers panel
- Swap Text Logo / Graphic / Image / Background
- Undo/redo
- Export button (gated behind pro)

### 4. Pro Paywall Model
- Crown icon 👑 on pro templates
- "GET PRO" button always visible
- Free: browse, generate low-res preview
- Pro: export, high-res, remove watermark, save projects

### 5. Template Library
- Organized by industry (Construction, Medical, Fishing, Beauty, Business, Fashion, Clothing, Agriculture)
- "Most Popular" section
- Scrollable horizontal rows
- Crown badges on premium ones

### 6. AI Tools Hub
- Logo Maker is the primary hook
- But also: Photo Colorizer, Remove Object, Remove BG, Image Upscaler
- Quick photo cutouts
- This creates multiple entry points and upsell paths

### 7. Projects / Account
- Save work for later
- "No projects yet" empty state encourages creation
- Creates accounts = retention + email marketing

### 8. Social Proof
- "436K logos generated"
- "500K+ professional templates"
- "2400+ graphics and 180+ fonts"

---

## What We Have Now vs What's Needed

### Current State
- Single text box → one brand result → everything visible → download
- No guided flow
- No style/color choices
- One logo output
- No editor
- No paywall
- No templates
- No accounts

### MVP Target (v1 — worth charging for)
1. **Guided flow**: Brand name → Industry picker → Style preference → Color mood → Generate
2. **Multiple logo variations**: Generate 4 options, show in grid
3. **Preview page with blur/lock**: Show logo clearly, blur color palette/typography/voice behind paywall
4. **Download gated**: Pay $4.99 or subscribe for full brand kit (PDF + assets)
5. **Homepage that sells**: Real generated examples, social proof counter, industry categories
6. **Mobile-first design**: These competitors are iOS apps — our web version needs to feel equally polished on mobile

### V2 (Growth)
- Template library (pre-made brand kits by industry)
- Basic logo editor (text, colors, swap graphic)
- Account system + saved projects
- AI Tools hub (BG removal, etc.)
- Stripe subscription ($9.99/mo or $49.99/year)

---

## Design Notes
- Dark theme (both competitors use near-black backgrounds)
- Teal/cyan accent color is common in this space
- Rounded cards with subtle borders
- Bottom tab navigation (mobile)
- Clean typography, generous spacing
- Loading states are polished (animated icons, progress indicators)

## Screenshot Reference
All 20 competitor screenshots saved in: `research/competitor-screenshots/`
