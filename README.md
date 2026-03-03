# BrandSlop

AI-ready brand design systems in one click.

65 curated brands with full design system specs — typography, spacing, shadows, motion, responsive breakpoints, and more. Copy and paste into Claude/GPT/Cursor for instant brand-accurate UI generation.

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Data

- `data/brands.json` — All brands (merged)
- `data/rich-brands-*.json` — Source files for curated brands
- `data/scraped-brands.json` — Color-only brands from brandcolors.net

## Scripts

```bash
# Merge all rich-brands-*.json into brands.json
npx tsx scripts/merge-rich-brands.ts

# Scrape more colors from brandcolors.net
npx tsx scripts/scrape-brandcolors.ts
```

## Contributing

1. Add your brand to a `data/rich-brands-*.json` file
2. Include all 13 required sections (see [ROADMAP.md](./ROADMAP.md) for the checklist)
3. Run the merge script
4. Submit a PR

Quality bar: every field must have actual values, not just descriptions. "Blue for CTAs" isn't enough — include the hex code.

## Roadmap

See [ROADMAP.md](./ROADMAP.md) for planned features and the 13-section quality checklist.

## License

MIT
