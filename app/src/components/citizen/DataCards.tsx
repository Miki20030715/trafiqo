import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { Card, PanelHeader, SourceTag } from '../../lib/ui';
import { BUDAPEST_STATS, TIME_LOST_TREND } from '../../data/budapest';

export default function DataCards() {
  const { t } = useTranslation();
  return (
    <Card>
      <PanelHeader icon={<BarChart3 size={18} />} title={t('map.dataTitle')} subtitle="Budapest" />
      <div className="grid grid-cols-2 gap-3 p-4">
        {BUDAPEST_STATS.map((s) => (
          <div key={s.id} className="rounded-xl border border-line bg-mist p-3">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold tracking-tight text-ink">{s.value}</span>
              {s.unit && <span className="text-[11px] font-semibold text-ink-soft">{s.unit}</span>}
            </div>
            <p className="mt-1 text-[11px] leading-snug text-ink-soft">{t(`stats.${s.id}`)}</p>
            <div className="mt-2"><SourceTag source={s.source} /></div>
            {s.scope === 'eu' && <p className="mt-1 text-[10px] italic text-ink-soft">{t('stats.euScope')}</p>}
          </div>
        ))}
      </div>
      <div className="border-t border-line p-4">
        <p className="text-xs font-semibold text-ink">{t('stats.trendTitle')}</p>
        <div className="mt-2 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={TIME_LOST_TREND} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="hours" stroke="#1E63D6" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2"><SourceTag source="TomTom" /></div>
      </div>
    </Card>
  );
}
