import { LayoutDashboard, ShieldCheck, BarChart3 } from 'lucide-react';
import { Card, PanelHeader, SimTag, StatusPill } from './ui.jsx';

const FORECAST = [40, 55, 72, 68, 50, 38]; // % congestion, next 6h (placeholder)
const ZONES = [
  { name: 'Centre', tone: 'crit', label: 'High' },
  { name: 'Riverside', tone: 'warn', label: 'Moderate' },
  { name: 'North ring', tone: 'good', label: 'Low' },
  { name: 'Rail hub', tone: 'warn', label: 'Moderate' },
];

export default function ControlCenter() {
  return (
    <Card>
      <PanelHeader
        icon={LayoutDashboard}
        title="City Control Center"
        subtitle="Operational view — recommendations only."
        right={<SimTag />}
      />
      <div className="flex items-center gap-2 border-b border-line bg-brand-blue/[0.04] px-5 py-2.5 text-xs font-medium text-brand-blue">
        <ShieldCheck size={14} /> Recommendations under human review — not auto-executed.
      </div>
      <div className="grid gap-6 p-5 lg:grid-cols-3">
        {/* Congestion forecast */}
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-ink">
            <BarChart3 size={14} /> Congestion forecast · next 6h
          </div>
          <div className="mt-3 flex h-28 items-end gap-2">
            {FORECAST.map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div className="w-full rounded-t bg-brand-blue/80" style={{ height: `${v}%` }} />
                <span className="text-[10px] text-ink-soft">+{i + 1}h</span>
              </div>
            ))}
          </div>
        </div>

        {/* Aggregated zone status */}
        <div>
          <div className="text-xs font-semibold text-ink">Aggregated zone status</div>
          <ul className="mt-3 space-y-2">
            {ZONES.map((z) => (
              <li key={z.name} className="flex items-center justify-between rounded-lg border border-line px-3 py-2 text-sm">
                <span className="text-ink">{z.name}</span>
                <StatusPill tone={z.tone}>{z.label}</StatusPill>
              </li>
            ))}
          </ul>
        </div>

        {/* Dynamic pricing recommendations */}
        <div>
          <div className="text-xs font-semibold text-ink">Dynamic pricing · recommended</div>
          <div className="mt-3 space-y-4">
            {['Core corridor', 'Riverside'].map((c) => (
              <div key={c}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink">{c}</span>
                  <span className="font-semibold text-brand-blue">€ 2</span>
                </div>
                <input type="range" min="0" max="5" defaultValue="2" className="mt-1 w-full accent-brand-blue" />
              </div>
            ))}
            <p className="rounded-lg bg-mist px-3 py-2 text-[11px] text-ink-soft">
              Applying a price change requires operator approval.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
