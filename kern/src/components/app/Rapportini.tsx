import { useState } from 'react';
import { ClipboardList, HardHat, Clock, Package, AlertCircle, Plus, MessageSquare, Trash2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import Modal from '../ui/Modal';
import { useT } from '../../i18n/useT';

function today() { return new Date().toISOString().split('T')[0]; }
const avatarColors = ['#0F1F3D', '#E85D26', '#16A34A', '#7C3AED', '#D97706', '#2563EB'];
function initials(name: string) { return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2); }

const fc = 'w-full px-3 py-2 rounded-lg border text-sm outline-none field-input';
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs font-medium mb-1" style={{ color: '#64748B' }}>{label}</label>{children}</div>;
}

export default function Rapportini() {
  const { cantieri, rapportini, addRapportino, deleteRapportino, showToast } = useStore();
  const t = useT();
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ cantiere: '', operaio: '', data: today(), ore: 8, attivita: '', materiali: '', note: '' });

  const setF = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.type === 'number' ? Number(e.target.value) : e.target.value }));

  const todayRaps = rapportini.filter(r => r.data === today());
  const ieri = rapportini.filter(r => {
    const d = new Date(); d.setDate(d.getDate() - 1);
    return r.data === d.toISOString().split('T')[0];
  });
  const totalOreOggi = todayRaps.reduce((a, r) => a + r.ore, 0);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.operaio || !form.cantiere || !form.attivita) return;
    addRapportino(form);
    setCreating(false);
    setForm({ cantiere: '', operaio: '', data: today(), ore: 8, attivita: '', materiali: '', note: '' });
    showToast(t('creato'));
  };

  const handleDelete = (id: string) => {
    deleteRapportino(id);
    showToast(t('eliminato'), 'info');
  };

  const todayFormatted = new Date().toLocaleDateString('it-CH', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className="p-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: t('rapportini_oggi'), value: String(todayRaps.length), icon: ClipboardList, color: '#0F1F3D' },
          { label: t('ore_lavorate'), value: `${totalOreOggi}h`, icon: Clock, color: '#E85D26' },
          { label: t('cantieri_attivi_oggi'), value: String(new Set(todayRaps.map(r => r.cantiere)).size), icon: HardHat, color: '#16A34A' },
          { label: t('note_urgenti'), value: String(rapportini.filter(r => r.note).length), icon: AlertCircle, color: '#D97706' },
        ].map(item => (
          <div key={item.label} className="p-4 rounded-xl border" style={{ background: '#fff', borderColor: '#E2E8F0' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] uppercase tracking-wider" style={{ color: '#94A3B8' }}>{item.label}</div>
              <item.icon className="w-4 h-4" style={{ color: item.color }} />
            </div>
            <div className="font-bold text-base" style={{ color: '#0F172A' }}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* WhatsApp notice */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-6" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
        <MessageSquare className="w-4 h-4 flex-shrink-0" style={{ color: '#16A34A' }} />
        <span className="text-xs font-medium" style={{ color: '#15803D' }}>{t('whatsapp_msg')}</span>
        <button className="ml-auto px-2.5 py-1 rounded-lg text-[10px] font-semibold" style={{ background: '#16A34A', color: '#fff' }}>{t('whatsapp_btn')}</button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm" style={{ color: '#0F172A' }}>{t('rapportini_oggi_title')} {todayFormatted}</h3>
        <button onClick={() => setCreating(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white" style={{ background: '#E85D26' }}>
          <Plus className="w-3.5 h-3.5" /> {t('nuovo_rapportino')}
        </button>
      </div>

      {/* Today list */}
      <div className="space-y-3 mb-8">
        {todayRaps.length === 0 && (
          <div className="text-center py-10 text-sm rounded-xl border" style={{ color: '#94A3B8', background: '#fff', borderColor: '#E2E8F0' }}>
            {t('nessun_rapportino')}
          </div>
        )}
        {todayRaps.map((r, i) => (
          <div key={r.id} className="p-4 rounded-xl border flex gap-4 transition-all hover:shadow-sm"
            style={{ background: '#fff', borderColor: r.note ? '#FED7AA' : '#E2E8F0' }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: avatarColors[i % avatarColors.length] }}>
              {initials(r.operaio)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <span className="text-xs font-semibold" style={{ color: '#0F172A' }}>{r.operaio}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#F1F4F8', color: '#64748B' }}>{r.ore}h</span>
              </div>
              <div className="text-[11px] mt-0.5 font-medium" style={{ color: '#64748B' }}>{r.cantiere}</div>
              <div className="flex items-center gap-1.5 mt-2">
                <HardHat className="w-3 h-3 flex-shrink-0" style={{ color: '#94A3B8' }} />
                <span className="text-xs" style={{ color: '#475569' }}>{r.attivita}</span>
              </div>
              {r.materiali && (
                <div className="flex items-center gap-1.5 mt-1">
                  <Package className="w-3 h-3 flex-shrink-0" style={{ color: '#94A3B8' }} />
                  <span className="text-xs" style={{ color: '#475569' }}>{r.materiali}</span>
                </div>
              )}
              {r.note && (
                <div className="flex items-start gap-1.5 mt-2 px-2.5 py-1.5 rounded-lg" style={{ background: '#FFF7ED' }}>
                  <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: '#D97706' }} />
                  <span className="text-[11px]" style={{ color: '#92400E' }}>{r.note}</span>
                </div>
              )}
            </div>
            <button onClick={() => handleDelete(r.id)} className="p-1.5 rounded-lg flex-shrink-0 self-start" style={{ background: '#FEE2E2', color: '#DC2626' }}>
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Yesterday */}
      {ieri.length > 0 && (
        <>
          <h3 className="font-semibold text-sm mb-3" style={{ color: '#64748B' }}>{t('ieri')}</h3>
          <div className="space-y-3">
            {ieri.map((r, i) => (
              <div key={r.id} className="p-4 rounded-xl border flex gap-4" style={{ background: '#FAFAFA', borderColor: '#E2E8F0' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: avatarColors[i % avatarColors.length], opacity: 0.7 }}>
                  {initials(r.operaio)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold" style={{ color: '#475569' }}>{r.operaio}</span>
                    <span className="text-[10px]" style={{ color: '#94A3B8' }}>{r.ore}h</span>
                  </div>
                  <div className="text-[11px] mt-0.5" style={{ color: '#94A3B8' }}>{r.cantiere}</div>
                  <div className="text-xs mt-1" style={{ color: '#64748B' }}>{r.attivita}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Create modal */}
      {creating && (
        <Modal title={t('nuovo_rapportino')} onClose={() => setCreating(false)}>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label={t('operaio')}>
                <input className={fc} value={form.operaio} onChange={setF('operaio')} placeholder="Es. Giovanni Esposito" required />
              </Field>
              <Field label={t('cantiere')}>
                <select className={fc} value={form.cantiere} onChange={setF('cantiere')} required>
                  <option value="">Seleziona...</option>
                  {cantieri.filter(c => c.status === 'in_corso').map(c => <option key={c.id} value={c.nome}>{c.nome}</option>)}
                </select>
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Data"><input type="date" className={fc} value={form.data} onChange={setF('data')} /></Field>
              <Field label={t('ore')}><input type="number" className={fc} value={form.ore} onChange={setF('ore')} min="1" max="16" /></Field>
            </div>
            <Field label={t('attivita')}>
              <input className={fc} value={form.attivita} onChange={setF('attivita')} placeholder="Es. Posa pavimento piano primo" required />
            </Field>
            <Field label={t('materiali')}>
              <input className={fc} value={form.materiali} onChange={setF('materiali')} placeholder="Es. Piastrelle 60x60, malta" />
            </Field>
            <Field label={t('note')}>
              <textarea className={`${fc} resize-none`} rows={2} value={form.note} onChange={setF('note')} placeholder="Es. Attesa ispezione..." />
            </Field>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setCreating(false)} className="px-4 py-2 text-sm rounded-lg font-medium" style={{ background: '#F1F4F8', color: '#64748B' }}>{t('annulla')}</button>
              <button type="submit" className="px-5 py-2 text-sm font-semibold rounded-lg text-white" style={{ background: '#E85D26' }}>{t('crea')}</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
