import { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { Card, PanelHeader, SimTag } from './ui.jsx';

const TABS = ['Congestion', 'Travel time', 'Emissions'];

export default function ComparisonPanel() {
  const [tab, setTab] = useState(TABS[0]);
  return (
    <Card>
      <PanelHeader
        icon={ArrowLeftRight}
        title="Static plan vs Trafiqo adaptive"
        subtitle="Same day, two strategies."
        right={<SimTag />}
      />
      <div className="px-5 pt-4">
        <div className="inline-flex rounded-lg border border-line bg-mist p-0.5">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                tab === t ? 'bg-white text-brand-blue shadow-sm' : 'text-ink-soft hover:text-ink'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="p-5">
        {/* Chart placeholder — two illustrative series (static skeleton) */}
        <svg viewBox="0 0 320 140" className="w-full" role="img" aria-label={`${tab}: static vs adaptive (simulated)`}>
          <line x1="0" y1="120" x2="320" y2="120" stroke="#E7E8EC" />
          <polyline fill="none" stroke="#9AA0AA" strokeWidth="2.5" strokeLinecap="round"
            points="0,40 50,52 100,38 150,60 200,44 260,66 320,50" />
          <polyline fill="none" stroke="#1E63D6" strokeWidth="2.5" strokeLinecap="round"
            points="0,80 50,86 100,78 150,96 200,88 260,104 320,96" />
        </svg>
        <div className="mt-3 flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-ink-soft"><span className="h-2 w-4 rounded-full bg-[#9AA0AA]" /> Static baseline</span>
          <span className="flex items-center gap-1.5 text-ink"><span className="h-2 w-4 rounded-full bg-brand-blue" /> Trafiqo adaptive</span>
          <span className="ml-auto italic text-ink-soft">Illustrative</span>
        </div>
      </div>
    </Card>
  );
}
