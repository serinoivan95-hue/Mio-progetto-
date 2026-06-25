import React from 'react';
import { ShieldCheck, ArrowUp, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="bg-notte pt-16 pb-8 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">

          {/* Brand */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <a href="#" className="flex items-center gap-2.5 group" id="footer-logo">
              <div className="w-9 h-9 bg-fuoco flex items-center justify-center text-carta font-display font-black text-sm tracking-wider">
                N
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-base tracking-widest text-carta leading-none">NGM</span>
                <span className="font-mono text-[8px] text-carta/40 uppercase tracking-wider leading-none mt-0.5">New Gen Marketing</span>
              </div>
            </a>
            <p className="font-light text-sm leading-relaxed text-carta/45 max-w-sm">
              Aiutiamo le PMI italiane a liberarsi dal passaparola e costruire sistemi di crescita prevedibili basati su numeri reali.
            </p>
            <div className="flex items-center gap-2 text-xs text-carta/60 border border-carta/10 py-2 px-3 self-start">
              <ShieldCheck className="w-4 h-4 text-fuoco" />
              <span className="font-mono text-[10px] uppercase tracking-widest">Meta Business Partner</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-[10px] text-carta/40 uppercase tracking-widest mb-5">Navigazione</h3>
            <ul className="space-y-3">
              {[
                ['Servizi & Competenze', '#servizi'],
                ['Il Nostro Team', '#chi-siamo'],
                ['Casi Studio', '#cases'],
                ['Come Funziona', '#process'],
                ['Dicono di noi', '#testimonianze'],
                ['Prenota una Call', '#contact'],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} onClick={(e) => handleScrollTo(e, href)}
                    className="font-light text-xs text-carta/40 hover:text-carta transition-colors duration-150">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-[10px] text-carta/40 uppercase tracking-widest mb-5">Contatti</h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-fuoco mt-0.5 flex-shrink-0" />
                <a href="mailto:info@newgenerationmarketing.it" className="text-xs text-carta/40 hover:text-carta transition-colors font-light">
                  info@newgenerationmarketing.it
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-fuoco mt-0.5 flex-shrink-0" />
                <a href="tel:+39029876543" className="text-xs text-carta/40 hover:text-carta transition-colors font-light">
                  +39 02 987 6543
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-fuoco mt-0.5 flex-shrink-0" />
                <span className="text-xs text-carta/40 font-light">Via Montenapoleone 8, Milano</span>
              </li>
            </ul>
          </div>

          {/* Back to top */}
          <div className="md:col-span-2 flex flex-col items-start md:items-end justify-end">
            <button
              onClick={handleScrollToTop}
              className="w-10 h-10 border border-carta/10 flex items-center justify-center text-carta/30 hover:text-fuoco hover:border-fuoco transition-all cursor-pointer"
              title="Torna su"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="border-t border-carta/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[10px] text-carta/25">
            © 2026 New Generation Marketing S.r.l. · P.IVA IT 09876543210
          </span>
          <span className="font-mono text-[10px] text-carta/20 uppercase tracking-widest">
            Performance Marketing · Milano
          </span>
        </div>

      </div>
    </footer>
  );
}
