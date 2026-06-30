import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CtaGreen() {
  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.querySelector('#contact');
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="cta-green"
      className="py-28 px-6 md:px-10 bg-notte overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-12">

        <div className="flex-1">
          <p className="font-mono text-[10px] text-fuoco uppercase tracking-[0.28em] mb-6">
            Pronto per il salto?
          </p>
          <h2
            className="font-display font-black text-carta uppercase leading-[0.88] tracking-tight"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            Smetti di sperare<br />
            nel passaparola.<br />
            <span className="text-fuoco">Pianifica la crescita.</span>
          </h2>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-6 lg:pb-2">
          <p className="text-carta/50 text-sm leading-relaxed max-w-sm font-light lg:text-right">
            Una call strategica gratuita di 30 minuti. Analizziamo il tuo mercato e mostriamo come costruire un canale di acquisizione automatizzato.
          </p>
          <a
            href="#contact"
            onClick={handleScrollToContact}
            className="inline-flex items-center gap-3 px-8 py-4 bg-fuoco text-carta text-xs font-bold uppercase tracking-widest hover:bg-brand-light transition-colors duration-200"
          >
            Prenota la Call Gratuita
            <ArrowRight className="w-4 h-4" />
          </a>
          <span className="font-mono text-[9px] text-carta/25 uppercase tracking-widest">
            Nessun impegno · Puro valore strategico
          </span>
        </div>

      </div>
    </section>
  );
}
