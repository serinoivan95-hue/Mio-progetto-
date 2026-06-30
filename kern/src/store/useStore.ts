import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Cantiere, Fattura, Preventivo, Rapportino } from '../data/mock';
import { cantieri as seedC, fatture as seedF, preventivi as seedP, rapportini as seedR } from '../data/mock';
import type { Lang } from '../i18n/translations';

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 5); }

function autoFatNum(fatture: Fattura[]) {
  const nums = fatture.map(f => parseInt(f.numero.split('-')[2] || '0')).filter(Boolean);
  return `FAT-2026-${String(nums.length ? Math.max(...nums) + 1 : 45).padStart(3, '0')}`;
}
function autoPrvNum(preventivi: Preventivo[]) {
  const nums = preventivi.map(p => parseInt(p.numero.split('-')[2] || '0')).filter(Boolean);
  return `PRV-2026-${String(nums.length ? Math.max(...nums) + 1 : 21).padStart(3, '0')}`;
}

export type ToastType = 'success' | 'error' | 'info';
export interface KernUser { nome: string; email: string; ruolo: string; }

interface Store {
  cantieri: Cantiere[];
  fatture: Fattura[];
  preventivi: Preventivo[];
  rapportini: Rapportino[];

  addCantiere(d: Omit<Cantiere, 'id'>): void;
  updateCantiere(id: string, d: Partial<Cantiere>): void;
  deleteCantiere(id: string): void;

  addFattura(d: Omit<Fattura, 'id' | 'numero'>): void;
  updateFattura(id: string, d: Partial<Fattura>): void;
  deleteFattura(id: string): void;

  addPreventivo(d: Omit<Preventivo, 'id' | 'numero'>): void;
  updatePreventivo(id: string, d: Partial<Preventivo>): void;
  deletePreventivo(id: string): void;

  addRapportino(d: Omit<Rapportino, 'id'>): void;
  deleteRapportino(id: string): void;

  user: KernUser | null;
  login(email: string, password: string): boolean;
  logout(): void;

  lang: Lang;
  setLang(l: Lang): void;

  toast: { id: string; msg: string; type: ToastType } | null;
  showToast(msg: string, type?: ToastType): void;
}

const DEMO_USERS = [
  { email: 'admin@kern.ch', password: 'kern2026', nome: 'Marco Bianchi', ruolo: 'Amministratore' },
  { email: 'demo@kern.ch', password: 'demo', nome: 'Demo User', ruolo: 'Operatore' },
];

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      cantieri: seedC,
      fatture: seedF,
      preventivi: seedP,
      rapportini: seedR,
      user: null,
      toast: null,
      lang: 'it' as Lang,
      setLang: (l) => set({ lang: l }),

      addCantiere: (d) => set(s => ({ cantieri: [...s.cantieri, { ...d, id: 'c' + uid() }] })),
      updateCantiere: (id, d) => set(s => ({ cantieri: s.cantieri.map(c => c.id === id ? { ...c, ...d } : c) })),
      deleteCantiere: (id) => set(s => ({ cantieri: s.cantieri.filter(c => c.id !== id) })),

      addFattura: (d) => set(s => ({ fatture: [...s.fatture, { ...d, id: 'f' + uid(), numero: autoFatNum(s.fatture) }] })),
      updateFattura: (id, d) => set(s => ({ fatture: s.fatture.map(f => f.id === id ? { ...f, ...d } : f) })),
      deleteFattura: (id) => set(s => ({ fatture: s.fatture.filter(f => f.id !== id) })),

      addPreventivo: (d) => set(s => ({ preventivi: [...s.preventivi, { ...d, id: 'p' + uid(), numero: autoPrvNum(s.preventivi) }] })),
      updatePreventivo: (id, d) => set(s => ({ preventivi: s.preventivi.map(p => p.id === id ? { ...p, ...d } : p) })),
      deletePreventivo: (id) => set(s => ({ preventivi: s.preventivi.filter(p => p.id !== id) })),

      addRapportino: (d) => set(s => ({ rapportini: [...s.rapportini, { ...d, id: 'r' + uid() }] })),
      deleteRapportino: (id) => set(s => ({ rapportini: s.rapportini.filter(r => r.id !== id) })),

      login: (email, password) => {
        const u = DEMO_USERS.find(u => u.email === email && u.password === password);
        if (u) { set({ user: { nome: u.nome, email: u.email, ruolo: u.ruolo } }); return true; }
        return false;
      },
      logout: () => set({ user: null }),

      showToast: (msg, type = 'success') => {
        const id = uid();
        set({ toast: { id, msg, type } });
        setTimeout(() => set(s => s.toast?.id === id ? { toast: null } : {}), 3200);
      },
    }),
    {
      name: 'kern-app-v1',
      partialize: (s) => ({ cantieri: s.cantieri, fatture: s.fatture, preventivi: s.preventivi, rapportini: s.rapportini, user: s.user, lang: s.lang }),
    }
  )
);
