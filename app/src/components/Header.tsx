import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, LogOut, Coins, Info, AlertTriangle, AlertOctagon, X } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { TrafiqoLogo } from '../lib/logo';
import LanguageToggle from './LanguageToggle';
import type { AppNotification, Mode, Severity } from '../types';

const sevIcon: Record<Severity, typeof Info> = { info: Info, warning: AlertTriangle, critical: AlertOctagon };
const sevTone: Record<Severity, string> = { info: 'text-brand-blue', warning: 'text-status-warn', critical: 'text-status-crit' };

function NotifPanel({
  notifications,
  onMarkAllRead,
  onDismiss,
}: {
  notifications: AppNotification[];
  onMarkAllRead: () => void;
  onDismiss: (id: string) => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="absolute right-0 z-50 mt-2 w-[22rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-line bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="text-sm font-bold text-ink">{t('notif.title')}</span>
        <button onClick={onMarkAllRead} className="text-xs font-semibold text-brand-blue hover:underline">
          {t('notif.markAllRead')}
        </button>
      </div>
      <div className="max-h-[60vh] divide-y divide-line overflow-y-auto">
        {notifications.length === 0 && <p className="px-4 py-8 text-center text-sm text-ink-soft">{t('notif.empty')}</p>}
        {notifications.map((n) => {
          const Icon = sevIcon[n.severityKey];
          return (
            <div key={n.id} className={`flex gap-3 px-4 py-3 ${n.read ? 'opacity-60' : ''}`}>
              <Icon size={18} className={`mt-0.5 flex-shrink-0 ${sevTone[n.severityKey]}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-ink">{t(n.titleKey)}</p>
                  <button onClick={() => onDismiss(n.id)} className="flex-shrink-0 text-ink-soft hover:text-ink" aria-label={t('notif.dismiss')}>
                    <X size={14} />
                  </button>
                </div>
                <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">{t(n.bodyKey)}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-soft">
                  {n.delayKey && <span className="font-semibold text-ink">{t('notif.delay')}: {t(n.delayKey)}</span>}
                  {n.altKey && <span>{t('notif.alternative')}: {t(n.altKey)}</span>}
                  <span className="ml-auto">{n.minutesAgo}m</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Header({
  mode,
  setMode,
  points,
  notifications,
  onMarkAllRead,
  onDismiss,
}: {
  mode: Mode;
  setMode: (m: Mode) => void;
  points: number;
  notifications: AppNotification[];
  onMarkAllRead: () => void;
  onDismiss: (id: string) => void;
}) {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const [openNotif, setOpenNotif] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  const ModeSwitch = ({ full = false }: { full?: boolean }) => (
    <div className={`inline-flex items-center rounded-full border border-line bg-mist p-0.5 text-xs font-semibold ${full ? 'w-full' : ''}`}>
      {(['citizen', 'control'] as Mode[]).map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className={`rounded-full px-3 py-1.5 transition ${full ? 'flex-1' : ''} ${
            mode === m ? 'bg-white text-brand-blue shadow-sm' : 'text-ink-soft hover:text-ink'
          }`}
        >
          {t(`modes.${m}`)}
        </button>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-2.5 sm:px-6">
        <TrafiqoLogo className="text-lg" />
        <div className="ml-2 hidden sm:block">
          <ModeSwitch />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <LanguageToggle compact />
          <span className="hidden items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink md:inline-flex">
            <Coins size={14} className="text-brand-orange" /> {points} <span className="text-ink-soft">{t('header.points')}</span>
          </span>

          <div className="relative">
            <button
              onClick={() => { setOpenNotif((v) => !v); setOpenUser(false); }}
              className="relative rounded-full border border-line bg-white p-2 hover:bg-mist"
              aria-label={t('header.notifications')}
            >
              <Bell size={16} />
              {unread > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-status-crit px-1 text-[10px] font-bold text-white">
                  {unread}
                </span>
              )}
            </button>
            {openNotif && <NotifPanel notifications={notifications} onMarkAllRead={onMarkAllRead} onDismiss={onDismiss} />}
          </div>

          <div className="relative">
            <button
              onClick={() => { setOpenUser((v) => !v); setOpenNotif(false); }}
              className="flex items-center gap-2 rounded-full border border-line bg-white p-1 hover:bg-mist"
              aria-label={t('header.account')}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-blue text-xs font-bold text-white">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </span>
            </button>
            {openUser && (
              <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-line bg-white p-2 shadow-xl">
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold text-ink">{user?.name}</p>
                  <p className="truncate text-xs text-ink-soft">{user?.email}</p>
                </div>
                <button onClick={signOut} className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink hover:bg-mist">
                  <LogOut size={15} /> {t('header.logout')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-line px-4 py-2 sm:hidden">
        <ModeSwitch full />
      </div>
    </header>
  );
}
