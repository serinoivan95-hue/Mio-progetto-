import { useState } from 'react';
import { CASE_STUDIES, TEAM_MEMBERS } from '../data';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';

export default function CaseStudies() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? CASE_STUDIES.length - 1 : prev - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => (prev === CASE_STUDIES.length - 1 ? 0 : prev + 1));

  const currentCase = CASE_STUDIES[currentIndex];
  const getTeamMember = (name: string) =>
    TEAM_MEMBERS.find((m) => m.name.toLowerCase() === name.toLowerCase());

  return (
    <section
      id="cases"
      className="py-24 px-6 md:px-10 bg-carta border-b border-bordo"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="font-mono text-[10px] text-grigio uppercase tracking-[0.25em]">Risultati Tangibili</p>
            <h2
              className="font-display font-black text-inchiostro uppercase leading-[0.9] tracking-tight mt-3"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              Storie di successo<br />& Case Study
            </h2>
          </div>
          <div className="flex items-center gap-4" id="case-controls">
            <button
              onClick={handlePrev}
              className="w-10 h-10 border border-bordo flex items-center justify-center text-inchiostro hover:bg-inchiostro hover:text-carta hover:border-inchiostro transition-all duration-200 cursor-pointer"
              aria-label="Precedente"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-grigio tracking-wider">
              {currentIndex + 1} / {CASE_STUDIES.length}
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

        {/* Case display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-bordo" id="case-study-display">

          {/* Image col */}
          <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full overflow-hidden">
            <img
              src={currentCase.imageUrl}
              alt={currentCase.clientName}
              className="absolute inset-0 w-full h-full object-cover brightness-[0.35]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-notte/90 to-transparent" />
            <div className="absolute top-6 left-6">
              <span className="bg-fuoco text-carta font-mono font-bold text-[10px] px-3 py-1 uppercase tracking-wider">
                {currentCase.clientName}
              </span>
            </div>
            <div className="absolute bottom-6 left-6">
              <p className="font-mono text-[9px] text-carta/50 uppercase tracking-widest">Settore</p>
              <p className="font-display font-bold text-carta uppercase text-sm tracking-tight">{currentCase.sector}</p>
            </div>
          </div>

          {/* Detail col */}
          <div className="lg:col-span-7 bg-surface-900 p-8 md:p-10 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-inchiostro uppercase text-xl sm:text-2xl leading-tight tracking-tight mb-4">
                {currentCase.title}
              </h3>
              <p className="text-grigio text-sm leading-relaxed font-light mb-8">
                {currentCase.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {currentCase.results.map((res, idx) => (
                  <div key={idx} className="border-l-2 border-fuoco pl-4">
                    <div className="font-display font-black text-fuoco text-2xl md:text-3xl leading-none mb-1">
                      {res.value}
                    </div>
                    <p className="font-mono text-[9px] text-grigio uppercase tracking-wider leading-tight">
                      {res.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-bordo flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[9px] text-grigio uppercase tracking-widest mb-2">Team:</p>
                <div className="flex flex-wrap gap-2">
                  {currentCase.teamMembers.map((name) => {
                    const details = getTeamMember(name);
                    return (
                      <div
                        key={name}
                        className="flex items-center gap-1.5 border border-bordo px-2.5 py-1"
                        title={details?.role}
                      >
                        <img
                          src={details?.image}
                          alt={name}
                          className="w-4 h-4 object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-mono text-[9px] text-inchiostro uppercase">{name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-1 font-mono text-[10px] font-bold tracking-widest uppercase text-fuoco hover:text-inchiostro transition-colors"
              >
                <span>Voglio un risultato simile</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
