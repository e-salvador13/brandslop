'use client';

import { useState } from 'react';
import { BrandColors } from '@/lib/types';

const colorLabels: Record<keyof BrandColors, string> = {
  primary: 'Primary',
  secondary: 'Secondary',
  accent: 'Accent',
  background: 'Background',
  text: 'Text',
  muted: 'Muted',
};

export default function ColorPalette({ colors }: { colors: BrandColors }) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  async function copyColor(key: string, hex: string) {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch {
      // Fallback for older browsers
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    }
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6">
      {(Object.keys(colorLabels) as (keyof BrandColors)[]).map((key) => (
        <button
          key={key}
          onClick={() => copyColor(key, colors[key])}
          className="group flex flex-col items-center gap-3 transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <div
            className={`w-full aspect-square rounded-2xl border border-white/5 shadow-lg transition-shadow duration-300 group-hover:shadow-xl ${
              copiedKey === key ? 'copied' : ''
            }`}
            style={{ backgroundColor: colors[key] }}
          />
          <div className="text-center">
            <p className="text-[12px] text-[#86868B] mb-0.5">
              {colorLabels[key]}
            </p>
            <p className="text-[13px] font-mono text-[#f5f5f7]">
              {copiedKey === key ? 'Copied!' : colors[key].toUpperCase()}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
