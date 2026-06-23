export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white px-6">
      {/* Animated background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div
        className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
        style={{ animationDelay: "4s" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center pt-20">
        <span className="inline-block text-indigo-500 text-sm font-medium tracking-[0.2em] uppercase mb-8">
          Agenzia Web & Digital Marketing
        </span>

        <h1 className="font-syne font-extrabold leading-[0.92] tracking-tight text-gray-900 mb-8"
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}>
          Trasformiamo
          <br />
          le tue idee in
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            risultati.
          </span>
        </h1>

        <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Costruiamo esperienze digitali che catturano l&apos;attenzione e
          convertono i visitatori in clienti. Dal design al marketing,
          tutto sotto un unico tetto.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contatto"
            className="bg-gray-900 text-white font-medium px-8 py-4 rounded-full hover:bg-indigo-500 transition-all duration-300 text-base"
          >
            Inizia il progetto →
          </a>
          <a
            href="#portfolio"
            className="text-gray-600 font-medium px-8 py-4 rounded-full border border-gray-200 hover:border-indigo-400 hover:text-indigo-500 transition-all duration-300 text-base"
          >
            Vedi i lavori
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-300">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-gray-300 to-transparent" />
        </div>
      </div>
    </section>
  );
}
