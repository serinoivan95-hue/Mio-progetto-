import { useState } from 'react';
import { useStore } from './store/useStore';
import { useT } from './i18n/useT';
import Login from './components/auth/Login';
import Landing from './components/Landing';
import Sidebar from './components/app/Sidebar';
import TopBar from './components/app/TopBar';
import Dashboard from './components/app/Dashboard';
import Cantieri from './components/app/Cantieri';
import Preventivi from './components/app/Preventivi';
import Fatture from './components/app/Fatture';
import Rapportini from './components/app/Rapportini';
import Toast from './components/ui/Toast';

function TeamPlaceholder() {
  return (
    <div className="p-6 animate-fade-in">
      <div className="flex flex-col items-center justify-center py-24 rounded-xl border" style={{ background: '#fff', borderColor: '#E2E8F0' }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: '#F1F4F8' }}>
          <span className="text-xl">👷</span>
        </div>
        <div className="font-semibold text-sm mb-1" style={{ color: '#0F172A' }}>Gestione team</div>
        <div className="text-xs" style={{ color: '#94A3B8' }}>In arrivo nel prossimo aggiornamento</div>
      </div>
    </div>
  );
}

function AppShell() {
  const [section, setSection] = useState('dashboard');
  const t = useT();

  const sectionMeta: Record<string, { titleKey: string; subtitleKey?: string; actionKey?: string }> = {
    dashboard: { titleKey: 'nav_dashboard' },
    cantieri: { titleKey: 'nav_cantieri', actionKey: 'nuovo_cantiere' },
    preventivi: { titleKey: 'nav_preventivi', actionKey: 'nuovo_preventivo' },
    fatture: { titleKey: 'nav_fatture', actionKey: 'nuova_fattura' },
    rapportini: { titleKey: 'nav_rapportini', actionKey: 'nuovo_rapportino' },
    team: { titleKey: 'nav_team' },
  };

  const meta = sectionMeta[section] ?? sectionMeta['dashboard'];

  return (
    <div className="flex min-h-screen">
      <Sidebar active={section} onNavigate={setSection} />
      <div className="flex-1 flex flex-col min-w-0" style={{ background: '#F1F4F8' }}>
        <TopBar title={t(meta.titleKey as any)} action={meta.actionKey ? t(meta.actionKey as any) : undefined} />
        <main className="flex-1 overflow-y-auto">
          {section === 'dashboard' && <Dashboard />}
          {section === 'cantieri' && <Cantieri />}
          {section === 'preventivi' && <Preventivi />}
          {section === 'fatture' && <Fatture />}
          {section === 'rapportini' && <Rapportini />}
          {section === 'team' && <TeamPlaceholder />}
        </main>
      </div>
      <Toast />
    </div>
  );
}

export default function App() {
  const user = useStore(s => s.user);
  const [showApp, setShowApp] = useState(false);

  if (!user) {
    if (!showApp) {
      return (
        <>
          <Landing onEnterApp={() => setShowApp(true)} />
          <Toast />
        </>
      );
    }
    return <Login />;
  }

  return <AppShell />;
}
