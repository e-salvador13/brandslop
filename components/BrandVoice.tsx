'use client';

import { BrandVoice as BrandVoiceType } from '@/lib/types';

export default function BrandVoice({ voice }: { voice: BrandVoiceType }) {
  return (
    <div className="space-y-12">
      {/* Adjectives */}
      <div>
        <p className="text-[12px] uppercase tracking-[0.1em] text-[#86868B] mb-6">
          Brand Personality
        </p>
        <div className="flex flex-wrap gap-3">
          {voice.adjectives.map((adj) => (
            <span
              key={adj}
              className="px-5 py-2.5 rounded-full border border-[#333] text-[15px] text-[#f5f5f7] hover:border-[#555] transition-colors"
            >
              {adj}
            </span>
          ))}
        </div>
      </div>

      {/* Do / Don't */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <p className="text-[12px] uppercase tracking-[0.1em] text-emerald-400/80 mb-5 flex items-center gap-2">
            <span>✓</span> Do say
          </p>
          <div className="space-y-3">
            {voice.doSay.map((phrase, i) => (
              <p
                key={i}
                className="text-[17px] leading-[1.47] text-[#ccc] pl-4 border-l-2 border-emerald-500/30"
              >
                &ldquo;{phrase}&rdquo;
              </p>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[12px] uppercase tracking-[0.1em] text-red-400/80 mb-5 flex items-center gap-2">
            <span>✗</span> Don&apos;t say
          </p>
          <div className="space-y-3">
            {voice.dontSay.map((phrase, i) => (
              <p
                key={i}
                className="text-[17px] leading-[1.47] text-[#666] pl-4 border-l-2 border-red-500/30 line-through decoration-red-500/30"
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
