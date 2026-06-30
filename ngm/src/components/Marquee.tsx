import { MARQUEE_CLIENTS } from '../data';

export default function Marquee() {
  const tripled = [...MARQUEE_CLIENTS, ...MARQUEE_CLIENTS, ...MARQUEE_CLIENTS];

  return (
    <section
      id="marquee"
      className="relative py-6 bg-notte border-y border-white/5 overflow-hidden select-none"
    >
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-notte to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-notte to-transparent z-10 pointer-events-none" />

      <div className="flex overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-10">
          {tripled.map((client, index) => (
            <div
              key={`${client}-${index}`}
              className="flex items-center gap-10 font-display font-bold text-[15px] sm:text-[19px] text-carta/35 hover:text-carta/70 tracking-[0.18em] uppercase transition-colors duration-200"
            >
              <span>{client}</span>
              <span className="w-1.5 h-1.5 bg-fuoco flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
