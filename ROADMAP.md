# BrandSlop — Product Roadmap

## What to Ship (in order)

1. **Web app** with 65 curated brands at full depth
2. **PDF export** — downloadable brand system PDFs
3. **Live brand testing** — side-by-side AI preview
4. **Brand comparison/diff view** — visual brand differences
5. **Community contributions** with quality review gates

---

## Key Changes Needed

### Color-only brands are secondary, not the headline

The 600+ scraped color palettes dilute the product. The 65 full design systems ARE the product. Lead with depth, not breadth. Color-only brands can exist as a filtered secondary tier but should never be the selling point or headline number.

### Add trust signals

- Brief methodology note per brand (official docs, live site inspection, etc.)
- `lastVerified` date field per brand — brands redesign, users need to know this is current
- Both are cheap to implement, both add significant credibility

### Trim the README

Keep it short: what it is, how to run it, how to contribute. Move the product narrative and the 13-section explainer table into the web app landing page itself — that's where it actually sells.

---

## Feature Details

### PDF Export

Users need a way to take a brand system out of the web app and into whatever AI tool they're using. Download a PDF, upload it into Claude/GPT/Cursor — works everywhere, no integration needed.

**What the PDF should include:**
- Clean, printable layout of the full brand design system
- All 13 sections formatted for easy scanning
- Color swatches rendered visually alongside hex codes (not just text)
- Typography scale shown at relative sizes where possible
- One-click download from the brand detail view
- Filename convention: `brandslop-stripe.pdf`, `brandslop-apple.pdf`

### Live Brand Testing

This is the single highest-impact feature for showing people why BrandSlop matters. The core idea: show two AI outputs side by side.

- **Left panel:** "Build me a hero section" with NO brand system (generic AI output)
- **Right panel:** Same exact prompt WITH the BrandSlop brand system applied

That visual difference is the entire pitch. It sells itself.

**Implementation details:**
- Use the Anthropic API to power both outputs
- Keep the input simple — a single text field for the prompt
- Render output as live HTML/CSS in iframes
- Provide pre-built demo prompts as quick-start buttons: "hero section", "pricing card", "login page", "dashboard sidebar"
- Let the user pick which brand to apply from a dropdown
- This doesn't need to be a full IDE — just enough to demonstrate the difference clearly

### Brand Comparison / Diff View

"What makes Stripe look different from Linear?" answered visually with actual system values side by side.

**What it should show:**
- Two brands in parallel columns
- Each of the 13 sections compared directly
- Color palettes rendered as visual swatches next to each other
- Typography scales shown at actual relative sizes
- Spacing values compared numerically
- Motion philosophy summarized (e.g., "Stripe: smooth 400ms ease-in-out" vs "Linear: snappy 150ms ease-out")
- Highlight the meaningful differences — what actually makes them feel different

**Why this matters:**
- Extremely shareable — people would post these comparisons on social media
- Helps users choose between similar-feeling brands
- Educational — teaches what actually differentiates brand aesthetics
- Could auto-generate a summary: "Stripe uses generous 120px section padding while Linear uses tight 48px. Stripe's shadows are subtle (0.04 opacity) while Linear's are almost invisible (0.02)."

### Community Contributions

Can't maintain 65+ brands at full depth alone. But quality is the entire value prop, so contributions need gates.

**Submission flow:**
- Anyone can submit a new brand or update an existing one
- Submissions go through a review queue
- Review checks against the 13-section quality checklist below
- Approved submissions get merged, contributor gets credit
- Start with a small group of trusted contributors, expand over time

**Quality bar for acceptance:**
- Must include all 13 sections (no partial submissions)
- Must cite sources (official design docs, live site inspection, etc.)
- Must include a `lastVerified` date
- Must pass a basic accuracy check — do the hex values actually match the brand's live site?

---

## Brand Quality Checklist

Every curated brand at 9/10 depth should include all 13 sections. This is the QA standard for both internal brands and community submissions.

| # | Section | What it must include | Common mistakes |
|---|---------|---------------------|-----------------|
| 1 | **Colors** | Primary, neutrals, secondary palettes with hex values. Dark mode palette as a full set of values, not one line. | Missing dark mode, or dark mode listed as "inverts" with no actual values |
| 2 | **Color usage rules** | When each color appears — primary CTA, backgrounds, text, hover states, status indicators. Not just a swatch list. | Referencing colors (e.g., "blue for CTAs") that are never defined as hex values in the colors section |
| 3 | **Typography** | Font families AND full scale: hero, H1, H2, H3, body, small, caption. Each with px size, line-height, and letter-spacing where relevant. | Listing fonts but no sizes. Saying "tight line-heights" without actual values. |
| 4 | **Spacing** | Base unit (e.g., 8px), section padding (desktop + mobile), component gaps, max-widths, sidebar widths if applicable. | No base unit. Vague guidance like "generous whitespace" without numbers. |
| 5 | **Component patterns** | Specific UI signatures: button shape + height + radius, card radius + shadow, avatar sizes per context, input field styles, nav patterns. Include dimensions. | Generic descriptions like "rounded buttons" with no radius or height values. |
| 6 | **Elevation & shadows** | Multi-level shadow scale (at least 3 levels: cards, dropdowns, modals). Include dark mode shadow adjustments. | Only one shadow value. No dark mode shadow treatment. |
| 7 | **Motion & animation** | Duration ranges, easing curves (actual CSS values), specific behaviors (scroll reveals, hover transitions, loading states). Describe the personality — smooth vs snappy vs bouncy. | Completely absent, or just "smooth animations" with no values. |
| 8 | **Layout & grid** | Column system, max-widths for content areas, sidebar dimensions, feed widths, alignment tendencies (centered vs left-aligned). | No max-width values. No column count. |
| 9 | **Responsive breakpoints** | Exact pixel values for each breakpoint. What changes at each — not just "stacks on mobile" but what collapses first, how typography scales down, how spacing compresses. | "Mobile: full width" with no detail on what actually changes. |
| 10 | **Icon style** | Size system (e.g., 16/20/24/28px), weight (light/regular/bold), filled vs outline default, active state treatment. | "Rounded, friendly icons" with no sizes or weight info. |
| 11 | **Interactive states** | Hover, focus, active, disabled, loading behaviors. Include CSS-level detail: background color shifts, scale values, ring styles, opacity values. | Missing entirely, or only hover described. |
| 12 | **Image & media** | Aspect ratios for different contexts, photo grid layouts (1/2/3/4+ arrangements), avatar sizing per context, video player behavior, background/overlay treatments. | "Full-bleed images" with no aspect ratios or grid rules. |
| 13 | **Copy voice** | Tone description, sentence structure patterns, punctuation habits, example phrases that capture the voice. | Missing entirely, or one generic word like "professional." |

---

## Don't Build Yet

Chrome extension, VS Code extension, Style Dictionary, Figma export, MCP server, API, PDF parser, pricing/monetization. All valid later — none of it matters until the core is solid.

---

*Last updated: 2024-03-02*
