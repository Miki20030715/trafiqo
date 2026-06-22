import { SlidersHorizontal, Users } from 'lucide-react';
import { Card, PanelHeader, SimTag } from './ui.jsx';

// Static placeholder distribution for the skeleton (becomes reactive after approval).
const SEGMENTS = [
  { label: 'Drive at peak', pct: 38, color: '#E0342A' },
  { label: 'Shift to off-peak', pct: 22, color: '#2BA24A' },
  { label: 'Reroute', pct: 18, color: '#1E63D6' },
  { label: 'Switch mode', pct: 14, color: '#F4B400' },
  { label: 'Forgo / combine trip', pct: 8, color: '#9AA0AA' },
];

function Slider({ label, suffix, min, max, step, value, onChange, hint }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-ink">{label}</label>
        <span className="text-sm font-bold text-brand-blue">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-brand-blue"
      />
      {hint && <p className="mt-1 text-xs text-ink-soft">{hint}</p>}
    </div>
  );
}

export default function ScenarioPanel({ scenario, setLever }) {
  return (
    <Card>
      <PanelHeader
        icon={SlidersHorizontal}
        title="Behavioural simulation · Human Behaviour Prediction"
        subtitle="Move a lever and watch simulated populations shift. Synthetic agents, aggregated — never individuals."
        right={<SimTag />}
      />
      <div className="grid gap-6 p-5 md:grid-cols-2">
        <div className="space-y-5">
          <Slider label="Peak-hour pricing" suffix=" €" min={0} max={5} step={1}
            value={scenario.pricing} onChange={setLever('pricing')}
            hint="Congestion charge applied to the core corridor." />
          <Slider label="Event intensity" suffix="" min={0} max={3} step={1}
            value={scenario.event} onChange={setLever('event')}
            hint="0 = none · 3 = major event near the centre." />
          <Slider label="Peak demand" suffix="%" min={30} max={100} step={5}
            value={scenario.peak} onChange={setLever('peak')}
            hint="Share of trips concentrated in the peak window." />
          <p className="rounded-xl border border-line bg-mist p-3 text-xs leading-relaxed text-ink-soft">
            Sliders are live; the response distribution becomes reactive once the simulation is wired (after layout approval).
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-ink-soft">
            <Users size={14} /> Simulated population response · aggregated
          </div>
          <div className="mt-3 flex h-4 w-full overflow-hidden rounded-full border border-line">
            {SEGMENTS.map((s) => (
              <div key={s.label} style={{ width: `${s.pct}%`, background: s.color }} title={`${s.label} ${s.pct}%`} />
            ))}
          </div>
          <ul className="mt-4 space-y-2">
            {SEGMENTS.map((s) => (
              <li key={s.label} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-ink">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} /> {s.label}
                </span>
                <span className="font-semibold text-ink-soft">{s.pct}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
