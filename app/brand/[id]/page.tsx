'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BrandIdentity } from '@/lib/types';
import PaywallModal from '@/components/PaywallModal';
import BlurredSection from '@/components/BlurredSection';

function WatermarkedLogo({ src, brandName }: { src: string; brandName: string }) {
  return (
    <div className="relative aspect-square rounded-2xl overflow-hidden bg-black group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${brandName} logo variation`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Watermark overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div
          className="text-white/[0.06] text-[14px] font-bold tracking-[0.3em] uppercase whitespace-nowrap"
          style={{
            transform: 'rotate(-35deg) scale(2.5)',
          }}
        >
          BrandSlop • BrandSlop • BrandSlop • BrandSlop • BrandSlop
        </div>
      </div>
    </div>
  );
}

function LogoPlaceholder({ initial, colors }: { initial: string; colors: { primary: string; secondary: string } }) {
  return (
    <div className="aspect-square rounded-2xl overflow-hidden bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center">
      <span
        className="text-[56px] font-bold"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {initial}
      </span>
    </div>
  );
}

export default function BrandResultPage() {
  const params = useParams();
  const router = useRouter();
  const [brand, setBrand] = useState<BrandIdentity | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    const id = params.id as string;
    const stored = sessionStorage.getItem(`brand-${id}`);
    if (stored) {
      setBrand(JSON.parse(stored));
    }
  }, [params.id]);

  // Load Google Fonts
  useEffect(() => {
    if (!brand) return;
    const families = [
      `${brand.typography.heading.family}:wght@${brand.typography.heading.weight}`,
      `${brand.typography.body.family}:wght@${brand.typography.body.weight}`,
    ];
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${families
      .map((f) => `family=${f.replace(/\s/g, '+')}`)
      .join('&')}&display=swap`;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [brand]);

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#08080A]">
        <div className="text-center">
          <p className="text-[18px] text-[var(--text-secondary)] mb-6">Brand not found</p>
          <button
            onClick={() => router.push('/')}
            className="text-[14px] text-[#00D4AA] hover:underline underline-offset-4"
          >
            ← Back to home
          </button>
        </div>
      </div>
    );
  }

  const logos = brand.logoUrls || (brand.logoUrl ? [brand.logoUrl] : []);
  const initial = brand.brandName.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-[#08080A]">
      <PaywallModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} />

      {/* Top nav */}
      <nav className="sticky top-0 z-50 bg-[#08080A]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="text-[13px] text-[var(--text-quaternary)] hover:text-[var(--text-secondary)] transition-colors font-medium"
          >
            ← BrandSlop
          </button>
          <p className="text-[13px] text-[var(--text-muted)] font-medium">{brand.brandName}</p>
          <button
            onClick={() => setShowPaywall(true)}
            className="px-4 py-2 rounded-full bg-[#00D4AA]/10 border border-[#00D4AA]/20 text-[12px] font-semibold text-[#00D4AA] hover:bg-[#00D4AA]/20 transition-all"
          >
            Download Kit
          </button>
        </div>
      </nav>

      {/* Brand Header */}
      <section className="relative pt-16 pb-12 px-6 text-center overflow-hidden">
        <div className="gradient-mesh" aria-hidden="true">
          <div className="gradient-mesh-extra" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="animate-in animate-in-1">
            <h1
              className="text-[48px] sm:text-[72px] font-bold leading-[1.0] tracking-[-0.03em] mb-3"
              style={{
                fontFamily: `"${brand.typography.heading.family}", sans-serif`,
                fontWeight: brand.typography.heading.weight,
              }}
            >
              {brand.brandName}
            </h1>
            <p
              className="text-[18px] sm:text-[22px] text-[var(--text-secondary)] max-w-md mx-auto"
              style={{
                fontFamily: `"${brand.typography.body.family}", sans-serif`,
              }}
            >
              {brand.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Logo Grid — FREE */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-quaternary)] font-medium">
              Logo Variations
            </p>
            <div className="h-px flex-1 bg-[var(--border-subtle)]" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="animate-in" style={{ animationDelay: `${i * 100}ms` }}>
                {logos[i] ? (
                  <WatermarkedLogo src={logos[i]} brandName={brand.brandName} />
                ) : (
                  <LogoPlaceholder initial={initial} colors={brand.colors} />
                )}
              </div>
            ))}
          </div>

          {/* Logo variation labels */}
          <div className="grid grid-cols-2 gap-4 mt-2">
            {['Geometric', 'Abstract', 'Lettermark', 'Symbol'].map((label) => (
              <p key={label} className="text-[11px] text-center text-[var(--text-muted)]">
                {label}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Colors Preview — Partial Free */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-quaternary)] font-medium">
              Color Palette
            </p>
            <div className="h-px flex-1 bg-[var(--border-subtle)]" />
          </div>

          {/* Show 2 free colors */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {['primary', 'secondary'].map((key) => {
              const color = brand.colors[key as keyof typeof brand.colors];
              return (
                <div key={key} className="glass-card p-6 flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl border border-white/5"
                    style={{ backgroundColor: color }}
                  />
                  <div>
                    <p className="text-[13px] font-semibold text-[var(--text-primary)] capitalize">
                      {key}
                    </p>
                    <p className="text-[12px] font-mono text-[var(--text-quaternary)]">
                      {color.toUpperCase()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Blurred remaining colors */}
          <BlurredSection label="Full 6-color palette" onUnlock={() => setShowPaywall(true)}>
            <div className="grid grid-cols-4 gap-4">
              {['accent', 'background', 'text', 'muted'].map((key) => {
                const color = brand.colors[key as keyof typeof brand.colors];
                return (
                  <div key={key} className="glass-card p-4 flex flex-col items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg border border-white/5"
                      style={{ backgroundColor: color }}
                    />
                    <p className="text-[11px] text-[var(--text-quaternary)] capitalize">{key}</p>
                  </div>
                );
              })}
            </div>
          </BlurredSection>
        </div>
      </section>

      {/* Typography — Locked */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-quaternary)] font-medium">
              Typography
            </p>
            <div className="h-px flex-1 bg-[var(--border-subtle)]" />
          </div>

          <BlurredSection label="Typography pairings" onUnlock={() => setShowPaywall(true)}>
            <div className="glass-card p-8 space-y-6">
              <div>
                <p className="text-[11px] text-[var(--text-muted)] mb-2 uppercase tracking-wider">Heading</p>
                <p
                  className="text-[36px] font-bold text-[var(--text-primary)]"
                  style={{ fontFamily: `"${brand.typography.heading.family}", sans-serif` }}
                >
                  {brand.typography.heading.family}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-[var(--text-muted)] mb-2 uppercase tracking-wider">Body</p>
                <p
                  className="text-[20px] text-[var(--text-secondary)]"
                  style={{ fontFamily: `"${brand.typography.body.family}", sans-serif` }}
                >
                  {brand.typography.body.family} — The quick brown fox jumps over the lazy dog
                </p>
              </div>
            </div>
          </BlurredSection>
        </div>
      </section>

      {/* Brand Voice — Locked */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-quaternary)] font-medium">
              Brand Voice
            </p>
            <div className="h-px flex-1 bg-[var(--border-subtle)]" />
          </div>

          <BlurredSection label="Brand voice guidelines" onUnlock={() => setShowPaywall(true)}>
            <div className="glass-card p-8">
              <div className="flex flex-wrap gap-2 mb-6">
                {brand.voice.adjectives.map((adj) => (
                  <span
                    key={adj}
                    className="px-4 py-2 rounded-full border border-[var(--border-subtle)] text-[13px] text-[var(--text-primary)]"
                  >
                    {adj}
                  </span>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-[11px] text-emerald-400/70 mb-3 uppercase tracking-wider font-medium">✓ Do say</p>
                  {brand.voice.doSay.map((phrase, i) => (
                    <p key={i} className="text-[14px] text-[var(--text-secondary)] mb-2 pl-3 border-l-2 border-emerald-500/20">
                      &ldquo;{phrase}&rdquo;
                    </p>
                  ))}
                </div>
                <div>
                  <p className="text-[11px] text-red-400/70 mb-3 uppercase tracking-wider font-medium">✗ Don&apos;t say</p>
                  {brand.voice.dontSay.map((phrase, i) => (
                    <p key={i} className="text-[14px] text-[var(--text-quaternary)] mb-2 pl-3 border-l-2 border-red-500/20 line-through">
                      &ldquo;{phrase}&rdquo;
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </BlurredSection>
        </div>
      </section>

      {/* Logo on backgrounds — Locked */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-quaternary)] font-medium">
              Logo Applications
            </p>
            <div className="h-px flex-1 bg-[var(--border-subtle)]" />
          </div>

          <BlurredSection label="Logo on dark/light backgrounds" onUnlock={() => setShowPaywall(true)}>
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Dark bg */}
              <div
                className="rounded-2xl p-10 flex flex-col items-center justify-center gap-4 min-h-[200px]"
                style={{ background: brand.colors.background }}
              >
                {logos[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logos[0]} alt="" className="w-20 h-20 object-contain rounded-xl" />
                ) : (
                  <span
                    className="text-[40px] font-bold"
                    style={{
                      fontFamily: `"${brand.typography.heading.family}", sans-serif`,
                      color: brand.colors.text,
                    }}
                  >
                    {brand.logoText}
                  </span>
                )}
                <span className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider">Dark</span>
              </div>
              {/* Light bg */}
              <div className="rounded-2xl p-10 flex flex-col items-center justify-center gap-4 min-h-[200px] bg-white">
                <span
                  className="text-[24px] font-bold"
                  style={{
                    fontFamily: `"${brand.typography.heading.family}", sans-serif`,
                    color: brand.colors.background,
                  }}
                >
                  {brand.logoText}
                </span>
                <span className="text-[11px] text-[#999] uppercase tracking-wider">Light</span>
              </div>
            </div>
          </BlurredSection>
        </div>
      </section>

      {/* Social Preview — Locked */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-quaternary)] font-medium">
              Social Media
            </p>
            <div className="h-px flex-1 bg-[var(--border-subtle)]" />
          </div>

          <BlurredSection label="Social media preview" onUnlock={() => setShowPaywall(true)}>
            <div className="glass-card overflow-hidden max-w-sm mx-auto">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-subtle)]">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.secondary})`,
                  }}
                >
                  {initial}
                </div>
                <p className="text-[13px] font-semibold text-[var(--text-primary)]">
                  {brand.brandName.toLowerCase().replace(/\s/g, '')}
                </p>
              </div>
              <div
                className="aspect-square flex items-center justify-center p-8"
                style={{ backgroundColor: brand.colors.primary }}
              >
                <p
                  className="text-[32px] font-bold text-white text-center"
                  style={{ fontFamily: `"${brand.typography.heading.family}", sans-serif` }}
                >
                  {brand.tagline}
                </p>
              </div>
            </div>
          </BlurredSection>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="px-6 py-20 border-t border-[var(--border-subtle)]">
        <div className="max-w-lg mx-auto text-center">
          <h3 className="text-[28px] sm:text-[36px] font-bold tracking-[-0.03em] text-[var(--text-primary)] mb-3">
            Ready to launch?
          </h3>
          <p className="text-[15px] text-[var(--text-tertiary)] mb-8">
            Download your complete brand kit with all assets
          </p>
          <button
            onClick={() => setShowPaywall(true)}
            className="px-10 py-4 rounded-full bg-[#00D4AA] text-[#08080A] text-[16px] font-bold hover:bg-[#00E4BA] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,170,0.3)] active:scale-[0.97]"
          >
            Download Brand Kit — $9.99
          </button>
          <div className="mt-6">
            <button
              onClick={() => router.push('/create')}
              className="text-[14px] text-[var(--text-quaternary)] hover:text-[var(--text-secondary)] transition-colors"
            >
              ← Create another brand
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
