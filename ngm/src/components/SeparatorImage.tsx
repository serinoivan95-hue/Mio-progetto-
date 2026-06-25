export default function SeparatorImage() {
  return (
    <section
      id="separator-banner"
      className="relative min-h-[500px] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600&h=800"
          alt="NGM team al lavoro"
          className="w-full h-full object-cover brightness-[0.2]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-notte via-notte/70 to-notte/95" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="font-mono text-[10px] text-fuoco uppercase tracking-[0.28em] mb-6">La Nostra Filosofia</p>
        <h2
          className="font-display font-black text-carta uppercase leading-[0.9] tracking-tight"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}
        >
          Non facciamo arte<br />o post carini.<br />
          <span className="text-fuoco">Costruiamo sistemi</span><br />
          di acquisizione redditizi.
        </h2>
        <div className="mt-8 h-[1px] w-24 bg-fuoco mx-auto" />
        <p className="mt-6 font-mono text-[10px] text-carta/40 uppercase tracking-widest">
          Ingegneria di Conversione
        </p>
      </div>
    </section>
  );
}
