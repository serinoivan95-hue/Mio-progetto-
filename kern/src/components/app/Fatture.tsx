import { useState } from 'react';
import { Receipt, CheckCircle2, Clock, AlertTriangle, FileX, QrCode, Plus, Download, Trash2, Edit3 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import type { Fattura, FatturaStatus } from '../../data/mock';
import Modal from '../ui/Modal';
import { useT } from '../../i18n/useT';

function fmtChf(n: number) { return 'CHF ' + n.toLocaleString('de-CH'); }
function fmtDate(s: string) { return s ? new Date(s).toLocaleDateString('it-CH', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'; }
function today() { return new Date().toISOString().split('T')[0]; }
function plusDays(n: number) { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().split('T')[0]; }

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>
        {label}{required && <span style={{ color: '#E85D26' }}> *</span>}
      </label>
      {children}
    </div>
  );
}

const fc = 'w-full px-3 py-2 rounded-lg border text-sm outline-none field-input';

interface FormState { cliente: string; cantiere: string; importo: number; status: FatturaStatus; dataEmissione: string; dataScadenza: string; }
const emptyForm = (): FormState => ({ cliente: '', cantiere: '', importo: 0, status: 'bozza', dataEmissione: today(), dataScadenza: plusDays(30) });

function FatturaForm({ initial, onSave, onClose, t }: { initial?: Fattura; onSave: (d: FormState) => void; onClose: () => void; t: (k: any) => string }) {
  const cantieri = useStore(s => s.cantieri);
  const [form, setForm] = useState<FormState>(initial ? {
    cliente: initial.cliente, cantiere: initial.cantiere, importo: initial.importo,
    status: initial.status, dataEmissione: initial.dataEmissione, dataScadenza: initial.dataScadenza,
  } : emptyForm());

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.type === 'number' ? Number(e.target.value) : e.target.value }));

  const statusOpts: FatturaStatus[] = ['bozza', 'in_attesa', 'pagata', 'scaduta'];

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label={t('cliente')} required><input className={fc} value={form.cliente} onChange={set('cliente')} placeholder="Es. Hoffmann SA" required /></Field>
        <Field label={t('cantiere')}>
          <select className={fc} value={form.cantiere} onChange={set('cantiere')}>
            <option value="">Seleziona...</option>
            {cantieri.map(c => <option key={c.id} value={c.nome}>{c.nome}</option>)}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Field label={t('importo')} required><input type="number" className={fc} value={form.importo || ''} onChange={set('importo')} placeholder="0" min="0" required /></Field>
        <Field label={t('emissione')}><input type="date" className={fc} value={form.dataEmissione} onChange={set('dataEmissione')} /></Field>
        <Field label={t('scadenza')}><input type="date" className={fc} value={form.dataScadenza} onChange={set('dataScadenza')} /></Field>
      </div>
      <Field label={t('stato')}>
        <select className={fc} value={form.status} onChange={set('status')}>
          {statusOpts.map(s => <option key={s} value={s}>{t(s as any)}</option>)}
        </select>
      </Field>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm rounded-lg font-medium" style={{ background: '#F1F4F8', color: '#64748B' }}>{t('annulla')}</button>
        <button type="submit" className="px-5 py-2 text-sm font-semibold rounded-lg text-white" style={{ background: '#E85D26' }}>
          {initial ? t('salva') : t('nuova_fattura')}
        </button>
      </div>
    </form>
  );
}

