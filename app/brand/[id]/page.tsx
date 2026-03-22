'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BrandIdentity } from '@/lib/types';
import PaywallModal from '@/components/PaywallModal';
import BlurredSection from '@/components/BlurredSection';
import BusinessCardMockup from '@/components/mockups/BusinessCardMockup';
import SocialProfileMockup from '@/components/mockups/SocialProfileMockup';
import AppIconMockup from '@/components/mockups/AppIconMockup';
import WebsiteHeroMockup from '@/components/mockups/WebsiteHeroMockup';

/* ── Watermarked Logo ── */
function WatermarkedLogo({ src, brandName }: { src: string; brandName: string }) {
  return (
    <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/50 group border border-[var(--border-subtle)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${brandName} logo variation`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div
          className="text-white/[0.06] text-[14px] font-bold tracking-[0.3em] uppercase whitespace-nowrap"
          style={{ transform: 'rotate(-35deg) scale(2.5)' }}
        >
          BrandSlop • BrandSlop • BrandSlop • BrandSlop • BrandSlop
        </div>
      </div>
    </div>
  );
}

/* ── Logo Placeholder ── */
function LogoPlaceholder({ initial, colors, variant }: { initial: string; colors: { primary: string; secondary: string }; variant: number }) {
  const rotations = [135, 200, 45, 310];
  return (
    <div className="aspect-square rounded-2xl overflow-hidden border border-[var(--border-subtle)] flex items-center justify-center relative"
      style={{ background: `linear-gradient(${rotations[variant]}deg, rgba(0,0,0,0.8), rgba(0,0,0,0.95))` }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 opacity-[0.08]" style={{
        background: `radial-gradient(circle at ${variant % 2 === 0 ? '30% 30%' : '70% 70%'}, ${colors.primary}, transparent 70%)`,
      }} />
      <span
        className="text-[56px] font-bold relative z-10"
        style={{
          background: `linear-gradient(${rotations[variant]}deg, ${colors.primary}, ${colors.secondary})`,
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

/* ── Section Header ── */
function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-quaternary)] font-medium">
        {label}
      </p>
      <div className="h-px flex-1 bg-[var(--border-subtle)]" />
    </div>
  );
}

/* ── Scroll reveal hook ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = el.querySelectorAll('.reveal-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════ */
export default function BrandResultPage() {
  const params = useParams();
  const router = useRouter();
  const [brand, setBrand] = useState<BrandIdentity | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const revealRef = useReveal();

  useEffect(() => {
    const id = params.id as string;
    const stored = sessionStorage.getItem(`brand-${id}`);
    if (stored) setBrand(JSON.parse(stored));
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
    return () => { document.head.removeChild(link); };
  }, [brand]);

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#08080A]">
        <div className="text-center">
          <p className="text-[18px] text-[var(--text-secondary)] mb-6">Brand not found</p>
          <button onClick={() => router.push('/')} className="text-[14px] text-[#00D4AA] hover:underline underline-offset-4">← Back to home</button>
        </div>
      </div>
    );
  }

  const logos = brand.logoUrls || (brand.logoUrl ? [brand.logoUrl] : []);
  const initial = brand.brandName.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-[#08080A]" ref={revealRef}>
      <PaywallModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} />

      {/* ── Nav ── */}
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

      {/* ── Brand Header ── */}
      <section className="relative pt-16 pb-16 px-6 text-center overflow-hidden">
        <div className="gradient-mesh" aria-hidden="true"><div className="gradient-mesh-extra" /></div>
        <div className="relative z-10 max-w-3xl mx-auto animate-in animate-in-1">
          {/* Logo mark */}
          {logos[0] ? (
            <div className="w-20 h-20 rounded-2xl overflow-hidden border border-[var(--border-subtle)] mx-auto mb-6 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logos[0]} alt="" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div
              className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center border border-[var(--border-subtle)]"
              style={{ background: `linear-gradient(135deg, ${brand.colors.primary}20, ${brand.colors.secondary}10)` }}
            >
              <span className="text-[36px] font-bold" style={{
                fontFamily: `"${brand.typography.heading.family}", sans-serif`,
                background: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.secondary})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>{initial}</span>
            </div>
          )}

          <h1
            className="text-[48px] sm:text-[72px] font-bold leading-[1.0] tracking-[-0.03em] mb-3"
            style={{ fontFamily: `"${brand.typography.heading.family}", sans-serif`, fontWeight: brand.typography.heading.weight }}
          >
            {brand.brandName}
          </h1>
          <p
            className="text-[18px] sm:text-[22px] text-[var(--text-secondary)] max-w-md mx-auto mb-8"
            style={{ fontFamily: `"${brand.typography.body.family}", sans-serif` }}
          >
            {brand.tagline}
          </p>

          {/* Quick color strip */}
          <div className="flex items-center justify-center gap-2">
            {[brand.colors.primary, brand.colors.secondary, brand.colors.accent].map((c, i) => (
              <div key={i} className="w-6 h-6 rounded-full border border-white/10" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FREE SECTION: Logo Variations
          ═══════════════════════════════════════════ */}
      <section className="px-6 pb-20 reveal-section">
        <div className="max-w-3xl mx-auto">
          <SectionHeader label="Logo Variations" />
          <div className="grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="animate-in" style={{ animationDelay: `${i * 100}ms` }}>
                {logos[i] ? (
                  <WatermarkedLogo src={logos[i]} brandName={brand.brandName} />
                ) : (
                  <LogoPlaceholder initial={initial} colors={brand.colors} variant={i} />
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {['Geometric', 'Abstract', 'Lettermark', 'Symbol'].map((label) => (
              <p key={label} className="text-[11px] text-center text-[var(--text-muted)]">{label}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FREE SECTION: Primary Colors (partial)
          ═══════════════════════════════════════════ */}
      <section className="px-6 pb-20 reveal-section">
        <div className="max-w-3xl mx-auto">
          <SectionHeader label="Color Palette" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
            {['primary', 'secondary'].map((key) => {
              const color = brand.colors[key as keyof typeof brand.colors];
              return (
                <div key={key} className="glass-card p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl border border-white/5 shadow-lg" style={{ backgroundColor: color }} />
                  <div>
                    <p className="text-[13px] font-semibold text-[var(--text-primary)] capitalize">{key}</p>
                    <p className="text-[12px] font-mono text-[var(--text-quaternary)]">{color.toUpperCase()}</p>
                  </div>
                </div>
              );
            })}
            {/* Teaser for accent — visible but marked as locked */}
            <div className="glass-card p-5 flex items-center gap-4 opacity-60">
              <div className="w-12 h-12 rounded-xl border border-white/5 relative" style={{ backgroundColor: brand.colors.accent }}>
                <div className="absolute inset-0 rounded-xl bg-[#08080A]/50 flex items-center justify-center">
                  <span className="text-[12px]">🔒</span>
                </div>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[var(--text-quaternary)] capitalize">Accent</p>
                <p className="text-[12px] font-mono text-[var(--text-muted)]">••••••</p>
              </div>
            </div>
          </div>

          {/* Blurred remaining */}
          <BlurredSection label="Full 6-color palette with usage guidelines" onUnlock={() => setShowPaywall(true)}>
            <div className="glass-card p-6">
              <div className="grid grid-cols-6 gap-3">
                {Object.entries(brand.colors).map(([key, color]) => (
                  <div key={key} className="flex flex-col items-center gap-2">
                    <div className="w-full aspect-square rounded-lg border border-white/5" style={{ backgroundColor: color }} />
                    <p className="text-[10px] text-[var(--text-quaternary)] capitalize">{key}</p>
                    <p className="text-[9px] font-mono text-[var(--text-muted)]">{color.toUpperCase()}</p>
                  </div>
                ))}
              </div>
            </div>
          </BlurredSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LOCKED: Brand in Context — The Money Section
          ═══════════════════════════════════════════ */}

      {/* App Icon Mockup — FREE (this is a teaser that hooks them) */}
      <section className="px-6 pb-20 section-glow reveal-section">
        <div className="max-w-3xl mx-auto">
          <SectionHeader label="App Icon" />
          <div className="glass-card p-8 sm:p-10">
            <AppIconMockup brand={brand} />
          </div>
        </div>
      </section>

      {/* Business Card — LOCKED */}
      <section className="px-6 pb-20 reveal-section">
        <div className="max-w-3xl mx-auto">
          <SectionHeader label="Business Card" />
          <BlurredSection label="Business card mockup with your brand" onUnlock={() => setShowPaywall(true)}>
            <div className="glass-card p-8 sm:p-10">
              <BusinessCardMockup brand={brand} />
            </div>
          </BlurredSection>
        </div>
      </section>

      {/* Social Profile — LOCKED */}
      <section className="px-6 pb-20 reveal-section">
        <div className="max-w-3xl mx-auto">
          <SectionHeader label="Social Media Profile" />
          <BlurredSection label="Social profile with your brand applied" onUnlock={() => setShowPaywall(true)}>
            <SocialProfileMockup brand={brand} />
          </BlurredSection>
        </div>
      </section>

      {/* Website Hero — LOCKED */}
      <section className="px-6 pb-20 reveal-section">
        <div className="max-w-3xl mx-auto">
          <SectionHeader label="Website Preview" />
          <BlurredSection label="Website hero mockup with your brand" onUnlock={() => setShowPaywall(true)}>
            <WebsiteHeroMockup brand={brand} />
          </BlurredSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LOCKED: Typography
          ═══════════════════════════════════════════ */}
      <section className="px-6 pb-20 reveal-section">
        <div className="max-w-3xl mx-auto">
          <SectionHeader label="Typography" />
          <BlurredSection label="Typography pairing with usage examples" onUnlock={() => setShowPaywall(true)}>
            <div className="glass-card p-8 space-y-8">
              <div>
                <p className="text-[11px] text-[var(--text-muted)] mb-3 uppercase tracking-wider">Heading</p>
                <p className="text-[36px] sm:text-[48px] font-bold text-[var(--text-primary)] leading-[1.1]"
                  style={{ fontFamily: `"${brand.typography.heading.family}", sans-serif` }}>
                  {brand.typography.heading.family}
                </p>
                <p className="text-[13px] text-[var(--text-quaternary)] mt-2">{brand.typography.heading.style}</p>
              </div>
              <div className="h-px bg-[var(--border-subtle)]" />
              <div>
                <p className="text-[11px] text-[var(--text-muted)] mb-3 uppercase tracking-wider">Body</p>
                <p className="text-[18px] sm:text-[20px] text-[var(--text-secondary)] leading-relaxed"
                  style={{ fontFamily: `"${brand.typography.body.family}", sans-serif` }}>
                  {brand.typography.body.family} — The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
                </p>
                <p className="text-[13px] text-[var(--text-quaternary)] mt-2">{brand.typography.body.style}</p>
              </div>
            </div>
          </BlurredSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LOCKED: Brand Voice
          ═══════════════════════════════════════════ */}
      <section className="px-6 pb-20 reveal-section">
        <div className="max-w-3xl mx-auto">
          <SectionHeader label="Brand Voice" />
          <BlurredSection label="Brand voice guidelines" onUnlock={() => setShowPaywall(true)}>
            <div className="glass-card p-8">
              {/* Personality pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {brand.voice.adjectives.map((adj) => (
                  <span key={adj} className="px-4 py-2 rounded-full border border-[var(--border-subtle)] text-[13px] text-[var(--text-primary)]">
                    {adj}
                  </span>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-[11px] text-emerald-400/70 mb-4 uppercase tracking-wider font-medium flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    Do say
                  </p>
                  {brand.voice.doSay.map((phrase, i) => (
                    <p key={i} className="text-[14px] text-[var(--text-secondary)] mb-3 pl-4 border-l-2 border-emerald-500/20">
                      &ldquo;{phrase}&rdquo;
                    </p>
                  ))}
                </div>
                <div>
                  <p className="text-[11px] text-red-400/70 mb-4 uppercase tracking-wider font-medium flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    Don&apos;t say
                  </p>
                  {brand.voice.dontSay.map((phrase, i) => (
                    <p key={i} className="text-[14px] text-[var(--text-quaternary)] mb-3 pl-4 border-l-2 border-red-500/20 line-through decoration-red-500/20">
                      &ldquo;{phrase}&rdquo;
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </BlurredSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LOCKED: Logo on Backgrounds
          ═══════════════════════════════════════════ */}
      <section className="px-6 pb-20 reveal-section">
        <div className="max-w-3xl mx-auto">
          <SectionHeader label="Logo Applications" />
          <BlurredSection label="Logo on dark/light backgrounds" onUnlock={() => setShowPaywall(true)}>
            <div className="grid sm:grid-cols-3 gap-4">
              {/* Dark */}
              <div className="rounded-2xl p-8 flex flex-col items-center justify-center gap-3 min-h-[180px]"
                style={{ background: brand.colors.background }}>
                {logos[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logos[0]} alt="" className="w-16 h-16 object-contain rounded-xl" />
                ) : (
                  <span className="text-[32px] font-bold" style={{
                    fontFamily: `"${brand.typography.heading.family}", sans-serif`,
                    color: brand.colors.text,
                  }}>{brand.logoText}</span>
                )}
                <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Dark</span>
              </div>
              {/* Light */}
              <div className="rounded-2xl p-8 flex flex-col items-center justify-center gap-3 min-h-[180px] bg-white">
                <span className="text-[20px] font-bold" style={{
                  fontFamily: `"${brand.typography.heading.family}", sans-serif`,
                  color: brand.colors.background,
                }}>{brand.logoText}</span>
                <span className="text-[10px] text-[#999] uppercase tracking-wider">Light</span>
              </div>
              {/* Brand color */}
              <div className="rounded-2xl p-8 flex flex-col items-center justify-center gap-3 min-h-[180px]"
                style={{ background: brand.colors.primary }}>
                <span className="text-[20px] font-bold text-white" style={{
                  fontFamily: `"${brand.typography.heading.family}", sans-serif`,
                }}>{brand.logoText}</span>
                <span className="text-[10px] text-white/50 uppercase tracking-wider">Primary</span>
              </div>
            </div>
          </BlurredSection>
        </div>
      </section>

      {/* ── CTA Footer ── */}
      <section className="px-6 py-24 border-t border-[var(--border-subtle)] section-glow reveal-section">
        <div className="max-w-lg mx-auto text-center relative z-10">
          <h3 className="text-[28px] sm:text-[40px] font-bold tracking-[-0.03em] text-[var(--text-primary)] mb-3">
            Ready to launch?
          </h3>
          <p className="text-[15px] text-[var(--text-tertiary)] mb-4">
            Download your complete brand kit with all assets and context mockups
          </p>
          <p className="text-[13px] text-[var(--text-quaternary)] mb-8">
            Logos • Colors • Typography • Voice • Business Cards • Social Assets • Website Preview
          </p>
          <button
            onClick={() => setShowPaywall(true)}
            className="px-12 py-4 rounded-full bg-[#00D4AA] text-[#08080A] text-[16px] font-bold hover:bg-[#00E4BA] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,170,0.3)] active:scale-[0.97]"
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
