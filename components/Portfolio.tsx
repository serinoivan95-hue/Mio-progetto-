const projects = [
  {
    title: "E-commerce Fashion",
    category: "Sviluppo Web",
    gradient: "from-violet-500 to-purple-700",
    size: "lg:col-span-1",
  },
  {
    title: "Restaurant Brand",
    category: "Web + Marketing",
    gradient: "from-orange-400 to-rose-600",
    size: "lg:col-span-1",
  },
  {
    title: "SaaS Dashboard",
    category: "UI/UX Design",
    gradient: "from-cyan-400 to-blue-600",
    size: "lg:col-span-2",
  },
  {
    title: "Studio Legale",
    category: "Sito Vetrina",
    gradient: "from-emerald-400 to-teal-700",
    size: "lg:col-span-1",
  },
  {
    title: "Startup Tech",
    category: "Digital Marketing",
    gradient: "from-amber-400 to-orange-600",
    size: "lg:col-span-1",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 lg:py-36 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-24 gap-6">
          <div>
            <span className="text-indigo-500 text-sm font-medium tracking-[0.2em] uppercase">
              I nostri lavori
            </span>
            <h2 className="font-syne font-extrabold text-5xl lg:text-7xl text-gray-900 mt-4 leading-none">
              Portfolio
            </h2>
          </div>
          <p className="text-gray-400 text-base max-w-xs">
            Ogni progetto è unico. Ecco alcuni dei lavori di cui siamo più orgogliosi.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${project.size}`}
              style={{ aspectRatio: i === 2 ? "16/7" : "4/3" }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-700 group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />

              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block text-white/60 text-xs font-medium tracking-widest uppercase mb-2">
                    {project.category}
                  </span>
                  <h3 className="font-syne font-bold text-2xl lg:text-3xl text-white">
                    {project.title}
                  </h3>
                </div>
              </div>

              <div className="absolute top-6 right-6 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                <span className="text-white text-sm">↗</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
