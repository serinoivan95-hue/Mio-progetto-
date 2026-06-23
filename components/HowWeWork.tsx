const steps = [
  {
    number: "01",
    title: "Ascoltiamo",
    description:
      "Iniziamo con una chiamata conoscitiva gratuita. Capiamo il tuo business, gli obiettivi e cosa serve davvero per raggiungerli.",
  },
  {
    number: "02",
    title: "Strategia",
    description:
      "Definiamo la strategia su misura: approccio, strumenti, tempistiche e budget ottimale per massimizzare i risultati.",
  },
  {
    number: "03",
    title: "Esecuzione",
    description:
      "Lavoriamo con un processo iterativo e trasparente. Aggiornamenti costanti, deliverable chiari, nessuna sorpresa.",
  },
  {
    number: "04",
    title: "Crescita",
    description:
      "Analizziamo i dati, ottimizziamo continuamente e scaliamo insieme. Il tuo successo è la nostra priorità.",
  },
];

export default function HowWeWork() {
  return (
    <section id="come-lavoriamo" className="py-24 lg:py-36 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 lg:mb-24">
          <span className="text-indigo-500 text-sm font-medium tracking-[0.2em] uppercase">
            Il processo
          </span>
          <h2 className="font-syne font-extrabold text-5xl lg:text-7xl text-gray-900 mt-4 leading-none">
            Come lavoriamo
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step) => (
            <div key={step.number} className="group relative">
              <div className="font-syne text-7xl font-bold text-gray-100 mb-4 leading-none group-hover:text-indigo-100 transition-colors duration-300">
                {step.number}
              </div>
              <div className="w-8 h-0.5 bg-indigo-500 mb-5" />
              <h3 className="font-syne font-bold text-2xl text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-400 text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
