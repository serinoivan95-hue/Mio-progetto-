export default function Why() {
  const columns = [
    {
      title: 'Per acquisire nuovi clienti',
      stat: 'Flusso costante',
      description:
        'Dimentica l\'incertezza del "mese buono" o del passaparola. Costruiamo macchine di acquisizione calibrate sulle tue metriche commerciali reali.',
    },
    {
      title: 'Per posizionare il brand',
      stat: 'Autorevolezza',
      description:
        'Le inserzioni funzionano il doppio quando il brand è stimato. Posizioniamo la tua azienda come leader indiscusso nel tuo mercato di riferimento.',
    },
    {
      title: 'Per strutturare i processi',
      stat: 'Sistema scalabile',
      description:
        'Non annunci isolati, ma un sistema integrato: tracciamenti di precisione, automazione e-mail e creatività testate da specialisti.',
    },
  ];

  return (
    <section
      id="why"
      className="py-24 px-6 md:px-10 bg-carta border-b border-bordo"
    >
      <div className="max-w-7xl mx-auto">

        <div className="mb-16">
          <p className="font-mono text-[10px] text-grigio uppercase tracking-[0.25em]">Perché NGM</p>
          <h2
            className="font-display font-black text-inchiostro uppercase leading-[0.9] tracking-tight mt-3"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Perché hai bisogno<br />
            di un team marketing?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-bordo">
          {columns.map((col, i) => (
            <div key={i} className="py-10 md:py-0 md:px-10 first:md:pl-0 last:md:pr-0 flex flex-col gap-4">
              <p className="font-mono text-[10px] text-fuoco uppercase tracking-[0.22em]">{col.stat}</p>
              <h3 className="font-display font-bold text-inchiostro uppercase text-xl md:text-2xl leading-tight tracking-tight">
                {col.title}
              </h3>
              <p className="text-grigio text-sm leading-relaxed font-light">
                {col.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
