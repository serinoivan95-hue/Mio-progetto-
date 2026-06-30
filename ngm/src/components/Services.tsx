import { useState } from 'react';
import { SERVICES } from '../data';
import { ArrowRight } from 'lucide-react';

type CategoryFilter = 'all' | 'advertising' | 'content' | 'strategy' | 'technical';

const categoryLabels: Record<string, string> = {
  advertising: 'Advertising',
  content:     'Creatività',
  strategy:    'Strategia',
  technical:   'Tecnologia',
};

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [openId, setOpenId] = useState<string | null>(null);

  const categories: { label: string; value: CategoryFilter }[] = [
    { label: 'Tutti',        value: 'all' },
    { label: 'Advertising',  value: 'advertising' },
    { label: 'Creatività',   value: 'content' },
    { label: 'Strategia',    value: 'strategy' },
    { label: 'Tecnologia',   value: 'technical' },
  ];

  const filtered =
    activeCategory === 'all' ? SERVICES : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="servizi" className="py-24 px-6 md:px-10 bg-surface-900 border-b border-bordo">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <p className="font-mono text-[10px] text-grigio uppercase tracking-[0.25em]">Cosa Facciamo</p>
            <h2
              className="font-display font-black text-inchiostro uppercase leading-[0.9] tracking-tight mt-3"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              Come ti aiutiamo<br />a crescere
            </h2>
          </div>
          <p className="text-grigio text-sm leading-relaxed max-w-sm font-light">
            Selezioniamo solo i canali necessari per raggiungere i tuoi obiettivi. Niente sprechi, niente vanità metriche.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10" id="services-tabs">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 text-[10px] font-mono font-bold tracking-widest uppercase border transition-all duration-200 cursor-pointer ${
                activeCategory === cat.value
                  ? 'bg-inchiostro border-inchiostro text-carta'
                  : 'bg-transparent border-bordo text-grigio hover:border-inchiostro hover:text-inchiostro'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Service list */}
        <div className="divide-y divide-bordo border-y border-bordo" id="services-grid">
          {filtered.map((service) => (
            <div key={service.id} id={`service-card-${service.id}`}>
              <button
                className="w-full text-left py-6 flex items-start justify-between gap-6 group cursor-pointer"
                onClick={() => setOpenId(openId === service.id ? null : service.id)}
                aria-expanded={openId === service.id}
              >
                <div className="flex items-start gap-6 flex-1 min-w-0">
                  <span className="font-mono text-[9px] text-grigio uppercase tracking-widest pt-1 flex-shrink-0 w-20">
                    {categoryLabels[service.category]}
                  </span>
                  <h3 className="font-display font-bold text-inchiostro uppercase text-xl md:text-2xl tracking-tight leading-tight group-hover:text-fuoco transition-colors duration-150">
                    {service.title}
                  </h3>
                </div>
                <ArrowRight
                  className={`w-5 h-5 text-grigio flex-shrink-0 mt-1 transition-transform duration-200 ${
                    openId === service.id ? 'rotate-90 text-fuoco' : 'group-hover:translate-x-1'
                  }`}
                />
              </button>

              {openId === service.id && (
                <div className="pb-8 pl-0 md:pl-26 flex flex-col md:flex-row gap-6">
                  <div className="md:ml-26 flex-1">
                    <p className="text-grigio text-sm leading-relaxed font-light mb-4">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[9px] border border-bordo text-grigio px-2.5 py-1 uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
