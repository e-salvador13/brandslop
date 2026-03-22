'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BrandIdentity } from '@/lib/types';
import ColorPalette from '@/components/ColorPalette';
import TypographyPreview from '@/components/TypographyPreview';
import LogoPreview from '@/components/LogoPreview';
import SocialPreview from '@/components/SocialPreview';
import BusinessCard from '@/components/BusinessCard';
import BrandVoice from '@/components/BrandVoice';

function Section({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="reveal py-16 sm:py-24 px-6 md:px-12"
    >
      <div className="max-w-4xl mx-auto">
        {title && (
          <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-quaternary)] mb-10 font-medium">
            {title}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

export default function BrandPage() {
  const params = useParams();
  const router = useRouter();
  const [brand, setBrand] = useState<BrandIdentity | null>(null);
  const [refineText, setRefineText] = useState('');
  const [refining, setRefining] = useState(false);

  useEffect(() => {
    const id = params.id as string;
    const stored = sessionStorage.getItem(`brand-${id}`);
    if (stored) {
      setBrand(JSON.parse(stored));
    }
  }, [params.id]);

  // Load Google Fonts dynamically
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

  async function handleRefine() {
    if (!brand || !refineText.trim()) return;

    setRefining(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: `${brand.description}. Additional refinement: ${refineText.trim()}`,
        }),
      });

      if (res.ok) {
        const newBrand = await res.json();
        sessionStorage.setItem(`brand-${newBrand.id}`, JSON.stringify(newBrand));
        router.push(`/brand/${newBrand.id}`);
      }
    } catch {
      // Silently fail
    } finally {
      setRefining(false);
    }
  }

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[18px] text-[var(--text-secondary)] mb-6">Brand not found</p>
          <button
            onClick={() => router.push('/')}
            className="text-[14px] text-[var(--accent)] hover:underline underline-offset-4 transition-all"
          >
            ← Back to generator
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl border-b border-[var(--border-subtle)]" style={{ backgroundColor: 'rgba(8, 8, 10, 0.8)' }}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="text-[13px] text-[var(--text-quaternary)] hover:text-[var(--text-primary)] transition-colors duration-[var(--duration)] font-medium"
          >
            ← BrandSlop
          </button>
          <p className="text-[13px] text-[var(--text-muted)] font-medium tracking-[-0.01em]">{brand.brandName}</p>
        </div>
      </nav>

      {/* Brand Header */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        {/* Gradient mesh behind header */}
        <div className="gradient-mesh" aria-hidden="true">
          <div className="gradient-mesh-extra" />
        </div>

        <div className="relative z-10 animate-in animate-in-1">
          {/* Generated lettermark/initial */}
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-[var(--radius-lg)] mb-8 border border-[var(--border-subtle)]"
            style={{
              background: `linear-gradient(135deg, ${brand.colors.primary}15, ${brand.colors.secondary}10)`,
            }}
          >
            <span
              className="text-[36px] font-bold tracking-[-0.03em]"
              style={{
                fontFamily: `"${brand.typography.heading.family}", sans-serif`,
                fontWeight: brand.typography.heading.weight,
                background: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.secondary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {brand.brandName.charAt(0).toUpperCase()}
            </span>
          </div>

          <h1
            className="text-[48px] sm:text-[64px] md:text-[80px] font-bold leading-[1.0] tracking-[-0.03em] mb-4"
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
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-[var(--border-subtle)]" />
      </div>

      {/* Color Palette */}
      <Section title="Color Palette">
        <ColorPalette colors={brand.colors} />
      </Section>

      {/* Typography */}
      <Section title="Typography">
        <TypographyPreview typography={brand.typography} />
      </Section>

      {/* Logo Mark */}
      <Section title="Logo">
        <LogoPreview brand={brand} />
      </Section>

      {/* Social Preview */}
      <Section title="Social Preview">
        <SocialPreview brand={brand} />
      </Section>

      {/* Business Card */}
      <Section title="Business Card">
        <BusinessCard brand={brand} />
      </Section>

      {/* Brand Voice */}
      <Section title="Brand Voice">
        <BrandVoice voice={brand.voice} />
      </Section>

      {/* Actions */}
      <section className="py-24 px-6 border-t border-[var(--border-subtle)]">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Download */}
          <button
            onClick={() =>
              alert(
                'Brand Kit downloads are coming soon. For now, enjoy the preview!'
              )
            }
            className="shimmer-btn w-full sm:w-auto px-10 py-4 rounded-[var(--radius-full)] text-[16px] font-semibold text-white"
          >
            <span className="relative z-10">Download Brand Kit — $19</span>
          </button>

          {/* Start over */}
          <div>
            <button
              onClick={() => router.push('/')}
              className="text-[14px] text-[var(--text-quaternary)] hover:text-[var(--text-primary)] transition-colors duration-[var(--duration)]"
            >
              ← Start over
            </button>
          </div>

          {/* Refine */}
          <div className="pt-8 border-t border-[var(--border-subtle)]">
            <p className="text-[13px] text-[var(--text-quaternary)] mb-5">
              Want to tweak something?
            </p>
            <div className="flex gap-3">
              <div className="flex-1 gradient-border rounded-[var(--radius-full)]">
                <input
                  type="text"
                  value={refineText}
                  onChange={(e) => setRefineText(e.target.value)}
                  placeholder="Make the colors warmer..."
                  className="w-full bg-transparent text-[var(--text-primary)] rounded-[var(--radius-full)] px-5 py-3 text-[14px] placeholder:text-[var(--text-muted)] focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRefine();
                  }}
                />
              </div>
              <button
                onClick={handleRefine}
                disabled={refining || !refineText.trim()}
                className="px-6 py-3 rounded-[var(--radius-full)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[14px] text-[var(--text-primary)] hover:bg-[var(--bg-elevated-hover)] hover:border-[var(--border-hover)] transition-all duration-[var(--duration)] disabled:opacity-20 font-medium"
              >
                {refining ? '...' : 'Refine'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
