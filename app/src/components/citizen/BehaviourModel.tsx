import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SlidersHorizontal, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, PanelHeader, ModelTag } from '../../lib/ui';

type Period = 'peak' | 'offpeak';
type Demand = 'normal' | 'event';
type Tab = 'congestion' | 'travel' | 'emissions';

export default function BehaviourModel() {
  const { t } = useTranslation();
  const [pricing, setPricing] = useState(2);
  const [period, setPeriod] = useState<Period>('peak');
  const [demand, setDemand] = useState<Demand>('normal');
  const [tab, setTab] = useState<Tab>('congestion');

  const model = useMemo(() => {
    const p = pricing / 5;
    const peak = period === 'peak' ? 1 : 0;
    const event = demand === 'event' ? 1 : 0;
    const drivePeak = Math.max(8, 55 - p * 28 - (peak ? 0 : 15) + event * 8);
    const shiftOff = 10 + p * 16 + (peak ? 0 : 6);
    const reroute = 12 + p * 10;
    const switchMode = 8 + p * 12 + event * 2;
    const forgo = Math.max(2, 100 - (drivePeak + shiftOff + reroute + switchMode));
    const segs = [
      { key: 'segDrivePeak', v: drivePeak, c: '#E0342A' },
      { key: 'segShiftOffpeak', v: shiftOff, c: '#2BA24A' },
      { key: 'segReroute', v: reroute, c: '#1E63D6' },
      { key: 'segSwitchMode', v: switchMode, c: '#F4B400' },
      { key: 'segForgo', v: forgo, c: '#9AA0AA' },
    ];
    return {
      segs,
      congestion: Math.round(62 + peak * 8 + event * 9 - p * 22),
      travel: Math.round((26 + peak * 6 + event * 7 - p * 8) * 10) / 10,
      co2: Math.round(100 + peak * 8 + event * 10 - p * 18),
      flow: Math.round(70 + p * 18 - event * 6),
    };
  }, [pricing, period, demand]);

  const comp = useMemo(() => {
    const base = tab === 'congestion' ? [55, 70, 62, 75, 68, 58] : tab === 'travel' ? [24, 30, 27, 33, 29, 25] : [100, 118, 108, 125, 112, 98];
    return base.map((b, i) => ({ h: `${6 + i * 3}:00`, static: b, adaptive: Math.round(b * (0.82 - pricing * 0.02)) }));
  }, [tab, pricing]);

  const Toggle = ({ val, set, opts }: { val: string; set: (v: any) => void; opts: [string, string][] }) => (
    <div className="inline-flex rounded-lg border border-line bg-mist p-0.5 text-xs font-semibold">
      {opts.map(([v, l]) => (
        <button key={v} onClick={() => set(v)} className={`rounded-md px-3 py-1.5 ${val === v ? 'bg-white text-brand-blue shadow-sm' : 'text-ink-soft'}`}>
          {l}
        </button>
      ))}
    </div>
  );

  const outs = [
    { k: 'outCongestion', v: `${model.congestion}%` },
    { k: 'outTravelTime', v: `${model.travel}m` },
    { k: 'outCo2', v: `${model.co2}` },
    { k: 'outFlow', v: `${model.flow}%` },
  ];
  const tabKey: Record<Tab, string> = { congestion: 'tabCongestion', travel: 'tabTravel', emissions: 'tabEmissions' };

  return (
    <Card>
      <PanelHeader icon={<SlidersHorizontal size={18} />} title={t('model.title')} subtitle={t('model.subtitle')} right={<ModelTag label={t('common.behaviouralModel')} />} />
      <div className="grid gap-6 p-5 lg:grid-cols-2">
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-ink">{t('model.pricing')}</span>
              <span className="font-bold text-brand-blue">{pricing}</span>
            </div>
            <input type="range" min={0} max={5} value={pricing} onChange={(e) => setPricing(+e.target.value)} className="mt-2 w-full accent-brand-blue" />
            <div className="flex justify-between text-[11px] text-ink-soft"><span>{t('model.pricingLow')}</span><span>{t('model.pricingHigh')}</span></div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <p className="mb-1 text-xs font-semibold text-ink">{t('model.period')}</p>
              <Toggle val={period} set={setPeriod} opts={[['peak', t('model.peak')], ['offpeak', t('model.offpeak')]]} />
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold text-ink">{t('model.demand')}</p>
              <Toggle val={demand} set={setDemand} opts={[['normal', t('model.normal')], ['event', t('model.event')]]} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-ink-soft"><Users size={14} /> {t('model.responseTitle')}</div>
            <div className="mt-2 flex h-4 w-full overflow-hidden rounded-full border border-line">
              {model.segs.map((s) => (<div key={s.key} style={{ width: `${s.v}%`, background: s.c }} />))}
            </div>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
              {model.segs.map((s) => (
                <li key={s.key} className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink"><span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: s.c }} />{t(`model.${s.key}`)}</span>
                  <span className="font-semibold text-ink-soft">{Math.round(s.v)}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-2">
            {outs.map((o) => (
              <div key={o.k} className="rounded-xl border border-line bg-mist p-3 text-center">
                <p className="text-lg font-extrabold text-ink">{o.v}</p>
                <p className="mt-0.5 text-[10px] leading-tight text-ink-soft">{t(`model.${o.k}`)}</p>
              </div>
            ))}
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-ink">{t('model.comparison')}</span>
              <div className="inline-flex rounded-lg border border-line bg-mist p-0.5 text-[11px] font-semibold">
                {(['congestion', 'travel', 'emissions'] as Tab[]).map((x) => (
                  <button key={x} onClick={() => setTab(x)} className={`rounded-md px-2 py-1 ${tab === x ? 'bg-white text-brand-blue shadow-sm' : 'text-ink-soft'}`}>
                    {t(`model.${tabKey[x]}`)}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comp} margin={{ top: 5, right: 5, left: -22, bottom: 0 }}>
                  <XAxis dataKey="h" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="static" name={t('model.staticLabel')} fill="#9AA0AA" radius={3} />
                  <Bar dataKey="adaptive" name={t('model.adaptiveLabel')} fill="#1E63D6" radius={3} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-ink-soft">
              <span className="flex items-center gap-1"><span className="inline-block h-2 w-3 rounded-full bg-[#9AA0AA]" />{t('model.staticLabel')}</span>
              <span className="flex items-center gap-1"><span className="inline-block h-2 w-3 rounded-full bg-brand-blue" />{t('model.adaptiveLabel')}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
