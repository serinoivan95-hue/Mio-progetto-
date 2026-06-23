const items = [
  "Sviluppo Web",
  "Digital Marketing",
  "UI / UX Design",
  "Meta Ads",
  "Google Ads",
  "E-commerce",
  "SEO",
  "Branding",
  "Landing Page",
  "Social Media",
  "Next.js",
  "Conversioni",
];

export default function MarqueeBand() {
  const doubled = [...items, ...items];

  return (
    <div className="bg-gray-900 py-5 overflow-hidden border-y border-white/5">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center mx-8 text-white font-syne font-semibold text-base tracking-wider"
          >
            {item}
            <span className="ml-8 text-indigo-400 text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
