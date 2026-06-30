import { ArrowRight, HardHat, CheckCircle2, QrCode, MessageSquare, TrendingUp, Shield, Globe, ChevronRight } from 'lucide-react';

interface Props {
  onEnterApp: () => void;
}

const features = [
  { icon: HardHat, title: 'Gestione cantieri', desc: 'Monitora avanzamento, costi e team per ogni cantiere in tempo reale.' },
  { icon: TrendingUp, title: 'Cashflow & Preventivi', desc: 'Preventivi professionali, fatture con MWST, cashflow sempre sotto controllo.' },
  { icon: QrCode, title: 'QR-Bill svizzero', desc: 'Fatture con codice QR conforme agli standard PostFinance e banche svizzere.' },
  { icon: MessageSquare, title: 'Rapportini via WhatsApp', desc: 'Gli operai inviano il rapportino via chat, KERN lo elabora automaticamente.' },
  { icon: Shield, title: 'Documentazione sicurezza', desc: 'Piani sicurezza, SUVA, checklist cantiere — tutto digitalizzato e archiviato.' },
  { icon: Globe, title: 'Multilingua CH', desc: 'Interfaccia in italiano, tedesco e francese. Dati conformi al diritto svizzero.' },
];

const clients = ['Müller Bau AG', 'Hoffmann SA', 'Bianchi & Figli', 'TechLogistic AG', 'Comune Lugano', 'UBS Edifici'];

