import { useState } from 'react';
import { FileText, Send, CheckCircle2, XCircle, Clock, Plus, Trash2, Edit3 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import type { Preventivo, PreventivoStatus } from '../../data/mock';
import Modal from '../ui/Modal';

function fmtChf(n: number) { return 'CHF ' + n.toLocaleString('de-CH'); }
function fmtDate(s: string) { return s ? new Date(s).toLocaleDateString('it-CH', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'; }
function today() { return new Date().toISOString().split('T')[0]; }
function plusDays(n: number) { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().split('T')[0]; }

const statusMap: Record<PreventivoStatus, { label: string; bg: string; text: string; icon: React.ElementType }> = {
  accettato: { label: 'Accettato', bg: '#DCFCE7', text: '#16A34A', icon: CheckCircle2 },
  inviato: { label: 'Inviato', bg: '#DBEAFE', text: '#2563EB', icon: Send },
  bozza: { label: 'Bozza', bg: '#F1F5F9', text: '#475569', icon: Clock },
  rifiutato: { label: 'Rifiutato', bg: '#FEE2E2', text: '#DC2626', icon: XCircle },
};

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

interface FormState { cliente: string; oggetto: string; importo: number; status: PreventivoStatus; data: string; validita: string; }
const emptyForm = (): FormState => ({ cliente: '', oggetto: '', importo: 0, status: 'bozza', data: today(), validita: plusDays(30) });

function PreventivoForm({ initial, onSave, onClose }: { initial?: Preventivo; onSave: (d: FormState) => void; onClose: () => void }) {
  const [form, setForm] = useState<FormState>(initial ? {
    cliente: initial.cliente, oggetto: initial.oggetto, importo: initial.importo,
    status: initial.status, data: initial.data, validita: initial.validita,
  } : emptyForm());

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.type === 'number' ? Number(e.target.value) : e.target.value }));

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Cliente" required><input className={fc} value={form.cliente} onChange={set('cliente')} placeholder="Es. Hotel Splendide" required /></Field>
        <Field label="Stato">
          <select className={fc} value={form.status} onChange={set('status')}>
            {(Object.keys(statusMap) as PreventivoStatus[]).map(s => <option key={s} value={s}>{statusMap[s].label}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Oggetto / descrizione lavori" required>
        <textarea className={`${fc} resize-none`} rows={2} value={form.oggetto} onChange={set('oggetto')} placeholder="Es. Ristrutturazione completa appartamento 150mq" required />
      </Field>
      <div className="grid grid-cols-3 gap-3">
        <Field label="Importo (CHF)" required><input type="number" className={fc} value={form.importo || ''} onChange={set('importo')} placeholder="0" min="0" required /></Field>
        <Field label="Data preventivo"><input type="date" className={fc} value={form.data} onChange={set('data')} /></Field>
        <Field label="Validità fino al"><input type="date" className={fc} value={form.validita} onChange={set('validita')} /></Field>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm rounded-lg font-medium" style={{ background: '#F1F4F8', color: '#64748B' }}>Annulla</button>
        <button type="submit" className="px-5 py-2 text-sm font-semibold rounded-lg text-white" style={{ background: '#E85D26' }}>
          {initial ? 'Salva modifiche' : 'Crea preventivo'}
        </button>
      </div>
    </form>
  );
}

export default function Preventivi() {
  const { preventivi, addPreventivo, updatePreventivo, deletePreventivo, showToast } = useStore();
  const [filter, setFilter] = useState<PreventivoStatus | 'tutti'>('tutti');
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Preventivo | null>(null);

  const visible = filter === 'tutti' ? preventivi : preventivi.filter(p => p.status === filter);

  const totAcc = preventivi.filter(p => p.status === 'accettato').reduce((a, p) => a + p.importo, 0);
  const totInv = preventivi.filter(p => p.status === 'inviato').reduce((a, p) => a + p.importo, 0);
  const accRate = preventivi.filter(p => p.status !== 'bozza').length > 0
    ? Math.round((preventivi.filter(p => p.status === 'accettato').length / preventivi.filter(p => p.status !== 'bozza').length) * 100)
    : 0;

  const handleCreate = (d: FormState) => { addPreventivo(d); setCreating(false); showToast('Preventivo creato'); };
  const handleUpdate = (d: FormState) => { if (!editing) return; updatePreventivo(editing.id, d); setEditing(null); showToast('Preventivo aggiornato'); };
  const handleDelete = (p: Preventivo) => {
    if (!confirm(`Eliminare il preventivo ${p.numero}?`)) return;
    deletePreventivo(p.id); showToast('Preventivo eliminato', 'info');
  };
  const quickStatus = (p: Preventivo, s: PreventivoStatus) => { updatePreventivo(p.id, { status: s }); showToast(`Preventivo segnato come ${statusMap[s].label}`); };

  return (
    <div className="p-6 animate-fade-in">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Totale pipeline', value: fmtChf(preventivi.reduce((a, p) => a + p.importo, 0)), icon: FileText, color: '#0F1F3D' },
          { label: 'Accettati', value: fmtChf(totAcc), icon: CheckCircle2, color: '#16A34A' },
          { label: 'In attesa risposta', value: fmtChf(totInv), icon: Send, color: '#2563EB' },
          { label: 'Tasso accettazione', value: `${accRate}%`, icon: CheckCircle2, color: '#E85D26' },
        ].map(item => (
          <div key={item.label} className="p-4 rounded-xl border" style={{ background: '#fff', borderColor: '#E2E8F0' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] uppercase tracking-wider" style={{ color: '#94A3B8' }}>{item.label}</div>
              <item.icon className="w-4 h-4" style={{ color: item.color }} />
            </div>
            <div className="font-bold text-sm" style={{ color: item.color }}>{item.value}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          {(['tutti', 'inviato', 'accettato', 'bozza', 'rifiutato'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{ background: filter === f ? '#0F1F3D' : '#fff', color: filter === f ? '#fff' : '#64748B', border: `1px solid ${filter === f ? '#0F1F3D' : '#E2E8F0'}` }}>
              {f === 'tutti' ? 'Tutti' : statusMap[f]?.label}
            </button>
          ))}
        </div>
        <button onClick={() => setCreating(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white" style={{ background: '#E85D26' }}>
          <Plus className="w-3.5 h-3.5" /> Nuovo preventivo
        </button>
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ background: '#fff', borderColor: '#E2E8F0' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              {['Numero', 'Cliente', 'Oggetto', 'Importo', 'Data', 'Stato', 'Azioni'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#94A3B8' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((p, i) => {
              const s = statusMap[p.status];
              const Icon = s.icon;
              return (
                <tr key={p.id} style={{ borderBottom: i < visible.length - 1 ? '1px solid #F1F4F8' : 'none' }}>
                  <td className="px-4 py-3"><span className="text-xs font-mono font-semibold" style={{ color: '#0F172A' }}>{p.numero}</span></td>
                  <td className="px-4 py-3"><span className="text-xs font-medium" style={{ color: '#0F172A' }}>{p.cliente}</span></td>
                  <td className="px-4 py-3 max-w-[180px]"><span className="text-xs truncate block" style={{ color: '#64748B' }}>{p.oggetto}</span></td>
                  <td className="px-4 py-3"><span className="text-xs font-bold" style={{ color: '#0F172A' }}>{fmtChf(p.importo)}</span></td>
                  <td className="px-4 py-3"><span className="text-xs" style={{ color: '#64748B' }}>{fmtDate(p.data)}</span></td>
                  <td className="px-4 py-3">
                    <select className="text-[10px] font-semibold px-2 py-0.5 rounded-full border-0 cursor-pointer outline-none"
                      value={p.status} onChange={e => quickStatus(p, e.target.value as PreventivoStatus)}
                      style={{ background: s.bg, color: s.text }}>
                      {(Object.keys(statusMap) as PreventivoStatus[]).map(st => <option key={st} value={st}>{statusMap[st].label}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setEditing(p)} className="p-1.5 rounded-lg" style={{ background: '#F1F4F8', color: '#64748B' }}><Edit3 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDelete(p)} className="p-1.5 rounded-lg" style={{ background: '#FEE2E2', color: '#DC2626' }}><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {visible.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-12 text-center text-sm" style={{ color: '#94A3B8' }}>Nessun preventivo trovato</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {creating && <Modal title="Nuovo preventivo" onClose={() => setCreating(false)}><PreventivoForm onSave={handleCreate} onClose={() => setCreating(false)} /></Modal>}
      {editing && <Modal title="Modifica preventivo" onClose={() => setEditing(null)}><PreventivoForm initial={editing} onSave={handleUpdate} onClose={() => setEditing(null)} /></Modal>}
    </div>
  );
}
