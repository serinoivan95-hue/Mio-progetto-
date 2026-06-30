import React, { useState } from 'react';
import { Target, PenTool, Terminal, BarChart4, ChevronRight } from 'lucide-react';

interface StepDetails {
  num: string;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  icon: React.ReactNode;
  deliverables: string[];
  mockVisual: React.ReactNode;
}

export default function Acquisition() {
  const [activeStep, setActiveStep] = useState(0);

  const steps: StepDetails[] = [
    {
      num: '01',
      title: 'Strategia di Posizionamento',
      shortDesc: 'Studio del prodotto, sistema di offerta e definizione KPI prima di spendere un euro.',
      detailedDesc: 'Prima di spendere un singolo euro, analizziamo i competitor, definiamo l\'offerta irresistibile per il mercato e stabiliamo le metriche di conversione. Costruiamo un piano media omnichannel sartoriale per la tua azienda.',
      icon: <Target className="w-5 h-5 text-fuoco" />,
      deliverables: ['Studio dei Buyer Personas', 'Analisi dei Competitor Primari', 'Calcolo dei Margini e LTV', 'Pianificazione Media Budget'],
      mockVisual: (
        <div className="bg-notte p-5 border border-white/10 font-mono text-xs text-carta/70 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <span className="text-fuoco font-bold text-[10px] tracking-wider uppercase">NGM Planner v2.4</span>
              <span className="font-mono text-[9px] text-carta/30">LIVE</span>
            </div>
            <div className="space-y-3">
              {[
                ['CAC Target', '35.00 €', 'fuoco'],
                ['AOV Previsto', '112.50 €', ''],
                ['Margine Medio', '68%', 'fuoco'],
                ['ROAS Break-Even', 'x1.47', ''],
              ].map(([label, value, accent]) => (
                <div key={label} className="flex justify-between items-center bg-white/5 p-2">
                  <span className="text-carta/40 text-[10px]">{label}</span>
                  <span className={`font-bold text-[11px] ${accent ? 'text-fuoco' : 'text-carta'}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 text-[9px] text-carta/30 flex justify-between">
            <span>Budget Test: 3,000 €</span>
            <span>Focus: Meta Ads</span>
          </div>
        </div>
      ),
    },
    {
      num: '02',
      title: 'Componente Creativa',
      shortDesc: 'Produzione video UGC nativi, grafiche e copy persuasivi progettati per convertire.',
      detailedDesc: 'L\'advertising moderno è guidato dalla qualità delle creatività. Produciamo video ad alte prestazioni in stile TikTok, Instagram Reels e post grafici, con copy incentrati sui reali punti di dolore del consumatore finale.',
      icon: <PenTool className="w-5 h-5 text-fuoco" />,
      deliverables: ['Sceneggiatura video (Scriptwriting)', 'Spot Video in stile UGC', 'Inserzioni Grafiche A/B Testing', 'Sales Copy per annunci'],
      mockVisual: (
        <div className="bg-notte p-5 border border-white/10 h-full flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <span className="font-mono text-fuoco font-bold text-[10px] tracking-wider uppercase">Creative Storyboard</span>
            <span className="text-carta/40 text-[9px] font-mono">4 Varianti</span>
          </div>
          <div className="space-y-3 text-xs">
            {[
              { label: 'HOOK [0-3 SEC]', text: '"Sei stanco del solito passaparola che un mese c\'è e l\'altro scompare?"', accent: true },
              { label: 'BODY [3-15 SEC]', text: 'Dimostrazione del sistema in 3 passi chiari e misurabili.', accent: false },
              { label: 'CTA [15-20 SEC]', text: '"Clicca e prenota oggi stesso la tua chiamata strategica gratuita."', accent: false },
            ].map(({ label, text, accent }) => (
              <div key={label} className={`border p-2.5 ${accent ? 'border-fuoco/30' : 'border-white/10'}`}>
                <div className={`font-mono font-bold text-[9px] mb-1 ${accent ? 'text-fuoco' : 'text-carta/40'}`}>{label}</div>
                <p className="text-carta/60 italic text-[11px]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      num: '03',
      title: 'Componente Tecnica',
      shortDesc: 'Landing page veloci e tracciamenti API integrati per zero perdita di dati.',
      detailedDesc: 'Il traffico freddo deve atterrare su pagine costruite esclusivamente per convertire. Sviluppiamo landing page fulminee integrate con Pixel Meta, Google Tag Manager e API di conversione server-side.',
      icon: <Terminal className="w-5 h-5 text-fuoco" />,
      deliverables: ['Landing Page conversion-first', 'API Conversions server-side', 'Funnels Email Automation (Klaviyo)', 'Setup Google Tag Manager'],
      mockVisual: (
        <div className="bg-notte p-5 border border-white/10 font-mono text-[11px] text-carta/70 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <span className="text-fuoco font-bold uppercase text-[10px]">Tracking Diagnostics</span>
              <span className="text-fuoco text-[9px]">ONLINE</span>
            </div>
            <div className="space-y-2">
              {[
                ['Meta Pixel ID', '984201479831'],
                ['CAPI Match Rate', '100%'],
                ['LCP', '0.8s (Ultra Fast)'],
                ['SSL Status', 'SHA256 Secure'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-carta/30 text-[10px]">{k}:</span>
                  <span className="text-carta/80 text-[10px]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      num: '04',
      title: 'Analisi dei Dati',
      shortDesc: 'Ottimizzazione quotidiana delle metriche per scalare il ritorno sull\'investimento.',
      detailedDesc: 'Monitoriamo costantemente ROAS e CAC. Spengiamo gli annunci inefficaci e allochiamo il budget su quelli vincenti, ottimizzando le offerte e testando nuovi angoli per scalare stabilmente.',
      icon: <BarChart4 className="w-5 h-5 text-fuoco" />,
      deliverables: ['Dashboard reportistica real-time', 'Chiamate mensili di allineamento', 'A/B Testing continuo', 'Ottimizzazione budget (CBO/ABO)'],
      mockVisual: (
        <div className="bg-notte p-5 border border-white/10 h-full flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <span className="font-mono text-fuoco font-bold text-[10px] tracking-wider uppercase">Performance Analytics</span>
            <span className="font-mono text-[9px] text-fuoco">LIVE</span>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 p-3 text-center">
                <span className="block font-mono text-[9px] text-carta/40 uppercase mb-1">Budget Speso</span>
                <span className="font-display font-bold text-carta text-xl">4,240 €</span>
              </div>
              <div className="bg-white/5 p-3 text-center">
                <span className="block font-mono text-[9px] text-carta/40 uppercase mb-1">Entrate</span>
                <span className="font-display font-bold text-fuoco text-xl">22,890 €</span>
              </div>
            </div>
            <div className="bg-white/5 p-3">
              <div className="flex justify-between mb-2">
                <span className="font-mono text-[9px] text-carta/50">ROAS</span>
                <span className="font-display font-bold text-fuoco text-base">x5.40</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 overflow-hidden">
                <div className="bg-fuoco h-full" style={{ width: '85%' }} />
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="acquisition"
      className="py-24 px-6 md:px-10 bg-carta border-b border-bordo"
    >
      <div className="max-w-7xl mx-auto">

        <div className="max-w-3xl mb-16">
          <p className="font-mono text-[10px] text-grigio uppercase tracking-[0.25em]">Il Nostro Metodo</p>
          <h2
            className="font-display font-black text-inchiostro uppercase leading-[0.9] tracking-tight mt-3"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Acquisizione clienti<br />di precisione
          </h2>
          <p className="mt-4 text-grigio text-sm leading-relaxed font-light max-w-xl">
            Non lanciamo annunci sperando nella fortuna. Seguiamo un metodo analitico a 4 fasi per minimizzare gli sprechi e massimizzare la conversione.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Left: step list */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-bordo border-y border-bordo" id="acquisition-steps">
            {steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`w-full text-left py-6 px-4 flex items-start gap-5 group transition-colors duration-200 cursor-pointer ${
                  activeStep === idx ? 'bg-inchiostro' : 'hover:bg-surface-900'
                }`}
              >
                <span
                  className={`font-display font-black text-4xl leading-none flex-shrink-0 ${
                    activeStep === idx ? 'text-fuoco' : 'text-bordo group-hover:text-inchiostro'
                  }`}
                >
                  {step.num}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className={`font-display font-bold text-lg uppercase tracking-tight ${activeStep === idx ? 'text-carta' : 'text-inchiostro'}`}>
                      {step.title}
                    </h3>
                    <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${activeStep === idx ? 'text-fuoco rotate-90' : 'text-grigio'}`} />
                  </div>
                  <p className={`mt-1 text-xs leading-relaxed ${activeStep === idx ? 'text-carta/60' : 'text-grigio'}`}>
                    {step.shortDesc}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Right: active detail */}
          <div className="lg:col-span-5 flex flex-col bg-surface-900 border border-bordo p-8" id="acquisition-visual">
            <div className="flex items-center gap-3 mb-6">
              {steps[activeStep].icon}
              <div>
                <p className="font-mono text-[9px] text-grigio uppercase tracking-widest">Step {steps[activeStep].num}</p>
                <p className="font-display font-bold text-inchiostro uppercase text-sm">{steps[activeStep].title}</p>
              </div>
            </div>

            <p className="text-grigio text-sm leading-relaxed font-light mb-6">
              {steps[activeStep].detailedDesc}
            </p>

            <div className="mb-6">
              <p className="font-mono text-[9px] text-grigio uppercase tracking-wider mb-3">Cosa ricevi:</p>
              <div className="space-y-2">
                {steps[activeStep].deliverables.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs text-inchiostro">
                    <div className="w-1 h-1 bg-fuoco flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-bordo">
              <p className="font-mono text-[9px] text-grigio uppercase tracking-wider mb-3">Strumenti:</p>
              {steps[activeStep].mockVisual}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
