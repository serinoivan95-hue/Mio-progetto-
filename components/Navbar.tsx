"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        <a href="#" className="font-syne font-bold text-xl tracking-tight text-gray-900">
          NOVA<span className="text-indigo-500">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <li>
            <a href="#servizi" className="hover:text-indigo-500 transition-colors duration-200">
              Servizi
            </a>
          </li>
          <li>
            <a href="#come-lavoriamo" className="hover:text-indigo-500 transition-colors duration-200">
              Come lavoriamo
            </a>
          </li>
          <li>
            <a href="#portfolio" className="hover:text-indigo-500 transition-colors duration-200">
              Portfolio
            </a>
          </li>
        </ul>

        <a
          href="#contatto"
          className="bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-indigo-500 transition-colors duration-300"
        >
          Inizia un progetto
        </a>
      </nav>
    </header>
  );
}
