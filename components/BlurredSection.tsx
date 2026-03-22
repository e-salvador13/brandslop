'use client';

interface Props {
  children: React.ReactNode;
  label: string;
  onUnlock: () => void;
}

export default function BlurredSection({ children, label, onUnlock }: Props) {
  return (
    <div className="relative group">
      {/* Content (blurred) */}
      <div className="filter blur-[8px] select-none pointer-events-none opacity-70">
        {children}
      </div>

      {/* Lock overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#08080A]/40 backdrop-blur-[2px] rounded-2xl">
        <div className="flex flex-col items-center gap-3 cursor-pointer" onClick={onUnlock}>
          <div className="w-12 h-12 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center group-hover:border-[#00D4AA]/30 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,212,170,0.1)]">
            <span className="text-[20px]">🔒</span>
          </div>
          <p className="text-[13px] font-medium text-[var(--text-secondary)]">{label}</p>
          <button className="px-5 py-2 rounded-full bg-[#00D4AA]/10 border border-[#00D4AA]/20 text-[12px] font-semibold text-[#00D4AA] hover:bg-[#00D4AA]/20 transition-all">
            Unlock
          </button>
        </div>
      </div>
    </div>
  );
}
