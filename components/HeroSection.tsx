'use client';

import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center px-6 md:px-12 overflow-hidden">
      {/* Gradient Mesh Background */}
      <div className="gradient-mesh" aria-hidden="true">
        <div className="gradient-mesh-extra" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
        {/* Badge */}
        <div className="mb-8 animate-in animate-in-1">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D4AA]/8 border border-[#00D4AA]/15 text-[12px] font-medium text-[#00D4AA]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4AA] animate-pulse" />
            AI-Powered Brand Identity Generator
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-in animate-in-1">
          <span className="block text-[44px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-bold leading-[1.0] tracking-[-0.03em] text-[var(--text-primary)]">
            Your complete
          </span>
          <span className="block text-[44px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-bold leading-[1.0] tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-r from-[#00D4AA] to-[#00D4AA]/50">
            brand identity.
          </span>
        </h1>

        {/* Subtitle — emphasize that this is more than logos */}
        <p className="mt-6 text-[16px] sm:text-[18px] text-[var(--text-tertiary)] leading-relaxed max-w-xl mx-auto animate-in animate-in-2">
          Not just a logo — a complete brand system. AI generates your logo variations, color palette, typography, brand voice, and applies it all to real-world mockups. In 60 seconds.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in animate-in-3">
          <button
            onClick={() => router.push('/create')}
            className="px-10 py-4 rounded-full bg-[#00D4AA] text-[#08080A] text-[16px] font-bold hover:bg-[#00E4BA] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,170,0.3)] active:scale-[0.97]"
          >
            Create Your Brand →
          </button>
          <span className="text-[13px] text-[var(--text-muted)]">Free to preview • No account needed</span>
        </div>

        {/* Preview — show brand-in-context mockup concept, not just logos */}
        <div className="mt-16 animate-in animate-in-4">
          <div className="relative max-w-2xl mx-auto">
            {/* Glow behind the mockup */}
            <div className="absolute inset-0 bg-[#00D4AA]/[0.03] blur-[80px] rounded-full pointer-events-none" />

            {/* Mockup row: logo + business card + social hints */}
            <div className="relative flex items-center justify-center gap-3 sm:gap-5">
              {/* Logo examples */}
              {['/logos/velta.png', '/logos/kindling.png', '/logos/arc.png'].map((src, i) => (
                <div
                  key={src}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-black shadow-2xl transition-transform duration-300 hover:scale-105"
                  style={{
                    transform: i === 1 ? 'translateY(-12px)' : 'translateY(0)',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Subtitle under mockups */}
            <p className="text-[12px] text-[var(--text-muted)] mt-6 flex items-center justify-center gap-4">
              <span>Logo</span>
              <span className="text-[var(--text-muted)]">•</span>
              <span>Colors</span>
              <span className="text-[var(--text-muted)]">•</span>
              <span>Typography</span>
              <span className="text-[var(--text-muted)]">•</span>
              <span>Voice</span>
              <span className="text-[var(--text-muted)]">•</span>
              <span>Mockups</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
