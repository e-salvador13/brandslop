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
  bg = 'black',
}: {
  children: React.ReactNode;
  title?: string;
  bg?: 'black' | 'dark';
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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`reveal py-16 sm:py-24 px-6 md:px-12 ${
        bg === 'dark' ? 'bg-[#0a0a0a]' : 'bg-black'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {title && (
          <p className="text-[12px] uppercase tracking-[0.15em] text-[#86868B] mb-8">
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
          <p className="text-[20px] text-[#86868B] mb-4">Brand not found</p>
          <button
            onClick={() => router.push('/')}
            className="text-[15px] text-[#0071E3] hover:underline"
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
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="text-[14px] text-[#86868B] hover:text-white transition-colors"
          >
            ← BrandSlop
          </button>
          <p className="text-[14px] text-[#555]">{brand.brandName}</p>
        </div>
      </nav>

      {/* Brand Header */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="animate-fade-in">
          <span className="text-6xl mb-6 block">{brand.logoIcon}</span>
          <h1
            className="text-[56px] sm:text-[72px] md:text-[96px] font-bold leading-[1.0] tracking-[-0.03em] mb-4"
            style={{
              fontFamily: `"${brand.typography.heading.family}", sans-serif`,
              fontWeight: brand.typography.heading.weight,
            }}
          >
            {brand.brandName}
          </h1>
          <p
            className="text-[20px] sm:text-[24px] text-[#86868B]"
            style={{
              fontFamily: `"${brand.typography.body.family}", sans-serif`,
            }}
          >
            {brand.tagline}
          </p>
        </div>
      </section>

      {/* Color Palette */}
      <Section title="Color Palette" bg="dark">
        <ColorPalette colors={brand.colors} />
      </Section>

      {/* Typography */}
      <Section title="Typography">
        <TypographyPreview typography={brand.typography} />
      </Section>

      {/* Logo Mark */}
      <Section title="Logo Mark" bg="dark">
        <LogoPreview brand={brand} />
      </Section>

      {/* Social Preview */}
      <Section title="Social Preview">
        <SocialPreview brand={brand} />
      </Section>

      {/* Business Card */}
      <Section title="Business Card" bg="dark">
        <BusinessCard brand={brand} />
      </Section>

      {/* Brand Voice */}
      <Section title="Brand Voice">
        <BrandVoice voice={brand.voice} />
      </Section>

      {/* Actions */}
      <section className="py-24 px-6 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Download */}
          <button
            onClick={() =>
              alert(
                'Brand Kit downloads are coming soon. For now, enjoy the preview!'
              )
            }
            className="w-full sm:w-auto px-10 py-4 rounded-full text-[17px] font-medium text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background:
                'linear-gradient(135deg, #4F46E5 0%, #6366F1 50%, #818CF8 100%)',
            }}
          >
            Download Brand Kit — $19
          </button>

          {/* Regenerate */}
          <div>
            <button
              onClick={() => router.push('/')}
              className="text-[15px] text-[#86868B] hover:text-white transition-colors"
            >
              ← Start over
            </button>
          </div>

          {/* Refine */}
          <div className="pt-8 border-t border-[#1a1a1a]">
            <p className="text-[14px] text-[#86868B] mb-4">
              Want to tweak something?
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                value={refineText}
                onChange={(e) => setRefineText(e.target.value)}
                placeholder="Make the colors warmer..."
                className="flex-1 bg-[#111] text-[#f5f5f7] rounded-full px-5 py-3 text-[15px] placeholder:text-[#444] focus:outline-none border border-[#222] focus:border-[#444] transition-colors"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRefine();
                }}
              />
              <button
                onClick={handleRefine}
                disabled={refining || !refineText.trim()}
                className="px-6 py-3 rounded-full bg-[#1a1a1a] text-[15px] text-[#f5f5f7] hover:bg-[#222] transition-colors disabled:opacity-30"
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
