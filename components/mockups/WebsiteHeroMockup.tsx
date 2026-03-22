'use client';

import { BrandIdentity } from '@/lib/types';

export default function WebsiteHeroMockup({ brand }: { brand: BrandIdentity }) {
  const handle = brand.brandName.toLowerCase().replace(/\s/g, '');

  return (
    <div className="mockup-frame w-full">
      {/* Browser chrome bar */}
      <div className="mockup-browser-bar">
        <div className="mockup-browser-dot" />
        <div className="mockup-browser-dot" />
        <div className="mockup-browser-dot" />
        <div className="mockup-browser-bar-url">
          <span className="text-[10px] text-[var(--text-muted)]">{handle}.com</span>
        </div>
      </div>

      {/* Website content */}
      <div className="relative" style={{ background: brand.colors.background || '#0A0A0A' }}>
        {/* Nav */}
        <nav className="flex items-center justify-between px-6 sm:px-10 py-4 border-b" style={{ borderColor: `${brand.colors.muted}30` }}>
          <span
            className="text-[14px] font-bold"
            style={{
              fontFamily: `"${brand.typography.heading.family}", sans-serif`,
              color: brand.colors.text || '#fff',
            }}
          >
            {brand.logoText}
          </span>
          <div className="flex items-center gap-4">
            <span className="text-[11px] hidden sm:inline" style={{ color: brand.colors.muted, fontFamily: `"${brand.typography.body.family}", sans-serif` }}>Features</span>
            <span className="text-[11px] hidden sm:inline" style={{ color: brand.colors.muted, fontFamily: `"${brand.typography.body.family}", sans-serif` }}>Pricing</span>
            <div
              className="px-3 py-1.5 rounded-md text-[10px] font-semibold"
              style={{
                backgroundColor: brand.colors.primary,
                color: '#fff',
                fontFamily: `"${brand.typography.body.family}", sans-serif`,
              }}
            >
              Get Started
            </div>
          </div>
        </nav>

        {/* Hero section */}
        <div className="relative px-6 sm:px-10 py-12 sm:py-16 text-center">
          {/* Ambient glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full opacity-[0.08] blur-[100px]"
            style={{ background: brand.colors.primary }}
          />
          <div className="relative z-10">
            <h1
              className="text-[24px] sm:text-[36px] font-bold leading-[1.1] mb-3"
              style={{
                fontFamily: `"${brand.typography.heading.family}", sans-serif`,
                fontWeight: brand.typography.heading.weight,
                color: brand.colors.text || '#fff',
              }}
            >
              {brand.tagline}
            </h1>
            <p
              className="text-[12px] sm:text-[14px] mb-6 max-w-sm mx-auto leading-relaxed"
              style={{
                fontFamily: `"${brand.typography.body.family}", sans-serif`,
                color: brand.colors.muted || '#888',
              }}
            >
              {brand.voice.doSay[0] || `The ${brand.voice.adjectives.slice(0, 2).join(' and ').toLowerCase()} way to do it.`}
            </p>
            <div className="flex items-center justify-center gap-3">
              <div
                className="px-5 py-2.5 rounded-lg text-[12px] font-semibold"
                style={{
                  backgroundColor: brand.colors.primary,
                  color: '#fff',
                  fontFamily: `"${brand.typography.body.family}", sans-serif`,
                }}
              >
                Get Started Free
              </div>
              <div
                className="px-5 py-2.5 rounded-lg text-[12px] font-medium border"
                style={{
                  borderColor: `${brand.colors.muted}40`,
                  color: brand.colors.text || '#fff',
                  fontFamily: `"${brand.typography.body.family}", sans-serif`,
                }}
              >
                Learn More
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
