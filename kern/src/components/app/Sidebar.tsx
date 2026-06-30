import { LayoutDashboard, HardHat, FileText, Receipt, ClipboardList, Users, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useT } from '../../i18n/useT';

interface Props {
  active: string;
  onNavigate: (s: string) => void;
}

export default function Sidebar({ active, onNavigate }: Props) {
  const { logout, lang, setLang, user } = useStore();
  const t = useT();

  const nav = [
    { id: 'dashboard', label: t('nav_dashboard'), icon: LayoutDashboard },
    { id: 'cantieri', label: t('nav_cantieri'), icon: HardHat },
    { id: 'preventivi', label: t('nav_preventivi'), icon: FileText },
    { id: 'fatture', label: t('nav_fatture'), icon: Receipt },
    { id: 'rapportini', label: t('nav_rapportini'), icon: ClipboardList },
    { id: 'team', label: t('nav_team'), icon: Users },
  ];

  return (
    <aside className="w-56 flex-shrink-0 flex flex-col" style={{ background: '#0F1F3D', minHeight: '100vh' }}>
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded flex items-center justify-center font-black text-sm" style={{ background: '#E85D26', color: '#fff' }}>K</div>
          <div>
            <div className="font-bold text-sm tracking-widest" style={{ color: '#fff' }}>KERN</div>
            <div className="text-[9px] font-medium tracking-wider uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>Edilizia Svizzera</div>
          </div>
        </div>
      </div>

      {/* Company badge */}
      <div className="px-4 py-3 mx-3 mt-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div className="text-[10px] font-medium uppercase tracking-wider mb-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{t('nav_company')}</div>
        <div className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>Bianchi & Figli SA</div>
        <div className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Lugano, CH</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 mt-5 space-y-0.5">
        {nav.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button key={id} onClick={() => onNavigate(id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150"
              style={{
                background: isActive ? 'rgba(232,93,38,0.18)' : 'transparent',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                borderLeft: isActive ? '2px solid #E85D26' : '2px solid transparent',
              }}>
              <Icon className="w-4 h-4 flex-shrink-0" style={{ color: isActive ? '#E85D26' : undefined }} />
              <span className="text-xs font-medium">{label}</span>
              {isActive && <ChevronRight className="w-3 h-3 ml-auto opacity-60" />}
            </button>
          );
        })}
      </nav>

      {/* Language switcher */}
      <div className="px-4 mb-3">
        <div className="text-[9px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>Lingua / Sprache / Langue</div>
        <div className="flex gap-1">
          {(['it', 'de', 'fr'] as const).map(l => (
            <button key={l} onClick={() => setLang(l)}
              className="flex-1 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all"
              style={{
                background: lang === l ? '#E85D26' : 'rgba(255,255,255,0.06)',
                color: lang === l ? '#fff' : 'rgba(255,255,255,0.4)',
              }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="px-3 pb-5 space-y-0.5">
        <div className="h-px mx-2 mb-3" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left"
          style={{ color: 'rgba(255,255,255,0.4)' }}>
          <Settings className="w-4 h-4" />
          <span className="text-xs font-medium">{t('nav_settings')}</span>
        </button>
        <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left"
          style={{ color: 'rgba(255,255,255,0.4)' }}>
          <LogOut className="w-4 h-4" />
          <span className="text-xs font-medium">{t('nav_logout')}</span>
        </button>
      </div>
    </aside>
  );
}
