import { TrendingUp, TrendingDown, HardHat, AlertCircle, Euro, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useStore } from '../../store/useStore';
import { useT } from '../../i18n/useT';

function fmtChf(n: number) { return 'CHF ' + n.toLocaleString('de-CH'); }

interface KpiCardProps { label: string; value: string; sub?: string; trend?: 'up'|'down'|'neutral'; color?: string; icon: React.ReactNode; }
function KpiCard({ label, value, sub, trend, color, icon }: KpiCardProps) {
  return (
    <div className="p-5 rounded-xl border animate-fade-in" style={{ background: '#fff', borderColor: '#E2E8F0' }}>
      <div className="flex items-start justify-between mb-3">
        <div className="text-xs font-medium uppercase tracking-wider" style={{ color: '#64748B' }}>{label}</div>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: color ? color + '18' : '#F1F4F8' }}>
          {icon}
        </div>
      </div>
      <div className="font-bold text-2xl tracking-tight" style={{ color: '#0F172A' }}>{value}</div>
      {sub && (
        <div className="flex items-center gap-1 mt-1.5">
          {trend === 'up' && <TrendingUp className="w-3 h-3" style={{ color: '#16A34A' }} />}
          {trend === 'down' && <TrendingDown className="w-3 h-3" style={{ color: '#DC2626' }} />}
          <span className="text-xs" style={{ color: trend === 'up' ? '#16A34A' : trend === 'down' ? '#DC2626' : '#64748B' }}>{sub}</span>
        </div>
      )}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label, entrate, uscite }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="rounded-lg border p-3 text-xs" style={{ background: '#fff', borderColor: '#E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
      <div className="font-semibold mb-2" style={{ color: '#0F172A' }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span style={{ color: '#64748B' }}>{p.name === 'entrate' ? entrate : uscite}:</span>
          <span className="font-semibold ml-auto" style={{ color: '#0F172A' }}>CHF {p.value.toLocaleString('de-CH')}</span>
        </div>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const { cantieri, fatture, rapportini } = useStore();
  const t = useT();

  const cashflow = [
    { mese: 'Gen', entrate: 145000, uscite: 98000 },
    { mese: 'Feb', entrate: 89000, uscite: 112000 },
    { mese: 'Mar', entrate: 210000, uscite: 134000 },
    { mese: 'Apr', entrate: 320000, uscite: 178000 },
    { mese: 'Mag', entrate: 185000, uscite: 145000 },
    { mese: 'Giu', entrate: 276000, uscite: 192000 },
  ];

  const fatturatoAnno = fatture.filter(f => f.status === 'pagata').reduce((a, f) => a + f.importo, 0) +
    fatture.filter(f => f.status === 'in_attesa').reduce((a, f) => a + f.importo, 0);
  const margineNetto = Math.round(fatturatoAnno * 0.189);
  const cantieriAttivi = cantieri.filter(c => c.status === 'in_corso').length;
  const creditiAperti = fatture.filter(f => f.status === 'in_attesa' || f.status === 'scaduta').reduce((a, f) => a + f.importo, 0);
  const fattureScadute = fatture.filter(f => f.status === 'scaduta');
  const fattureInAttesa = fatture.filter(f => f.status === 'in_attesa');
  const cantieriAttiviFull = cantieri.filter(c => c.status === 'in_corso');

  const statusColors: Record<string,{bg:string,text:string,label:string}> = {
    pagata: { bg: '#DCFCE7', text: '#16A34A', label: t('pagata') },
    in_attesa: { bg: '#FEF9C3', text: '#CA8A04', label: t('in_attesa') },
    scaduta: { bg: '#FEE2E2', text: '#DC2626', label: t('scaduta') },
    bozza: { bg: '#F1F5F9', text: '#64748B', label: t('bozza') },
  };

  const todayRaps = rapportini.filter(r => r.data === new Date().toISOString().split('T')[0]);
  const rapColors = ['#0F1F3D','#E85D26','#16A34A','#7C3AED','#D97706'];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Alert */}
      {fattureScadute.length > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg border" style={{ background: '#FFF7ED', borderColor: '#FED7AA', color: '#92400E' }}>
          <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#D97706' }} />
          <span className="text-sm font-medium">{fattureScadute.length} {t('alert_fatture_scadute')} CHF {fattureScadute.reduce((a,f)=>a+f.importo,0).toLocaleString('de-CH')}</span>
          <button className="ml-auto text-xs font-semibold underline">{t('alert_vedi')}</button>
        </div>
      )}

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label={t('fatturato_anno')} value={fmtChf(fatturatoAnno)} sub={`+12.4% ${t('vs_anno_prec')}`} trend="up" color="#16A34A"
          icon={<Euro className="w-4 h-4" style={{ color: '#16A34A' }} />} />
        <KpiCard label={t('margine_netto')} value={fmtChf(margineNetto)} sub={`${Math.round(margineNetto/fatturatoAnno*100)||18.9}% ${t('del_fatturato')}`} trend="up" color="#E85D26"
          icon={<TrendingUp className="w-4 h-4" style={{ color: '#E85D26' }} />} />
        <KpiCard label={t('cantieri_attivi')} value={String(cantieriAttivi)} sub={`2 ${t('nuovi_trimestre')}`} trend="neutral" color="#0F1F3D"
          icon={<HardHat className="w-4 h-4" style={{ color: '#0F1F3D' }} />} />
        <KpiCard label={t('crediti_aperti')} value={fmtChf(creditiAperti)} sub={`${fattureInAttesa.length} ${t('fatture_in_attesa')}`} trend="down" color="#DC2626"
          icon={<AlertCircle className="w-4 h-4" style={{ color: '#DC2626' }} />} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 p-5 rounded-xl border" style={{ background: '#fff', borderColor: '#E2E8F0' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-semibold text-sm" style={{ color: '#0F172A' }}>{t('cashflow_title')}</div>
              <div className="text-xs mt-0.5" style={{ color: '#64748B' }}>{t('cashflow_sub')}</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={cashflow} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="gEnt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16A34A" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gUsc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DC2626" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F4F8" />
              <XAxis dataKey="mese" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} />
              <Tooltip content={<CustomTooltip entrate={t('entrate')} uscite={t('uscite')} />} />
              <Area type="monotone" dataKey="entrate" stroke="#16A34A" strokeWidth={2} fill="url(#gEnt)" />
              <Area type="monotone" dataKey="uscite" stroke="#DC2626" strokeWidth={2} fill="url(#gUsc)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="p-5 rounded-xl border" style={{ background: '#fff', borderColor: '#E2E8F0' }}>
          <div className="font-semibold text-sm mb-4" style={{ color: '#0F172A' }}>{t('cantieri_avanzamento')}</div>
          <div className="space-y-4">
            {cantieriAttiviFull.map(c => (
              <div key={c.id}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-medium truncate max-w-[140px]" style={{ color: '#0F172A' }}>{c.nome.split(' ').slice(0,3).join(' ')}</span>
                  <span className="text-xs font-bold" style={{ color: c.avanzamento > 60 ? '#16A34A' : '#E85D26' }}>{c.avanzamento}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: '#F1F4F8' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${c.avanzamento}%`, background: c.avanzamento > 60 ? '#16A34A' : '#E85D26' }} />
                </div>
                <div className="text-[10px] mt-1" style={{ color: '#94A3B8' }}>{c.localita} · {fmtChf(c.valore)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl border" style={{ background: '#fff', borderColor: '#E2E8F0' }}>
          <div className="font-semibold text-sm mb-4" style={{ color: '#0F172A' }}>{t('fatture_recenti')}</div>
          <div className="space-y-2">
            {fatture.slice(0,5).map(f => {
              const s = statusColors[f.status];
              return (
                <div key={f.id} className="flex items-center justify-between py-2 border-b" style={{ borderColor: '#F1F4F8' }}>
                  <div>
                    <div className="text-xs font-semibold" style={{ color: '#0F172A' }}>{f.numero}</div>
                    <div className="text-[10px]" style={{ color: '#94A3B8' }}>{f.cliente}</div>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <span className="text-xs font-bold" style={{ color: '#0F172A' }}>CHF {f.importo.toLocaleString('de-CH')}</span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: s.bg, color: s.text }}>{s.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-5 rounded-xl border" style={{ background: '#fff', borderColor: '#E2E8F0' }}>
          <div className="font-semibold text-sm mb-4" style={{ color: '#0F172A' }}>{t('rapportini_oggi')}</div>
          <div className="space-y-3">
            {(todayRaps.length > 0 ? todayRaps : rapportini).slice(0,5).map((r, i) => (
              <div key={r.id} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mt-0.5"
                  style={{ background: rapColors[i % 5] }}>
                  {r.operaio.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold" style={{ color: '#0F172A' }}>{r.operaio}</div>
                  <div className="text-[10px] truncate" style={{ color: '#94A3B8' }}>{r.attivita}</div>
                  <div className="text-[10px]" style={{ color: '#64748B' }}>{r.cantiere} · {r.ore}h</div>
                </div>
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#16A34A' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
