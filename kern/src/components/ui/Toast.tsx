import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function Toast() {
  const { toast, showToast } = useStore();
  if (!toast) return null;

  const cfg = {
    success: { icon: CheckCircle2, bg: '#DCFCE7', text: '#15803D', border: '#86EFAC' },
    error: { icon: XCircle, bg: '#FEE2E2', text: '#DC2626', border: '#FCA5A5' },
    info: { icon: Info, bg: '#DBEAFE', text: '#1D4ED8', border: '#93C5FD' },
  }[toast.type];

  const Icon = cfg.icon;

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-fade-in flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg"
      style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.text, minWidth: 280 }}>
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="text-sm font-medium flex-1">{toast.msg}</span>
      <button onClick={() => showToast('', 'info')} style={{ color: cfg.text, opacity: 0.6 }}>
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
