'use client';

import { useEffect, useRef } from 'react';
import BrandInput from '@/components/BrandInput';
import ExampleBrands from '@/components/ExampleBrands';
import HowItWorks from '@/components/HowItWorks';

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function Home() {
  const scrollRef = useScrollReveal();

  return (
    <main className="min-h-screen" ref={scrollRef}>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12">
        {/* Gradient Mesh Background */}
        <div className="gradient-mesh" aria-hidden="true">
          <div className="gradient-mesh-extra" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
          {/* Headline */}
          <h1 className="animate-in animate-in-1">
            <span className="block text-[44px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-bold leading-[1.0] tracking-[-0.03em] text-[var(--text-primary)]">
              Your brand.
            </span>
            <span className="block text-[44px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-bold leading-[1.0] tracking-[-0.03em] text-[var(--text-tertiary)]">
              60 seconds.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-[16px] sm:text-[17px] text-[var(--text-tertiary)] leading-relaxed max-w-md mx-auto animate-in animate-in-2">
            Describe your vision. Get a complete identity.
          </p>

          {/* Input */}
          <div className="mt-12 animate-in animate-in-3">
            <BrandInput />
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-24 sm:py-32 px-6 md:px-12">
        <div className="max-w-5xl mx-auto reveal">
          <HowItWorks />
        </div>
      </section>

      {/* ═══ EXAMPLES ═══ */}
      <section className="py-24 sm:py-32 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[var(--text-quaternary)] mb-4">
              Examples
            </p>
            <h2 className="text-[28px] sm:text-[40px] font-bold tracking-[-0.03em] text-[var(--text-primary)]">
              See what&apos;s possible
            </h2>
          </div>
          <div className="reveal">
            <ExampleBrands />
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-[var(--border-subtle)] py-8 px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <p className="text-[13px] font-medium text-[var(--text-quaternary)] tracking-[-0.01em]">
            BrandSlop
          </p>
          <div className="flex gap-6">
            <span className="text-[12px] text-[var(--text-muted)]">Built with obsessive care</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
