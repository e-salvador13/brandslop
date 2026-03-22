'use client';

import { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const features = [
  '4 Logo variations (high-res PNG)',
  'Full 6-color palette',
  'Typography pairing guide',
  'Brand voice guidelines',
  'Social media assets',
  'Brand guidelines PDF',
];

export default function PaywallModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#0F0F12] border border-[var(--border-subtle)] rounded-3xl p-8 sm:p-10 animate-in animate-in-1">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-[var(--text-quaternary)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] transition-all"
        >
          ✕
        </button>

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="px-4 py-1.5 rounded-full bg-[#00D4AA]/10 border border-[#00D4AA]/20">
            <span className="text-[12px] font-semibold text-[#00D4AA] tracking-wide uppercase">
              ✦ Premium
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.03em] text-[var(--text-primary)] text-center mb-2">
          Unlock Your Brand Kit
        </h3>
        <p className="text-center text-[var(--text-tertiary)] mb-8">
          Everything you need to launch your brand
        </p>

        {/* Price */}
        <div className="text-center mb-8">
          <span className="text-[48px] font-bold text-[var(--text-primary)] tracking-[-0.03em]">
            $9
          </span>
          <span className="text-[24px] text-[var(--text-quaternary)]">.99</span>
          <p className="text-[13px] text-[var(--text-muted)] mt-1">One-time payment</p>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-8">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[#00D4AA]/15 flex items-center justify-center flex-shrink-0">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#00D4AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-[14px] text-[var(--text-secondary)]">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="w-full py-4 rounded-2xl bg-[#00D4AA] text-[#08080A] text-[16px] font-bold hover:bg-[#00E4BA] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,170,0.3)] active:scale-[0.98]">
          Buy Now — $9.99
        </button>

        {/* Secondary CTA */}
        <button className="w-full mt-3 py-3 text-[14px] text-[var(--text-quaternary)] hover:text-[var(--text-secondary)] transition-colors">
          Or start free trial
        </button>
      </div>
    </div>
  );
}
