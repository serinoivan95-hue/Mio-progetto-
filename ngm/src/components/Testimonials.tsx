import { useState } from 'react';
import { TESTIMONIALS } from '../data';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () =>
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  const handleNext = () =>
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));

  const current = TESTIMONIALS[activeIndex];

  return (
    <section
      id="testimonianze"
      className="py-24 px-6 md:px-10 bg-carta border-b border-bordo"
    >
      <div className="max-w-5xl mx-auto">

        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] text-grigio uppercase tracking-[0.25em]">Dicono di Noi</p>
            <h2
              className="font-display font-black text-inchiostro uppercase leading-[0.9] tracking-tight mt-3"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              La voce dei nostri<br />partner commerciali
            </h2>
          </div>
          <div className="flex items-center gap-3" id="testimonial-controls">
            <button
              onClick={handlePrev}
              className="w-10 h-10 border border-bordo flex items-center justify-center text-inchiostro hover:bg-inchiostro hover:text-carta hover:border-inchiostro transition-all duration-200 cursor-pointer"
              aria-label="Precedente"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-grigio tracking-wider">
              {activeIndex + 1} / {TESTIMONIALS.length}
            </span>
            <button
              onClick={handleNext}
              className="w-10 h-10 border border-bordo flex items-center justify-center text-inchiostro hover:bg-inchiostro hover:text-carta hover:border-inchiostro transition-all duration-200 cursor-pointer"
              aria-label="Successivo"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="border-l-4 border-fuoco pl-8 md:pl-12" id="testimonial-carousel">
          <blockquote className="font-light text-inchiostro text-xl md:text-2xl leading-relaxed mb-8">
            "{current.quote}"
          </blockquote>

          <div className="flex items-center gap-4">
            <img
              src={current.avatar}
              alt={current.name}
              className="w-12 h-12 object-cover grayscale"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="font-display font-bold text-fuoco uppercase tracking-tight">{current.name}</p>
              <p className="font-mono text-[10px] text-grigio uppercase tracking-wider">
                {current.role} · {current.company}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
