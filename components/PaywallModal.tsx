'use client';

import { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const features = [
  { text: '4 Logo variations (high-res PNG)', icon: '◆' },
  { text: 'Full 6-color palette + usage guide', icon: '◯' },
  { text: 'Typography pairing + specimens', icon: 'Aa' },
  { text: 'Brand voice guidelines', icon: '✎' },
  { text: 'Business card mockup', icon: '▢' },
  { text: 'Social media profile assets', icon: '♡' },
  { text: 'App icon (all sizes)', icon: '⬡' },
  { text: 'Website hero mockup', icon: '◇' },
  { text: 'Brand guidelines PDF', icon: '↓' },
];

export default function PaywallModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#0C0C0F] border border-[var(--border-subtle)] rounded-3xl p-8 sm:p-10 animate-in animate-in-1 shadow-2xl">
        {/* Glow behind modal */}
        <div className="absolute -inset-1 bg-gradient-to-b from-[#00D4AA]/5 to-transparent rounded-3xl blur-xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-[var(--text-quaternary)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] transition-all z-10"
        >
          ✕
        </button>

        {/* Badge */}
        <div className="flex justify-center mb-6 relative">
          <div className="px-4 py-1.5 rounded-full bg-[#00D4AA]/10 border border-[#00D4AA]/20">
            <span className="text-[12px] font-semibold text-[#00D4AA] tracking-wide uppercase">
              ✦ Complete Brand Kit
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.03em] text-[var(--text-primary)] text-center mb-2 relative">
          Unlock Your Brand
        </h3>
        <p className="text-center text-[var(--text-tertiary)] mb-8 text-[14px] relative">
          Logo, identity, and real-world mockups — ready to use
        </p>

        {/* Price */}
        <div className="text-center mb-8 relative">
          <span className="text-[52px] font-bold text-[var(--text-primary)] tracking-[-0.03em]">$9</span>
          <span className="text-[24px] text-[var(--text-quaternary)]">.99</span>
          <p className="text-[13px] text-[var(--text-muted)] mt-1">One-time payment • Instant download</p>
        </div>

        {/* Features */}
        <div className="space-y-2.5 mb-8 relative">
          {features.map((feature) => (
            <div key={feature.text} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-lg bg-[#00D4AA]/8 flex items-center justify-center flex-shrink-0">
                <span className="text-[10px] text-[#00D4AA]">{feature.icon}</span>
              </div>
              <span className="text-[13px] text-[var(--text-secondary)]">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="relative w-full py-4 rounded-2xl bg-[#00D4AA] text-[#08080A] text-[16px] font-bold hover:bg-[#00E4BA] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,170,0.3)] active:scale-[0.98]">
          Buy Now — $9.99
        </button>

        {/* Secondary CTA */}
        <button className="w-full mt-3 py-3 text-[14px] text-[var(--text-quaternary)] hover:text-[var(--text-secondary)] transition-colors relative">
          Or start free trial
        </button>
      </div>
    </div>
  );
}
