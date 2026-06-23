export default function CTA() {
  return (
    <section id="contatto" className="bg-gray-950 py-24 lg:py-36 px-6 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[160px] opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <span className="text-indigo-400 text-sm font-medium tracking-[0.2em] uppercase">
          Lavoriamo insieme
        </span>

        <h2
          className="font-syne font-extrabold text-white mt-6 mb-8 leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
        >
          Hai un progetto
          <br />
          in mente?
        </h2>

        <p className="text-gray-400 text-lg lg:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
          Raccontaci la tua idea. Ti risponderemo entro 24 ore con una
          proposta personalizzata e senza impegno.
        </p>

        <a
          href="mailto:hello@novaagency.it"
          className="group inline-flex items-center gap-3 bg-indigo-500 text-white font-semibold text-lg px-10 py-5 rounded-full hover:bg-indigo-400 transition-all duration-300"
        >
          Scrivici
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>

        <div className="mt-16 pt-16 border-t border-white/10 grid sm:grid-cols-3 gap-8 text-center">
          {[
            { value: "48h", label: "Tempo medio di risposta" },
            { value: "100%", label: "Clienti soddisfatti" },
            { value: "0€", label: "Prima consulenza" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-syne font-bold text-4xl text-white mb-1">
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
