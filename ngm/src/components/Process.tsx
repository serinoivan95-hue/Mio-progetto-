import { CalendarRange, Search, Rocket, BarChart3 } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      num: '01',
      icon: <CalendarRange className="w-5 h-5" />,
      title: 'Chiamata Strategica',
      desc: 'Una call di 30 minuti per analizzare la tua offerta, i competitor e verificare i presupposti per una collaborazione redditizia.',
    },
    {
      num: '02',
      icon: <Search className="w-5 h-5" />,
      title: 'Studio & Audit',
      desc: 'Audit di mercato personalizzato: pubblico ideale, canali idonei e piano media con allocazione budget ottimale.',
    },
    {
      num: '03',
      icon: <Rocket className="w-5 h-5" />,
      title: 'Setup & Lancio',
      desc: 'Produciamo creatività video UGC, sviluppiamo landing page, configuriamo i tracciamenti API e lanciamo le prime campagne.',
    },
    {
      num: '04',
      icon: <BarChart3 className="w-5 h-5" />,
      title: 'Scaling Continuo',
      desc: 'Monitoraggio giornaliero delle metriche. Spengiamo gli annunci inefficaci e riallochiamo il budget su quelli vincenti.',
    },
  ];

  return (
    <section
      id="process"
      className="py-24 px-6 md:px-10 bg-surface-900 border-b border-bordo"
    >
      <div className="max-w-7xl mx-auto">

        <div className="mb-16">
          <p className="font-mono text-[10px] text-grigio uppercase tracking-[0.25em]">Il Percorso</p>
          <h2
            className="font-display font-black text-inchiostro uppercase leading-[0.9] tracking-tight mt-3"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Come funziona<br />la nostra partnership
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y md:divide-y-0 lg:divide-x divide-bordo border border-bordo" id="process-steps">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-8 flex flex-col gap-6 group hover:bg-inchiostro transition-colors duration-200"
            >
              <div className="flex items-start justify-between">
                <span
                  className="font-display font-black text-bordo group-hover:text-fuoco transition-colors duration-200 leading-none"
                  style={{ fontSize: '3.5rem' }}
                >
                  {step.num}
                </span>
                <div className="text-grigio group-hover:text-carta/50 transition-colors duration-200 mt-1">
                  {step.icon}
                </div>
              </div>

              <div>
                <h3 className="font-display font-bold text-inchiostro group-hover:text-carta uppercase text-xl tracking-tight mb-3 transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="text-grigio group-hover:text-carta/60 text-sm leading-relaxed font-light transition-colors duration-200">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
