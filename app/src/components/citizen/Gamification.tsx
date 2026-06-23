import { useTranslation } from 'react-i18next';
import { Trophy, Leaf, Users, Gift, Plus } from 'lucide-react';
import { Card, PanelHeader } from '../../lib/ui';
import { uuid } from '../../lib/id';
import type { Role, Redemption } from '../../types';

const EARN: { id: string; pts: number; roles?: Role[] }[] = [
  { id: 'actOffpeak', pts: 30 },
  { id: 'actCarpool', pts: 50 },
  { id: 'actAiroute', pts: 15 },
  { id: 'actTransit', pts: 40 },
  { id: 'actEvcharge', pts: 60 },
  { id: 'actTaxiReposition', pts: 45, roles: ['taxi'] },
  { id: 'actLogisticsNight', pts: 55, roles: ['logistics'] },
];
const REWARDS: { id: string; cost: number }[] = [
  { id: 'rwTransitPass', cost: 500 },
  { id: 'rwParkingCredit', cost: 300 },
  { id: 'rwEvVoucher', cost: 400 },
  { id: 'rwBikeCredit', cost: 200 },
  { id: 'rwTollDiscount', cost: 350 },
  { id: 'rwEventTicket', cost: 250 },
];
const SCORES = [
  { k: 'mobilityScore', v: 72, icon: Trophy, c: '#1E63D6' },
  { k: 'sustainabilityScore', v: 64, icon: Leaf, c: '#2BA24A' },
  { k: 'communityScore', v: 48, icon: Users, c: '#F5821F' },
];

export default function Gamification({
  role,
  points,
  setPoints,
  redemptions,
  setRedemptions,
}: {
  role: Role;
  points: number;
  setPoints: (f: (p: number) => number) => void;
  redemptions: Redemption[];
  setRedemptions: (f: (r: Redemption[]) => Redemption[]) => void;
}) {
  const { t } = useTranslation();
  const earn = EARN.filter((a) => !a.roles || a.roles.includes(role));
  const redeem = (id: string, cost: number) => {
    if (points < cost) return;
    setPoints((p) => p - cost);
    setRedemptions((r) => [{ id: uuid(), itemId: id, cost, at: Date.now() }, ...r]);
  };

  return (
    <Card>
      <PanelHeader
        icon={<Trophy size={18} />}
        title={t('gam.title')}
        subtitle={t('gam.subtitle')}
        right={<span className="rounded-full bg-brand-blue/10 px-3 py-1 text-sm font-bold text-brand-blue">{points} {t('common.points')}</span>}
      />
      <div className="grid gap-6 p-5 lg:grid-cols-3">
        <div className="space-y-3">
          {SCORES.map(({ k, v, icon: Icon, c }) => (
            <div key={k} className="rounded-xl border border-line bg-mist p-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-semibold text-ink"><Icon size={16} style={{ color: c }} />{t(`gam.${k}`)}</span>
                <span className="text-sm font-bold text-ink">{v}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full" style={{ width: `${v}%`, background: c }} /></div>
            </div>
          ))}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{t('gam.earnTitle')}</p>
          <ul className="mt-2 space-y-2">
            {earn.map((a) => (
              <li key={a.id} className="flex items-center justify-between rounded-xl border border-line p-3">
                <span className="text-sm text-ink">{t(`gam.${a.id}`)}</span>
                <button onClick={() => setPoints((p) => p + a.pts)} className="inline-flex items-center gap-1 rounded-full bg-brand-green/10 px-2.5 py-1 text-xs font-bold text-brand-green hover:bg-brand-green/20">
                  <Plus size={12} />{a.pts}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{t('gam.redeemTitle')}</p>
          <ul className="mt-2 space-y-2">
            {REWARDS.map((r) => {
              const ok = points >= r.cost;
              return (
                <li key={r.id} className="flex items-center justify-between rounded-xl border border-line p-3">
                  <span className="flex items-center gap-2 text-sm text-ink"><Gift size={15} className="text-brand-magenta" />{t(`gam.${r.id}`)}</span>
                  <button
                    disabled={!ok}
                    onClick={() => redeem(r.id, r.cost)}
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${ok ? 'bg-brand-blue text-white hover:bg-[#1850b8]' : 'cursor-not-allowed bg-mist text-ink-soft'}`}
                    title={ok ? '' : t('gam.insufficient')}
                  >
                    {r.cost}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{t('gam.historyTitle')}</p>
            {redemptions.length === 0 ? (
              <p className="mt-1 text-xs text-ink-soft">{t('gam.noHistory')}</p>
            ) : (
              <ul className="mt-1 space-y-1">
                {redemptions.slice(0, 4).map((r) => (
                  <li key={r.id} className="flex items-center justify-between text-xs text-ink-soft">
                    <span>{t(`gam.${r.itemId}`)}</span>
                    <span className="font-semibold">−{r.cost}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
