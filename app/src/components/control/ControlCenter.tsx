import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { LayoutDashboard, ShieldCheck } from 'lucide-react';
import { Card, PanelHeader, ModelTag } from '../../lib/ui';

const FORECAST = [
  { h: '+1h', v: 48 },
  { h: '+2h', v: 63 },
  { h: '+3h', v: 71 },
  { h: '+4h', v: 58 },
];
const ZONES = ['Centre', 'Riverside', 'North ring', 'Rail hub', 'Buda inner', 'East'];
const LEVELS = [2, 1, 0, 1, 2, 0];
const tone = ['#1FA86B', '#F59E0B', '#E0342A'];

export default function ControlCenter() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <Card>
        <PanelHeader icon={<LayoutDashboard size={18} />} title={t('control.title')} subtitle={t('control.subtitle')} right={<ModelTag label={t('common.behaviouralModel')} />} />
        <div className="flex items-center gap-2 border-b border-line bg-brand-blue/[0.04] px-5 py-2.5 text-xs font-medium text-brand-blue">
          <ShieldCheck size={14} /> {t('control.underReview')}
        </div>
        <div className="grid gap-6 p-5 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold text-ink">{t('control.overview')}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {ZONES.map((z, i) => (
                <div key={z} className="rounded-lg border border-line p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-ink">{z}</span>
                    <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: tone[LEVELS[i]] }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-ink">{t('control.forecast')}</p>
            <p className="text-[11px] text-ink-soft">{t('control.forecastDesc')}</p>
            <div className="mt-2 h-36">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={FORECAST} margin={{ top: 5, right: 5, left: -24, bottom: 0 }}>
                  <XAxis dataKey="h" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="v" fill="#1E63D6" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <PanelHeader title={t('control.pricing')} subtitle={t('control.pricingDesc')} />
          <div className="space-y-4 p-5">
            {['Core corridor', 'Riverside', 'Inner ring'].map((z) => (
              <div key={z}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink">{z}</span>
                  <span className="font-semibold text-brand-blue">€ 2</span>
                </div>
                <input type="range" min={0} max={5} defaultValue={2} className="mt-1 w-full accent-brand-blue" />
              </div>
            ))}
            <p className="rounded-lg bg-mist px-3 py-2 text-[11px] text-ink-soft">{t('control.applyNote')}</p>
          </div>
        </Card>

        <Card>
          <PanelHeader title={t('control.sustainability')} />
          <div className="grid grid-cols-3 gap-3 p-5">
            {([['emissions', '−12%'], ['fuel', '−9%'], ['greenCorridors', '7']] as [string, string][]).map(([k, v]) => (
              <div key={k} className="rounded-xl border border-line bg-mist p-3 text-center">
                <p className="text-lg font-extrabold text-ink">{v}</p>
                <p className="mt-0.5 text-[10px] text-ink-soft">{t(`control.${k}`)}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-line p-5">
            <p className="text-xs font-semibold text-ink">{t('control.rewardAnalytics')}</p>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {([['pointsCirculation', '1.2M'], ['activeCitizens', '8,400'], ['co2Avoided', '24t']] as [string, string][]).map(([k, v]) => (
                <div key={k} className="rounded-xl border border-line p-3 text-center">
                  <p className="text-base font-extrabold text-ink">{v}</p>
                  <p className="mt-0.5 text-[10px] leading-tight text-ink-soft">{t(`control.${k}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
