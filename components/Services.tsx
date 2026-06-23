const services = [
  {
    number: "01",
    title: "Sviluppo Web",
    description:
      "Progettiamo e sviluppiamo siti web performanti, scalabili e ottimizzati per la conversione. Dalla landing page all'e-commerce complesso, ogni pixel ha uno scopo.",
    tags: ["Next.js", "React", "WordPress", "E-commerce", "Landing Page"],
  },
  {
    number: "02",
    title: "Digital Marketing",
    description:
      "Strategie data-driven per far crescere il tuo business online. Gestiamo campagne Meta Ads e Google Ads con un focus unico sui risultati misurabili e il ROI.",
    tags: ["Meta Ads", "Google Ads", "Email Marketing", "Analytics", "Social Media"],
  },
];

export default function Services() {
  return (
    <section id="servizi" className="py-24 lg:py-36 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 lg:mb-24">
          <span className="text-indigo-500 text-sm font-medium tracking-[0.2em] uppercase">
            Cosa facciamo
          </span>
          <h2 className="font-syne font-extrabold text-5xl lg:text-7xl text-gray-900 mt-4 leading-none">
            Servizi
          </h2>
        </div>

        <div className="divide-y divide-gray-100">
          {services.map((service) => (
            <div
              key={service.number}
              className="group py-12 lg:py-16 grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-24 items-start"
            >
              <div>
                <span className="font-syne text-8xl font-bold text-gray-100 group-hover:text-indigo-100 transition-colors duration-300 leading-none">
                  {service.number}
                </span>
                <h3 className="font-syne font-bold text-3xl lg:text-4xl text-gray-900 mt-3">
                  {service.title}
                </h3>
              </div>

              <div className="flex flex-col justify-between gap-8">
                <p className="text-gray-400 text-lg leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm text-gray-500 border border-gray-200 px-4 py-1.5 rounded-full group-hover:border-indigo-300 group-hover:text-indigo-600 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
