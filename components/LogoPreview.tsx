'use client';

import { BrandIdentity } from '@/lib/types';

export default function LogoPreview({ brand }: { brand: BrandIdentity }) {
  const initial = brand.brandName.charAt(0).toUpperCase();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {/* Dark variant — wordmark */}
      <div
        className="glass-card p-10 flex flex-col items-center justify-center gap-5 min-h-[220px]"
        style={{ background: `${brand.colors.background}` }}
      >
        <p
          className="text-[32px] tracking-[-0.02em]"
          style={{
            fontFamily: `"${brand.typography.heading.family}", sans-serif`,
            fontWeight: brand.typography.heading.weight,
            color: brand.colors.text,
          }}
        >
          {brand.logoText}
        </p>
        <span className="text-[11px] text-[var(--text-muted)] tracking-wide uppercase">
          Dark
        </span>
      </div>

      {/* Light variant — wordmark */}
      <div className="rounded-[var(--radius-lg)] p-10 flex flex-col items-center justify-center gap-5 min-h-[220px] bg-white border border-[rgba(0,0,0,0.06)]">
        <p
          className="text-[32px] tracking-[-0.02em]"
          style={{
            fontFamily: `"${brand.typography.heading.family}", sans-serif`,
            fontWeight: brand.typography.heading.weight,
            color: brand.colors.background,
          }}
        >
          {brand.logoText}
        </p>
        <span className="text-[11px] text-[#999] tracking-wide uppercase">
          Light
        </span>
      </div>

      {/* Icon mark — lettermark with gradient */}
      <div
        className="glass-card p-10 flex flex-col items-center justify-center gap-5 min-h-[220px] overflow-hidden relative"
      >
        {/* Ambient brand color glow */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            background: `radial-gradient(circle at center, ${brand.colors.primary} 0%, transparent 70%)`,
          }}
        />
        <div className="relative z-10 flex flex-col items-center gap-5">
          <span
            className="text-[56px] font-bold leading-none"
            style={{
              fontFamily: `"${brand.typography.heading.family}", sans-serif`,
              background: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.secondary})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {initial}
          </span>
          <span className="text-[11px] text-[var(--text-muted)] tracking-wide uppercase">
            Mark
          </span>
        </div>
      </div>
    </div>
  );
}
