import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Servizi',       href: '#servizi' },
    { name: 'Chi Siamo',     href: '#chi-siamo' },
    { name: 'Case Study',    href: '#cases' },
    { name: 'Come Funziona', href: '#process' },
    { name: 'Dicono di noi', href: '#testimonianze' },
    { name: 'Contatti',      href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-carta/95 backdrop-blur-sm py-4 border-b border-bordo'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group" id="logo-link">
          <div className="w-8 h-8 bg-inchiostro flex items-center justify-center text-carta font-display font-black text-sm tracking-wider group-hover:bg-fuoco transition-colors duration-200">
            N
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-base tracking-widest text-inchiostro leading-none">NGM</span>
            <span className="font-mono text-[8px] text-grigio uppercase tracking-wider leading-none mt-0.5">New Gen Marketing</span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" id="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-xs font-medium text-grigio hover:text-inchiostro transition-colors duration-150 uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center" id="header-cta-container">
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="group flex items-center gap-1.5 px-5 py-2.5 bg-inchiostro text-carta text-xs font-bold uppercase tracking-widest hover:bg-fuoco transition-colors duration-200"
          >
            <span>Conosciamoci</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-inchiostro hover:text-fuoco transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-carta border-b border-bordo shadow-lg" id="mobile-nav-drawer">
          <div className="px-6 py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium text-inchiostro/70 hover:text-inchiostro py-1.5 border-b border-bordo hover:border-fuoco transition-all duration-150 uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="w-full text-center mt-2 px-6 py-3.5 bg-inchiostro text-carta font-bold text-sm tracking-wider uppercase hover:bg-fuoco transition-colors duration-200"
            >
              Conosciamoci Subito
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
