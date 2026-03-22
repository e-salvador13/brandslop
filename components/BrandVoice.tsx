'use client';

import { BrandVoice as BrandVoiceType } from '@/lib/types';

export default function BrandVoice({ voice }: { voice: BrandVoiceType }) {
  return (
    <div className="space-y-14">
      {/* Adjectives */}
      <div>
        <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--text-quaternary)] mb-6 font-medium">
          Brand Personality
        </p>
        <div className="flex flex-wrap gap-3">
          {voice.adjectives.map((adj) => (
            <span
              key={adj}
              className="px-5 py-2.5 rounded-[var(--radius-full)] border border-[var(--border-subtle)] text-[14px] text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)] transition-all duration-[var(--duration)]"
            >
              {adj}
            </span>
          ))}
        </div>
      </div>

      {/* Do / Don't */}
      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-emerald-400/70 mb-6 flex items-center gap-2 font-medium">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Do say
          </p>
          <div className="space-y-4">
            {voice.doSay.map((phrase, i) => (
              <p
                key={i}
                className="text-[16px] leading-[1.5] text-[var(--text-secondary)] pl-4 border-l-2 border-emerald-500/20"
              >
                &ldquo;{phrase}&rdquo;
              </p>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-red-400/70 mb-6 flex items-center gap-2 font-medium">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Don&apos;t say
          </p>
          <div className="space-y-4">
            {voice.dontSay.map((phrase, i) => (
              <p
                key={i}
                className="text-[16px] leading-[1.5] text-[var(--text-quaternary)] pl-4 border-l-2 border-red-500/20 line-through decoration-red-500/20"
              >
                &ldquo;{phrase}&rdquo;
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
