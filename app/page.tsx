import BrandInput from '@/components/BrandInput';
import ExampleBrands from '@/components/ExampleBrands';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12">
        <div className="max-w-4xl mx-auto w-full text-center">
          {/* Headline */}
          <h1 className="text-[48px] sm:text-[64px] md:text-[80px] font-semibold leading-[1.0] tracking-[-0.03em] text-white mb-4 animate-fade-in">
            Your brand.
            <br />
            <span className="text-[#86868B]">60 seconds.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[17px] sm:text-[19px] text-[#86868B] leading-[1.47] max-w-md mx-auto mb-12 animate-fade-in-delay-1">
            Describe your idea. Get a complete brand identity.
          </p>

          {/* Input */}
          <BrandInput />
        </div>
      </section>

      {/* Examples */}
      <section className="pb-32 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[28px] sm:text-[36px] font-semibold tracking-tight text-center mb-4">
            See what&apos;s possible
          </h2>
          <p className="text-[17px] text-[#86868B] text-center mb-16 max-w-md mx-auto">
            Real brand identities, generated in seconds.
          </p>
          <ExampleBrands />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1a1a1a] py-8 px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <p className="text-[12px] text-[#555]">BrandSlop</p>
          <p className="text-[12px] text-[#555]">Built with obsessive care.</p>
        </div>
      </footer>
    </main>
  );
}
