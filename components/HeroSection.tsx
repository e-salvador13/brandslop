'use client';

import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12">
      {/* Gradient Mesh Background */}
      <div className="gradient-mesh" aria-hidden="true">
        <div className="gradient-mesh-extra" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
        {/* Badge */}
        <div className="mb-8 animate-in animate-in-1">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D4AA]/8 border border-[#00D4AA]/15 text-[12px] font-medium text-[#00D4AA]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4AA] animate-pulse" />
            AI-Powered Brand Generator
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-in animate-in-1">
          <span className="block text-[44px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-bold leading-[1.0] tracking-[-0.03em] text-[var(--text-primary)]">
            Your brand identity.
          </span>
          <span className="block text-[44px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-bold leading-[1.0] tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-r from-[#00D4AA] to-[#00D4AA]/50">
            In 60 seconds.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-[16px] sm:text-[18px] text-[var(--text-tertiary)] leading-relaxed max-w-lg mx-auto animate-in animate-in-2">
          AI-powered branding for startups, creators, and small businesses.
          Logo, colors, typography, and voice — all in one kit.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in animate-in-3">
          <button
            onClick={() => router.push('/create')}
            className="px-10 py-4 rounded-full bg-[#00D4AA] text-[#08080A] text-[16px] font-bold hover:bg-[#00E4BA] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,170,0.3)] active:scale-[0.97]"
          >
            Create Your Brand →
          </button>
          <span className="text-[13px] text-[var(--text-muted)]">Free to try • No account needed</span>
        </div>

        {/* Preview mockup — show example logos */}
        <div className="mt-16 animate-in animate-in-4">
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            {['/logos/velta.png', '/logos/kindling.png', '/logos/arc.png'].map((src, i) => (
              <div
                key={src}
                className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-black shadow-2xl"
                style={{
                  animationDelay: `${400 + i * 100}ms`,
                  transform: i === 1 ? 'translateY(-8px)' : 'translateY(0)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
