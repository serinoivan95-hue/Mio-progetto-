import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useT } from '../../i18n/useT';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import type { Lang } from '../../i18n/translations';

export default function Login() {
  const { login, lang, setLang } = useStore();
  const t = useT();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const ok = login(email, password);
    if (!ok) setError(t('login_error'));
    setLoading(false);
  };

  const fillDemo = () => { setEmail('admin@kern.ch'); setPassword('kern2026'); };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #0F1F3D 0%, #1B3058 60%, #0F1F3D 100%)' }}>
      {/* Lang switcher top-right */}
      <div className="absolute top-5 right-5 flex gap-1">
        {(['it', 'de', 'fr'] as Lang[]).map(l => (
          <button key={l} onClick={() => setLang(l)}
            className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all"
            style={{ background: lang === l ? '#E85D26' : 'rgba(255,255,255,0.1)', color: lang === l ? '#fff' : 'rgba(255,255,255,0.5)' }}>
            {l}
          </button>
        ))}
      </div>

      <div className="relative w-full max-w-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg" style={{ background: '#E85D26', color: '#fff' }}>K</div>
          <div>
            <div className="font-black tracking-widest text-base text-white">KERN</div>
            <div className="text-[10px] font-medium tracking-wider uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>Edilizia Svizzera</div>
          </div>
        </div>

        <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}>
          <h1 className="font-bold text-xl text-white mb-1">{t('login_title')}</h1>
          <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>{t('login_sub')}</p>

          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg mb-4 text-sm" style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)', color: '#FCA5A5' }}>
              <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.6)' }}>{t('email')}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="admin@kern.ch"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white outline-none"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.6)' }}>{t('password')}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white outline-none"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }} />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm text-white transition-all"
              style={{ background: loading ? 'rgba(232,93,38,0.6)' : '#E85D26', boxShadow: '0 4px 20px rgba(232,93,38,0.35)' }}>
              {loading ? '...' : (<>{t('accedi')} <ArrowRight className="w-4 h-4" /></>)}
            </button>
          </form>

          <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <button onClick={fillDemo} className="w-full text-xs py-2 rounded-lg text-center"
              style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.04)' }}>
              {t('demo_hint')} admin@kern.ch / kern2026
            </button>
          </div>
        </div>
        <p className="text-center text-xs mt-6" style={{ color: 'rgba(255,255,255,0.25)' }}>KERN SA · Lugano, Svizzera</p>
      </div>
    </div>
  );
}
