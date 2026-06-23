import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../lib/auth';
import { TrafiqoLogo } from '../lib/logo';
import LanguageToggle from './LanguageToggle';

export default function AuthScreen() {
  const { t } = useTranslation();
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'in' | 'up'>('in');
  const [form, setForm] = useState({ name: '', organisation: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password || (mode === 'up' && !form.name)) {
      setError(t('auth.errRequired'));
      return;
    }
    setBusy(true);
    try {
      if (mode === 'up') await signUp(form.email, form.password, form.name, form.organisation);
      else await signIn(form.email, form.password);
    } catch (err) {
      setError(t((err as Error).message === 'exists' ? 'auth.errExists' : 'auth.errInvalid'));
    } finally {
      setBusy(false);
    }
  };

  const field = 'mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-ink outline-none transition focus:border-brand-blue';

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand side */}
      <div className="relative hidden flex-col justify-between bg-white p-10 lg:flex">
        <TrafiqoLogo className="text-2xl" />
        <div>
          <h1 className="max-w-md text-3xl font-extrabold leading-tight tracking-tight text-ink">
            {t('app.tagline')}
          </h1>
          <p className="mt-4 max-w-md text-ink-soft">{t('auth.valueProp')}</p>
        </div>
        <p className="text-xs text-ink-soft">© {new Date().getFullYear()} Trafiqo</p>
        <div className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-brand-blue/5 blur-3xl" />
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center bg-surface p-6">
        <div className="w-full max-w-sm">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <TrafiqoLogo className="text-xl" />
          </div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-extrabold tracking-tight text-ink">
              {t(mode === 'in' ? 'auth.signInTitle' : 'auth.signUpTitle')}
            </h2>
            <LanguageToggle compact />
          </div>

          <form onSubmit={submit} className="rounded-2xl border border-line bg-white p-6">
            {mode === 'up' && (
              <>
                <label className="block text-sm font-semibold text-ink">{t('auth.name')}
                  <input className={field} value={form.name} onChange={set('name')} autoComplete="name" />
                </label>
                <label className="mt-4 block text-sm font-semibold text-ink">{t('auth.organisation')}
                  <input className={field} value={form.organisation} onChange={set('organisation')} autoComplete="organization" />
                </label>
              </>
            )}
            <label className="mt-4 block text-sm font-semibold text-ink">{t('auth.email')}
              <input type="email" className={field} value={form.email} onChange={set('email')} autoComplete="email" />
            </label>
            <label className="mt-4 block text-sm font-semibold text-ink">{t('auth.password')}
              <input type="password" className={field} value={form.password} onChange={set('password')} autoComplete={mode === 'up' ? 'new-password' : 'current-password'} />
            </label>

            {error && <p className="mt-4 rounded-lg bg-status-crit/10 px-3 py-2 text-sm text-status-crit">{error}</p>}

            <button type="submit" disabled={busy}
              className="mt-6 w-full rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1850b8] disabled:opacity-60">
              {t(mode === 'in' ? 'auth.signInCta' : 'auth.signUpCta')}
            </button>

            <p className="mt-4 text-center text-sm text-ink-soft">
              {t(mode === 'in' ? 'auth.noAccount' : 'auth.haveAccount')}{' '}
              <button type="button" onClick={() => { setMode(mode === 'in' ? 'up' : 'in'); setError(''); }}
                className="font-semibold text-brand-blue hover:underline">
                {t(mode === 'in' ? 'auth.switchToSignUp' : 'auth.switchToSignIn')}
              </button>
            </p>
          </form>
          <p className="mt-4 text-center text-xs text-ink-soft">{t('auth.mockNote')}</p>
        </div>
      </div>
    </div>
  );
}
