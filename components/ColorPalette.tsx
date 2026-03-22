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

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

export default function ColorPalette({ colors }: { colors: BrandColors }) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  async function copyColor(key: string, hex: string) {
    try {
      await navigator.clipboard.writeText(hex);
    } catch {
      // fallback
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-8 sm:gap-6">
      {(Object.keys(colorLabels) as (keyof BrandColors)[]).map((key) => {
        const isCopied = copiedKey === key;
        const isLight = isLightColor(colors[key]);

        return (
          <button
            key={key}
            onClick={() => copyColor(key, colors[key])}
            className="group flex flex-col items-center gap-4"
          >
            {/* Circular swatch */}
            <div className="relative">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border transition-all duration-[var(--duration)] group-hover:scale-110 group-active:scale-95 ${
                  isCopied ? 'copied' : ''
                }`}
                style={{
                  backgroundColor: colors[key],
                  borderColor: isLight ? 'rgba(0,0,0,0.08)' : 'var(--border-subtle)',
                  boxShadow: `0 4px 20px ${colors[key]}20`,
                }}
              />
              {/* Copied checkmark overlay */}
              {isCopied && (
                <div className="absolute inset-0 flex items-center justify-center animate-in animate-in-1">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M5 10L9 14L15 6"
                      stroke={isLight ? '#000' : '#fff'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Label */}
            <div className="text-center">
              <p className="text-[11px] text-[var(--text-quaternary)] mb-0.5 tracking-wide uppercase">
                {colorLabels[key]}
              </p>
              <p className="text-[12px] font-mono text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-[var(--duration)]">
                {isCopied ? 'Copied' : colors[key].toUpperCase()}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