export default function Landing({ onEnterApp }: Props) {
  return (
    <div className="min-h-screen" style={{ background: '#F1F4F8', fontFamily: 'Inter, sans-serif' }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{ background: 'rgba(241,244,248,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(226,232,240,0.8)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm" style={{ background: '#E85D26', color: '#fff' }}>K</div>
          <span className="font-bold tracking-widest text-sm" style={{ color: '#0F1F3D' }}>KERN</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {['Prodotto', 'Prezzi', 'Casi studio', 'Blog'].map(link => (
            <a key={link} href="#" className="text-sm font-medium transition-colors" style={{ color: '#64748B' }}>{link}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="text-sm font-medium px-4 py-2 rounded-lg" style={{ color: '#0F1F3D' }}>Accedi</button>
          <button onClick={onEnterApp} className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-all hover:opacity-90" style={{ background: '#E85D26' }}>
            Prova gratis
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8"
          style={{ background: 'rgba(232,93,38,0.1)', color: '#E85D26', border: '1px solid rgba(232,93,38,0.2)' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Nuovo: Rapportini via WhatsApp con AI
        </div>

        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight" style={{ color: '#0F1F3D' }}>
          Il sistema operativo<br />
          <span style={{ color: '#E85D26' }}>per l'edilizia svizzera</span>
        </h1>

        <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: '#64748B' }}>
          KERN unifica cantieri, preventivi, fatture e rapportini in un'unica piattaforma. 
          Pensato per le imprese edili svizzere: QR-Bill, MWST, multilingua.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button onClick={onEnterApp}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #E85D26, #F97316)', boxShadow: '0 4px 24px rgba(232,93,38,0.35)' }}>
            Vedi la demo live <ArrowRight className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all"
            style={{ background: '#fff', color: '#0F172A', border: '1px solid #E2E8F0' }}>
            Parla con noi <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Trust line */}
        <p className="text-xs mt-6" style={{ color: '#94A3B8' }}>
          Nessuna carta di credito · 14 giorni gratuiti · Dati in Svizzera
        </p>
      </section>

      {/* App preview frame */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: '0 32px 80px rgba(15,31,61,0.18)', border: '1px solid #E2E8F0' }}>
          {/* Fake browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#1B2B4B' }}>
            <div className="w-3 h-3 rounded-full" style={{ background: '#DC2626', opacity: 0.7 }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#D97706', opacity: 0.7 }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#16A34A', opacity: 0.7 }} />
            <div className="ml-3 flex-1 rounded-md px-3 py-1 text-xs font-mono" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
              app.kern.ch/dashboard
            </div>
          </div>
          {/* App preview */}
          <div className="flex" style={{ background: '#F1F4F8', minHeight: 320 }}>
            {/* Mini sidebar */}
            <div className="w-44 flex-shrink-0 flex flex-col py-4 px-3 gap-1" style={{ background: '#0F1F3D' }}>
              <div className="flex items-center gap-2 px-2 mb-4">
                <div className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-black" style={{ background: '#E85D26', color: '#fff' }}>K</div>
                <span className="text-xs font-bold tracking-widest" style={{ color: '#fff' }}>KERN</span>
              </div>
              {['Dashboard', 'Cantieri', 'Preventivi', 'Fatturazione', 'Rapportini'].map((item, i) => (
                <div key={item} className="px-2 py-1.5 rounded-md text-[11px] font-medium flex items-center gap-2"
                  style={{
                    background: i === 0 ? 'rgba(232,93,38,0.18)' : 'transparent',
                    color: i === 0 ? '#fff' : 'rgba(255,255,255,0.4)',
                    borderLeft: i === 0 ? '2px solid #E85D26' : '2px solid transparent',
                  }}>
                  {item}
                </div>
              ))}
            </div>
            {/* Mini dashboard */}
            <div className="flex-1 p-4">
              <div className="grid grid-cols-4 gap-3 mb-4">
                {[
                  { label: 'Fatturato', value: 'CHF 1.84M', color: '#16A34A' },
                  { label: 'Margine', value: 'CHF 348K', color: '#E85D26' },
                  { label: 'Cantieri', value: '3 attivi', color: '#0F1F3D' },
                  { label: 'Crediti', value: 'CHF 155K', color: '#DC2626' },
                ].map(c => (
                  <div key={c.label} className="p-3 rounded-lg border" style={{ background: '#fff', borderColor: '#E2E8F0' }}>
                    <div className="text-[9px] uppercase tracking-wider mb-1" style={{ color: '#94A3B8' }}>{c.label}</div>
                    <div className="text-xs font-bold" style={{ color: c.color }}>{c.value}</div>
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-lg border" style={{ background: '#fff', borderColor: '#E2E8F0' }}>
                <div className="text-[10px] font-semibold mb-2" style={{ color: '#0F172A' }}>Cashflow 2026</div>
                <div className="flex items-end gap-1 h-16">
                  {[65, 40, 90, 140, 80, 120].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h/1.4}%`, background: i % 2 === 0 ? 'rgba(22,163,74,0.5)' : 'rgba(220,38,38,0.35)' }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black tracking-tight mb-3" style={{ color: '#0F1F3D' }}>
            Tutto quello che serve, niente di superfluo
          </h2>
          <p className="text-base" style={{ color: '#64748B' }}>
            Costruito sulle esigenze reali delle imprese edili ticinesi e svizzere
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(f => (
            <div key={f.title} className="p-5 rounded-xl border transition-all hover:-translate-y-0.5"
              style={{ background: '#fff', borderColor: '#E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(232,93,38,0.1)' }}>
                <f.icon className="w-4.5 h-4.5" style={{ color: '#E85D26', width: 18, height: 18 }} />
              </div>
              <div className="font-semibold text-sm mb-1.5" style={{ color: '#0F172A' }}>{f.title}</div>
              <div className="text-xs leading-relaxed" style={{ color: '#64748B' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <p className="text-center text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: '#94A3B8' }}>
          Usato da imprese in tutto il Canton Ticino
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {clients.map(c => (
            <div key={c} className="px-4 py-2 rounded-lg text-xs font-semibold" style={{ background: '#fff', color: '#64748B', border: '1px solid #E2E8F0' }}>
              {c}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="rounded-2xl p-10 text-center" style={{ background: 'linear-gradient(135deg, #0F1F3D 0%, #1B3058 100%)' }}>
          <h2 className="text-3xl font-black tracking-tight mb-3 text-white">
            Pronto a portare il tuo cantiere online?
          </h2>
          <p className="mb-8 text-base" style={{ color: 'rgba(255,255,255,0.6)' }}>
            14 giorni gratis, dati ospitati in Svizzera, supporto in italiano.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button onClick={onEnterApp}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: '#E85D26', boxShadow: '0 4px 20px rgba(232,93,38,0.4)' }}>
              Prova KERN gratis <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-center gap-4 flex-wrap">
            {['Setup in 10 minuti', 'Importa da Excel', 'Assistenza in italiano'].map(p => (
              <div key={p} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#16A34A' }} />
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6" style={{ borderColor: '#E2E8F0' }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded flex items-center justify-center font-black text-xs" style={{ background: '#E85D26', color: '#fff' }}>K</div>
            <span className="font-bold tracking-widest text-xs" style={{ color: '#0F1F3D' }}>KERN</span>
          </div>
          <p className="text-xs" style={{ color: '#94A3B8' }}>© 2026 KERN SA · Lugano, Svizzera · CHE-123.456.789</p>
          <div className="flex gap-4">
            {['Privacy', 'Terms', 'Contatti'].map(l => (
              <a key={l} href="#" className="text-xs" style={{ color: '#94A3B8' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
