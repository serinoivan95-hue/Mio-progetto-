import { Search, Bell, Plus } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface Props {
  title: string;
  subtitle?: string;
  action?: string;
  onAction?: () => void;
}

export default function TopBar({ title, subtitle, action, onAction }: Props) {
  const user = useStore(s => s.user);
  const initials = user?.nome.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() ?? 'MB';

  return (
    <header className="flex items-center justify-between px-6 py-3.5 border-b flex-shrink-0"
      style={{ background: '#fff', borderColor: '#E2E8F0', minHeight: 60 }}>
      <div>
        <div className="font-bold text-sm" style={{ color: '#0F172A' }}>{title}</div>
        {subtitle && <div className="text-xs" style={{ color: '#94A3B8' }}>{subtitle}</div>}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: '#CBD5E1' }} />
          <input
            className="pl-8 pr-4 py-1.5 rounded-lg text-xs outline-none"
            style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A', width: 200 }}
            placeholder="Cerca..."
          />
        </div>

        {/* Bell */}
        <button className="relative p-2 rounded-lg" style={{ background: '#F8FAFC' }}>
          <Bell className="w-4 h-4" style={{ color: '#64748B' }} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: '#E85D26' }} />
        </button>

        {/* CTA */}
        {action && (
          <button onClick={onAction}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
            style={{ background: '#E85D26' }}>
            <Plus className="w-3.5 h-3.5" /> {action}
          </button>
        )}

        {/* Avatar */}
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 cursor-pointer"
          style={{ background: '#0F1F3D' }} title={user?.nome}>
          {initials}
        </div>
      </div>
    </header>
  );
}
