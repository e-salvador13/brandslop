'use client';

import { BrandIdentity } from '@/lib/types';

export default function SocialPreview({ brand }: { brand: BrandIdentity }) {
  const handle = brand.brandName.toLowerCase().replace(/\s/g, '');
  const initial = brand.brandName.charAt(0).toUpperCase();

  return (
    <div className="max-w-sm mx-auto">
      {/* Instagram-style post mockup */}
      <div className="glass-card overflow-hidden">
        {/* Post header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-subtle)]">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold"
            style={{
              background: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.secondary})`,
              color: '#fff',
            }}
          >
            {initial}
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[var(--text-primary)]">
              {handle}
            </p>
          </div>
        </div>

        {/* Post image */}
        <div
          className="aspect-square flex flex-col items-center justify-center p-8 text-center relative overflow-hidden"
          style={{ backgroundColor: brand.colors.primary }}
        >
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 30% 70%, ${brand.colors.secondary}, transparent 50%), radial-gradient(circle at 70% 30%, ${brand.colors.accent}, transparent 50%)`
          }} />
          <div className="relative z-10">
            <p
              className="text-[56px] font-bold leading-none mb-4"
              style={{
                fontFamily: `"${brand.typography.heading.family}", sans-serif`,
                color: '#fff',
              }}
            >
              {initial}
            </p>
            <p
              className="text-[24px] font-bold leading-tight mb-3"
              style={{
                fontFamily: `"${brand.typography.heading.family}", sans-serif`,
                color: '#fff',
              }}
            >
              {brand.tagline}
            </p>
            <p
              className="text-[14px] opacity-70"
              style={{
                fontFamily: `"${brand.typography.body.family}", sans-serif`,
                color: '#fff',
              }}
            >
              {brand.brandName}
            </p>
          </div>
        </div>

        {/* Post footer */}
        <div className="px-4 py-3 border-t border-[var(--border-subtle)]">
          <div className="flex gap-4 mb-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
            <span className="font-semibold text-[var(--text-primary)]">{handle}</span>{' '}
            {brand.tagline}{' '}
            <span className="text-[var(--text-quaternary)]">
              {brand.voice.adjectives.slice(0, 3).map(a => `#${a.toLowerCase()}`).join(' ')}
            </span>
          </p>
        </div>
      </div>

      <p className="text-center text-[11px] text-[var(--text-muted)] mt-4 tracking-wide uppercase">
        Social Preview
      </p>
    </div>
  );
}
