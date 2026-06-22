import { Clock, Gauge, Leaf, Cpu, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Card, SimTag } from './ui.jsx';

// Placeholder sparkline (a calm static curve for the skeleton; animates after approval).
function Sparkline({ tone = 'good' }) {
  const stroke = tone === 'warn' ? '#F59E0B' : tone === 'crit' ? '#E0342A' : '#2BA24A';
  return (
    <svg viewBox="0 0 120 32" className="h-8 w-full" preserveAspectRatio="none" aria-hidden="true">
      <polyline
        points="0,22 15,18 30,24 45,14 60,18 75,10 90,16 105,8 120,12"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const KPIS = [
  { icon: Clock, label: 'Avg. travel time', value: '18.4', unit: 'min', delta: '−6%', good: true, tone: 'good' },
  { icon: Gauge, label: 'Congestion level', value: '58', unit: '%', delta: '−4 pts', good: true, tone: 'warn' },
  { icon: Leaf, label: 'CO₂ intensity', value: '0.42', unit: 'kg/km', delta: '−5%', good: true, tone: 'good' },
  { icon: Cpu, label: 'AI routing efficiency', value: '87', unit: '%', delta: '+3 pts', good: true, tone: 'good' },
];

export default function KpiRow() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {KPIS.map((k) => {
        const Icon = k.icon;
        const Delta = k.good ? ArrowDownRight : ArrowUpRight;
        return (
          <Card key={k.label} className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-mist text-brand-blue">
                <Icon size={18} strokeWidth={1.9} />
              </div>
              <SimTag />
            </div>
            <p className="mt-4 text-xs font-medium text-ink-soft">{k.label}</p>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold tracking-tight text-ink">{k.value}</span>
              <span className="text-sm font-semibold text-ink-soft">{k.unit}</span>
              <span className="ml-auto inline-flex items-center gap-0.5 text-xs font-semibold text-status-good">
                <Delta size={13} /> {k.delta}
              </span>
            </div>
            <div className="mt-3">
              <Sparkline tone={k.tone} />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
