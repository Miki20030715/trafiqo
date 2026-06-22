import { Map, Camera, Layers } from 'lucide-react';
import { Card, PanelHeader, SimTag } from './ui.jsx';

const TONES = ['#2BA24A', '#7FB800', '#F4B400', '#F59E0B', '#E0342A'];
// Static placeholder grid (24 zones) for the skeleton.
const LEVELS = [0, 1, 2, 1, 3, 4, 1, 2, 3, 2, 4, 3, 0, 1, 2, 3, 2, 1, 1, 0, 2, 3, 1, 2];

export default function ZoneFlowMap() {
  return (
    <Card>
      <PanelHeader
        icon={Map}
        title="Aggregated zone flow"
        subtitle="Aggregated vehicle / flow counts per zone — no individuals, no plates, no faces."
        right={<SimTag />}
      />
      <div className="p-5">
        <div className="grid grid-cols-6 gap-1.5">
          {LEVELS.map((lvl, i) => (
            <div
              key={i}
              className="aspect-square rounded-md"
              style={{ background: TONES[lvl] }}
              title={`Zone ${i + 1} · aggregated flow`}
            />
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-soft">
          <span>Flow:</span>
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-status-good" /> Low</span>
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-status-warn" /> Moderate</span>
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-status-crit" /> High</span>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-xl border border-line bg-mist p-3 text-xs leading-relaxed text-ink-soft">
          <Camera size={15} className="mt-0.5 flex-shrink-0" />
          <p>
            <span className="font-semibold text-ink">Sensing layer:</span> partner Miracle Traffic AI provides aggregated counts only.{' '}
            <span className="inline-flex items-center gap-1 font-semibold text-ink"><Layers size={12} /> Trafiqo adds the prediction layer</span> on top.
          </p>
        </div>
      </div>
    </Card>
  );
}
