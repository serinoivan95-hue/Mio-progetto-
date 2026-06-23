export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-white/5 px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-syne font-bold text-xl text-white">
          NOVA<span className="text-indigo-400">.</span>
        </span>
        <span className="text-gray-600 text-sm">
          © 2025 NOVA Agency. Tutti i diritti riservati.
        </span>
        <div className="flex gap-6">
          {["Instagram", "LinkedIn", "Privacy"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-gray-600 hover:text-white text-sm transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