export default function Fatture() {
  const { fatture, addFattura, updateFattura, deleteFattura, showToast } = useStore();
  const t = useT();
  const [filter, setFilter] = useState<FatturaStatus | 'tutti'>('tutti');
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Fattura | null>(null);

  const statusMap: Record<FatturaStatus, { label: string; bg: string; text: string; icon: React.ElementType }> = {
    pagata: { label: t('pagata'), bg: '#DCFCE7', text: '#16A34A', icon: CheckCircle2 },
    in_attesa: { label: t('in_attesa'), bg: '#FEF9C3', text: '#CA8A04', icon: Clock },
    scaduta: { label: t('scaduta'), bg: '#FEE2E2', text: '#DC2626', icon: AlertTriangle },
    bozza: { label: t('bozza'), bg: '#F1F5F9', text: '#475569', icon: FileX },
  };

  const totPagato = fatture.filter(f => f.status === 'pagata').reduce((a, f) => a + f.importo, 0);
  const totAttesa = fatture.filter(f => f.status === 'in_attesa').reduce((a, f) => a + f.importo, 0);
  const totScaduto = fatture.filter(f => f.status === 'scaduta').reduce((a, f) => a + f.importo, 0);
  const visible = filter === 'tutti' ? fatture : fatture.filter(f => f.status === filter);

  const handleCreate = (d: FormState) => { addFattura(d); setCreating(false); showToast(t('creato')); };
  const handleUpdate = (d: FormState) => { if (!editing) return; updateFattura(editing.id, d); setEditing(null); showToast(t('aggiornato')); };
  const handleDelete = (f: Fattura) => { if (!confirm(`Eliminare ${f.numero}?`)) return; deleteFattura(f.id); showToast(t('eliminato'), 'info'); };
  const quickStatus = (f: Fattura, s: FatturaStatus) => { updateFattura(f.id, { status: s }); showToast(t('aggiornato')); };

  return (
    <div className="p-6 animate-fade-in">
      {/* QR-Bill banner */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-6" style={{ background: 'linear-gradient(135deg, #0F1F3D 0%, #1B2B4B 100%)' }}>
        <QrCode className="w-5 h-5 text-white flex-shrink-0" />
        <div className="flex-1">
          <div className="text-sm font-semibold text-white">{t('qr_active')}</div>
          <div className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>{t('qr_desc')}</div>
        </div>
        <div className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#E85D26', color: '#fff' }}>{t('std_ch')}</div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: t('incassato'), value: fmtChf(totPagato), icon: CheckCircle2, color: '#16A34A' },
          { label: t('in_attesa'), value: fmtChf(totAttesa), icon: Clock, color: '#CA8A04' },
          { label: t('crediti_scaduti'), value: fmtChf(totScaduto), icon: AlertTriangle, color: '#DC2626' },
          { label: t('mwst'), value: fmtChf(Math.round(totPagato * 0.081)), icon: Receipt, color: '#7C3AED' },
        ].map(item => (
          <div key={item.label} className="p-4 rounded-xl border" style={{ background: '#fff', borderColor: '#E2E8F0' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] uppercase tracking-wider" style={{ color: '#94A3B8' }}>{item.label}</div>
              <item.icon className="w-4 h-4" style={{ color: item.color }} />
            </div>
            <div className="font-bold text-sm" style={{ color: item.color === '#DC2626' ? '#DC2626' : '#0F172A' }}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          {(['tutti', 'in_attesa', 'pagata', 'scaduta', 'bozza'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{ background: filter === f ? '#0F1F3D' : '#fff', color: filter === f ? '#fff' : '#64748B', border: `1px solid ${filter === f ? '#0F1F3D' : '#E2E8F0'}` }}>
              {f === 'tutti' ? t('tutte') : t(f as any)}
            </button>
          ))}
        </div>
        <button onClick={() => setCreating(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white" style={{ background: '#E85D26' }}>
          <Plus className="w-3.5 h-3.5" /> {t('nuova_fattura')}
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border overflow-hidden" style={{ background: '#fff', borderColor: '#E2E8F0' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              {[t('numero'), t('cliente'), t('cantiere'), t('importo'), t('emissione'), t('scadenza'), t('stato'), ''].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#94A3B8' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((f, i) => {
              const s = statusMap[f.status];
              return (
                <tr key={f.id} style={{ borderBottom: i < visible.length - 1 ? '1px solid #F1F4F8' : 'none' }}>
                  <td className="px-4 py-3"><span className="text-xs font-mono font-semibold" style={{ color: '#0F172A' }}>{f.numero}</span></td>
                  <td className="px-4 py-3"><span className="text-xs font-medium" style={{ color: '#0F172A' }}>{f.cliente}</span></td>
                  <td className="px-4 py-3 max-w-[160px]"><span className="text-xs truncate block" style={{ color: '#64748B' }}>{f.cantiere}</span></td>
                  <td className="px-4 py-3"><span className="text-xs font-bold" style={{ color: '#0F172A' }}>{fmtChf(f.importo)}</span></td>
                  <td className="px-4 py-3"><span className="text-xs" style={{ color: '#64748B' }}>{fmtDate(f.dataEmissione)}</span></td>
                  <td className="px-4 py-3">
                    <span className="text-xs" style={{ color: f.status === 'scaduta' ? '#DC2626' : '#64748B', fontWeight: f.status === 'scaduta' ? 600 : 400 }}>
                      {fmtDate(f.dataScadenza)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select className="text-[10px] font-semibold px-2 py-0.5 rounded-full border-0 cursor-pointer outline-none"
                      value={f.status} onChange={e => quickStatus(f, e.target.value as FatturaStatus)}
                      style={{ background: s.bg, color: s.text }}>
                      {(['bozza', 'in_attesa', 'pagata', 'scaduta'] as FatturaStatus[]).map(st => (
                        <option key={st} value={st}>{statusMap[st].label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button title={t('scarica_pdf')} className="p-1.5 rounded-lg" style={{ background: '#F1F4F8', color: '#64748B' }}><Download className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setEditing(f)} className="p-1.5 rounded-lg" style={{ background: '#F1F4F8', color: '#64748B' }}><Edit3 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDelete(f)} className="p-1.5 rounded-lg" style={{ background: '#FEE2E2', color: '#DC2626' }}><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {visible.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-12 text-center text-sm" style={{ color: '#94A3B8' }}>{t('nessuna_fattura')}</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {creating && <Modal title={t('nuova_fattura')} onClose={() => setCreating(false)}><FatturaForm onSave={handleCreate} onClose={() => setCreating(false)} t={t} /></Modal>}
      {editing && <Modal title={t('modifica')} onClose={() => setEditing(null)}><FatturaForm initial={editing} onSave={handleUpdate} onClose={() => setEditing(null)} t={t} /></Modal>}
    </div>
  );
}
