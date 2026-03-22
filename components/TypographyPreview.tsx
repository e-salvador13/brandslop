'use client';

import { BrandTypography } from '@/lib/types';

const sizes = [
  { label: 'Display', size: '48px', weight: 'bold' },
  { label: 'Heading', size: '32px', weight: 'bold' },
  { label: 'Subheading', size: '24px', weight: '600' },
  { label: 'Body', size: '17px', weight: 'normal' },
  { label: 'Caption', size: '13px', weight: 'normal' },
];

export default function TypographyPreview({
  typography,
}: {
  typography: BrandTypography;
}) {
  return (
    <div className="space-y-16">
      {/* Heading Font */}
      <div>
        <div className="flex items-baseline gap-4 mb-8">
          <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--text-quaternary)] font-medium">
            Heading
          </p>
          <div className="h-px flex-1 bg-[var(--border-subtle)]" />
          <p className="text-[13px] text-[var(--text-secondary)] font-medium">
            {typography.heading.family}
          </p>
        </div>

        {/* Rendered at multiple sizes */}
        <div className="space-y-6">
          {sizes.slice(0, 3).map((s) => (
            <div key={s.label} className="flex items-baseline gap-4">
              <span className="text-[11px] text-[var(--text-muted)] w-20 shrink-0 tabular-nums font-mono">
                {s.size}
              </span>
              <p
                className="text-[var(--text-primary)] leading-[1.1] tracking-[-0.02em]"
                style={{
                  fontFamily: `"${typography.heading.family}", sans-serif`,
                  fontWeight: typography.heading.weight,
                  fontSize: s.size,
                }}
              >
                The quick brown fox
              </p>
            </div>
          ))}
        </div>

        <p className="text-[13px] text-[var(--text-quaternary)] mt-6 leading-relaxed">
          {typography.heading.style}
        </p>
      </div>

      {/* Body Font */}
      <div>
        <div className="flex items-baseline gap-4 mb-8">
          <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--text-quaternary)] font-medium">
            Body
          </p>
          <div className="h-px flex-1 bg-[var(--border-subtle)]" />
          <p className="text-[13px] text-[var(--text-secondary)] font-medium">
            {typography.body.family}
          </p>
        </div>

        {/* Paragraph rendering */}
        <p
          className="text-[17px] leading-[1.6] text-[var(--text-secondary)] mb-6 max-w-2xl"
          style={{
            fontFamily: `"${typography.body.family}", sans-serif`,
            fontWeight: typography.body.weight,
          }}
        >
          The quick brown fox jumps over the lazy dog. Pack my box with five
          dozen liquor jugs. How vexingly quick daft zebras jump. Sphinx of
          black quartz, judge my vow.
        </p>

        {/* Smaller sizes */}
        <div className="space-y-4 mt-8">
          {sizes.slice(3).map((s) => (
            <div key={s.label} className="flex items-baseline gap-4">
              <span className="text-[11px] text-[var(--text-muted)] w-20 shrink-0 tabular-nums font-mono">
                {s.size}
              </span>
              <p
                className="text-[var(--text-secondary)] leading-relaxed"
                style={{
                  fontFamily: `"${typography.body.family}", sans-serif`,
                  fontWeight: typography.body.weight,
                  fontSize: s.size,
                }}
              >
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          ))}
        </div>

        <p className="text-[13px] text-[var(--text-quaternary)] mt-6 leading-relaxed">
          {typography.body.style}
        </p>
      </div>
    </div>
  );
}
