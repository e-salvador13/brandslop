'use client';

export default function SocialProof() {
  return (
    <section className="py-12 px-6 border-y border-[var(--border-subtle)]">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
        <div className="flex items-center gap-2">
          <span className="text-[24px] font-bold text-[var(--text-primary)]">10,000+</span>
          <span className="text-[14px] text-[var(--text-quaternary)]">brands created</span>
        </div>

        <div className="hidden sm:block w-px h-8 bg-[var(--border-subtle)]" />

        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#FBBF24">
                <path d="M8 0l2.47 4.94L16 5.76l-4 3.9.94 5.5L8 12.68 3.06 15.16 4 9.66 0 5.76l5.53-.82L8 0z" />
              </svg>
            ))}
          </div>
          <span className="text-[14px] text-[var(--text-quaternary)]">4.9/5 rating</span>
        </div>

        <div className="hidden sm:block w-px h-8 bg-[var(--border-subtle)]" />

        <div className="text-[14px] text-[var(--text-quaternary)]">
          Trusted by entrepreneurs worldwide
        </div>
      </div>
    </section>
  );
}
