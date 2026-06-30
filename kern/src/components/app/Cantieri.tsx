import { useState } from 'react';
import { HardHat, MapPin, Plus, Trash2, Edit3, X, ChevronRight, Calendar, User } from 'lucide-react';
import { useStore } from '../../store/useStore';
import type { Cantiere, CantiereStatus } from '../../data/mock';
import Modal from '../ui/Modal';

function fmtChf(n: number) { return 'CHF ' + n.toLocaleString('de-CH'); }
function fmtDate(s: string) { return s ? new Date(s).toLocaleDateString('it-CH', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'; }

const statusMap: Record<CantiereStatus, { label: string; bg: string; text: string }> = {
  in_corso: { label: 'In corso', bg: '#DCFCE7', text: '#16A34A' },
  pianificato: { label: 'Pianificato', bg: '#DBEAFE', text: '#2563EB' },
  completato: { label: 'Completato', bg: '#F1F5F9', text: '#475569' },
  sospeso: { label: 'Sospeso', bg: '#FEE2E2', text: '#DC2626' },
};

const localita = ['Lugano', 'Locarno', 'Bellinzona', 'Mendrisio', 'Chiasso', 'Zurigo', 'Berna', 'Ginevra', 'Basilea'];
const responsabili = ['Marco Bianchi', 'Luca Ferretti', 'Sara Conti', 'Giulia Ricci', 'Fabio Mazza'];

interface FormState {
  nome: string; cliente: string; localita: string; status: CantiereStatus;
  valore: number; avanzamento: number; dataInizio: string; dataFine: string;
  responsabile: string; operai: number; speseSostenute: number;
}

const emptyForm = (): FormState => ({
  nome: '', cliente: '', localita: 'Lugano', status: 'pianificato',
  valore: 0, avanzamento: 0, dataInizio: new Date().toISOString().split('T')[0],
  dataFine: '', responsabile: '', operai: 1, speseSostenute: 0,
});

function inp(cls?: string) {
  return `w-full px-3 py-2 rounded-lg border text-sm outline-none field-input ${cls ?? ''}`;
}

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

function CantierForm({ initial, onSave, onClose }: { initial?: Cantiere; onSave: (d: FormState) => void; onClose: () => void }) {
  const [form, setForm] = useState<FormState>(initial ? {
    nome: initial.nome, cliente: initial.cliente, localita: initial.localita,
    status: initial.status, valore: initial.valore, avanzamento: initial.avanzamento,
    dataInizio: initial.dataInizio, dataFine: initial.dataFine,
    responsabile: initial.responsabile, operai: initial.operai, speseSostenute: initial.speseSostenute,
  } : emptyForm());

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.type === 'number' ? Number(e.target.value) : e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Nome cantiere" required><input className={inp()} value={form.nome} onChange={set('nome')} placeholder="Es. Residenza Villa Verde" required /></Field>
        <Field label="Cliente" required><input className={inp()} value={form.cliente} onChange={set('cliente')} placeholder="Es. Famiglia Müller" required /></Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Località">
          <select className={inp()} value={form.localita} onChange={set('localita')}>
            {localita.map(l => <option key={l}>{l}</option>)}
          </select>
        </Field>
        <Field label="Stato">
          <select className={inp()} value={form.status} onChange={set('status')}>
            {(Object.keys(statusMap) as CantiereStatus[]).map(s => <option key={s} value={s}>{statusMap[s].label}</option>)}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Valore contratto (CHF)"><input type="number" className={inp()} value={form.valore || ''} onChange={set('valore')} placeholder="0" min="0" /></Field>
        <Field label="Spese sostenute (CHF)"><input type="number" className={inp()} value={form.speseSostenute || ''} onChange={set('speseSostenute')} placeholder="0" min="0" /></Field>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Field label="Avanzamento %"><input type="number" className={inp()} value={form.avanzamento} onChange={set('avanzamento')} min="0" max="100" /></Field>
        <Field label="Operai"><input type="number" className={inp()} value={form.operai} onChange={set('operai')} min="0" /></Field>
        <Field label="Responsabile">
          <select className={inp()} value={form.responsabile} onChange={set('responsabile')}>
            <option value="">Seleziona...</option>
            {responsabili.map(r => <option key={r}>{r}</option>)}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Data inizio"><input type="date" className={inp()} value={form.dataInizio} onChange={set('dataInizio')} /></Field>
        <Field label="Data fine prevista"><input type="date" className={inp()} value={form.dataFine} onChange={set('dataFine')} /></Field>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm rounded-lg font-medium" style={{ background: '#F1F4F8', color: '#64748B' }}>Annulla</button>
        <button type="submit" className="px-5 py-2 text-sm font-semibold rounded-lg text-white" style={{ background: '#E85D26' }}>
          {initial ? 'Salva modifiche' : 'Crea cantiere'}
        </button>
      </div>
    </form>
  );
}

function DetailPanel({ c, onClose, onEdit, onDelete }: { c: Cantiere; onClose: () => void; onEdit: () => void; onDelete: () => void }) {
  const s = statusMap[c.status];
  const margine = c.valore > 0 ? Math.round(((c.valore - c.speseSostenute) / c.valore) * 100) : 0;
  return (
    <div className="fixed inset-0 z-50 flex" style={{ background: 'rgba(15,31,61,0.45)' }} onClick={onClose}>
      <div className="ml-auto w-full max-w-md h-full flex flex-col animate-fade-in"
        style={{ background: '#fff', boxShadow: '-4px 0 32px rgba(0,0,0,0.12)' }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between p-6 border-b" style={{ borderColor: '#E2E8F0' }}>
          <div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: s.bg, color: s.text }}>{s.label}</span>
            <h2 className="font-bold text-base mt-2" style={{ color: '#0F172A' }}>{c.nome}</h2>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" style={{ color: '#94A3B8' }} />
              <span className="text-xs" style={{ color: '#64748B' }}>{c.localita} · {c.cliente}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg" style={{ color: '#94A3B8' }}><X className="w-5 h-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Valore contratto', value: fmtChf(c.valore), color: '#16A34A' },
              { label: 'Spese sostenute', value: fmtChf(c.speseSostenute), color: '#DC2626' },
              { label: 'Margine stimato', value: `${margine}%`, color: margine > 20 ? '#16A34A' : '#D97706' },
              { label: 'Operai impiegati', value: `${c.operai}`, color: '#0F1F3D' },
            ].map(item => (
              <div key={item.label} className="p-3 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: '#94A3B8' }}>{item.label}</div>
                <div className="font-bold text-sm" style={{ color: item.color }}>{item.value}</div>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold" style={{ color: '#0F172A' }}>Avanzamento lavori</span>
              <span className="font-bold text-sm" style={{ color: '#E85D26' }}>{c.avanzamento}%</span>
            </div>
            <div className="h-2 rounded-full" style={{ background: '#E2E8F0' }}>
              <div className="h-full rounded-full" style={{ width: `${c.avanzamento}%`, background: 'linear-gradient(90deg, #E85D26, #F97316)' }} />
            </div>
          </div>
          <div className="space-y-3">
            {[
              { icon: User, label: 'Responsabile', value: c.responsabile || '—' },
              { icon: Calendar, label: 'Inizio lavori', value: fmtDate(c.dataInizio) },
              { icon: Calendar, label: 'Fine prevista', value: fmtDate(c.dataFine) },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#F1F4F8' }}>
                  <item.icon className="w-4 h-4" style={{ color: '#64748B' }} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider" style={{ color: '#94A3B8' }}>{item.label}</div>
                  <div className="text-xs font-semibold" style={{ color: '#0F172A' }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 border-t flex gap-2" style={{ borderColor: '#E2E8F0' }}>
          <button onClick={onDelete} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium" style={{ background: '#FEE2E2', color: '#DC2626' }}>
            <Trash2 className="w-4 h-4" /> Elimina
          </button>
          <button onClick={onEdit} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: '#E85D26' }}>
            <Edit3 className="w-4 h-4" /> Modifica
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Cantieri() {
  const { cantieri, addCantiere, updateCantiere, deleteCantiere, showToast } = useStore();
  const [filter, setFilter] = useState<CantiereStatus | 'tutti'>('tutti');
  const [selected, setSelected] = useState<Cantiere | null>(null);
  const [editing, setEditing] = useState<Cantiere | null>(null);
  const [creating, setCreating] = useState(false);

  const counts = {
    tutti: cantieri.length,
    in_corso: cantieri.filter(c => c.status === 'in_corso').length,
    pianificato: cantieri.filter(c => c.status === 'pianificato').length,
    completato: cantieri.filter(c => c.status === 'completato').length,
    sospeso: cantieri.filter(c => c.status === 'sospeso').length,
  };

  const visible = filter === 'tutti' ? cantieri : cantieri.filter(c => c.status === filter);

  const handleCreate = (d: FormState) => {
    addCantiere(d);
    setCreating(false);
    showToast('Cantiere creato con successo');
  };

  const handleUpdate = (d: FormState) => {
    if (!editing) return;
    updateCantiere(editing.id, d);
    setEditing(null);
    setSelected(null);
    showToast('Cantiere aggiornato');
  };

  const handleDelete = (c: Cantiere) => {
    if (!confirm(`Eliminare "${c.nome}"? L'azione non è reversibile.`)) return;
    deleteCantiere(c.id);
    setSelected(null);
    showToast('Cantiere eliminato', 'info');
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          {(['tutti', 'in_corso', 'pianificato', 'completato', 'sospeso'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{ background: filter === f ? '#0F1F3D' : '#fff', color: filter === f ? '#fff' : '#64748B', border: `1px solid ${filter === f ? '#0F1F3D' : '#E2E8F0'}` }}>
              {f === 'tutti' ? 'Tutti' : statusMap[f as CantiereStatus]?.label}
              <span className="w-4 h-4 rounded-full text-[10px] flex items-center justify-center" style={{ background: filter === f ? 'rgba(255,255,255,0.2)' : '#F1F4F8' }}>{counts[f]}</span>
            </button>
          ))}
        </div>
        <button onClick={() => setCreating(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
          style={{ background: '#E85D26' }}>
          <Plus className="w-3.5 h-3.5" /> Nuovo cantiere
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {visible.map(c => {
          const s = statusMap[c.status];
          return (
            <div key={c.id}
              className="p-5 rounded-xl border cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: '#fff', borderColor: '#E2E8F0' }}
              onClick={() => setSelected(c)}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: s.bg, color: s.text }}>{s.label}</span>
                <ChevronRight className="w-4 h-4" style={{ color: '#CBD5E1' }} />
              </div>
              <div className="font-semibold text-sm mb-1" style={{ color: '#0F172A' }}>{c.nome}</div>
              <div className="flex items-center gap-1 mb-3">
                <MapPin className="w-3 h-3" style={{ color: '#94A3B8' }} />
                <span className="text-xs" style={{ color: '#64748B' }}>{c.localita} · {c.cliente}</span>
              </div>
              {c.status !== 'pianificato' && (
                <>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px]" style={{ color: '#94A3B8' }}>Avanzamento</span>
                    <span className="text-xs font-bold" style={{ color: c.avanzamento > 60 ? '#16A34A' : '#E85D26' }}>{c.avanzamento}%</span>
                  </div>
                  <div className="h-1.5 rounded-full mb-3" style={{ background: '#F1F4F8' }}>
                    <div className="h-full rounded-full" style={{ width: `${c.avanzamento}%`, background: c.avanzamento === 100 ? '#16A34A' : '#E85D26' }} />
                  </div>
                </>
              )}
              <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: '#F1F4F8' }}>
                <div>
                  <div className="text-[10px] uppercase tracking-wider" style={{ color: '#94A3B8' }}>Valore</div>
                  <div className="text-xs font-bold" style={{ color: '#0F172A' }}>{fmtChf(c.valore)}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider" style={{ color: '#94A3B8' }}>Responsabile</div>
                  <div className="text-xs font-semibold" style={{ color: '#64748B' }}>{c.responsabile ? c.responsabile.split(' ').slice(0,2).join(' ') : '—'}</div>
                </div>
              </div>
            </div>
          );
        })}
        {visible.length === 0 && (
          <div className="col-span-3 text-center py-16 text-sm" style={{ color: '#94A3B8' }}>
            Nessun cantiere in questa categoria
          </div>
        )}
      </div>

      {selected && !editing && (
        <DetailPanel c={selected} onClose={() => setSelected(null)}
          onEdit={() => { setEditing(selected); setSelected(null); }}
          onDelete={() => handleDelete(selected)} />
      )}

      {creating && (
        <Modal title="Nuovo cantiere" onClose={() => setCreating(false)} size="lg">
          <CantierForm onSave={handleCreate} onClose={() => setCreating(false)} />
        </Modal>
      )}

      {editing && (
        <Modal title="Modifica cantiere" onClose={() => setEditing(null)} size="lg">
          <CantierForm initial={editing} onSave={handleUpdate} onClose={() => setEditing(null)} />
        </Modal>
      )}
    </div>
  );
}
