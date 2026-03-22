'use client';

interface Props {
  children: React.ReactNode;
  label: string;
  onUnlock: () => void;
}

export default function BlurredSection({ children, label, onUnlock }: Props) {
  return (
    <div className="relative group cursor-pointer" onClick={onUnlock}>
      {/* Content (blurred) */}
      <div className="filter blur-[8px] select-none pointer-events-none opacity-60 transition-all duration-300 group-hover:blur-[10px] group-hover:opacity-50">
        {children}
      </div>

      {/* Lock overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl transition-all duration-300">
        {/* Subtle gradient veil */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#08080A]/20 via-[#08080A]/40 to-[#08080A]/20" />

        <div className="relative flex flex-col items-center gap-3">
          {/* Glowing lock icon */}
          <div className="w-14 h-14 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[var(--border-subtle)] flex items-center justify-center group-hover:border-[#00D4AA]/30 group-hover:shadow-[0_0_30px_rgba(0,212,170,0.1)] transition-all duration-500">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00D4AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover:opacity-100 transition-opacity">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <p className="text-[13px] font-medium text-[var(--text-secondary)] text-center max-w-[200px]">{label}</p>

          <div className="px-5 py-2.5 rounded-full bg-[#00D4AA]/10 border border-[#00D4AA]/20 text-[12px] font-semibold text-[#00D4AA] group-hover:bg-[#00D4AA]/20 group-hover:border-[#00D4AA]/40 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,212,170,0.15)]">
            ✦ Unlock with Brand Kit
          </div>
        </div>
      </div>
    </div>
  );
}
