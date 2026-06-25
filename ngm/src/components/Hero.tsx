import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center bg-carta pt-28 pb-20 px-6 md:px-10 overflow-hidden"
    >
      {/* Subtle grid texture — structural, not decorative */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(17,16,16,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(17,16,16,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Left zone: statement */}
          <div className="lg:col-span-7">
            <p className="font-mono text-[10px] font-medium text-grigio uppercase tracking-[0.28em] mb-8">
              Meta Business Partner · Milano
            </p>

            <h1
              className="font-display font-black text-inchiostro leading-[0.88] tracking-tight uppercase"
              style={{ fontSize: 'clamp(3.8rem, 9vw, 7.5rem)' }}
            >
              Trasformiamo<br />
              budget<br />
              in clienti<br />
              <span className="text-fuoco">reali.</span>
            </h1>

            <p className="mt-8 text-grigio text-base md:text-lg leading-relaxed max-w-md font-light">
              Non aspettiamo il passaparola. Costruiamo sistemi di acquisizione automatici basati su dati misurabili e campagne che si pagano da sole.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-inchiostro text-carta text-xs font-bold uppercase tracking-widest hover:bg-fuoco transition-colors duration-200"
              >
                Conosciamoci
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#servizi"
                onClick={(e) => handleScrollTo(e, '#servizi')}
                className="inline-flex items-center gap-3 px-8 py-4 border border-bordo text-inchiostro text-xs font-bold uppercase tracking-widest hover:border-inchiostro transition-colors duration-200"
              >
                I Nostri Servizi
              </a>
            </div>
          </div>

          {/* Right zone: the metric ticker — signature element */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div>
              <div
                className="font-display font-black text-inchiostro leading-none tracking-tight"
                style={{ fontSize: 'clamp(4.5rem, 9vw, 8rem)' }}
              >
                +10M€
              </div>
              <div className="h-[2px] w-full bg-fuoco mt-2" />
              <p className="mt-3 font-mono text-[10px] text-grigio uppercase tracking-[0.2em]">
                Investiti in campagne gestite per i clienti
              </p>
            </div>

            <div>
              <div
                className="font-display font-black text-inchiostro leading-none tracking-tight"
                style={{ fontSize: 'clamp(4.5rem, 9vw, 8rem)' }}
              >
                85%
              </div>
              <div className="h-[2px] w-full bg-fuoco mt-2" />
              <p className="mt-3 font-mono text-[10px] text-grigio uppercase tracking-[0.2em]">
                Esigenze PMI coperte dal nostro sistema
              </p>
            </div>

            <div>
              <div
                className="font-display font-black text-inchiostro leading-none tracking-tight"
                style={{ fontSize: 'clamp(4.5rem, 9vw, 8rem)' }}
              >
                x5.4
              </div>
              <div className="h-[2px] w-full bg-fuoco mt-2" />
              <p className="mt-3 font-mono text-[10px] text-grigio uppercase tracking-[0.2em]">
                ROAS medio su campagne ottimizzate
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
